"use client"
import React from 'react';

const SamNgocLinhBanner = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between bg-blue-50 p-6 mx-4 mb-16 md:p-12 rounded-lg shadow-lg overflow-hidden">
      {/* Tạo hiệu ứng nền */}
      <div className="absolute inset-0 bg-blue-100 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-50"></div>
      </div>
      
      {/* Nội dung bên trái */}
      <div className="relative z-10 w-full md:w-1/2 text-white mb-6 md:mb-0">
        <h2 className="text-3xl text-black md:text-4xl font-bold mb-2">“Sâm Ngọc Linh thật 100% từ núi Ngọc Linh Quảng Nam”</h2>
        <p className="text-base text-black md:text-lg mb-6">
          Tinh hoa từ thiên nhiên, bảo vật quý giá mang đến sức khỏe và sinh lực dồi dào. 
          Được nuôi trồng tại độ cao 1.200-2.000m so với mực nước biển.
        </p>
      </div>
      
      {/* Hình ảnh bên phải */}
      <div className="relative z-10 w-full md:w-1/2 flex justify-center md:justify-end">
        <div className="relative w-72 h-72">
          {/* Bình rượu sâm thứ nhất */}
          <div className="absolute right-56 md:right-64 lg:right-96 bottom-64 w-48 h-56">
            <div className="relative w-[38rem] h-[38rem]">
              <img 
                src="/qb12.png" 
                alt="Bình rượu sâm Ngọc Linh" 
                className="object-contain w-full h-full"
              />
            </div>
          </div>
          

        </div>
      </div>
      
      {/* Trang trí phụ */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-200"></div>
    </div>
  );
};

export default SamNgocLinhBanner;