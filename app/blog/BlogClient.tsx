"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GridBackground from "@/Components/Animations/GridBackground";
import BlogCard from "@/Components/Blog/BlogCard";
import { SwipeStack } from "@/Components/Common/SwipeStack";

interface BlogDoc {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  thumbnail: string;
  createdAt: string;
}

interface Category {
  _id: string;
  name: string;
}

export default function BlogClient({ 
  blogs, 
  categories, 
  initialCategory = "ALL" 
}: { 
  blogs: BlogDoc[], 
  categories: Category[], 
  initialCategory?: string 
}) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const filteredBlogs = activeCategory === "ALL" 
    ? blogs 
    : blogs.filter(blog => blog.category.toUpperCase() === activeCategory.toUpperCase());

  const categoryList = ["ALL", ...categories.map(c => c.name.toUpperCase())];

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  const words = "THINK. BUILD. GROW.".split(" ");

  return (
    <div className="bg-background text-foreground min-h-screen pt-0 pb-20 transition-colors duration-500 relative">
      <GridBackground />
      
      {/* Hero */}
      <section className="relative w-full h-auto py-16 md:py-20 max-w-7xl mx-auto px-6 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] bg-primary/10 px-6 py-2 rounded-[4px] border border-primary/20 w-fit mb-4 mx-auto"
        >
          OUR BLOG
        </motion.p>
        
        <h1 className="text-4xl md:text-[64px] font-bold leading-[1.1] uppercase tracking-tighter mb-6 mt-6">
          {words.map((word, i) => (
            <motion.span
              key={i}
              variants={textVariants}
              custom={i}
              initial="hidden"
              animate="visible"
              className="inline-block mr-[0.3em]"
            >
              {word === "BUILD." ? <span className="text-primary">{word}</span> : word}
            </motion.span>
          ))}
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground text-sm md:text-lg font-medium leading-relaxed max-w-xl mx-auto"
        >
          Actionable tips, tech trends, and real-world strategies to level up
          your digital journey.
        </motion.p>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex justify-center gap-4 mb-16 flex-wrap">
        {categoryList.map((item) => (
          <button
            key={item}
            onClick={() => setActiveCategory(item)}
            className={`px-8 py-3 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
              activeCategory === item
                ? "bg-primary border-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 pb-20">
        {filteredBlogs.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg uppercase tracking-widest font-bold opacity-50">No posts found in this category.</p>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredBlogs.map((blog, i) => (
                <motion.div
                  key={blog._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <BlogCard
                    id={blog._id}
                    slug={blog.slug}
                    title={blog.title}
                    category={blog.category}
                    description={blog.description}
                    image={blog.thumbnail}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Mobile Swipe Section */}
      <div className="md:hidden px-6 pb-20">
        <SwipeStack
          items={filteredBlogs}
          renderCard={(blog) => (
            <BlogCard
              id={blog._id}
              slug={blog.slug}
              title={blog.title}
              category={blog.category}
              description={blog.description}
              image={blog.thumbnail}
            />
          )}
          onSwipeRight={(blog) => {
            window.location.href = `/blog/${blog.slug}`;
          }}
          emptyState={
            <div className="text-center py-20">
              <p className="text-muted-foreground text-xs uppercase tracking-widest font-bold opacity-50 mb-6">No more posts to show.</p>
              <button 
                onClick={() => setActiveCategory("All")}
                className="px-8 py-3 border border-primary text-primary rounded-full font-black uppercase tracking-widest text-[10px]"
              >
                Reset Filter
              </button>
            </div>
          }
        />
        <div className="text-center mt-4">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground animate-pulse">
            Swipe Right to Read • Swipe Left to Skip
          </p>
        </div>
      </div>
    </div>
  );
}
