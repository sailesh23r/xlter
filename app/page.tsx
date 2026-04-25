import { getPageMetadata } from "@/lib/getSEO";
import { Metadata } from "next";
import ClientHome from "./ClientHome";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getPageMetadata("/");
  return meta || {
    title: "Xeltr ",
    description: "",
  };
}

export default function Home() {
  return <ClientHome />;
}
