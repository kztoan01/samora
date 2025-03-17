
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
export default function Home() {
  const certificates = [
    {
      id: "cert-1",
      title: "Giấy chứng nhận quyền sử dụng",
      imageUrl: "/2022.08.16_QD-cap-QSD-Sam-Ngoc-Linh_Cty-TNHH-KTC-Quang-Nam.signed_page-0001.jpg"
    },
    {
      id: "cert-2",
      title: "Giấy phép kinh doanh",
      imageUrl: "/giayphep-kinh-doanh-trang1.jpg"
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
    <CertificateGallery 
        certificates={certificates} 
        title="Chứng nhận chất lượng" 
        subtitle="Các giấy tờ pháp lý và chứng nhận của sản phẩm Sâm Ngọc Linh" 
      />
    <CategorySection/>
    <AboutSection/>
    <ContactBanner/>
    <FooterSection/>
    </ReactLenis>
    </div>
  );
}
