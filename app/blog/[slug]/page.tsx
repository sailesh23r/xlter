import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";
import BlogCard from "@/Components/Blog/BlogCard";

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

  if (!blog) return { title: "Not Found | Xeltr" };

  const title = blog.metaTitle || blog.title;
  const description = blog.metaDescription || blog.description;
  const ogImage = blog.ogImage || blog.thumbnail;

  return {
    title: `${title} | Xeltr Studio`,
    description: description,
    robots: blog.noIndex ? "noindex, nofollow" : "index, follow",
    alternates: {
        canonical: blog.canonicalUrl || `https://xeltr.com/blog/${blog.slug}`,
    },
    openGraph: {
      title: title,
      description: description,
      images: [ogImage],
      type: "article",
      authors: [blog.author || "Xeltr Studio"],
      publishedTime: blog.publishDate || blog.createdAt,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogImage],
      site: blog.twitterHandle || "@xeltrstudio",
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
      "name": blog.author || "Xeltr Studio"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Xeltr Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://xeltr.com/Transparent-06.png"
      }
    },
    "datePublished": blog.publishDate || blog.createdAt,
    "dateModified": blog.updatedAt || blog.createdAt,
    "description": blog.metaDescription || blog.description,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://xeltr.com/blog/${blog.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <article className="bg-background text-foreground min-h-screen pt-0 pb-32 transition-colors duration-500">
        
        {/* 1. Hero Section - Centered Editorial Layout */}
        <section className="relative w-full pt-32 pb-16 px-4 sm:px-6 max-w-4xl mx-auto text-center">
            
            <div className="mb-10">
                <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Journal
                </Link>
            </div>

            <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-6 block">
                {blog.category}
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-serif text-foreground leading-[1.15] mb-10 tracking-tight">
                {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm font-medium">
                <span className="flex items-center gap-2"><User size={16}/> {blog.author || "Xeltr Studio"}</span>
                <span className="flex items-center gap-2"><Calendar size={16}/> {new Date(blog.publishDate || blog.createdAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="flex items-center gap-2"><Clock size={16}/> {readTime} min read</span>
            </div>
        </section>

        {/* Massive Featured Image */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
            <div className="w-full aspect-[16/10] md:aspect-[21/9] relative rounded-[24px] overflow-hidden shadow-2xl border border-border/30">
                <Image 
                    src={blog.thumbnail} 
                    alt={blog.title} 
                    fill 
                    className="object-cover"
                    priority
                />
            </div>
        </section>

        {/* 2. Article Content Layout */}
        <section className="max-w-3xl mx-auto px-6 mb-16">
            <div className="relative z-10 space-y-8 text-muted-foreground text-lg md:text-xl leading-[2.2]">
                {content.split(/\n\n+/).map((para: string, idx: number) => {
                    if (!para.trim()) return null;

                    const renderInline = (text: string) => {
                        const parts = text.split(/(\[.*?\]\(.*?\))/g);
                        return parts.map((part, i) => {
                            const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
                            if (linkMatch) {
                                return <Link key={i} href={linkMatch[2]} className="text-primary hover:text-primary/80 underline decoration-primary/30 underline-offset-4 transition-all">{linkMatch[1]}</Link>;
                            }
                            const boldParts = part.split(/(\*\*.*?\*\*)/g);
                            return boldParts.map((bp, j) => {
                                const boldMatch = bp.match(/\*\*(.*?)\*\*/);
                                if (boldMatch) return <strong key={j} className="font-bold text-foreground">{boldMatch[1]}</strong>;
                                return <span key={j}>{bp}</span>;
                            });
                        });
                    };

                    // 3. Inline Editorial Images
                    if (para.match(/^!\[.*?\]\(.*?\)$/)) {
                        const imgMatch = para.match(/^!\[(.*?)\]\((.*?)\)$/);
                        if (imgMatch) {
                            return (
                                <figure key={idx} className="my-16 flex flex-col items-center group">
                                    <div className="w-full relative rounded-xl overflow-hidden shadow-lg border border-border/30 transition-all duration-700 hover:shadow-2xl">
                                        <img src={imgMatch[2]} alt={imgMatch[1]} className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-1000" />
                                    </div>
                                    {imgMatch[1] && <figcaption className="mt-4 text-xs text-muted-foreground uppercase tracking-widest">{imgMatch[1]}</figcaption>}
                                </figure>
                            );
                        }
                    }

                    // CTA Block
                    if (para.includes('---') && para.toLowerCase().includes('contact')) {
                        const cleanText = para.replace(/---/g, '').trim();
                        const linkMatch = cleanText.match(/\[(.*?)\]\((.*?)\)/);
                        const textBefore = linkMatch ? cleanText.split(/\[/)[0] : cleanText;
                        return (
                            <div key={idx} className="my-16 bg-primary/5 border border-primary/20 rounded-2xl p-10 text-center relative overflow-hidden">
                                <h3 className="text-2xl font-serif text-foreground mb-6 leading-tight">
                                    {textBefore.replace(/\*\*/g, '').trim()}
                               </h3>
                                {linkMatch && (
                                    <Link href={linkMatch[2]} className="inline-block bg-primary text-primary-foreground font-bold text-sm px-8 py-4 rounded-full hover:bg-primary/90 transition-colors">
                                        {linkMatch[1]}
                                    </Link>
                                )}
                            </div>
                        );
                    }

                    // Elegant Blockquote
                    if (para.startsWith('>') || para.startsWith('"') || para.startsWith('“')) {
                        return (
                            <blockquote key={idx} className="border-l-2 border-primary pl-8 my-14 py-2 italic relative">
                                <p className="text-foreground text-2xl md:text-3xl font-serif leading-relaxed text-foreground/90 whitespace-pre-wrap">
                                    {renderInline(para.replace(/^>|"/gm, '').replace(/“|”/g, '').trim())}
                                </p>
                            </blockquote>
                        );
                    }
                    
                    // Serif Headings
                    if (para.startsWith('#')) {
                        const level = para.match(/^#+/)?.[0].length || 1;
                        const text = para.replace(/^#+/, '').trim();
                        if (level === 1) return <h1 key={idx} className="text-4xl md:text-5xl font-serif text-foreground mt-16 mb-8">{renderInline(text)}</h1>;
                        if (level === 2) return <h2 key={idx} className="text-3xl md:text-4xl font-serif text-foreground mt-14 mb-6">{renderInline(text)}</h2>;
                        return <h3 key={idx} className="text-2xl font-serif text-foreground mt-10 mb-4">{renderInline(text)}</h3>;
                    }

                    // Lists
                    if (para.startsWith('- ') || para.startsWith('* ')) {
                        const items = para.split('\n').filter(i => i.trim());
                        return (
                            <ul key={idx} className="list-disc space-y-3 my-8 pl-6 marker:text-primary">
                                {items.map((item, i) => (
                                    <li key={i} className="pl-2">
                                        {renderInline(item.replace(/^[-*]\s*/, ''))}
                                    </li>
                                ))}
                            </ul>
                        );
                    }

                    // Paragraphs (Drop cap for first paragraph only)
                    const isFirstParagraph = idx === 0;
                    return (
                        <p key={idx} className={`whitespace-pre-wrap ${isFirstParagraph ? "first-letter:text-6xl first-letter:font-serif first-letter:text-foreground first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]" : ""}`}>
                            {renderInline(para)}
                        </p>
                    );
                })}
            </div>

            {/* 4. Tags Section */}
            {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-16 pt-12 border-t border-border/30">
                    {blog.tags.map((tag: string) => (
                        <span key={tag} className="px-4 py-1.5 border border-border/50 rounded-full text-[10px] uppercase tracking-widest text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors cursor-default">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* 5. Author Card */}
            <div className="mt-16 p-8 bg-card/20 border border-border/50 rounded-[24px] flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:bg-card/40 transition-colors group">
                <div className="w-20 h-20 rounded-full bg-muted overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500 border border-border/50">
                    <div className="w-full h-full flex items-center justify-center bg-background/50">
                        <User size={32} className="text-muted-foreground" />
                    </div>
                </div>
                <div className="text-center sm:text-left">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-1">Written By</span>
                    <h4 className="text-xl font-serif font-bold text-foreground mb-3">{blog.author || "Xeltr Studio"}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        An editorial voice at Xeltr, exploring the intersections of design, technology, and digital culture.
                    </p>
                </div>
            </div>
        </section>

        {/* FAQs */}
        {blog.faqs && blog.faqs.length > 0 && (
            <div className="max-w-3xl mx-auto px-6">
               <FAQSection faqs={blog.faqs} title="Frequently Asked Questions" />
            </div>
        )}

        {/* 6. Related Articles Section */}
        {relatedBlogs.length > 0 && (
            <section className="max-w-7xl mx-auto px-6 mt-32 border-t border-border/20 pt-24">
                <h2 className="text-3xl md:text-5xl font-serif text-center mb-16 text-foreground tracking-tight">Read Next</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {relatedBlogs.map((rel: any) => (
                        <Link href={`/blog/${rel.slug}`} key={rel._id} className="group block">
                            <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden mb-6 border border-border/30 bg-muted">
                                <Image 
                                    src={rel.thumbnail} 
                                    alt={rel.title} 
                                    fill 
                                    className="object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out" 
                                />
                            </div>
                            <span className="text-primary text-[10px] uppercase tracking-widest font-bold mb-3 block">{rel.category}</span>
                            <h3 className="text-2xl font-serif text-foreground group-hover:text-primary transition-colors leading-snug mb-4">{rel.title}</h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">{rel.description}</p>
                        </Link>
                    ))}
                </div>
            </section>
        )}
      </article>
    </>
  );
}
