"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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

        {/* Items */}
        <div className="divide-y divide-border">
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
                className="group py-8 sm:py-10 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 md:gap-8 hover:bg-accent/50 px-3 sm:px-4 transition-colors rounded-2xl cursor-pointer"
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: `${item.accent}15`,
                      border: `1px solid ${item.accent}30`,
                    }}
                  >
                    <Icon
                      className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                      style={{ color: item.accent }}
                    />
                  </div>
                </div>

                {/* Content */}
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
      </div>
    </section>
  );
}
