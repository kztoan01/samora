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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("SamoraDB");

    let productId;
    try {
      productId = new ObjectId(id);
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: "Invalid product ID format" }, { status: 400 });
    }

    const product = await db.collection<Product>("Products").findOne({ _id: productId });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest, { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
    const client = await clientPromise;
    const db = client.db("SamoraDB");

    // Validate the ID is a valid ObjectId
    let roomId;
    try {
      roomId = new ObjectId(id);
    } catch (error) {
      console.log(error)
      return NextResponse.json(
        { error: "Invalid room ID format" }, 
        { status: 400 }
      );
    }

    const result = await db.collection<Product>("Products").deleteOne({ _id: roomId });

    return NextResponse.json({ success: result.deletedCount > 0 });

  } catch (error) {
    console.error("Error deleting room:", error);
    return NextResponse.json(
      { error: "Internal server error" }, 
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db("SamoraDB");

    let productId;
    try {
      productId = new ObjectId(id);
    } catch (error) {
      console.error("Invalid product ID:", error);
      return NextResponse.json({ error: "Invalid product ID format" }, { status: 400 });
    }

    const productData = await request.json();

    // Ensure volumePrices is properly formatted if included
    if (productData.volumePrices) {
      if (!Array.isArray(productData.volumePrices)) {
        return NextResponse.json({ error: "volumePrices must be an array" }, { status: 400 });
      }
      
      for (const vp of productData.volumePrices) {
        if (typeof vp.volume !== "string" || !vp.price || 
            typeof vp.price.originalPrice !== "number" ||
            (vp.price.discountPrice !== undefined && typeof vp.price.discountPrice !== "number")) {
          return NextResponse.json({ error: "Invalid volume price format" }, { status: 400 });
        }
      }
    }

    // Ensure currency is a string if included
    if (productData.currency !== undefined && typeof productData.currency !== "string") {
      return NextResponse.json({ error: "Currency must be a string" }, { status: 400 });
    }

    // Ensure stock is a valid number
    if (productData.stock !== undefined && typeof productData.stock !== "number") {
      return NextResponse.json({ error: "Stock must be a number" }, { status: 400 });
    }

    // Ensure isAvailable is a boolean
    if (productData.isAvailable !== undefined && typeof productData.isAvailable !== "boolean") {
      return NextResponse.json({ error: "isAvailable must be a boolean" }, { status: 400 });
    }

    // Update the product in the database
    const result = await db
      .collection("Products")
      .updateOne({ _id: productId }, { $set: productData });

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Product not found or no changes applied" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}