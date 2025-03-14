"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

const CategoryCard: React.FC<CategoryProps> = ({
  title,
  description,
  imageUrl,
  href,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg">
      <Link href={href}>
        <div className="h-[35rem] w-full overflow-hidden">
          <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-110">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJpgZzRPQAAAABJRU5ErkJggg=="
            />
          </div>
        </div>
        <div className="p-6">
          <h3 className="mb-2 text-xl font-bold text-gray-900">{title}</h3>
          <p className="text-gray-600">{description}</p>
          <div className="mt-4 flex items-center text-blue-700">
            <span className="font-medium">Xem chi tiết</span>
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
      title: "Rượu Sâm Ngọc Linh Platinum",
      description: "Rượu sâm được ngâm theo phương pháp truyền thống, giữ nguyên dược tính của sâm quý hiếm.",
      imageUrl: "/plat2.png",
      href: "/san-pham/ruou-sam-ngoc-linh",
    },
    {
      title: "Rượu Sâm Ngọc Linh Gold",
      description: "Sản phẩm cao cấp với hàm lượng sâm dược liệu cao, thích hợp làm quà biếu.",
      imageUrl: "/gold.png",
      href: "/san-pham/ruou-sam-ngoc-linh",
    },
    {
      title: "Rượu Lá Sâm Ngọc Linh",
      description: "Phối trộn đặc biệt với các thảo dược quý hiếm từ vùng Trường Sơn.",
      imageUrl: "/caycu.png",
      href: "/san-pham/ruou-la-sam-ngoc-linh",
    },
    {
      title: "Bộ Sưu Tập Giới Hạn",
      description: "Phiên bản giới hạn với thiết kế bình đặc biệt và sâm Ngọc Linh trên 10 năm tuổi.",
      imageUrl: "/yen.png",
      href: "/san-pham/che-bien",
    },
  ];

  return (
    <section className="mx-auto max-w-8xl px-4 py-16">
      <div className="text-center">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Rượu Sâm Ngọc Linh Bảo Ly
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg text-gray-500">
          Tinh hoa từ loài sâm quý hiếm bậc nhất Việt Nam, được chế biến theo bí quyết gia truyền.
        </p>
      </div>
      
      <div className="mt-16 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-4">
        {categories.map((category, index) => (
          <CategoryCard key={index} {...category} />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Link href="/san-pham" className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
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