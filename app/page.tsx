import { Metadata } from "next";
import ClientHome from "./ClientHome";
import connectToDatabase, { withTimeout } from "@/lib/mongodb";
import HeroSEO from "@/models/HeroSEO";

export const dynamic = "force-dynamic";

async function getHeroData() {
  try {
    // Parallelize connection and fetching
    await withTimeout(connectToDatabase(), 5000);
    return await withTimeout(HeroSEO.findOne({}).lean() as Promise<any>, 5000);
  } catch (error) {
    console.error("Hero data fetch failed:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const hero = await getHeroData();
  
  if (!hero) {
      return {
          title: "Xeltr | Everything Digital. Done Right.",
          description: "XELTR builds high-performance websites, branding systems, SEO strategies and digital experiences.",
      };
  }

  return {
    title: hero.metaTitle,
    description: hero.metaDescription,
    keywords: hero.focusKeyword,
    alternates: {
        canonical: hero.canonicalUrl,
    },
    robots: {
        index: !hero.noIndex,
        follow: !hero.noIndex,
    },
    openGraph: {
        title: hero.ogTitle || hero.metaTitle,
        description: hero.ogDescription || hero.metaDescription,
        images: hero.ogImage ? [{ url: hero.ogImage }] : [],
        type: "website",
    },
    twitter: {
        card: hero.twitterCard as any || "summary_large_image",
        title: hero.ogTitle || hero.metaTitle,
        description: hero.ogDescription || hero.metaDescription,
        images: hero.ogImage ? [hero.ogImage] : [],
    }
  };
}

export default async function Home() {
  const heroData = await getHeroData();

  // Prepare Schema JSON-LD
  const schemas = [];
  if (heroData) {
      if (heroData.organizationSchema) {
          schemas.push({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "XELTR",
              "url": "https://xeltr.com",
              "logo": "https://xeltr.com/logo.png",
              "sameAs": [
                  "https://facebook.com/xeltr",
                  "https://linkedin.com/company/xeltr",
                  "https://twitter.com/xeltr"
              ]
          });
      }
      // Add other schemas if enabled...
  }

  return (
    <>
      {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
      ))}
      <ClientHome heroData={heroData ? JSON.parse(JSON.stringify(heroData)) : {}} />
    </>
  );
}

