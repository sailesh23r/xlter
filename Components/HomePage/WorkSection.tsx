"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Loader2, ArrowRight } from "lucide-react";
import GridBackground from "../Animations/GridBackground";

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

  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await fetch("/api/casestudies");
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

  return (
    <section id="work" className="bg-transparent text-foreground py-20 px-6 relative">
      <GridBackground />
      <div className="max-w-7xl mx-auto">
        {/* Centered Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <h2 className="text-[32px] md:text-[42px] lg:text-[56px] font-bold uppercase tracking-tighter">
              SELECTED WORKS
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-medium leading-relaxed opacity-60">
              A showcase of our most impactful digital solutions and creative transformations.
            </p>
          </motion.div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Cards Grid */}
        {!loading && (
          <div className="space-y-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {casestudies.length > 0
                ? casestudies.map((cs, i) => {
                  const accent = ACCENT_MAP[cs.category] ?? "#3b82f6";
                  return (
                    <Link href="/casestudy" key={cs._id}>
                      <motion.div
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover={{ y: -10 }}
                        className="group relative bg-card border border-border rounded-[16px] overflow-hidden shadow-2xl shadow-black/5 hover:border-primary/30 transition-all duration-500 h-full flex flex-col"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-full h-64 overflow-hidden bg-muted">
                          <Image
                            src={cs.thumbnail}
                            alt={cs.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

                          {/* Category badge */}
                          <div
                            className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase backdrop-blur-md border border-white/10 text-white"
                            style={{ background: `${accent}80` }}
                          >
                            {cs.category}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 flex-1 flex flex-col">
                          <h3 className="text-2xl font-bold uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
                            {cs.title}
                          </h3>
                          <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-6 opacity-80 line-clamp-2">
                            {cs.description}
                          </p>

                          <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
                            <span className="text-[10px] font-black tracking-widest uppercase text-primary">View Project</span>
                            <ArrowUpRight className="w-4 h-4 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })
                : [1, 2, 3].map((_, i) => (
                  <div key={i} className="h-[450px] bg-card/50 border border-border rounded-[16px] animate-pulse" />
                ))
              }
            </div>

            {/* Bottom-Right View All Button */}
            <div className="flex justify-end">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/casestudy"
                  className="group relative h-14 px-10 rounded-full overflow-hidden border border-border text-foreground font-black uppercase tracking-[0.2em] text-[10px] flex items-center gap-4 transition-all duration-300"
                >
                  <div className="absolute w-2 h-2 bg-primary rounded-full left-6 group-hover:scale-[25] transition-transform duration-700 ease-in-out -z-0 opacity-0 group-hover:opacity-10" />
                  <span className="relative z-10 flex items-center gap-4 group-hover:translate-x-1 transition-transform">
                    VIEW ALL PORTFOLIOS <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}