import { getPageMetadata } from "@/lib/getSEO";
import { Metadata } from "next";
import ClientHome from "./ClientHome";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getPageMetadata("/");
  return meta || {
    title: "Xlter Studio | boutique creative agency",
    description: "Digital experiences that scale. We think, build, and grow your brand.",
  };
}

export default function Home() {
  return <ClientHome />;
}
