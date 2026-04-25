import connectToDatabase from "./mongodb";
import PageSEO from "@/models/PageSEO";
import { Metadata } from "next";

export async function getPageMetadata(route: string): Promise<Metadata | null> {
  try {
    await connectToDatabase();
    const seo = await PageSEO.findOne({ route: route.toLowerCase() }).lean();
    if (!seo) return null;

    return {
      title: `${seo.title} | Xlter Studio`,
      description: seo.description,
      keywords: seo.keywords,
      robots: seo.noIndex ? "noindex, nofollow" : "index, follow",
      alternates: {
        canonical: seo.canonicalUrl || `https://xlter.com${route}`,
      },
      openGraph: {
        title: seo.title,
        description: seo.description,
        images: seo.ogImage ? [seo.ogImage] : ["/Transparent-06.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: seo.title,
        description: seo.description,
        images: seo.ogImage ? [seo.ogImage] : ["/Transparent-06.png"],
        site: seo.twitterHandle || "@xlterstudio",
      },
    };
  } catch (error) {
    console.error("SEO Fetch Error:", error);
    return null;
  }
}
