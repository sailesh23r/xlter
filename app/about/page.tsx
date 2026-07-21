import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/getSEO";
import AboutClient from "./AboutClient";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageMetadata("/about");
  return seo ?? {
    title: "About Us | Xeltr Studio",
    description: "Learn about Xeltr — a fusion of human creativity and artificial intelligence creating future-proof digital experiences.",
  };
}

export default function AboutPage() {
  return <AboutClient />;
}
