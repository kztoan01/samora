// app/api/admin/orders/update/route.ts
import clientPromise from "@/app/services/lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { orderId, updates } = data;
    
    if (!orderId || !updates || Object.keys(updates).length === 0) {
      return NextResponse.json({
        success: false,
        error: "Invalid request: Missing order ID or updates",
      }, { status: 400 });
    }
    
    // Validate the order status if provided
    if (updates.orderStatus) {
      const validOrderStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
      if (!validOrderStatuses.includes(updates.orderStatus)) {
        return NextResponse.json({
          success: false,
          error: `Invalid order status: ${updates.orderStatus}`,
        }, { status: 400 });
      }
    }
    
    // Validate the payment status if provided
    if (updates.paymentStatus) {
      const validPaymentStatuses = ["pending", "paid", "failed"];
      if (!validPaymentStatuses.includes(updates.paymentStatus)) {
        return NextResponse.json({
          success: false,
          error: `Invalid payment status: ${updates.paymentStatus}`,
        }, { status: 400 });
      }
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("SamoraDB");
    
    // Create update object
    const updateObject: any = {
      $set: {
        ...updates,
        updatedAt: new Date()
      }
    };
    
    // Update the order
    const result = await db.collection("Orders").updateOne(
      { _id: new ObjectId(orderId) },
      updateObject
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({
        success: false,
        error: `Order with ID ${orderId} not found`,
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
      updatedCount: result.modifiedCount
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to update order",
      details: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}