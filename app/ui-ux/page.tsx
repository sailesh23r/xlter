import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/getSEO";
import UiUxClient from "./UiUxClient";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getPageMetadata("/ui-ux");
  return seo ?? {
    title: "UI/UX Design Services | Xeltr Studio",
    description: "Exceptional UI/UX design by Xeltr Studio. We create intuitive, immersive digital experiences that put users first and drive conversions.",
  };
}

export default function UiUxPage() {
  return <UiUxClient />;
}
