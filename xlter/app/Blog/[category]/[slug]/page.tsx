import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";

interface Props {
  params: Promise<{ category: string, slug: string }>;
}

async function getBlogBySlug(slug: string) {
  console.log("Fetching blog with slug:", slug);
  try {
    await connectToDatabase();
    // Try finding by slug first
    let blog = await Blog.findOne({ slug }).lean();
    console.log("Blog found by slug:", blog ? "YES" : "NO");
    
    // Fallback: If not found, check if the slug is actually an ID (for legacy links)
    if (!blog && slug.match(/^[0-9a-fA-F]{24}$/)) {
      console.log("Slug looks like an ID, searching by ID...");
      blog = await Blog.findById(slug).lean();
      console.log("Blog found by ID:", blog ? "YES" : "NO");
    }
    
    return blog ? JSON.parse(JSON.stringify(blog)) : null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const description = blog.description || "";
  const wordCount = description.split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="bg-background text-foreground min-h-screen pb-32 transition-colors duration-500 pt-32">
      
      {/* Hero Header Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-20 px-6">
        <div className="absolute inset-0">
          <Image 
            src={blog.thumbnail} 
            alt={blog.title} 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto w-full">
            <Link 
                href="/Blog" 
                className="flex items-center gap-2 text-white/70 hover:text-primary transition-colors text-sm font-bold uppercase tracking-widest mb-8 group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Blog
            </Link>

            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                {blog.category}
            </div>

            <h1 className="text-4xl md:text-7xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-8 max-w-3xl">
                {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-white/60 text-xs font-bold uppercase tracking-widest">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                        <User size={14} />
                    </div>
                    <span>Xlter Studio</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-primary" />
                    <span>{new Date(blog.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock size={14} className="text-primary" />
                    <span>{readTime} min read</span>
                </div>
            </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 mt-12">
        <div className="prose prose-invert prose-blue max-w-none">
            <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-12">
                {description.split('\n')[0]}
            </p>

            <div className="space-y-8 text-muted-foreground text-lg leading-relaxed font-normal">
                {description.split('\n').slice(1).map((para: string, idx: number) => {
                    if (para.startsWith('"') || para.startsWith('“')) {
                        return (
                            <blockquote key={idx} className="border-l-4 border-primary pl-8 py-4 my-12 bg-accent/30 rounded-r-3xl not-italic">
                                <p className="text-foreground text-2xl font-bold leading-relaxed italic">
                                    {para}
                                </p>
                            </blockquote>
                        );
                    }
                    if (para.trim() === "") return null;
                    return <p key={idx}>{para}</p>;
                })}
            </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 mt-20 pt-10 border-t border-border flex justify-between items-center">
          <p className="text-xs font-black uppercase tracking-widest text-muted-foreground/50">© 2026 Xlter Studio</p>
      </div>
    </article>
  );
}
