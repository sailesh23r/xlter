import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/getSEO";
import GraphicDesignClient from "./GraphicDesignClient";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageMetadata("/graphic-design");
  return seo ?? {
    title: "Graphic Design Services | Xeltr Studio",
    description: "Stunning visual design solutions by Xeltr Studio. From logos to marketing materials, we create graphics that captivate and convert.",
  };
}

export default function GraphicDesignPage() {
  return <GraphicDesignClient />;
}
