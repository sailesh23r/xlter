import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/getSEO";
import SoftDevClient from "./SoftDevClient";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageMetadata("/soft-dev");
  return seo ?? {
    title: "Software Development Services | Xeltr Studio",
    description: "Custom software development by Xeltr Studio. We build scalable, AI-powered applications that drive business growth.",
  };
}

export default function SoftDevPage() {
  return <SoftDevClient />;
}
