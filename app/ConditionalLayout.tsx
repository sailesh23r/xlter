"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/NavBar";
import WhatsAppButton from "@/Components/Contact/WhatsAppButton";
import PreFooterCTA from "@/Components/PreFooterCTA";
import Breadcrumbs from "@/Components/Breadcrumbs";
import Footer from "@/Components/Footer";
import SmoothScroll from "@/Components/Animations/SmoothScroll";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/xeltr-admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <div className="flex flex-col min-h-screen">
      <Navbar />
      <WhatsAppButton />
      <main className="relative w-full overflow-x-clip">
        <Breadcrumbs />
        {children}
      </main>
      <PreFooterCTA />
      <Footer />
    </div>
    </SmoothScroll>
  );
}
