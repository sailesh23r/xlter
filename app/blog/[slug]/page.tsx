import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import BlogCard from "@/Components/Blog/BlogCard";
import BlogContentRenderer from "@/Components/Blog/BlogContentRenderer";
import ReadingProgress from "@/Components/Blog/ReadingProgress";
import BlogTOC from "@/Components/Blog/BlogTOC";
import ShareButtons from "@/Components/Blog/ShareButtons";

interface Props {
  params: Promise<{ slug: string }>;
}

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

async function getBlogBySlug(slug: string) {
  try {
    const query = `*[
      _type == "post" &&
      slug.current == $slug &&
      !(_id in path("drafts.**"))
    ][0]{
      _id,
      title,
      slug,
      excerpt,
      featuredImage{
        asset->{
          url
        }
      },
      content,
      publishDate,
      _createdAt,
      _updatedAt,
      author->{name, image},
      category->{title, slug},
      tags,
      faqs,
      seoTitle,
      seoDescription,
      status
    }`;
    
    const sanityBlog = await client.fetch(query, { slug });
    
    console.log("BLOG DETAIL DATA:", sanityBlog);
    console.log("ARTICLE CONTENT:", sanityBlog?.content);
    
    if (!sanityBlog) return null;

    return {
      _id: sanityBlog._id,
      title: sanityBlog.title || "Untitled Post",
      slug: sanityBlog.slug?.current || slug,
      category: sanityBlog.category?.title || "Uncategorized",
      description: sanityBlog.excerpt || "",
      thumbnail: sanityBlog.featuredImage?.asset?.url || null,
      publishDate: sanityBlog.publishDate || sanityBlog._createdAt,
      createdAt: sanityBlog._createdAt || new Date().toISOString(),
      updatedAt: sanityBlog._updatedAt || sanityBlog._createdAt || new Date().toISOString(),
      author: sanityBlog.author?.name || "Xeltr Studio",
      content: sanityBlog.content || sanityBlog.excerpt || "",
      tags: sanityBlog.tags || [], 
      faqs: sanityBlog.faqs || null,
      metaTitle: sanityBlog.seoTitle || sanityBlog.title || "Untitled Post",
      metaDescription: sanityBlog.seoDescription || sanityBlog.excerpt || "",
      status: sanityBlog.status || "PUBLISHED"
    };
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
  const ogImage = blog.thumbnail || "https://xeltr.com/blog2.png";

  return {
    title: `${title} | Xeltr Studio`,
    description: description,
    robots: "index, follow",
    alternates: {
        canonical: `https://xeltr.com/blog/${blog.slug}`,
    },
    openGraph: {
      title: title,
      description: description,
      images: [ogImage],
      type: "article",
      authors: [blog.author],
      publishedTime: blog.publishDate || blog.createdAt,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogImage],
      site: "@xeltrstudio",
    },
  };
}

async function getRelatedBlogs(category: string, currentId: string) {
    try {
        const query = `*[
          _type == "post" &&
          category->title == $category &&
          _id != $currentId &&
          !(_id in path("drafts.**"))
        ] | order(publishDate desc, _createdAt desc)[0...3]{
          _id,
          title,
          slug,
          excerpt,
          featuredImage{
            asset->{
              url
            }
          },
          publishDate,
          _createdAt,
          category->{title, slug}
        }`;
        
        const related = await client.fetch(query, { category, currentId });
        
        return related.map((rel: any) => ({
          _id: rel._id,
          title: rel.title || "Untitled Post",
          slug: rel.slug?.current || "",
          category: rel.category?.title || "Uncategorized",
          description: rel.excerpt || "",
          thumbnail: rel.featuredImage?.asset?.url || null,
          publishDate: rel.publishDate || rel._createdAt,
          createdAt: rel._createdAt
        }));
    } catch {
        return [];
    }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog || blog.status === "DRAFT") notFound();

  const relatedBlogs = await getRelatedBlogs(blog.category, blog._id);

  const rawContent = blog.content || blog.description || "";
  const content = rawContent;
  
  // Basic heuristic for reading time based on either text string or array length
  let wordCount = 1;
  if (typeof content === "string") {
    wordCount = content.split(/\s+/).length;
  } else if (Array.isArray(content)) {
    // Rough estimate for portable text blocks
    wordCount = content.reduce((acc: number, block: any) => {
      if (block.children) {
        return acc + block.children.reduce((childAcc: number, child: any) => childAcc + (child.text?.split(/\s+/).length || 0), 0);
      }
      return acc + 10; // arbitrary words per image/other block
    }, 0);
  }
  
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const authorName = blog.author || "Xeltr Studio";
  const publishDate = blog.publishDate || blog.createdAt || new Date().toISOString();
  const safeTitle = blog.title || "Untitled Post";
  const safeDesc = blog.metaDescription || blog.description || "";

  // BlogPosting Schema
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": safeTitle,
    "image": blog.thumbnail || "https://xeltr.com/blog2.png",
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "Xeltr Studio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://xeltr.com/Transparent-06.png"
      }
    },
    "datePublished": publishDate,
    "dateModified": blog.updatedAt || publishDate,
    "description": safeDesc,
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
      <article className="bg-background text-foreground min-h-screen pt-0 pb-32 transition-colors duration-500 relative">
        <ReadingProgress />
        
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
                {safeTitle}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm font-medium">
                <span className="flex items-center gap-2"><User size={16}/> {authorName}</span>
                <span className="flex items-center gap-2"><Calendar size={16}/> {new Date(publishDate).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span className="flex items-center gap-2"><Clock size={16}/> {readTime} min read</span>
            </div>
        </section>

        {/* Massive Featured Image */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
            <div className="w-full aspect-[16/10] md:aspect-[21/9] relative rounded-[24px] overflow-hidden shadow-2xl border border-border/30 bg-muted">
                {blog.thumbnail ? (
                  <Image 
                      src={blog.thumbnail} 
                      alt={blog.title} 
                      fill 
                      className="object-cover"
                      priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No Image Available
                  </div>
                )}
            </div>
        </section>

        {/* 2. Article Content Layout (3-Column on Desktop) */}
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 mb-16 grid grid-cols-1 lg:grid-cols-[1fr_2.5fr_1fr] gap-12 xl:gap-16 items-start">
            
            {/* Left Column: Sticky TOC */}
            <aside className="hidden lg:block relative h-full w-full">
               <BlogTOC />
            </aside>

            {/* Center Column: Article */}
            <div className="w-full min-w-0">
                {/* Mobile TOC */}
                <div className="lg:hidden mb-8">
                  <BlogTOC />
                </div>

                <BlogContentRenderer content={content} />

                <ShareButtons url={`https://xeltr.com/blog/${blog.slug}`} title={safeTitle} />


                {/* 4. Tags Section */}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border/30">
                        {blog.tags.map((tag: string) => (
                            <span key={tag} className="px-4 py-1.5 border border-border/50 rounded-full text-[10px] uppercase tracking-widest text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors cursor-default">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* 5. Author Card */}
                <div className="mt-12 p-8 bg-card/20 border border-border/50 rounded-[24px] flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:bg-card/40 transition-colors group">
                    <div className="w-20 h-20 rounded-full bg-muted overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500 border border-border/50">
                        <div className="w-full h-full flex items-center justify-center bg-background/50">
                            <User size={32} className="text-muted-foreground" />
                        </div>
                    </div>
                    <div className="text-center sm:text-left">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold block mb-1">Written By</span>
                        <h4 className="text-xl font-serif font-bold text-foreground mb-3">{authorName}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            An editorial voice at Xeltr, exploring the intersections of design, technology, and digital culture.
                        </p>
                    </div>
                </div>

                {/* Premium CTA */}
                <div className="mt-12 p-10 bg-gradient-to-br from-primary/20 to-purple-500/20 border border-white/10 rounded-[24px] text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm -z-10" />
                    <h3 className="text-2xl font-bold font-serif mb-4 text-white">Elevate Your Strategy</h3>
                    <p className="text-gray-300 mb-8 max-w-md mx-auto text-sm">Join our newsletter to get the latest insights on design, technology, and digital transformation delivered straight to your inbox.</p>
                    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10" action="#">
                      <input type="email" placeholder="Your email address" required className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-colors" />
                      <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:scale-105">Subscribe</button>
                    </form>
                </div>
            </div>

            {/* Right Column: Related Posts */}
            <aside className="hidden lg:block sticky top-32 space-y-8 w-full">
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                You May Also Like
              </h4>
              <div className="flex flex-col gap-8">
                {relatedBlogs.length > 0 ? relatedBlogs.map((rel: any) => (
                    <Link href={`/blog/${rel.slug}`} key={rel._id} className="group block">
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-border/30 bg-muted">
                            <Image src={rel.thumbnail || "/blog2.png"} alt={rel.title || "Blog Image"} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <span className="text-primary text-[10px] uppercase tracking-widest font-bold mb-2 block">{rel.category}</span>
                        <h5 className="text-base font-serif font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">{rel.title}</h5>
                    </Link>
                )) : (
                  <p className="text-sm text-muted-foreground">More articles coming soon.</p>
                )}
              </div>
            </aside>
        </section>

        {/* FAQs */}
        {blog.faqs && blog.faqs.length > 0 && (
            <div className="max-w-3xl mx-auto px-6">
               <FAQSection faqs={blog.faqs} title="Frequently Asked Questions" />
            </div>
        )}

        {/* 6. Related Articles Section (Mobile Only) */}
        {relatedBlogs.length > 0 && (
            <section className="lg:hidden max-w-7xl mx-auto px-6 mt-24 border-t border-border/20 pt-16">
                <h2 className="text-3xl font-serif text-center mb-10 text-foreground tracking-tight">You May Also Like</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {relatedBlogs.map((rel: any) => (
                        <Link href={`/blog/${rel.slug}`} key={rel._id} className="group block">
                            <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden mb-6 border border-border/30 bg-muted">
                                <Image 
                                    src={rel.thumbnail || "/blog2.png"} 
                                    alt={rel.title || "Blog Image"} 
                                    fill 
                                    className="object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out" 
                                />
                            </div>
                            <span className="text-primary text-[10px] uppercase tracking-widest font-bold mb-3 block">{rel.category}</span>
                            <h3 className="text-xl font-serif text-foreground group-hover:text-primary transition-colors leading-snug mb-3">{rel.title}</h3>
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
