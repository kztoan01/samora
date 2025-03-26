"use client";
import { useCart } from "./CartContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  notes: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  district?: string;
  ward?: string;
}
interface Province {
  code: number;
  name: string;
  districts?: District[];
}

interface District {
  code: number;
  name: string;
  wards?: Ward[];
}

interface Ward {
  code: number;
  name: string;
}

const CheckoutPage = () => {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    notes: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Calculate price based on selected price if available, otherwise use first volume price
  const getItemPrice = (item: any) => {
    if (item.product.selectedPrice) {
      return item.product.selectedPrice;
    }
    
    // Fallback to first volume price if available
    if (item.product.volumePrices && item.product.volumePrices.length > 0) {
      const firstVolumePrice = item.product.volumePrices[0];
      return firstVolumePrice.price.discountPrice || firstVolumePrice.price.originalPrice;
    }
    
    return 0;
  };

  const subtotal = cart.reduce(
    (total, item) => total + getItemPrice(item) * item.quantity,
    0
  );

  const shippingFee = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shippingFee;

  useEffect(() => {
    // Redirect to cart if empty
    if (cart.length === 0 && !orderNumber) {
      router.push("/");
    }
  }, [cart, router, orderNumber]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Họ tên không được để trống";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại không được để trống";
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại phải có 10 chữ số";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Địa chỉ không được để trống";
    }

    if (!formData.city.trim()) {
      newErrors.city = "Tỉnh/Thành phố không được để trống";
    }

    if (!formData.district.trim()) {
      newErrors.district = "Quận/Huyện không được để trống";
    }

    if (!formData.ward.trim()) {
      newErrors.ward = "Phường/Xã không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProvinces = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://provinces.open-api.vn/api/p/');
        if (!response.ok) throw new Error('Failed to fetch provinces');
        const data = await response.json();
        setProvinces(data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvinces();
  }, []);

  // Fetch districts when province changes
  useEffect(() => {
    if (!formData.city) {
      setDistricts([]);
      return;
    }

    const fetchDistricts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://provinces.open-api.vn/api/p/${formData.city}?depth=2`);
        if (!response.ok) throw new Error('Failed to fetch districts');
        const data = await response.json();
        setDistricts(data.districts || []);
      } catch (error) {
        console.error('Error fetching districts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDistricts();
  }, [formData.city]);

  // Fetch wards when district changes
  useEffect(() => {
    if (!formData.district) {
      setWards([]);
      return;
    }

    const fetchWards = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://provinces.open-api.vn/api/d/${formData.district}?depth=2`);
        if (!response.ok) throw new Error('Failed to fetch wards');
        const data = await response.json();
        setWards(data.wards || []);
      } catch (error) {
        console.error('Error fetching wards:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWards();
  }, [formData.district]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Logic riêng cho các trường chọn địa điểm lồng nhau
    if (name === 'province') {
      setFormData({
        ...formData,
        city: value,
        district: '',
        ward: ''
      });
    } else if (name === 'district') {
      setFormData({
        ...formData,
        district: value,
        ward: ''
      });
    } else {
      // Logic chung cho các trường khác
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  
    // Clear error when field is edited
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: '',  // Sử dụng chuỗi rỗng thay vì undefined để phù hợp với kiểu FormErrors
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (validate()) {
      setIsProcessing(true);
  
      try {
        // Lấy tên các đơn vị hành chính
        const provinceName = provinces.find(p => p.code.toString() === formData.city)?.name ?? '';
        const districtName = districts.find(d => d.code.toString() === formData.district)?.name ?? '';
        const wardName = wards.find(w => w.code.toString() === formData.ward)?.name ?? '';
        
        // Tạo chuỗi địa chỉ đầy đủ
        const fullAddress = `${formData.address || ''}, ${wardName}, ${districtName}, ${provinceName}`.trim();
        
        // Cập nhật formData với tên địa chỉ thay vì mã
        const updatedFormData = {
          ...formData,
          city: provinceName,                // Thay thế mã bằng tên tỉnh/thành phố
          district: districtName,            // Thay thế mã bằng tên quận/huyện
          ward: wardName,                    // Thay thế mã bằng tên phường/xã
          fullAddress: fullAddress,          // Thêm địa chỉ đầy đủ
          
          // Nếu bạn vẫn cần lưu mã để tham chiếu sau này
          cityCode: formData.city,           // Lưu mã tỉnh/thành phố gốc
          districtCode: formData.district,   // Lưu mã quận/huyện gốc
          wardCode: formData.ward            // Lưu mã phường/xã gốc
        };
        
        // Chuẩn bị dữ liệu đơn hàng để gửi lên server
        const orderData = {
          customerInfo: updatedFormData,     // Sử dụng formData đã cập nhật
          items: cart.map(item => ({
            product: {
              _id: item.product._id,
              name: item.product.name,
              selectedVolume: item.product.selectedVolume,
              selectedPrice: item.product.selectedPrice,
              selectedDiscountPrice: item.product.selectedDiscountPrice,
              images: item.product.images
            },
            quantity: item.quantity
          })),
          subtotal,
          shippingFee,
          total,
          paymentMethod
        };
        
        console.log('Dữ liệu đơn hàng:', orderData);
        console.log('ID sản phẩm đầu tiên:', orderData.items[0].product._id);
        
        // Gọi API để lưu đơn hàng
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });
  
        const result = await response.json();
  
        if (!response.ok) {
          throw new Error(result.error || 'Đã có lỗi xảy ra khi đặt hàng');
        }
  
        // Lưu mã đơn hàng để hiển thị
        setOrderNumber(result.orderNumber);
  
        // Xóa giỏ hàng
        clearCart();
  
        // Chuyển hướng đến trang cảm ơn sau 2 giây
        setTimeout(() => {
          router.push(`/san-pham`);
        }, 2000); // Đã sửa thành 2 giây thay vì 200 giây
      } catch (error) {
        console.error('Lỗi khi đặt hàng:', error);
        alert(`Đã có lỗi xảy ra: ${error instanceof Error ? error.message : 'Không thể xử lý đơn hàng'}`);
      } finally {
        setIsProcessing(false);
      }
    }
  };
  // Hiển thị trang cảm ơn khi đã đặt hàng thành công
  if (orderNumber) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Đặt hàng thành công!</h1>
          <p className="text-gray-600 mb-6">Cảm ơn bạn đã mua hàng tại cửa hàng chúng tôi.</p>
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <p className="text-sm text-gray-600 mb-1">Mã đơn hàng của bạn:</p>
            <p className="text-lg font-semibold text-blue-600">{orderNumber}</p>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            Chúng tôi sẽ sớm liên hệ với bạn để xác nhận đơn hàng.
          </p>
          <button
            onClick={() => router.push('/')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition duration-300"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Thanh Toán</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column - Contact Form */}
        <div className="w-full md:w-3/5 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Thông tin giao hàng</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium mb-1">
                Địa chỉ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.address ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="mb-4">
                <label htmlFor="province" className="block text-sm font-medium mb-1">
                  Tỉnh/Thành phố <span className="text-red-500">*</span>
                </label>
                <select
                  id="province"
                  name="province"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={loading || provinces.length === 0}
                  className={`w-full p-2 border rounded-md ${errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                >
                  <option value="">Chọn Tỉnh/Thành phố</option>
                  {provinces.map(province => (
                    <option key={province.code} value={province.code.toString()}>
                      {province.name}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="district" className="block text-sm font-medium mb-1">
                  Quận/Huyện <span className="text-red-500">*</span>
                </label>
                <select
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  disabled={loading || !formData.city || districts.length === 0}
                  className={`w-full p-2 border rounded-md ${errors.district ? "border-red-500" : "border-gray-300"
                    }`}
                >
                  <option value="">Chọn Quận/Huyện</option>
                  {districts.map(district => (
                    <option key={district.code} value={district.code.toString()}>
                      {district.name}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-red-500 text-xs mt-1">{errors.district}</p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="ward" className="block text-sm font-medium mb-1">
                  Phường/Xã <span className="text-red-500">*</span>
                </label>
                <select
                  id="ward"
                  name="ward"
                  value={formData.ward}
                  onChange={handleChange}
                  disabled={loading || !formData.district || wards.length === 0}
                  className={`w-full p-2 border rounded-md ${errors.ward ? "border-red-500" : "border-gray-300"
                    }`}
                >
                  <option value="">Chọn Phường/Xã</option>
                  {wards.map(ward => (
                    <option key={ward.code} value={ward.code.toString()}>
                      {ward.name}
                    </option>
                  ))}
                </select>
                {errors.ward && (
                  <p className="text-red-500 text-xs mt-1">{errors.ward}</p>
                )}
              </div>
            </div>


            <div className="mb-4">
              <label htmlFor="notes" className="block text-sm font-medium mb-1">
                Ghi chú
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay địa điểm giao hàng chi tiết hơn."
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Phương thức thanh toán
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="COD"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="mr-2"
                  />
                  <label htmlFor="COD" className="text-sm">
                    <span className="font-medium">Thanh toán khi nhận hàng (COD)</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="banking"
                    name="paymentMethod"
                    value="banking"
                    checked={paymentMethod === "banking"}
                    onChange={() => setPaymentMethod("banking")}
                    className="mr-2"
                  />
                  <label htmlFor="banking" className="text-sm">
                    <span className="font-medium">Chuyển khoản ngân hàng</span>
                  </label>
                </div>
              </div>

              {paymentMethod === "banking" && (
                <div className="mt-3 p-3 bg-gray-50 rounded-md text-sm">
                  <p className="font-medium text-gray-700 mb-1">Thông tin chuyển khoản:</p>
                  <p>Ngân hàng: <span className="font-medium">Sacombank</span></p>
                  <p>Số tài khoản: <span className="font-medium">0903924405</span></p>
                  <p>Chủ tài khoản: <span className="font-medium">MAI VAN PHUC</span></p>
                  <p className="mt-2 text-xs text-gray-500">Nội dung chuyển khoản: [Họ tên] - [Số điện thoại]</p>
                </div>
              )}
            </div>

            <div className="mt-8 md:hidden">
              <h3 className="text-lg font-semibold mb-2">Tóm tắt đơn hàng</h3>
              <div className="flex justify-between mb-2">
                <span>Tạm tính:</span>
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subtotal)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Phí vận chuyển:</span>
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(shippingFee)}</span>
              </div>
              <div className="flex justify-between font-bold border-t pt-2 mt-2">
                <span>Tổng cộng:</span>
                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium mt-6 transition duration-300 disabled:bg-blue-400"
            >
              {isProcessing ? "Đang xử lý..." : "Đặt hàng ngay"}
            </button>
          </form>
        </div>

        {/* Right Column - Cart Summary */}
        <div className="w-full md:w-2/5 bg-gray-50 p-6 rounded-lg shadow-md h-min sticky top-4 hidden md:block">
          <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Tóm tắt đơn hàng</h2>

          <div className="max-h-96 overflow-y-auto mb-4">
            {cart.map((item) => (
              <div key={item.product._id} className="flex items-start py-3 border-b">
                <div className="relative">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <span className="absolute -top-2 -right-2 bg-gray-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="text-sm font-medium">{item.product.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(getItemPrice(item))}
                  </p>
                </div>
                <div className="text-sm font-medium">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(getItemPrice(item) * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2">
              <span>Tạm tính:</span>
              <span className="font-medium">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subtotal)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Phí vận chuyển:</span>
              <span className="font-medium">
                {shippingFee === 0
                  ? "Miễn phí"
                  : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(shippingFee)}
              </span>
            </div>
            {shippingFee === 0 && (
              <div className="text-xs text-green-600 italic">
                Miễn phí vận chuyển cho đơn hàng trên
              </div>
            )}
            <div className="flex justify-between py-3 border-t border-b font-bold text-lg">
              <span>Tổng cộng:</span>
              <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</span>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 p-3 rounded-md text-sm">
            <h3 className="font-medium text-blue-800 mb-1">Chính sách giao hàng</h3>
            <p className="text-gray-700">Đơn hàng sẽ được giao trong vòng 2-3 ngày làm việc. Thời gian có thể thay đổi tùy thuộc vào khu vực.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;