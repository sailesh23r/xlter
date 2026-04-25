import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import Page from "@/models/Page";
import { Metadata } from "next";
import FAQSection from "@/Components/SEO/FAQSection";
import LeadGenSection from "@/Components/LeadGenSection";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    await connectToDatabase();
    const page = await Page.findOne({ slug }).lean();
    if (!page) return { title: "Not Found | Xlter" };

    return {
      title: `${page.metaTitle || page.title} | Xlter Studio`,
      description: page.metaDescription,
      robots: page.noIndex ? "noindex, nofollow" : "index, follow",
      alternates: {
        canonical: page.canonicalUrl || `https://xlter.com/${page.slug}`,
      },
      openGraph: {
        title: page.metaTitle || page.title,
        description: page.metaDescription,
        images: page.ogImage ? [page.ogImage] : ["/Transparent-06.png"],
      },
    };
  } catch {
    return { title: "Xlter Studio" };
  }
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  
  await connectToDatabase();
  const page = await Page.findOne({ slug }).lean();
  
  if (!page) notFound();

  return (
    <main className="min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-12">
          {page.title}
        </h1>
        
        <div className="prose prose-invert max-w-none mb-24 text-lg md:text-xl text-muted-foreground leading-relaxed">
           <div className="whitespace-pre-wrap">
             {page.content}
           </div>
        </div>

        {page.faqs && page.faqs.length > 0 && (
          <FAQSection faqs={page.faqs} />
        )}

        {page.layout === "LANDING" && (
          <LeadGenSection />
        )}
      </div>
    </main>
  );
}
