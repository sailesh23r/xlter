"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowLeft,
  LineChart,
  Triangle,
  PenTool,
  TerminalSquare,
  MousePointerClick,
  Cpu,
  ExternalLink,
} from "lucide-react";

const items = [
  {
    id: "ai-strategy",
    title: "AI DIGITAL STRATEGY",
    desc: "Defining your path to digital market leadership.",
    tags: ["SEO", "GEO & AEO", "CONTENT MARKETING", "EMAIL MARKETING", "ANALYTICS & REPORTING"],
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
    desc: "Intuitive, user-centric interfaces designed to maximise conversion and engagement.",
    icon: MousePointerClick,
    tags: ["UI Design", "UX Research"],
    accent: "#a855f7",
  },
  {
    id: "web-dev",
    title: "WEB DEVELOPMENT",
    desc: "High-performance, scalable, and secure websites tailored to your business needs.",
    icon: TerminalSquare,
    tags: ["E-commerce", "Static Sites", "WordPress", "Dynamic Sites", "Shopify"],
    accent: "#22c55e",
  },
  {
    id: "soft-dev",
    title: "SOFTWARE DEVELOPMENT",
    desc: "Intelligent, fast, and scalable software solutions that elevate brands.",
    icon: Cpu,
    tags: ["Custom Software", "Maintenance & Support"],
    accent: "#10b981",
  },
];

const serviceRoutes: Record<string, string> = {
  "graphic-design": "/graphic-design",
  "web-dev": "/web-development",
  branding: "/branding",
  "ai-strategy": "/ai-strategy",
  "ui-ux": "/ui-ux",
  "soft-dev": "/soft-dev",
};

/* ─── Desktop row card ──────────────────────────────────────── */
function DesktopRow({ item }: { item: (typeof items)[number] }) {
  const Icon = item.icon;
  return (
    <div className="
      group relative w-full cursor-pointer rounded-[24px]
      flex items-start sm:items-center gap-6 lg:gap-12
      px-4 sm:px-8 lg:px-12
      py-10 sm:py-12 lg:py-16
      hover:bg-accent/40 transition-all duration-500
    ">
      {/* Icon */}
      <div
        className="
          w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
          shrink-0 rounded-full flex items-center justify-center
          transition-all duration-500 group-hover:scale-110 shadow-lg
        "
        style={{
          background: `${item.accent}15`,
          color: item.accent,
          border: `1px solid ${item.accent}25`,
        }}
      >
        <Icon className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h3 className="
          text-xl sm:text-2xl md:text-3xl lg:text-[36px]
          font-black uppercase tracking-tight leading-tight
          group-hover:text-primary transition-colors
        ">
          {item.title}
        </h3>
        <p className="
          mt-3 mb-5 max-w-3xl line-clamp-2
          text-sm sm:text-base lg:text-lg
          text-muted-foreground font-medium leading-relaxed
        ">
          {item.desc}
        </p>
        <div className="flex flex-wrap gap-2 md:gap-4">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="
                text-[10px] sm:text-11px md:text-sm
                font-semibold px-3 sm:px-4 py-1.5 sm:py-2
                rounded-full uppercase tracking-wider
                hover:scale-105 transition-transform duration-300
              "
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
      </div>

      {/* Arrow */}
      <motion.div
        whileHover={{ scale: 1.1, x: 8 }}
        whileTap={{ scale: 0.95 }}
        className="
          hidden sm:flex shrink-0
          w-12 h-12 md:w-16 md:h-16
          rounded-full bg-muted/50 border border-border
          text-muted-foreground group-hover:bg-primary group-hover:text-white
          items-center justify-center shadow-md transition-colors
        "
      >
        <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
      </motion.div>
    </div>
  );
}

/* ─── Mobile carousel card ──────────────────────────────────── */
function MobileServiceCard({ item }: { item: (typeof items)[number] }) {
  const Icon = item.icon;
  return (
    <div className="flex flex-col h-full">
      {/* Hero icon band */}
      <div className="relative flex items-center justify-between px-6 py-7">
        {/* Large icon with glow */}
        <div className="flex items-center gap-4 w-full">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
            style={{
              background: `${item.accent}18`,
              color: item.accent,
              border: `1.5px solid ${item.accent}35`,
              boxShadow: `0 0 28px ${item.accent}22`,
            }}
          >
            <Icon className="w-8 h-8" />
          </div>
          <div
            className="h-px flex-1 opacity-20"
            style={{ background: item.accent }}
          />
        </div>
      </div>

      {/* Content body */}
      <div className="flex flex-col flex-1 px-6 pt-5 pb-6 gap-4">
        <div>
          <h3 className="text-[22px] font-black uppercase tracking-tight leading-tight mb-2">
            {item.title}
          </h3>
          <p className="text-muted-foreground text-[13px] font-medium leading-relaxed">
            {item.desc}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
              style={{
                background: `${item.accent}12`,
                color: item.accent,
                border: `1px solid ${item.accent}30`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* CTA bar */}
      <div className="mx-6 mb-6 flex items-center justify-between cursor-pointer transition-opacity hover:opacity-80">
        <span
          className="text-[10px] font-black uppercase tracking-[0.2em]"
          style={{ color: item.accent }}
        >
          View Service
        </span>
        <motion.div
          whileHover={{ x: 4 }}
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: item.accent, color: "#fff" }}
        >
          <ArrowRight size={13} />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────── */
export default function Ecosystem() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goNext = () => {
    setDirection(1);
    setActiveIndex((i) => (i + 1) % items.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setActiveIndex((i) => (i - 1 + items.length) % items.length);
  };

  return (
    <section
      id="services"
      className="bg-transparent text-foreground relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-tight">
            ECO<span className="text-primary">SYSTEM.</span>
          </h2>
          <p className="text-muted-foreground mt-4 sm:mt-6 max-w-3xl mx-auto text-sm sm:text-base md:text-lg font-medium leading-relaxed">
            A multi-disciplinary approach to modern brand building, where design
            meets data and code.
          </p>
        </motion.div>

        {/* ── Desktop: full vertical list ── */}
        <div className="hidden lg:block divide-y divide-border">
          {items.map((item) => {
            const href = serviceRoutes[item.id] ?? null;
            const row = <DesktopRow item={item} />;
            return href ? (
              <Link href={href} key={item.id}>
                {row}
              </Link>
            ) : (
              <div key={item.id}>{row}</div>
            );
          })}
        </div>

        {/* ── Mobile / Tablet: carousel ── */}
        <div className="lg:hidden">
          {/* Card shell */}
          <div
            className="relative overflow-hidden rounded-3xl border bg-card shadow-xl"
            style={{ borderColor: `${items[activeIndex].accent}30` }}
          >
            {/* Animated accent line at top */}
            <motion.div
              key={items[activeIndex].accent}
              layoutId="accent-bar"
              className="h-[3px] w-full"
              style={{ background: items[activeIndex].accent }}
            />

            <AnimatePresence mode="wait" initial={false}>
              {(() => {
                const item = items[activeIndex];
                const href = serviceRoutes[item.id] ?? null;
                const card = <MobileServiceCard item={item} />;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: direction > 0 ? 56 : -56 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -56 : 56 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {href ? <Link href={href}>{card}</Link> : card}
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-5 flex items-center justify-between">
            {/* Dot indicators */}
            <div className="flex gap-2">
              {items.map((it, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > activeIndex ? 1 : -1); setActiveIndex(i); }}
                  aria-label={`Go to service ${i + 1}`}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === activeIndex ? "24px" : "8px",
                    background: i === activeIndex ? it.accent : "var(--muted)",
                  }}
                />
              ))}
            </div>

            {/* Counter + arrows */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-muted-foreground tabular-nums">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(items.length).padStart(2, "0")}
              </span>
              <button
                onClick={goPrev}
                aria-label="Previous service"
                className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary active:scale-95 transition-all"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={goNext}
                aria-label="Next service"
                className="h-10 w-10 rounded-full bg-primary border border-primary flex items-center justify-center text-white active:scale-95 transition-all"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
