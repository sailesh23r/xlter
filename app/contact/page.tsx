import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/getSEO";
import ContactClient from "./ContactClient";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageMetadata("/contact");
  return seo ?? {
    title: "Contact Us | Xeltr Studio",
    description: "Get in touch with Xeltr Studio. Let's build something amazing together. Reach us via email, phone, or WhatsApp.",
  };
}

export default function ContactPage() {
  return <ContactClient />;
}
