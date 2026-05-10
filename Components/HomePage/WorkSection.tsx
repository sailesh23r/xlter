"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import Magnetic from "../Animations/Magnetic";

interface CaseStudyDoc {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  skills: string[];
  createdAt: string;
}

const ACCENT_MAP: Record<string, string> = {
  "WEB DEVELOPMENT": "#3b82f6",
  "APP DEVELOPMENT": "#22c55e",
  "DIGITAL MARKETING": "#ec4899",
  BRANDING: "#f59e0b",
  "UI/UX DESIGN": "#a855f7",
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] as any },
  }),
};

export default function Work() {
  const [casestudies, setCasestudies] = useState<CaseStudyDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await fetch("/api/admin/content/casestudy");
        const data = await res.json();
        if (data.success && data.casestudies?.length > 0) {
          setCasestudies(data.casestudies.slice(0, 3));
        }
      } catch (err) {
        console.error("Failed to fetch case studies:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLatest();
  }, []);

  const goNext = () => {
    setDirection(1);
    setActiveIndex((i) => (i + 1) % casestudies.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex((i) => (i - 1 + casestudies.length) % casestudies.length);
  };

  return (
    <section id="work" className="bg-transparent text-foreground py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto">

        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-tight">
              SELECTED <span className="text-primary">WORKS</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-medium leading-relaxed opacity-60">
              A showcase of our most impactful digital solutions and creative transformations.
            </p>
          </motion.div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Desktop Grid */}
        {!loading && (
          <div className="lg:block space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {casestudies.map((cs, i) => {
                const accent = ACCENT_MAP[cs.category] ?? "#3b82f6";
                return (
                  <Link href="/casestudy" key={cs._id}>
                    <motion.div
                      custom={i}
                      variants={cardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      className="group relative bg-card border border-border/40 rounded-[32px] overflow-hidden hover:border-primary/50 transition-all duration-700 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                    >
                      {/* Thumbnail Container */}
                      <div className="relative aspect-[16/11] overflow-hidden">
                        <Image
                          src={cs.thumbnail}
                          alt={cs.title}
                          fill
                          sizes="(max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        {/* Category Badge - Responsive Glassmorphism */}
                        <div
                          className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[8px] sm:text-[10px] font-bold uppercase tracking-[0.15em] backdrop-blur-md border border-white/20 text-white shadow-lg"
                          style={{ background: `${accent}CC` }}
                        >
                          {cs.category}
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-6 md:p-8">
                        <div className="flex flex-col gap-3 mb-8">
                          <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-primary transition-colors duration-500 leading-[1.1]">
                            {cs.title}
                          </h3>
                          <p className="text-muted-foreground text-sm font-medium leading-relaxed line-clamp-2 opacity-80">
                            {cs.description}
                          </p>
                        </div>

                      {/* Footer Link Removed */}
                    </div>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* View All */}
            <div className="flex justify-end">
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Magnetic>
                  <Link
                    href="/casestudy"
                    className="group relative h-14 px-10 rounded-full overflow-hidden border border-border text-foreground font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-4 transition-all duration-300"
                  >
                    <div className="absolute w-2 h-2 bg-primary rounded-full left-6 group-hover:scale-[25] transition-transform duration-700 ease-in-out -z-0 opacity-0 group-hover:opacity-10" />
                    <span className="relative z-10 flex items-center gap-4 group-hover:translate-x-1 transition-transform">
                      VIEW ALL PORTFOLIOS <ArrowRight size={14} />
                    </span>
                  </Link>
                </Magnetic>
              </motion.div>
            </div>
          </div>
        )}

        {/* Mobile Carousel with Arrow Controls */}
        {!loading && casestudies.length > 0 && (
          <div className="lg:hidden">
            {/* Card */}
            <div className="relative overflow-hidden rounded-[28px]">
              <AnimatePresence mode="wait" initial={false}>
                {(() => {
                  const cs = casestudies[activeIndex];
                  const accent = ACCENT_MAP[cs.category] ?? "#3b82f6";
                  return (
                    <motion.div
                      key={cs._id}
                      initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-card border border-border/40 rounded-[32px] overflow-hidden shadow-2xl"
                    >
                      {/* Image */}
                      <div className="relative aspect-[16/11] overflow-hidden">
                        <Image
                          src={cs.thumbnail}
                          alt={cs.title}
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                        {/* Responsive Category Badge */}
                        <div
                          className="absolute top-3 left-3 z-20 px-3 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-[0.15em] backdrop-blur-md border border-white/20 text-white shadow-lg"
                          style={{ background: `${accent}CC` }}
                        >
                          {cs.category}
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-8">
                        <h3 className="text-2xl font-black uppercase tracking-tight leading-tight mb-3">
                          {cs.title}
                        </h3>
                        <p className="text-muted-foreground text-sm font-medium leading-relaxed line-clamp-3 mb-8 opacity-80">
                          {cs.description}
                        </p>
                        {/* Footer Link Removed */}
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>

            {/* Controls row */}
            <div className="mt-8 flex items-center justify-between">
              {/* Dot indicators */}
              <div className="flex gap-2.5">
                {casestudies.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setDirection(i > activeIndex ? 1 : -1); setActiveIndex(i); }}
                    className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? "w-8 bg-primary" : "w-2 bg-muted opacity-40"}`}
                  />
                ))}
              </div>

              {/* Arrow buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={goPrev}
                  className="h-11 w-11 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary active:scale-90 transition-all shadow-sm"
                  aria-label="Previous"
                >
                  <ArrowLeft size={16} />
                </button>
                <button
                  onClick={goNext}
                  className="h-11 w-11 rounded-full bg-primary border border-primary flex items-center justify-center text-white active:scale-90 transition-all shadow-xl shadow-primary/20"
                  aria-label="Next"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
