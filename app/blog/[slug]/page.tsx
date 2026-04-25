import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getBlogBySlug(slug: string) {
  try {
    await connectToDatabase();
    const blog = await Blog.findOne({ slug }).lean();
    if (!blog && slug.match(/^[0-9a-fA-F]{24}$/)) {
      return await Blog.findById(slug).lean();
    }
    return blog ? JSON.parse(JSON.stringify(blog)) : null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

import FAQSection from "@/Components/SEO/FAQSection";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) return { title: "Not Found | Xlter" };

  const title = blog.metaTitle || blog.title;
  const description = blog.metaDescription || blog.description;
  const ogImage = blog.ogImage || blog.thumbnail;

  return {
    title: `${title} | Xlter Studio`,
    description: description,
    robots: blog.noIndex ? "noindex, nofollow" : "index, follow",
    alternates: {
        canonical: blog.canonicalUrl || `https://xlter.com/blog/${blog.slug}`,
    },
    openGraph: {
      title: title,
      description: description,
      images: [ogImage],
      type: "article",
      authors: [blog.author || "Xlter Studio"],
      publishedTime: blog.publishDate || blog.createdAt,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogImage],
      site: blog.twitterHandle || "@xlterstudio",
    },
  };
}

async function getRelatedBlogs(category: string, currentId: string) {
    try {
        await connectToDatabase();
        const related = await Blog.find({ 
            category, 
            _id: { $ne: currentId },
            status: "PUBLISHED" 
        }).limit(3).lean();
        return JSON.parse(JSON.stringify(related));
    } catch {
        return [];
    }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog || blog.status === "DRAFT") notFound();

  const relatedBlogs = await getRelatedBlogs(blog.category, blog._id);

  const content = blog.content || blog.description;
  const wordCount = content.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // BlogPosting Schema
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": blog.thumbnail,
    "author": {
      "@type": "Person",
      "name": blog.author || "Xlter Studio"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Xlter Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://xlter.com/Transparent-06.png"
      }
    },
    "datePublished": blog.publishDate || blog.createdAt,
    "dateModified": blog.updatedAt || blog.createdAt,
    "description": blog.metaDescription || blog.description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://xlter.com/blog/${blog.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <article className="bg-background text-foreground min-h-screen pt-0 pb-32 transition-colors duration-500">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-16 px-6">
          <div className="absolute inset-0">
            <Image 
              src={blog.thumbnail} 
              alt={blog.title} 
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto w-full">
              <Link 
                  href="/blog" 
                  className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors text-[10px] font-black uppercase tracking-[0.3em] mb-12 group"
              >
                  <ArrowLeft size={14} className="group-hover:-translate-x-2 transition-transform" /> Back to Blog
              </Link>

              <div className="flex items-center gap-4 mb-8">
                  <div className="px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                      {blog.category}
                  </div>
                  {blog.tags?.map((tag: string) => (
                      <span key={tag} className="text-white/40 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                          <Tag size={10} /> {tag}
                      </span>
                  ))}
              </div>

              <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.85] uppercase tracking-tighter mb-12 max-w-4xl">
                  {blog.title}
              </h1>

              <div className="flex flex-wrap items-center gap-10 text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/10">
                          <User size={16} />
                      </div>
                      <div>
                          <p className="text-white/30 mb-0.5 text-[8px]">AUTHOR</p>
                          <p className="text-white">{blog.author || "Xlter Studio"}</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary/60 border border-white/5">
                          <Calendar size={16} />
                      </div>
                      <div>
                          <p className="text-white/30 mb-0.5 text-[8px]">PUBLISHED</p>
                          <p className="text-white">{new Date(blog.publishDate || blog.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                  </div>
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-primary/60 border border-white/5">
                          <Clock size={16} />
                      </div>
                      <div>
                          <p className="text-white/30 mb-0.5 text-[8px]">READ TIME</p>
                          <p className="text-white">{readTime} MIN READ</p>
                      </div>
                  </div>
              </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-4xl mx-auto px-6 mt-24">
          <div className="prose prose-invert prose-blue max-w-none">
              <div className="space-y-8 text-muted-foreground text-lg md:text-xl leading-[1.8] font-medium">
                  {content.split('\n').map((para: string, idx: number) => {
                      if (!para.trim()) return null;
                      if (para.startsWith('>') || para.startsWith('"') || para.startsWith('“')) {
                          return (
                              <blockquote key={idx} className="border-l-4 border-primary pl-10 py-6 my-16 bg-white/5 rounded-r-3xl not-italic relative overflow-hidden">
                                  <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                                  <p className="text-foreground text-3xl font-black leading-tight italic uppercase tracking-tight">
                                      {para.replace(/^>/, '').trim()}
                                  </p>
                              </blockquote>
                          );
                      }
                      if (para.startsWith('#')) {
                          const level = para.match(/^#+/)?.[0].length || 1;
                          const text = para.replace(/^#+/, '').trim();
                          if (level === 1) return <h1 key={idx} className="text-4xl font-black text-white uppercase tracking-tighter mt-16 mb-8">{text}</h1>;
                          if (level === 2) return <h2 key={idx} className="text-3xl font-black text-white uppercase tracking-tighter mt-12 mb-6">{text}</h2>;
                          return <h3 key={idx} className="text-2xl font-black text-white uppercase tracking-tighter mt-10 mb-4">{text}</h3>;
                      }
                      return <p key={idx} className="whitespace-pre-wrap">{para}</p>;
                  })}
              </div>
          </div>
        </section>

        {/* FAQs */}
        {blog.faqs && blog.faqs.length > 0 && (
            <FAQSection faqs={blog.faqs} title="Article FAQs" />
        )}

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
            <section className="max-w-7xl mx-auto px-6 mt-48">
                <h2 className="text-3xl font-black uppercase tracking-tighter mb-12">Related Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {relatedBlogs.map((rel: any) => (
                        <Link key={rel._id} href={`/blog/${rel.slug}`} className="group">
                            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6">
                                <Image src={rel.thumbnail} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-primary/90 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{rel.category}</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors line-clamp-2">{rel.title}</h3>
                        </Link>
                    ))}
                </div>
            </section>
        )}

        {/* Footer */}
        <div className="max-w-4xl mx-auto px-6 mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">SHARE THIS STORY</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/30">© 2026 Xlter Creative Studio</p>
        </div>
      </article>
    </>
  );
}
