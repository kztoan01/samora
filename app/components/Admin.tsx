// app/admin/orders/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import axios from "axios";

// Types
interface ProductItem {
  id: string;
  name: string;
  selectedVolume?: string;
  selectedPrice: number;
  selectedDiscountPrice?: number;
  quantity: number;
  images: string[];
}

interface CartItem {
  product: ProductItem;
  quantity: number;
}

interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  notes?: string;
  fullAddress: string;
  cityCode: string;
  districtCode: string;
  wardCode: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  customerId: string;
  customerInfo: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed";
  orderStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

const OrdersPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  // State
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>(
    searchParams.get("status") || "all"
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get("q") || ""
  );
  const [adminNotes, setAdminNotes] = useState<string>("");
  const [orderStatusUpdate, setOrderStatusUpdate] = useState<string>("");
  const [paymentStatusUpdate, setPaymentStatusUpdate] = useState<string>("");
  
  // Constants
  const PAGE_SIZE = 10;
  
  // Fetch orders
  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter, searchQuery]);
  
  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams();
      params.append("page", currentPage.toString());
      params.append("limit", PAGE_SIZE.toString());
      
      if (statusFilter !== "all") {
        params.append("status", statusFilter);
      }
      
      if (searchQuery) {
        params.append("search", searchQuery);
      }
      
      const response = await axios.get(`${API_BASE_URL}/admin/orders`, {
        params: params
      });
      
      const data = response.data;
      
      if (data.success) {
        setOrders(data.orders);
        setTotalPages(Math.ceil(data.total / PAGE_SIZE));
      } else {
        setError(data.error || "Failed to fetch orders");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || err.message || "Failed to fetch orders");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Handle order status update
  const handleUpdateOrder = async () => {
    if (!selectedOrder) return;
    
    try {
      const updateData = {
        orderId: selectedOrder._id,
        updates: {
          ...(orderStatusUpdate && orderStatusUpdate !== selectedOrder.orderStatus
            ? { orderStatus: orderStatusUpdate }
            : {}),
          ...(paymentStatusUpdate && paymentStatusUpdate !== selectedOrder.paymentStatus
            ? { paymentStatus: paymentStatusUpdate }
            : {}),
          ...(adminNotes ? { adminNotes } : {}),
        },
      };
      
      // Only send request if there are updates
      if (Object.keys(updateData.updates).length === 0) {
        setIsModalOpen(false);
        return;
      }
      
      const response = await axios.post(`${API_BASE_URL}/admin/orders/update`, updateData, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      const data = response.data;
      
      if (data.success) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === selectedOrder._id
              ? {
                  ...order,
                  ...updateData,
                  updatedAt: new Date().toISOString(),
                }
              : order
          )
        );
        fetchOrders();
        setIsModalOpen(false);
        setSelectedOrder(null);
        setAdminNotes("");
        setOrderStatusUpdate("");
        setPaymentStatusUpdate("");
      } else {
        setError(data.error || "Failed to update order");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || err.message || "Failed to update order");
      } else {
        setError("An unknown error occurred");
      }
    }
  };
  
  // Open order detail modal
  const openOrderModal = (order: Order) => {
    setSelectedOrder(order);
    setAdminNotes(order.adminNotes || "");
    setOrderStatusUpdate(order.orderStatus);
    setPaymentStatusUpdate(order.paymentStatus);
    setIsModalOpen(true);
  };
  
  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    
    // Update URL with search params
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (statusFilter !== "all") params.set("status", statusFilter);
    
    router.push(`/admin/orders?${params.toString()}`);
  };
  
  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: vi });
    } catch {
      return dateString;
    }
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
        <Link
          href="/admin/dashboard"
          className="px-4 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200"
        >
          Quay lại Dashboard
        </Link>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                placeholder="Tìm theo mã đơn, tên khách hàng, SĐT..."
                className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Tìm kiếm
              </button>
            </form>
          </div>
          
          <div className="w-full md:w-64">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">Chờ xử lý</option>
              <option value="processing">Đang xử lý</option>
              <option value="shipped">Đã giao vận chuyển</option>
              <option value="delivered">Đã giao hàng</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tổng tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái thanh toán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày tạo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                      <span className="ml-2">Đang tải...</span>
                    </div>
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    Không tìm thấy đơn hàng nào
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => openOrderModal(order)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.orderNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.customerInfo.fullName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.customerInfo.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatCurrency(order.total)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus === "pending"
                          ? "Chờ xử lý"
                          : order.orderStatus === "processing"
                          ? "Đang xử lý"
                          : order.orderStatus === "shipped"
                          ? "Đã giao vận chuyển"
                          : order.orderStatus === "delivered"
                          ? "Đã giao hàng"
                          : order.orderStatus === "cancelled"
                          ? "Đã hủy"
                          : order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          order.paymentStatus
                        )}`}
                      >
                        {order.paymentStatus === "pending"
                          ? "Chưa thanh toán"
                          : order.paymentStatus === "paid"
                          ? "Đã thanh toán"
                          : order.paymentStatus === "failed"
                          ? "Thanh toán thất bại"
                          : order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openOrderModal(order);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Chi tiết
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Trước
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 border rounded-md ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      )}
      
      {/* Order Detail Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                Chi tiết đơn hàng: {selectedOrder.orderNumber}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Thông tin đơn hàng</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="mb-2">
                    <span className="font-medium">Mã đơn hàng:</span>{" "}
                    {selectedOrder.orderNumber}
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">Ngày đặt hàng:</span>{" "}
                    {formatDate(selectedOrder.createdAt)}
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">Cập nhật lần cuối:</span>{" "}
                    {formatDate(selectedOrder.updatedAt)}
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">Phương thức thanh toán:</span>{" "}
                    {selectedOrder.paymentMethod === "COD"
                      ? "Thanh toán khi nhận hàng"
                      : selectedOrder.paymentMethod}
                  </div>
                  
                  <div className="mt-4">
                    <div className="font-medium mb-2">Trạng thái đơn hàng:</div>
                    <select
                      value={orderStatusUpdate}
                      onChange={(e) => setOrderStatusUpdate(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Chờ xử lý</option>
                      <option value="processing">Đang xử lý</option>
                      <option value="shipped">Đã giao vận chuyển</option>
                      <option value="delivered">Đã giao hàng</option>
                      <option value="cancelled">Đã hủy</option>
                    </select>
                  </div>
                  
                  <div className="mt-4">
                    <div className="font-medium mb-2">Trạng thái thanh toán:</div>
                    <select
                      value={paymentStatusUpdate}
                      onChange={(e) => setPaymentStatusUpdate(e.target.value)}
                      className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Chưa thanh toán</option>
                      <option value="paid">Đã thanh toán</option>
                      <option value="failed">Thanh toán thất bại</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Customer Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Thông tin khách hàng</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="mb-2">
                    <span className="font-medium">Họ tên:</span>{" "}
                    {selectedOrder.customerInfo.fullName}
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">Email:</span>{" "}
                    {selectedOrder.customerInfo.email}
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">Số điện thoại:</span>{" "}
                    {selectedOrder.customerInfo.phone}
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">Địa chỉ:</span>{" "}
                    {selectedOrder.customerInfo.address}
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">Tỉnh/Thành phố:</span>{" "}
                    {selectedOrder.customerInfo.city}
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">Quận/Huyện:</span>{" "}
                    {selectedOrder.customerInfo.district}
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">Phường/Xã:</span>{" "}
                    {selectedOrder.customerInfo.ward}
                  </div>
                  <div className="mb-2">
                    <span className="font-medium">Địa chỉ đầy đủ:</span>{" "}
                    {selectedOrder.customerInfo.fullAddress}
                  </div>
                  {selectedOrder.customerInfo.notes && (
                    <div>
                      <span className="font-medium">Ghi chú khách hàng:</span>{" "}
                      {selectedOrder.customerInfo.notes}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Sản phẩm đặt hàng</h3>
              <div className="bg-gray-50 rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sản phẩm
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Giá
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Số lượng
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thành tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {item.product.images && item.product.images[0] && (
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="h-10 w-10 rounded-md object-cover mr-3"
                              />
                            )}
                            <div className="text-sm font-medium text-gray-900">
                              {item.product.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(item.product.selectedPrice)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.quantity} x {formatCurrency(item.product.selectedPrice)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {formatCurrency(item.product.selectedPrice * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-6 py-3 text-right font-medium">
                        Tạm tính:
                      </td>
                      <td className="px-6 py-3 font-medium">
                        {formatCurrency(selectedOrder.subtotal)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-6 py-3 text-right font-medium">
                        Phí vận chuyển:
                      </td>
                      <td className="px-6 py-3 font-medium">
                        {formatCurrency(selectedOrder.shippingFee)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-6 py-3 text-right font-bold">
                        Tổng cộng:
                      </td>
                      <td className="px-6 py-3 font-bold">
                        {formatCurrency(selectedOrder.total)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            
            {/* Admin Notes */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Ghi chú của Admin</h3>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Thêm ghi chú về đơn hàng này..."
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
              ></textarea>
            </div>
            
            {/* Actions */}
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleUpdateOrder}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Cập nhật đơn hàng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;