import clientPromise from "@/app/services/lib/mongo";

import { NextRequest, NextResponse } from "next/server";
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
  originalPrice: number;
  discountPrice?: number;
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
  volumePrices: VolumePrice[];
  isAvailable: boolean;
  ingredients: string; // Thành phần
  benefits: string; // Công dụng
  usageInstructions: string; // Hướng dẫn sử dụng
  storageInstructions: string; // Cách bảo quản
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const client = await clientPromise;
    const db = client.db("SamoraDB");
    const product = await db.collection<Product>("Products").findOne({ slug });

    if (!product) {
      return NextResponse.json({
        error: 'Product not found',
      }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
