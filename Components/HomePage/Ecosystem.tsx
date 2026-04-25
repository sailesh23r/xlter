"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SwipeStack } from "../Common/SwipeStack";
import {
  ArrowRight,
  LineChart,
  Triangle,
  PenTool,
  TerminalSquare,
  MousePointerClick,
} from "lucide-react";
import GridBackground from "../Animations/GridBackground";

const items = [
  {
    id: "ai-strategy",
    title: "AI DIGITAL STRATEGY",
    desc: "Defining your path to digital market leadership.",
    tags: [],
    icon: LineChart,
    accent: "#3b82f6",
  },
  {
    id: "branding",
    title: "BRANDING & VISUAL IDENTITY",
    desc: "Crafting iconic visuals and resonant narratives.",
    icon: Triangle,
    tags: ["Logo Design", "Video Editing", "AI Branding Video"],
    accent: "#f59e0b",
  },
  {
    id: "graphic-design",
    title: "GRAPHIC DESIGN",
    desc: "Creative assets that command attention across every digital and physical touchpoint.",
    icon: PenTool,
    tags: ["Brochure / Flyer Design", "Poster Design"],
    accent: "#ec4899",
  },
  {
    id: "ui-ux",
    title: "UI/UX DESIGN",
    desc: "Intuitive, user-centric interfaces designed to maximize conversion and engagement.",
    icon: MousePointerClick,
    tags: ["UI Design", "UX Research"],
    accent: "#a855f7",
  },
  {
    id: "web-dev",
    title: "WEB DEVELOPMENT",
    desc: "Building high-performance, scalable, and secure websites tailored to your business needs.",
    icon: TerminalSquare,
    tags: ["E-commerce", "Static Website", "Wordpress"],
    accent: "#22c55e",
  },
];

export default function Ecosystem() {
  return (
    <section
      id="services"
      className="bg-transparent text-foreground relative overflow-hidden py-20 px-6"
    >
      <GridBackground />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-[42px] font-bold uppercase tracking-tighter leading-tight">
            <span className="text-primary">ECO</span>
            <span className="text-foreground">SYSTEM.</span>
          </h2>
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
            A multi-disciplinary approach to modern brand building, where design
            meets data and code.
          </p>
        </motion.div>

        {/* Desktop List View */}
        <div className="hidden md:block divide-y divide-border">
          {items.map((item, i) => {
            const Icon = item.icon;
            const href = item.id === "graphic-design" ? "/graphic-design" : 
                         item.id === "web-dev" ? "/web-development" : 
                         item.id === "branding" ? "/branding" :
                         item.id === "ai-strategy" ? "/ai-strategy" :
                         item.id === "ui-ux" ? "/ui-ux" : null;

            const CardContent = (
              <motion.div
                key={i}
                id={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group flex flex-col md:flex-row items-start md:items-center gap-8 py-12 px-4 hover:bg-accent/30 transition-all duration-500 rounded-[12px] cursor-pointer"
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg"
                  style={{
                    background: `${item.accent}15`,
                    color: item.accent,
                    border: `1px solid ${item.accent}25`,
                  }}
                >
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base md:text-lg font-medium max-w-2xl leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  {/* Tags */}
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3.5 md:px-5 py-1 sm:py-1.5 md:py-2 rounded-full uppercase tracking-wider transition-all duration-300 hover:scale-105"
                          style={{
                            background: `${item.accent}12`,
                            color: item.accent,
                            border: `1px solid ${item.accent}25`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Arrow */}
                <motion.div
                  whileHover={{ scale: 1.1, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-muted/50 border border-border text-muted-foreground group-hover:bg-primary group-hover:text-white flex items-center justify-center shadow-sm self-start md:self-center transition-colors"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </motion.div>
              </motion.div>
            );

            return href ? (
              <Link href={href} key={i}>
                {CardContent}
              </Link>
            ) : CardContent;
          })}
        </div>

        {/* Mobile Swipe Stack */}
        <div className="md:hidden">
          <SwipeStack
            items={items.map(item => ({ ...item, _id: item.id }))}
            onSwipeRight={(item) => {
              const href = item.id === "graphic-design" ? "/graphic-design" : 
                           item.id === "web-dev" ? "/web-development" : 
                           item.id === "branding" ? "/branding" :
                           item.id === "ai-strategy" ? "/ai-strategy" :
                           item.id === "ui-ux" ? "/ui-ux" : null;
              if (href) window.location.href = href;
            }}
            renderCard={(item) => {
              const Icon = item.icon;
              return (
                <div className="bg-card p-8 h-[450px] flex flex-col items-center text-center justify-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[4px]" style={{ background: item.accent }} />
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-xl"
                    style={{
                      background: `${item.accent}15`,
                      color: item.accent,
                      border: `1px solid ${item.accent}25`,
                    }}
                  >
                    <Icon size={48} />
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">{item.title}</h3>
                  <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {item.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full"
                        style={{
                          background: `${item.accent}12`,
                          color: item.accent,
                          border: `1px solid ${item.accent}25`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary">
                    LEARN MORE <ArrowRight size={14} />
                  </div>
                </div>
              );
            }}
          />
          <p className="text-center text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground animate-pulse mt-8">
            Swipe Right to Learn More • Swipe Left to Skip
          </p>
        </div>
      </div>
    </section>
  );
}
