"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/NavBar";
import WhatsAppButton from "@/Components/Contact/WhatsAppButton";
import PreFooterCTA from "@/Components/PreFooterCTA";
import Footer from "@/Components/Footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/xlter-admin");

  if (isAdmin) {
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <WhatsAppButton />
      <main className="flex-grow">{children}</main>
      <PreFooterCTA />
      <Footer />
    </>
  );
}
