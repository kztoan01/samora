
import ProductList from '@/app/components/ProductList';
import CategoryNav from '@/app/components/CategoryNav';
import { notFound } from 'next/navigation';
import { Category, getAllCategories, getProductsByCategory } from '@/app/components/api';
import Nav from '@/app/components/Nav';
import FooterSection from '@/app/components/Footer';
import HeaderSection from '@/app/components/Header';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

// Tạo metadata động dựa trên tên thể loại
export async function generateMetadata({ params }: CategoryPageProps) {
  const categories = await getAllCategories();
  const category = categories.find(c => c.slug === params.category);

  if (!category) {
    return {
      title: 'Thể loại không tồn tại',
    };
  }

  return {
    title: `Sản phẩm ${category.name}`,
  };
}

// Generate các đường dẫn tĩnh khi build
export async function generateStaticParams() {
  const categories = await getAllCategories();

  return categories.map(category => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
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
    <>  <HeaderSection/>
      <div className="h-full w-full max-w-8xl mx-auto p-1 md:p-4 mt-1 bg-white">
    
        <Nav />

        {/* Banner */}
        <div className="bg-green-100 flex flex-col items-center sm:items-start justify-center h-auto sm:h-[16rem] mb-4 text-black px-6 sm:px-16 py-8 sm:py-16 rounded-xl overflow-hidden relative text-center sm:text-left">
          <h1 className="text-xl sm:text-3xl font-semibold mb-4 mt-4 sm:mt-9">
            {currentCategory.name}
          </h1>
          <p className="text-sm sm:text-base text-zinc-800 max-w-xl">
            Trải nghiệm những sản phẩm chất lượng cao từ Sâm Ngọc Linh,
            được tuyển chọn kỹ lưỡng để mang đến sức khỏe tối ưu cho bạn và gia đình.
          </p>
        </div>

        {/* Navigation categories */}
        <CategoryNav
          categories={categories}
          currentCategory={category}
        />

        {/* Product list */}
        <div className="relative rounded-xl overflow-hidden">
          {products.length > 0 ? (
            <ProductList isChebien={false} products={products} />
          ) : (
            <p className="text-center py-12 text-gray-500">
              Không có sản phẩm nào trong thể loại này.
            </p>
          )}
        </div>
      </div>
      <FooterSection />
    </>
  );
}