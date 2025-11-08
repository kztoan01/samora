import AboutSection from "../components/AboutUs";
import ContactPage from "../components/Contact";
import FooterSection from "../components/Footer";
import ImageGallery from "../components/ImageGallery";
import IntroSection from "../components/Introduction";
import Nav from "../components/Nav";
import ShopSection from "../components/Shop";

export default function CuSam() {
  const galleryImages = Array.from({ length: 22 }, (_, index) => ({
    id: (index + 1).toString(),
    src: `/cusam/${index + 1}.jpg`,
    alt: 'Củ Sâm Ngọc Linh',
    width: 1200 + index * 100, // Tuỳ chỉnh kích thước nếu cần
    height: 800 + index * 50
  }));
  return (
    <div className="font-man">
      <div className="relative mb-1 px-3">
        <Nav />
      </div>
      <div className="container mx-auto px-4 py-24">
        <h1 className="md:text-3xl text-xl font-bold mb-6">Củ Sâm Ngọc Linh - Samora</h1>
        <ImageGallery images={galleryImages} />
      </div>
      <FooterSection />
    </div>
  );
}
