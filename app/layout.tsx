import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "./components/CartContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Samora - Thảo Dược Quý Cho Sức Khỏe",
  description:
    "Samora chuyên cung cấp các sản phẩm sâm Ngọc Linh chất lượng cao, hỗ trợ sức khỏe và tăng cường đề kháng. Cam kết 100% sản phẩm thiên nhiên, đạt chuẩn chất lượng.",
  applicationName: "Samora",
  authors: [{ name: "Samora", url: "https://www.samngoclinhbaoly.vn" }],
  keywords: [
    "Sâm Ngọc Linh",
    "Sâm Samora",
    "Thảo dược quý",
    "Sâm Việt Nam",
    "Sâm Ngọc Linh nguyên chất",
    "Công dụng sâm Ngọc Linh",
    "Sâm Ngọc Linh chính hãng",
    "Tăng cường sức khỏe",
    "Sâm Ngọc Linh hỗ trợ miễn dịch",
  ],
  themeColor: "#A67C52",
  colorScheme: "light",
  creator: "Samora Team",
  publisher: "Samora",
  openGraph: {
    title: "Samora - Thảo Dược Quý Cho Sức Khỏe",
    description:
      "Cung cấp sâm Ngọc Linh chất lượng cao, 100% thiên nhiên, hỗ trợ sức khỏe và tăng cường đề kháng. Đảm bảo nguồn gốc xuất xứ rõ ràng, đạt chuẩn chất lượng.",
    url: "https://www.samngoclinhbaoly.vn",
    siteName: "Samora",
    images: [
      {
        url: "https://www.samngoclinhbaoly.vn/Thiết kế chưa có tên (2).png",
        width: 1200,
        height: 630,
        alt: "Samora - Thảo Dược Quý",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@SamBaoLy",
    title: "Samora - Thảo Dược Quý Cho Sức Khỏe",
    description:
      "Samora cam kết cung cấp sản phẩm sâm Ngọc Linh chất lượng cao, giúp bồi bổ sức khỏe và tăng cường miễn dịch.",
    images: [
      {
        url: "https://www.samngoclinhbaoly.vn/Thiết kế chưa có tên (2).png",
        alt: "Samora - Thảo Dược Quý",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "https://www.samngoclinhbaoly.vn/logo.png",
    apple: "https://www.samngoclinhbaoly.vn/logo.png",
  },
  verification: {
    google: "c9lj3WseNZ1hfM78XO7hH34kuUuRIPoulKQi_k87GjI",
  },
  other: {
    "apple-mobile-web-app-title": "Samora",
    "application-name": "Samora",
    "google-site-verification": "c9lj3WseNZ1hfM78XO7hH34kuUuRIPoulKQi_k87GjI"
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
