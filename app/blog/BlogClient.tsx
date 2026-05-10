"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GridBackground from "@/Components/Animations/GridBackground";
import BlogCard, { BlogDoc } from "@/Components/Blog/BlogCard";
import FeaturedBlog from "@/Components/Blog/FeaturedBlog";
import LatestArticles from "@/Components/Blog/LatestArticles";
import { SwipeStack } from "@/Components/Common/SwipeStack";

interface Category {
  _id: string;
  name: string;
}

export default function BlogClient({
  blogs,
  categories,
  initialCategory = "ALL",
}: {
  blogs: BlogDoc[];
  categories: Category[];
  initialCategory?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredBlogs = useMemo(() => 
    activeCategory === "ALL"
      ? blogs
      : blogs.filter(
          (blog) =>
            blog.category.toUpperCase() === activeCategory.toUpperCase()
        ),
  [blogs, activeCategory]);

  const categoryList = useMemo(() => [
    "ALL",
    ...categories.map((c) => c.name.toUpperCase()),
  ], [categories]);

  if (!mounted) return null;


  const words = "THINK. BUILD. GROW.".split(" ");
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08 },
    }),
  };

  return (
    <div className="bg-background text-foreground min-h-screen pt-0 pb-20 relative overflow-x-hidden">
      <GridBackground />

      {/* ── Hero ── */}
      <section className="relative w-full py-16 sm:py-20 lg:py-28 max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px] bg-blue-500/10 px-6 py-2 rounded-full border border-blue-500/20 w-fit mb-5 mx-auto"
        >
          OUR BLOG
        </motion.p>

        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-black leading-[1.05] uppercase tracking-tighter mb-6">
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={textVariants}
              custom={i}
              initial="hidden"
              animate="visible"
              className="inline-block mr-[0.3em]"
            >
              {word === "BUILD." ? (
                <span className="text-blue-500">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-slate-500 text-sm sm:text-base md:text-lg font-medium leading-relaxed max-w-xl mx-auto"
        >
          Actionable tips, tech trends, and real-world strategies to level up
          your digital journey.
        </motion.p>
      </section>

      {/* ── Category Filters ── */}
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex justify-center gap-3 mb-16 flex-wrap">
        {categoryList.map((item) => (
          <button
            key={item}
            onClick={() => setActiveCategory(item)}
            className={`px-6 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              activeCategory === item
                ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20 scale-105"
                : "border-white/10 text-slate-500 hover:border-blue-500/40 hover:text-blue-400"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* ── Empty State ── */}
      {filteredBlogs.length === 0 ? (
        <div className="max-w-7xl mx-auto px-6 pb-32 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 border border-white/5 rounded-3xl bg-[#0f172a]/50"
          >
            <p className="text-slate-600 text-sm font-bold uppercase tracking-widest">
              No blog posts available.
            </p>
          </motion.div>
        </div>
      ) : (
        <>
          {/* ── Featured Section (Desktop) ── */}
          <div className="hidden lg:block">
            <FeaturedBlog blogs={filteredBlogs} />
          </div>

          {/* ── Latest Articles (Desktop) ── */}
          <div className="hidden lg:block">
            <LatestArticles blogs={filteredBlogs} />
          </div>

          {/* ── Mobile: Swipe Stack ── */}
          <div className="lg:hidden px-4 sm:px-6 pb-20">
            <SwipeStack
              items={filteredBlogs}
              renderCard={(blog: BlogDoc) => <BlogCard blog={blog} />}
              onSwipeRight={(blog: BlogDoc) => {
                window.location.href = `/blog/${blog.slug}`;
              }}
              emptyState={
                <div className="text-center py-20">
                  <p className="text-slate-600 text-xs uppercase tracking-widest font-bold mb-6">
                    No more posts to show.
                  </p>
                  <button
                    onClick={() => setActiveCategory("ALL")}
                    className="px-8 py-3 border border-blue-500/30 text-blue-400 rounded-full font-black uppercase tracking-widest text-[10px]"
                  >
                    Reset Filter
                  </button>
                </div>
              }
            />
            <div className="text-center mt-4">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-700 animate-pulse">
                Swipe Right to Read • Swipe Left to Skip
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
