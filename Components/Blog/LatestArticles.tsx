"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import BlogCard, { BlogDoc } from "./BlogCard";

interface Props {
  blogs: BlogDoc[];
}

export default function LatestArticles({ blogs }: Props) {
  const articles = blogs.slice(4, 10);

  return (
    <section className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-28">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] bg-primary/10 border border-primary/20 px-4 py-2 rounded-full inline-block mb-5">
            Latest Articles
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight tracking-tight uppercase">
            Explore Our <span className="text-primary">Latest</span> Articles
          </h2>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xl lg:max-w-xs lg:text-right">
          Actionable insights, industry trends, and real-world strategies curated for your digital growth.
        </p>
      </div>

      {/* Grid */}
      {articles.length === 0 ? (
        <div className="text-center py-16 border border-border rounded-3xl bg-card/50">
          <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest">
            No blog posts available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {articles.map((blog, i) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </div>
      )}

      {/* View All Button */}
      {blogs.length > 4 && (
        <div className="flex justify-center mt-14">
          <Link
            href="/blog"
            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-primary/30 text-primary text-[11px] font-black uppercase tracking-[0.3em] hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
          >
            View All Articles
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      )}
    </section>
  );
}
