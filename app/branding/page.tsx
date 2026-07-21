import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/getSEO";
import BrandingClient from "./BrandingClient";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageMetadata("/branding");
  return seo ?? {
    title: "Branding Services | Xeltr Studio",
    description: "Build a powerful brand identity with Xeltr Studio. We craft strategic, memorable brand experiences that resonate with your audience.",
  };
}

export default function BrandingPage() {
  return <BrandingClient />;
}
