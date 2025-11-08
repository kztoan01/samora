// app/api/checkout/route.ts
import clientPromise from "@/app/services/lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

interface ProductItem {
  id: string;
  name: string;
  selectedPrice?: number;
  selectedVolume?: string;
  price?: number;
  quantity: number;
  images: string[];
}

interface CartItem {
  product: ProductItem;
  quantity: number;
}

interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  notes: string;
}

interface OrderData {
  _id?: ObjectId;
  orderNumber: string;
  customerId?: string;
  customerInfo: CheckoutFormData;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

// Hàm tạo mã đơn hàng duy nhất
function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(2); // Lấy 2 chữ số cuối của năm
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  
  return `SNL-${year}${month}${day}-${random}`;
}

export async function POST(request: NextRequest) {
    try {
      // Lấy dữ liệu từ request body
      const data = await request.json();
      const { customerInfo, items, subtotal, shippingFee, total, paymentMethod = "COD" } = data;
      
      // Kiểm tra dữ liệu đầu vào
      if (!customerInfo || !items || !Array.isArray(items) || items.length === 0) {
        return NextResponse.json({
          success: false,
          error: "Thông tin không hợp lệ. Vui lòng kiểm tra lại.",
        }, { status: 400 });
      }
      
      // Kiểm tra thông tin khách hàng
      const requiredFields = ["fullName", "email", "phone", "address", "city", "district", "ward"];
      for (const field of requiredFields) {
        if (!customerInfo[field]) {
          return NextResponse.json({
            success: false,
            error: `Trường ${field} là bắt buộc.`,
          }, { status: 400 });
        }
      }
      
      // Kiểm tra tổng tiền
      const calculatedSubtotal = items.reduce((sum, item) => 
        sum + (item.product.selectedPrice * item.quantity), 0);
      
      const calculatedTotal = calculatedSubtotal + shippingFee;
      
      // Kiểm tra nếu tổng tiền không khớp (cho phép sai số nhỏ do làm tròn)
      if (Math.abs(calculatedSubtotal - subtotal) > 1 || Math.abs(calculatedTotal - total) > 1) {
        return NextResponse.json({
          success: false,
          error: "Tổng tiền không khớp với giá trị sản phẩm.",
          expected: { subtotal: calculatedSubtotal, total: calculatedTotal },
          received: { subtotal, total }
        }, { status: 400 });
      }
      
      // Kết nối tới MongoDB
      const client = await clientPromise;
      const db = client.db("SamoraDB");
      
      // Kiểm tra tồn kho của sản phẩm trước khi tạo đơn hàng
    //   for (const item of items) {
    //     const productId = item.product._id;
    //     const requestedQuantity = item.quantity;
        
    //     const product = await db.collection("Products").findOne({ _id: new ObjectId(productId) });
        
    //     if (!product) {
    //       return NextResponse.json({
    //         success: false,
    //         error: `Sản phẩm với ID ${productId} không tồn tại.`,
    //       }, { status: 400 });
    //     }
        
    //     if (product.stock < requestedQuantity) {
    //       return NextResponse.json({
    //         success: false,
    //         error: `Sản phẩm ${item.product.name} chỉ còn ${product.stock} trong kho, không đủ số lượng ${requestedQuantity}.`,
    //       }, { status: 400 });
    //     }
    //   }
      
      // Tạo đối tượng đơn hàng mới
      const orderData: OrderData = {
        orderNumber: generateOrderNumber(),
        customerInfo,
        items,
        subtotal,
        shippingFee,
        total,
        paymentMethod,
        paymentStatus: "pending",
        orderStatus: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      // Lưu thông tin khách hàng nếu chưa tồn tại
      const existingCustomer = await db.collection("Customers").findOne({
        $or: [
          { email: customerInfo.email },
          { phone: customerInfo.phone }
        ]
      });
      
      let customerId;
      
      if (existingCustomer) {
        customerId = existingCustomer._id;
        
        // Cập nhật thông tin khách hàng nếu cần
        await db.collection("Customers").updateOne(
          { _id: existingCustomer._id },
          { 
            $set: {
              fullName: customerInfo.fullName,
              address: customerInfo.address,
              city: customerInfo.city,
              district: customerInfo.district,
              ward: customerInfo.ward,
              updatedAt: new Date(),
            }
          }
        );
      } else {
        // Tạo khách hàng mới
        const customerResult = await db.collection("Customers").insertOne({
          fullName: customerInfo.fullName,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address: customerInfo.address,
          city: customerInfo.city,
          district: customerInfo.district,
          ward: customerInfo.ward,
          orders: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        
        customerId = customerResult.insertedId;
      }
      
      // Thêm customerId vào đơn hàng
      orderData.customerId = customerId.toString();
      
      // Sử dụng session để đảm bảo tính nhất quán của dữ liệu
      const session = client.startSession();
      
      let orderId;
      let orderNumber;
      
      try {
        await session.withTransaction(async () => {
          // Lưu đơn hàng vào database
          const result = await db.collection("Orders").insertOne(orderData, { session });
          orderId = result.insertedId;
          orderNumber = orderData.orderNumber;
          
          // Cập nhật danh sách đơn hàng của khách hàng
          await db.collection("Customers").updateOne(
            { _id: new ObjectId(customerId) },
            { $push: { orders: result.insertedId } as any },
            { session }
          );
          
          // Cập nhật số lượng tồn kho của sản phẩm
        //   for (const item of items) {
        //     const updateResult = await db.collection("Products").updateOne(
        //       { _id: new ObjectId(item.product.id), stock: { $gte: item.quantity } },
        //       { $inc: { stock: -item.quantity } },
        //       { session }
        //     );
            
        //     // Nếu không có document nào được cập nhật, có thể là do hết hàng
        //     if (updateResult.modifiedCount === 0) {
        //       throw new Error(`Không thể cập nhật số lượng cho sản phẩm ${item.product.name}. Có thể đã hết hàng.`);
        //     }
        //   }
        });
        
        return NextResponse.json({
          success: true,
          orderId,
          orderNumber,
          message: "Đặt hàng thành công!",
        });
      } catch (error) {
        console.error("Transaction error:", error);
        return NextResponse.json({
          success: false,
          error: "Đã có lỗi xảy ra khi xử lý đơn hàng.",
          details: error instanceof Error ? error.message : "Unknown error",
        }, { status: 500 });
      } finally {
        await session.endSession();
      }
    } catch (error) {
      console.error("Checkout error:", error);
      return NextResponse.json({
        success: false,
        error: "Đã có lỗi xảy ra khi xử lý đơn hàng.",
        details: error instanceof Error ? error.message : "Unknown error",
      }, { status: 500 });
    }
  }

// GET - Lấy thông tin đơn hàng theo orderNumber hoặc id
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderNumber = searchParams.get('orderNumber');
    const orderId = searchParams.get('orderId');
    
    if (!orderNumber && !orderId) {
      return NextResponse.json({
        success: false,
        error: "Yêu cầu cung cấp mã đơn hàng hoặc ID đơn hàng.",
      }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db("SamoraDB");
    
    let query = {};
    
    if (orderNumber) {
      query = { orderNumber };
    } else if (orderId) {
      try {
        query = { _id: new ObjectId(orderId) };
      } catch (e) {
        return NextResponse.json({
          success: false,
          error: "ID đơn hàng không hợp lệ.",
        }, { status: 400 });
      }
    }
    
    const order = await db.collection("Orders").findOne(query);
    
    if (!order) {
      return NextResponse.json({
        success: false,
        error: "Không tìm thấy đơn hàng.",
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      order
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({
      success: false,
      error: "Đã có lỗi xảy ra khi truy vấn đơn hàng.",
      details: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}