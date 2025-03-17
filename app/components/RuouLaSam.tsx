import ProductList from '@/app/components/ProductList';
import CategoryNav from '@/app/components/CategoryNav';
import { notFound } from 'next/navigation';
import { Category, getAllCategories, getProductBySlug, getProductsByCategory } from '@/app/components/api';
import Nav from '@/app/components/Nav';
import FooterSection from '@/app/components/Footer';
import Link from 'next/link';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default async function RuouLaPage() {
  const productSlugs = [
    "platinium-700ml", //Phân Khúc Plat
    "ruou-sam-ngoc-linh-platinium-500ml", //Phân Khúc Plat
    
    "ruou-sam-ngoc-linh-gold-500ml", //Phân Khúc Gold
    "gold-500ml", //Phân Khúc Gold
    "ruou-hong-dao-sam-ngoc-linh-500ml", //Phân Khúc Hồng Đào
    "ruou-hong-dao-sam-ngoc-linh-500ml-chai-thuy-tinh", //Phân Khúc Hồng Đào
    "ruou-la-sam-ngoc-linh-500-ml-binh-thuy-tinh", //Phân Khúc Lá
    "ruou-la-sam-ngoc-linh-500-ml-binh-tru-tron" //Phân Khúc Lá
  ];

  const products = await Promise.all(
    productSlugs.map(slug => getProductBySlug(slug))
  );

  // Lọc ra các sản phẩm hợp lệ (tránh null nếu có lỗi)
  const validProducts = products.filter(product => product !== null);

  console.log(validProducts);
  return (
    <>
      <div className="h-full w-full max-w-8xl mx-auto p-1 md:p-4 mt-1 bg-gradient-to-b from-amber-50 to-amber-100 border-b border-amber-200">


        {/* Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-50 flex items-center justify-center text-black p-6 md:p-8 rounded-xl overflow-hidden relative mb-8 shadow-sm">
          {/* Trang trí lá bên trái */}
          <div className="absolute left-0 top-0 opacity-30">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20,20 Q40,5 60,40 T100,60" stroke="#2C5F2D" strokeWidth="2" fill="none"/>
              <path d="M25,30 Q50,10 65,45 T95,70" stroke="#2C5F2D" strokeWidth="2" fill="#97BC62FF" fillOpacity="0.3"/>
              <path d="M30,25 Q60,15 70,50 T90,65" stroke="#2C5F2D" strokeWidth="2" fill="#97BC62FF" fillOpacity="0.3"/>
            </svg>
          </div>
          
          {/* Trang trí lá bên phải */}
          <div className="absolute right-0 bottom-0 opacity-30 transform rotate-180">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20,20 Q40,5 60,40 T100,60" stroke="#2C5F2D" strokeWidth="2" fill="none"/>
              <path d="M25,30 Q50,10 65,45 T95,70" stroke="#2C5F2D" strokeWidth="2" fill="#97BC62FF" fillOpacity="0.3"/>
              <path d="M30,25 Q60,15 70,50 T90,65" stroke="#2C5F2D" strokeWidth="2" fill="#97BC62FF" fillOpacity="0.3"/>
            </svg>
          </div>
          
          <div className="text-center z-10">
            <h1 className="text-xl md:text-3xl font-semibold text-blue-800 mb-2">Các Sản Phẩm Từ Sâm Ngọc Linh</h1>
            <p className="text-sm md:text-base text-blue-700 max-w-2xl">
              Tinh hoa từ sâm Ngọc Linh, được chế biến theo công thức truyền thống kết hợp với công nghệ hiện đại
            </p>
          </div>
        </div>


        {/* Product list */}
        <div className="relative rounded-xl overflow-hidden bg-white p-4 shadow-sm">
          {validProducts.length > 0 ? (
            <ProductList isChebien={false} products={validProducts} />
          ) : (
            <p className="text-center py-12 text-gray-500">
              Không có sản phẩm nào trong thể loại này.
            </p>
          )}
        </div>
        <div className="mt-12 text-center pb-8">
        <Link href="/san-pham/ruou-hoa-sam-ngoc-linh" className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 md:px-6 md:py-3 text-xs md:text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Xem thêm sản phẩm
          <svg className="ml-3 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
        </div>
      </div>

    </>
  );
}