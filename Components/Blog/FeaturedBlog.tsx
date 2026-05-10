import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { BlogDoc, formatDate } from "./BlogCard";

interface Props {
  blogs: BlogDoc[];
}

export default function FeaturedBlog({ blogs }: Props) {
  if (!blogs || blogs.length === 0) return null;

  const [featured, ...rest] = blogs; // featured is BlogDoc
  const sidePosts = rest.slice(0, 3);
  const featuredHref = `/blog/${featured.slug || featured._id}`;
  const featuredDate = formatDate(featured.publishDate || featured.createdAt);

  return (
    <section className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:py-28">
      {/* Section Label */}
      <div className="flex items-center gap-4 mb-10">
        <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
          Featured
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6 sm:gap-8 lg:gap-10">
        {/* ── Left: Large Featured Card (Exact Match) ── */}
        <Link href={featuredHref} className="group flex flex-col md:flex-row bg-card rounded-[24px] overflow-hidden border border-border hover:border-primary/50 transition-colors duration-500 shadow-lg lg:min-h-[400px]">
            
            {/* Left Image (Full Bleed Half) */}
            <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full overflow-hidden">
                <Image
                    src={featured.thumbnail}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Featured Pill */}
                <div className="absolute top-6 left-6 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-[13px] font-bold shadow-md z-10">
                    Featured
                </div>
                
                {/* Subtle gradient overlay to match image depth */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>

            {/* Right Content */}
            <div className="w-full md:w-1/2 p-6 md:p-8 lg:p-10 flex flex-col justify-center bg-card z-10">
                
                {/* Top Info Row */}
                <div className="flex items-center gap-5 text-muted-foreground text-[13px] font-medium mb-5">
                    <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>{featuredDate}</span>
                    </div>
                    {/* Read Time */}
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <span>5 min read</span>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-primary leading-[1.2] tracking-tight mb-5 group-hover:text-primary/80 transition-colors duration-300">
                  {featured.title}
                </h2>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3 mb-10">
                  {featured.description}
                </p>
                
                {/* Bottom Row */}
                <div className="flex items-center justify-between mt-auto">
                    {/* Author */}
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-border/50 flex items-center justify-center text-muted-foreground">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        </div>
                        <span className="text-foreground text-sm font-semibold">{(featured as any).author || "Sudharsan"}</span>
                    </div>

                    {/* Read Article Link */}
                    <div className="text-primary text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                        Read Article
                        <ArrowRight size={16} />
                    </div>
                </div>
            </div>
        </Link>

        {/* ── Right: 3 Small Horizontal Cards ── */}
        <div className="flex flex-col gap-4">
          {sidePosts.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
              No additional posts
            </div>
          ) : (
            sidePosts.map((blog) => {
              const href = `/blog/${blog.slug || blog._id}`;
              const date = formatDate(blog.publishDate || blog.createdAt);
              return (
                <Link
                  key={blog._id}
                  href={href}
                  className="group flex gap-5 rounded-[24px] bg-card/40 backdrop-blur-md border border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-500 p-3 overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Thumbnail (Inset) */}
                  <div className="relative w-24 sm:w-32 h-24 sm:h-32 flex-shrink-0 rounded-[16px] overflow-hidden border border-border/20 z-10">
                    <Image
                      src={blog.thumbnail}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 640px) 96px, 128px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col justify-center gap-2 min-w-0 flex-1 z-10 py-1 pr-2">
                    <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-sm w-fit text-[8px] font-black uppercase tracking-[0.2em]">
                      {blog.category}
                    </span>
                    <h3 className="text-foreground text-sm sm:text-base font-black leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
                      {blog.title}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase tracking-widest mt-auto">
                      <Calendar size={11} className="text-primary/70" />
                      <span>{date}</span>
                    </div>
                  </div>
                  
                  {/* Hover Arrow Indicator */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-primary z-10">
                     <ArrowRight size={18} className="-rotate-45" />
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
