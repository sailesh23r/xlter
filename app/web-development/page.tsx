import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/getSEO";
import WebDevClient from "./WebDevClient";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageMetadata("/web-development");
  return seo ?? {
    title: "Web Development Services | Xeltr Studio",
    description: "Cutting-edge web development by Xeltr Studio. We build fast, modern, and scalable websites and web applications powered by Next.js.",
  };
}

export default function WebDevelopmentPage() {
  return <WebDevClient />;
}
