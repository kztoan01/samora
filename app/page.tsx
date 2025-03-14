
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
export default function Home() {
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
    <CategorySection/>
    <AboutSection/>
    <ContactBanner/>
    <FooterSection/>
    </ReactLenis>
    </div>
  );
}
