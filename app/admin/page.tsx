import { Suspense } from "react";
import OrdersPage from "../components/Admin";
import FooterSection from "../components/Footer";
import Nav from "../components/Nav";


export default function Home() {
  return (
    <div className="font-man">
      <div className="relative mb-1 px-3">
        <Nav />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
      <OrdersPage />
      </Suspense>
      <FooterSection />
    </div>
  );
}
