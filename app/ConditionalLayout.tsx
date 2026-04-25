"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/NavBar";
import WhatsAppButton from "@/Components/Contact/WhatsAppButton";
import PreFooterCTA from "@/Components/PreFooterCTA";
import Breadcrumbs from "@/Components/Breadcrumbs";
import Footer from "@/Components/Footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/xeltr-admin");

  if (isAdmin) {
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <WhatsAppButton />
      <main className="flex-grow">
        <Breadcrumbs />
        {children}
      </main>
      <PreFooterCTA />
      <Footer />
    </div>
  );
}
