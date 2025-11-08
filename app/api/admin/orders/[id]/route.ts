// app/api/admin/orders/[id]/route.ts
import clientPromise from "@/app/services/lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: "Order ID is required",
      }, { status: 400 });
    }
    
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (e) {
      console.log(e)
      return NextResponse.json({
        success: false,
        error: "Invalid order ID format",
      }, { status: 400 });
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("SamoraDB");
    
    // Find the order
    const order = await db.collection("Orders").findOne({ _id: objectId });
    
    if (!order) {
      return NextResponse.json({
        success: false,
        error: "Order not found",
      }, { status: 404 });
    }
    
    // Fetch customer details if customerId exists
    let customer = null;
    if (order.customerId) {
      try {
        customer = await db.collection("Customers").findOne({ 
          _id: new ObjectId(order.customerId) 
        });
      } catch (e) {
        console.error("Error fetching customer:", e);
        // Continue without customer data
      }
    }
    
    return NextResponse.json({
      success: true,
      order,
      customer
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch order details",
      details: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}

// DELETE - Delete an order (if needed)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: "Order ID is required",
      }, { status: 400 });
    }
    
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (e) {
      console.log(e)
      return NextResponse.json({
        success: false,
        error: "Invalid order ID format",
      }, { status: 400 });
    }
    
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("SamoraDB");
    
    // First, check if the order exists
    const order = await db.collection("Orders").findOne({ _id: objectId });
    
    if (!order) {
      return NextResponse.json({
        success: false,
        error: "Order not found",
      }, { status: 404 });
    }
    
    // Use a session to ensure transaction consistency
    const session = client.startSession();
    
    try {
      await session.withTransaction(async () => {
        // Delete the order
        await db.collection("Orders").deleteOne({ _id: objectId }, { session });
        
        // Remove order reference from customer if it exists
        // if (order.customerId) {
        //   await db.collection("Customers").updateOne(
        //     { _id: new ObjectId(order.customerId) },
        //     { $pull: { orders: objectId } },
        //     { session }
        //   );
        // }
      });
      
      return NextResponse.json({
        success: true,
        message: "Order deleted successfully"
      });
    } catch (error) {
      console.error("Transaction error:", error);
      return NextResponse.json({
        success: false,
        error: "Failed to delete order",
        details: error instanceof Error ? error.message : "Unknown error",
      }, { status: 500 });
    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to delete order",
      details: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}