
import ProductList from '@/app/components/ProductList';
import CategoryNav from '@/app/components/CategoryNav';
import { notFound } from 'next/navigation';
import { Category, getAllCategories, getProductsByCategory } from '@/app/components/api';
import Nav from '@/app/components/Nav';
import FooterSection from '@/app/components/Footer';
import Link from 'next/link';

interface CategoryPageProps {
  params: {
    category: string;
  };
}



export default async function RuouLaPage() {
  const  category  = "ruou-la-sam-ngoc-linh";
  const categories = await getAllCategories();

  // Kiểm tra nếu thể loại tồn tại
  const categoryExists = categories.some(c => c.slug === category);
  if (!categoryExists) {
    notFound();
  }

  // Lấy thông tin thể loại hiện tại
  const currentCategory = categories.find(c => c.slug === category) as Category;
  console.log(currentCategory)
  // Fetch sản phẩm theo thể loại
  const products = await getProductsByCategory(currentCategory.name);
  console.log(products)
  return (
    <>
      <div className="h-full w-full max-w-8xl mx-auto p-1 md:p-4 mt-1 bg-white">
    

        {/* Banner */}
        <div
                className="bg-blue-50 flex items-center justify-center text-black p-4 md:p-6 rounded-xl overflow-hidden relative"
            >
                <div className="text-center text-sm md:text-base font-normal">
                    <span>Rượu Lá Sâm Ngọc Linh</span>
                </div>
            </div>

        {/* Product list */}
        <div className="relative rounded-xl overflow-hidden">
          {products.length > 0 ? (
            <ProductList products={products} />
          ) : (
            <p className="text-center py-12 text-gray-500">
              Không có sản phẩm nào trong thể loại này.
            </p>
          )}
        </div>
        <div className="mt-12 text-center">
        <Link href="/san-pham/ruou-la-sam-ngoc-linh" className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
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