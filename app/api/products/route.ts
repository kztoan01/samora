import clientPromise from "@/app/services/lib/mongo";

import fs from 'fs/promises';
import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  PutObjectAclCommand,
  ObjectCannedACL
} from "@aws-sdk/client-s3";

import { ObjectId } from "mongodb";

enum ProductCategory {
  CHE_BIEN = "Các sản phẩm chế biến",
  CAY_GIONG_HAT = "Cây giống & Hạt Sâm Ngọc Linh",
  RUOU_HOA = "Rượu Hoa Sâm Ngọc Linh",
  RUOU_HONG_DAO = "Rượu Hồng Đào Sâm Ngọc Linh",
  RUOU_LA = "Rượu Lá Sâm Ngọc Linh",
  RUOU_SAM = "Rượu Sâm Ngọc Linh",
  RUOU_CAY_CU = "Rượu Sâm Ngọc Linh Cây Và Củ",
  SAM_TUOI = "Sâm Ngọc Linh củ tươi",
}

interface Price {
  originalPrice: number;  // Just keep the original price
}

interface VolumePrice {
  volume: string;
  price: Price;
}

interface Product {
  _id: ObjectId;
  name: string;
  description?: string;
  category: ProductCategory;
  slug: string;
  images: string[];
  stock: number;
  volumePrices?: VolumePrice[];
  isAvailable: boolean;
  ingredients: string; // Thành phần
  benefits: string; // Công dụng
  usageInstructions: string; // Hướng dẫn sử dụng
  storageInstructions: string; // Cách bảo quản
  price?: number;
}


export async function GET(request: NextRequest) {
  try {
    const { searchParams, pathname } = new URL(request.url);
    const categoryParam = searchParams.get('category');
    const slugPattern = /\/api\/products\/([^\/]+)$/;
    const slugMatch = pathname.match(slugPattern);
    const slug = slugMatch ? slugMatch[1] : null;
    
    const client = await clientPromise;
    const db = client.db('SamoraDB');
    
    // Nếu có slug trong URL, lấy sản phẩm theo slug
    if (slug) {
      const product = await db.collection<Product>("Products").findOne({ slug });
      
      if (!product) {
        return NextResponse.json({
          error: 'Product not found',
        }, { status: 404 });
      }
      
      return NextResponse.json(product);
    }
    
    // Xử lý trường hợp lấy tất cả sản phẩm hoặc lọc theo category
    if (!categoryParam) {
      const products = await db.collection<Product>("Products").find().toArray();
      return NextResponse.json(products);
    }
    
    // Chuyển đổi category từ string thành ProductCategory
    const category = Object.values(ProductCategory).find(cat => cat === categoryParam);
    
    if (!category) {
      return NextResponse.json({
        error: 'Invalid category',
      }, { status: 400 });
    }
    
    const products = await db.collection<Product>('Products')
      .find({ category })
      .toArray();
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({
      error: 'Failed to fetch products',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

async function uploadFileToS3(file: File, fileType: string): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate unique filename
  const fileExtension = file.name.split('.').pop();
  const filename = `sam-ngoc-linh/${fileType}/${crypto.randomUUID()}.${fileExtension}`;

  // Upload file to S3
  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: filename,
    Body: buffer,
    ContentType: file.type
  };

  try {
    // Upload the file
    await s3Client.send(new PutObjectCommand(uploadParams));

    // Set ACL to public-read
    const aclParams = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: filename,
      ACL: ObjectCannedACL.public_read
    };

    await s3Client.send(new PutObjectAclCommand(aclParams));

    // Construct and return public URL
    return `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${filename}`;
  } catch (error) {
    console.error('S3 Upload Error:', error);
    throw error;
  }
}

 function createSlug(text: string): string {
  return text
    .normalize('NFD') // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, '') // loại bỏ dấu
    .toLowerCase()
    .replace(/[đ]/g, 'd')
    .replace(/[^a-z0-9\s]/g, '') // chỉ giữ lại chữ cái và số
    .replace(/\s+/g, '-') // thay khoảng trắng bằng dấu gạch ngang
    .replace(/^-+|-+$/g, ''); // loại bỏ dấu gạch ngang ở đầu và cuối
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    if (!name) {
      return NextResponse.json({ error: 'Product name is required' }, { status: 400 });
    }

    const productData: Partial<Product> = {
      name,
      slug: createSlug(name),
      description: formData.get('description') as string,
      category: formData.get('category') as ProductCategory,
      stock: parseInt(formData.get('stock') as string, 10) || 0,
      isAvailable: formData.get('isAvailable') === 'true',
      ingredients: formData.get('ingredients') as string,
      benefits: formData.get('benefits') as string,
      usageInstructions: formData.get('usageInstructions') as string,
      storageInstructions: formData.get('storageInstructions') as string,
    };

    // Add volumePrices only if they exist
    const volumeCount = parseInt(formData.get('volumeCount') as string, 10) || 0;
    if (volumeCount > 0) {
      const volumePrices: VolumePrice[] = [];
      for (let i = 0; i < volumeCount; i++) {
        const volume = formData.get(`volume${i}`) as string;
        const originalPrice = parseFloat(formData.get(`originalPrice${i}`) as string);
        
        if (volume && !isNaN(originalPrice)) {
          volumePrices.push({
            volume,
            price: {
              originalPrice
            }
          });
        }
      }
      productData.volumePrices = volumePrices;
    } else {
      // If no volume prices, use default price
      const price = parseFloat(formData.get('price') as string);
      if (!isNaN(price)) {
        productData.price = price;
      }
    }

    // ✅ Upload images if provided (Limit: 5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const files = formData.getAll('images') as File[];
    const imageUrls: string[] = [];

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: `File ${file.name} exceeds 5MB limit.` }, { status: 400 });
      }

      if (file.size > 0) {
        const imageUrl = await uploadFileToS3(file, 'product-images');
        imageUrls.push(imageUrl);
      }
    }

    productData.images = imageUrls;

    // ✅ Save product to MongoDB
    const client = await clientPromise;
    const db = client.db('SamoraDB');
    const result = await db.collection<Product>('Products').insertOne(productData as Product);

    return NextResponse.json({
      success: true,
      id: result.insertedId,
      slug: productData.slug,
      imageUrls: productData.images,
      message: 'Product created successfully with images',
    });
  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json({
      error: 'Product creation failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
