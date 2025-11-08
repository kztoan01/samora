// app/api/admin/orders/route.ts
import clientPromise from "@/app/services/lib/mongo";
import { NextRequest, NextResponse } from "next/server";



// GET - List orders with filtering and pagination
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Build the query
    const query: any = {};
    
    // Add status filter if provided
    if (status && status !== "all") {
      // Check if filtering by payment status or order status
      if (["paid", "pending", "failed"].includes(status)) {
        query.paymentStatus = status;
      } else {
        query.orderStatus = status;
      }
    }
    
    // Add search filter if provided
    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: "i" } },
        { "customerInfo.fullName": { $regex: search, $options: "i" } },
        { "customerInfo.email": { $regex: search, $options: "i" } },
        { "customerInfo.phone": { $regex: search, $options: "i" } }
      ];
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("SamoraDB");
    
    // Get total count for pagination
    const total = await db.collection("Orders").countDocuments(query);
    
    // Fetch orders with pagination
    const orders = await db.collection("Orders")
      .find(query)
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit)
      .toArray();
    
    return NextResponse.json({
      success: true,
      orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch orders",
      details: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}