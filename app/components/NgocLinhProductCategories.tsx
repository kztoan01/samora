"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryProps {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  href: string;
}

const CategoryCard: React.FC<CategoryProps> = ({
  title,
  description,
  price,
  imageUrl,
  href,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-xl border-b-4 border-blue-500">
      <Link href={href}>
        <div className="h-64 sm:h-72 md:h-80 lg:h-[30rem] w-full overflow-hidden">
          <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-110">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJpgZzRPQAAAABJRU5ErkJggg=="
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </div>
        <div className="p-6">
          <h3 className="mb-2 text-lg md:text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-700 md:text-base text-sm font-medium">{description}</p>
          {price && (
            <p className="mt-2 text-base md:text-lg font-semibold text-red-600">{price}</p>
          )}
          <div className="mt-4 flex items-center text-blue-500 font-semibold">
            <span>Xem thêm</span>
            <svg className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
};

const NgocLinhProductCategories: React.FC = () => {
  const categories: CategoryProps[] = [
    {
      title: "Củ Sâm Ngọc Linh",
      description: "Củ sâm Ngọc Linh tự nhiên với hàm lượng saponin cao, phát triển từ vùng núi Ngọc Linh. Giá trị dược liệu cao, tính theo ký.",
      price: "Giá: Từ 80.000.000đ/ký - 200.000.000đ/ký (Tuỳ thuộc vào tuổi đời Củ Sâm Ngọc Linh)",
      imageUrl: "/1.jpg",
      href: "/cu-sam-ngoc-linh",
    },
    {
      title: "Lá Sâm Ngọc Linh",
      description: "Lá sâm Ngọc Linh chứa nhiều dược chất quý, thu hái từ cây sâm tự nhiên, giúp tăng cường sức khỏe và hỗ trợ điều trị nhiều bệnh. Tính theo ký.",
      price: "Giá: 15.000.000đ/ký",
      imageUrl: "/lasam/7.jpg",
      href: "/la-sam-ngoc-linh",
    },
    {
      title: "Hoa Sâm Ngọc Linh",
      description: "Hoa sâm Ngọc Linh quý hiếm với đặc tính dược liệu cao, thu hoạch theo mùa. Thích hợp làm trà hoặc ngâm rượu. Tính theo ký.",
      price: "",
      imageUrl: "/4.jpg",
      href: "/hoa-sam-ngoc-linh",
    },
    {
      title: "Hạt Sâm Ngọc Linh",
      description: "Hạt sâm Ngọc Linh quý giá dùng để gieo trồng hoặc làm thuốc, chứa nhiều dược chất có lợi cho sức khỏe. Cung cấp giống sâm chất lượng cao.",
      price: "Giá: Từ 100.000đ/hạt",
      imageUrl: "/hatsam.jpg",
      href: "/hat-sam-ngoc-linh",
    },
  ];

  return (
    <section className="mx-auto max-w-8xl px-4 pb-8 pt-16 bg-blue-50 max-md:mt-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <span className="relative">
            Sâm Ngọc Linh Bảo Ly
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-blue-500"></span>
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-gray-800">
          Tinh hoa từ loài sâm quý hiếm bậc nhất Việt Nam, được chế biến theo bí quyết gia truyền.
        </p>
      </div>
      
      <div className="mt-16 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-6">
        {categories.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      </div>
      
      <div className="mt-6 text-center">
      <Link href="/san-pham/ruou-hoa-sam-ngoc-linh" className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 md:px-6 md:py-3 text-xs md:text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Xem tất cả sản phẩm
          <svg className="ml-3 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default NgocLinhProductCategories;