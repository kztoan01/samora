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
  title: "Sâm Ngọc Linh Bảo Ly - Thảo Dược Quý Cho Sức Khỏe",
  description:
    "Sâm Ngọc Linh Bảo Ly chuyên cung cấp các sản phẩm sâm Ngọc Linh chất lượng cao, hỗ trợ sức khỏe và tăng cường đề kháng. Cam kết 100% sản phẩm thiên nhiên, đạt chuẩn chất lượng.",
  applicationName: "Sâm Ngọc Linh Bảo Ly",
  authors: [{ name: "Bảo Ly", url: "https://www.samngoclinhbaoly.vn" }],
  keywords: [
    "Sâm Ngọc Linh",
    "Sâm Bảo Ly",
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
  creator: "Bảo Ly Team",
  publisher: "Sâm Ngọc Linh Bảo Ly",
  openGraph: {
    title: "Sâm Ngọc Linh Bảo Ly - Thảo Dược Quý Cho Sức Khỏe",
    description:
      "Cung cấp sâm Ngọc Linh chất lượng cao, 100% thiên nhiên, hỗ trợ sức khỏe và tăng cường đề kháng. Đảm bảo nguồn gốc xuất xứ rõ ràng, đạt chuẩn chất lượng.",
    url: "https://www.samngoclinhbaoly.vn",
    siteName: "Sâm Ngọc Linh Bảo Ly",
    images: [
      {
        url: "/gold3.png",
        width: 1200,
        height: 630,
        alt: "Sâm Ngọc Linh Bảo Ly - Thảo Dược Quý",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@SamBaoLy",
    title: "Sâm Ngọc Linh Bảo Ly - Thảo Dược Quý Cho Sức Khỏe",
    description:
      "Sâm Ngọc Linh Bảo Ly cam kết cung cấp sản phẩm sâm Ngọc Linh chất lượng cao, giúp bồi bổ sức khỏe và tăng cường miễn dịch.",
    images: [
      {
        url: "/gold3.png",
        alt: "Sâm Ngọc Linh Bảo Ly - Thảo Dược Quý",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
