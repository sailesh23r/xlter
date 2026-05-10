import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export interface BlogDoc {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  thumbnail: string;
  publishDate?: string;
  createdAt: string;
  featured?: boolean;
}

type Props = {
  blog: BlogDoc;
};

export function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogCard({ blog }: Props) {
  const { slug, _id, title, category, description, thumbnail, publishDate, createdAt } = blog;
  const href = `/blog/${slug || _id}`;
  const date = formatDate(publishDate || createdAt);

  return (
    <Link href={href} className="group block h-full">
      <article className="group relative h-full flex flex-col rounded-[24px] overflow-hidden border border-border/50 bg-card/40 backdrop-blur-md hover:border-primary/50 transition-all duration-500 shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1">
        
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none" />
        
        {/* Image Container (Inset) */}
        <div className="p-3 pb-0 relative z-10">
          <div className="relative w-full h-56 overflow-hidden rounded-[16px] flex-shrink-0 border border-border/20">
            <Image
              src={thumbnail}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            
            {/* Category Badge on Image */}
            <span className="absolute top-4 left-4 bg-background/80 backdrop-blur-md text-primary border border-primary/20 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg">
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6 lg:p-8 gap-4 relative z-10">
          {/* Date */}
          <div className="flex items-center gap-2 text-muted-foreground text-[10px] uppercase tracking-widest font-bold">
            <Calendar size={12} className="text-primary/70" />
            <span>{date}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg lg:text-xl font-black text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1">
            {description}
          </p>

          {/* Read More */}
          <div className="flex items-center justify-between mt-auto pt-5 border-t border-border/50">
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground group-hover:text-primary transition-colors">
               Read Article
             </span>
             <div className="w-10 h-10 rounded-full bg-background/50 border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-500 shadow-sm">
                <ArrowRight size={16} className="group-hover:-rotate-45 transition-transform duration-500" />
             </div>
          </div>
        </div>
        
        {/* Animated Bottom Line */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-[60%] transition-all duration-700 rounded-t-full bg-primary" />
      </article>
    </Link>
  );
}
