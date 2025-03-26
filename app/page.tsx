import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import AboutSection from "./components/AboutUs";
import CategorySection from "./components/Category";
import FooterSection from "./components/Footer";
import HeroSection from "./components/Hero";
import NgocLinhProductCategories from "./components/NgocLinhProductCategories";
import ProductsSection from "./components/Products";
import ReactLenis from "lenis/react";
import SamNgocLinhBanner from "./components/SamNgocLinhBanner";
import RuouLaPage from "./components/RuouLaSam";
import RuouHoaPage from "./components/RuouHoaSam";
import ContactBanner from "./components/ContactBanner";
import CertificateGallery from "./components/CertificateGallery";
import { CategorySkeleton, AboutSkeleton, ContactSkeleton } from "./components/Skeleton";

// Dynamically import components that are not needed immediately
const AboutSectionDynamic = dynamic(() => import('./components/AboutUs'));
const CategorySectionDynamic = dynamic(() => import('./components/Category'));
const ContactBannerDynamic = dynamic(() => import('./components/ContactBanner'));

export default function Home() {
  const certificates = [
    {
      id: "cert-1",
      title: "Giấy chứng nhận quyền sử dụng",
      imageUrl: "/2022.08.16_QD-cap-QSD-Sam-Ngoc-Linh_Cty-TNHH-KTC-Quang-Nam.signed_page-0001.jpg"
    },
    {
      id: "cert-1.1",
      title: "Giấy chứng nhận quyền sử dụng",
      imageUrl: "/2022.08.16_QD-cap-QSD-Sam-Ngoc-Linh_Cty-TNHH-KTC-Quang-Nam.signed_page-0002-566x800.jpg"
    },
    {
      id: "cert-2",
      title: "Giấy phép kinh doanh",
      imageUrl: "/giayphep-kinh-doanh-trang1.jpg"
    },
    {
      id: "cert-2.2",
      title: "Giấy phép kinh doanh",
      imageUrl: "/giayphep-kinh-doanh-trang2-756x800.jpg"
    },
    {
      id: "cert-3",
      title: "Chứng nhận VSATTP",
      imageUrl: "/ATTP.jpeg"
    },    
    {
      id: "cert-4",
      title: "Chỉ dẫn địa lý",
      imageUrl: "/Chung-nhan-cu-Sam-Ngoc-Linh.jpeg"
    },   
     {
      id: "cert-5",
      title: "Giấy phép sản xuất rượu thủ công",
      imageUrl: "/giayphep-san-xuat-ruou.jpg"
    },
    // Thêm các chứng chỉ khác
  ];
  const certificateCategories = [
    {
      id: "cert-1",
      title: "CHẤT LƯỢNG",
      description: "Sâm Ngọc Linh Bảo Ly được lấy từ nguồn gốc sâm của Công ty TNHH KTC Quảng Nam, đây là một đơn vị trồng sâm lớn và chuyên nghiệp tại huyện Nam Trà My, Tỉnh Quảng Nam. Công ty KTC Quảng Nam đã được Sở NNPTNT cấp chỉ dẫn địa lý vườn trồng và đồng thời được sở KHCN Quảng Nam cấp chứng nhận xuất xứ cho củ sâm Ngọc Linh chuẩn Nam Trà My.",
      items: [
        { id: "iso-9001", imageUrl: "/2022.08.16_QD-cap-QSD-Sam-Ngoc-Linh_Cty-TNHH-KTC-Quang-Nam.signed_page-0001.jpg" },
        { id: "iso-14001", imageUrl: "/2022.08.16_QD-cap-QSD-Sam-Ngoc-Linh_Cty-TNHH-KTC-Quang-Nam.signed_page-0002-566x800.jpg" },
      ]
    },
    {
      id: "cert-2",
      title: "GIẤY PHÉP KINH DOANH",
      description: "Giấy chứng nhận đăng ký doanh nghiệp và các giấy phép liên quan",
      items: [
        { id: "food-cert-1", imageUrl: "/giayphep-kinh-doanh-trang1.jpg" },
        { id: "food-cert-2", imageUrl: "/giayphep-kinh-doanh-trang2-756x800.jpg" }
      ]
    },
    {
      id: "cert-3",
      title: "CHỨNG NHẬN VSATTP",
      description: "UBND Tp Tam Kỳ đã cấp chứng nhận Vệ sinh ATTP cho Sâm Ngọc Linh Bảo Ly như đính kèm:",
      items: [
        { id: "business-reg", imageUrl: "/ATTP.jpeg" },
      ]
    }
    ,
    {
      id: "cert-4",
      title: "CHỈ DẪN ĐỊA LÝ",
      description: "Vườn sâm Ngọc linh của Công ty TNHH MTV Bảo Ly được nằm trong vùng sâm gốc của huyện Nam Trà My và đã được công bố chỉ dẫn địa lý như đính kèm.",
      items: [
        { id: "business-reg", imageUrl: "/Chung-nhan-cu-Sam-Ngoc-Linh.jpeg" },
      ]
    }
    ,
    {
      id: "cert-5",
      title: "GIẤY PHÉP SẢN XUẤT RƯỢU THỦ CÔNG",
      description: "",
      items: [
        { id: "business-reg", imageUrl: "/giayphep-san-xuat-ruou.jpg" },
      ]
    }
  ];
  return (
    <div className="font-man">
       <ReactLenis
                root
                options={{
                    // Learn more -> https://github.com/darkroomengineering/lenis?tab=readme-ov-file#instance-settings
                    lerp: 0.1,
                    //  infinite: true,
                    //    syncTouch: true,
                }}
            >
    <HeroSection/>
    <NgocLinhProductCategories/>
    <SamNgocLinhBanner/>
    
        <RuouLaPage/>
        <RuouHoaPage/>
        <ProductsSection/> 
    
    <div id="chung-chi">
      <CertificateGallery 
        categories={certificateCategories} 
        title="Chứng nhận chất lượng" 
        subtitle="Các giấy tờ pháp lý và chứng nhận của sản phẩm Sâm Ngọc Linh" 
      />
    </div>
    <Suspense fallback={<CategorySkeleton />}>
        <CategorySectionDynamic />
    </Suspense>
    <Suspense fallback={<AboutSkeleton />}>
        <AboutSectionDynamic />
    </Suspense>
    <Suspense fallback={<ContactSkeleton />}>
        <ContactBannerDynamic />
    </Suspense>
    <FooterSection/>
    </ReactLenis>
    </div>
  );
}
