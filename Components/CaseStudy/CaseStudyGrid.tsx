"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SwipeStack } from "@/Components/Common/SwipeStack";
import {
  ArrowUpRight,
  X,
  Globe,
  FileText,
  Layers,
  Image as ImageIcon,
  ExternalLink,
  Maximize2,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import GridBackground from "@/Components/Animations/GridBackground";

interface CaseStudyDoc {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  skills: string[];
  liveUrl?: string;
  pdfUrl?: string;
  mockupUrl?: string;
  posterUrl?: string;
  createdAt: string;
}

interface Props {
  initialData: CaseStudyDoc[];
}

const ACCENT_MAP: Record<string, string> = {
  "WEB DEVELOPMENT": "#3b82f6",
  "APP DEVELOPMENT": "#22c55e",
  "DIGITAL MARKETING": "#ec4899",
  BRANDING: "#f59e0b",
  "UI/UX DESIGN": "#a855f7",
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const },
  }),
};

// ─── Tab definitions ──────────────────────────────────────────────────────────
type TabKey = "live" | "pdf" | "mockup" | "poster";

interface TabDef {
  key: TabKey;
  label: string;
  icon: React.ReactNode;
  urlField: keyof CaseStudyDoc;
}

const TABS: TabDef[] = [
  { key: "live", label: "Live", icon: <Globe className="w-3.5 h-3.5" />, urlField: "liveUrl" },
  { key: "pdf", label: "PDF", icon: <FileText className="w-3.5 h-3.5" />, urlField: "pdfUrl" },
  { key: "mockup", label: "Mockup", icon: <Layers className="w-3.5 h-3.5" />, urlField: "mockupUrl" },
  { key: "poster", label: "Poster", icon: <ImageIcon className="w-3.5 h-3.5" />, urlField: "posterUrl" },
];

// ─── Mac Browser Frame ────────────────────────────────────────────────────────
function MacBrowserFrame({
  url,
  children,
  accent,
}: {
  url: string;
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="flex flex-col w-full h-full rounded-xl overflow-hidden shadow-2xl border border-border bg-card">
      <div className="flex items-center gap-3 px-4 py-3 shrink-0 bg-muted/30 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e] shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d4a017] shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29] shadow-sm" />
        </div>
        <div className="flex-1 mx-3">
          <div className="flex items-center gap-2 bg-background border border-border rounded-md px-3 py-1.5 text-[10px] font-medium text-muted-foreground truncate">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: accent }} />
            <span className="truncate opacity-80">{url || "about:blank"}</span>
          </div>
        </div>
        <Maximize2 className="w-3.5 h-3.5 text-muted-foreground/50" />
      </div>
      <div className="flex-1 bg-background overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}

// ─── Preview Overlay ──────────────────────────────────────────────────────────
function PreviewOverlay({
  cs,
  onClose,
}: {
  cs: CaseStudyDoc;
  onClose: () => void;
}) {
  const accent = ACCENT_MAP[cs.category] ?? "#3b82f6";
  const availableTabs = TABS.filter((t) => {
    const val = cs[t.urlField];
    return typeof val === "string" && val.trim() !== "";
  });

  const [activeTab, setActiveTab] = useState<TabKey>(availableTabs[0]?.key ?? "live");
  const currentTab = TABS.find((t) => t.key === activeTab)!;
  const currentUrl = (cs[currentTab?.urlField] as string) || "";

  const renderPreviewContent = () => {
    if (!currentUrl) return null;
    if (activeTab === "live" || activeTab === "pdf") {
      return (
        <iframe
          src={activeTab === "pdf" ? `${currentUrl}#toolbar=0&view=FitH` : currentUrl}
          className="w-full h-full border-0"
          title={`${cs.title} – Preview`}
        />
      );
    }
    return (
      <div className="relative w-full h-full overflow-auto flex items-start justify-center p-4 bg-muted/20">
        <img src={currentUrl} alt={cs.title} className="max-w-full rounded-lg shadow-2xl object-contain" style={{ maxHeight: "100%" }} />
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[999] flex items-center justify-center p-2 sm:p-4 md:p-8 bg-background/40 backdrop-blur-[32px]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40, filter: "blur(20px)" }}
        animate={{ scale: 1, opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ scale: 0.8, opacity: 0, y: 40, filter: "blur(20px)" }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 200,
          mass: 1
        }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl flex flex-col h-[90vh] md:h-[86vh] max-h-[900px]"
      >
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
            <span className="hidden xs:inline-block text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full whitespace-nowrap" style={{ color: accent, background: `${accent}18`, border: `1px solid ${accent}30` }}>{cs.category}</span>
            <h2 className="text-foreground font-bold text-lg md:text-xl uppercase tracking-tight truncate max-w-[150px] xs:max-w-xs md:max-w-sm">{cs.title}</h2>
          </div>
          <div className="flex items-center gap-3">
            {currentUrl && (
              <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-foreground border border-border bg-card px-4 py-2 rounded-lg transition-all shadow-sm">
                <ExternalLink size={14} /> Open
              </a>
            )}
            <button onClick={onClose} className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all shadow-sm"><X size={20} /></button>
          </div>
        </div>

        {/* Project Skills / Tech Stack */}
        {cs.skills && cs.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 px-2">
            {cs.skills.map((skill, idx) => (
              <span 
                key={idx} 
                className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-md bg-primary/5 border border-primary/10 text-primary/80"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {availableTabs.length > 0 && (
          <div className="flex items-center gap-1 mb-4 bg-card border border-border rounded-xl p-1 w-fit max-w-full overflow-x-auto shadow-xl shadow-black/5 no-scrollbar">
            {availableTabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                   className={`flex items-center gap-2 px-3 sm:px-5 py-2 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap ${isActive ? "text-white" : "text-muted-foreground hover:text-foreground"}`}
                  style={isActive ? { background: accent, boxShadow: `0 10px 20px ${accent}44` } : {}}
                >
                  {tab.icon} {tab.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="flex-1 min-h-0 shadow-[0_40px_100px_rgba(0,0,0,0.2)]">
          <MacBrowserFrame url={currentUrl} accent={accent}>
            {renderPreviewContent()}
          </MacBrowserFrame>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Grid ────────────────────────────────────────────────────────────────
export default function CaseStudyGrid({ initialData }: Props) {
  const [selected, setSelected] = useState<CaseStudyDoc | null>(null);
  const [active, setActive] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const allCategories = ["All", ...Array.from(new Set(initialData.map((c) => c.category)))];
  const filtered = active === "All" ? initialData : initialData.filter((c) => c.category === active);

  const previewCount = (cs: CaseStudyDoc) =>
    TABS.filter((t) => {
      const v = cs[t.urlField];
      return typeof v === "string" && v.trim() !== "";
    }).length;

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500 relative overflow-x-hidden pt-0">
      <GridBackground />

      {/* Hero */}
      <section className="relative w-full h-auto py-16 md:py-20 max-w-7xl mx-auto px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[600px] h-[250px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 md:gap-8"
        >
          <span className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] bg-primary/10 px-6 py-2 rounded-[4px] border border-primary/20 w-fit mx-auto">
            Our Portfolio
          </span>

          <h1 className="text-4xl md:text-[64px] font-bold leading-[1.1] uppercase tracking-tighter mb-6 mt-6">
            SELECTED WORKS
          </h1>

          <p className="text-muted-foreground text-base md:text-lg font-medium leading-relaxed max-w-2xl mb-10 mx-auto">
            A showcase of our finest digital creations — from immersive web experiences to powerful mobile applications.
          </p>
        </motion.div>
      </section>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto mb-8">
        {/* Mobile: horizontal scroll row */}
        <div className="flex flex-nowrap gap-2 overflow-x-auto no-scrollbar px-4 md:px-6 pb-3 md:flex-wrap md:justify-center md:overflow-visible">
          {allCategories.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`shrink-0 px-4 md:px-8 py-2 md:py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 border ${
                active === f
                  ? "bg-primary border-primary text-white shadow-2xl shadow-primary/30"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Content */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-32">

        {/* ── Desktop Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {filtered.map((cs, i) => {
              const accent = ACCENT_MAP[cs.category] ?? "#3b82f6";
              const pCount = previewCount(cs);
              return (
                <motion.div
                  key={cs._id}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -12, scale: 1.01 }}
                  className="group relative bg-card/20 backdrop-blur-sm border border-border/50 rounded-[32px] p-4 sm:p-5 overflow-hidden hover:border-primary/50 shadow-2xl shadow-black/5 transition-all duration-500 cursor-pointer"
                  onClick={() => setSelected(cs)}
                >
                  <div className="relative aspect-[4/3] rounded-[24px] overflow-hidden mb-6 transition-all duration-700 w-full">
                    <Image
                      src={cs.thumbnail}
                      alt={cs.title}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-700 z-10" />
                    
                    <div className="absolute top-4 left-4 z-[30] px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-xl border border-white/20 text-white shadow-xl" style={{ background: `${accent}DD` }}>
                      {cs.category}
                    </div>

                    {pCount > 0 && (
                      <div className="absolute top-4 right-4 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-xl border border-white/20 text-white shadow-xl" style={{ background: `${accent}DD` }}>
                        <Layers size={14} />
                        {pCount} VIEW{pCount > 1 ? "S" : ""}
                      </div>
                    )}
                  </div>
                  <div className="px-2 sm:px-4 pb-2">
                    <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors duration-500 mb-3">
                      {cs.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-6 line-clamp-6">
                      {cs.description}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-foreground group-hover:text-primary transition-colors duration-500">
                      VIEW PROJECT (PREVIEW)
                      <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all duration-500">
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-500" />
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[4px] w-0 group-hover:w-[60%] transition-all duration-700 rounded-t-full" style={{ background: accent }} />
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── Mobile Carousel with Arrow Controls ── */}
        <div className="md:hidden px-4 pb-20">
          <div className="relative overflow-hidden rounded-[2.5rem]">
            <AnimatePresence mode="wait" initial={false}>
              {(() => {
                const cs = filtered[activeIndex % filtered.length];
                if (!cs) return null;
                const accent = ACCENT_MAP[cs.category] ?? "#3b82f6";
                return (
                  <motion.div
                    key={cs._id}
                    initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-[2.5rem] p-5 overflow-hidden shadow-2xl"
                    onClick={() => setSelected(cs)}
                  >
                    <div className="relative aspect-[16/11] rounded-[1.5rem] overflow-hidden mb-6">
                      <Image
                        src={cs.thumbnail}
                        alt={cs.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                      
                      {/* Responsive Category Badge */}
                      <div
                        className="absolute top-4 left-4 z-[30] px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] backdrop-blur-md border border-white/20 text-white shadow-xl"
                        style={{ background: `${accent}DD` }}
                      >
                        {cs.category}
                      </div>
                    </div>

                    <div className="px-1 text-center">
                      <h3 className="text-2xl font-black uppercase tracking-tight leading-none mb-3">
                        {cs.title}
                      </h3>
                      <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-8 line-clamp-6 opacity-80">
                        {cs.description || "A premium digital experience crafted for impact and performance."}
                      </p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-border/20">
                        <div className="flex flex-col items-start text-left">
                          <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">View Project</span>
                          <span className="text-[12px] font-bold uppercase tracking-wider opacity-50">(Preview)</span>
                        </div>
                        <span className="w-12 h-12 rounded-full border border-border/60 flex items-center justify-center text-primary shadow-sm bg-primary/5">
                          <ArrowRight size={18} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between">
            {/* Dot indicators */}
            <div className="flex gap-2.5">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > (activeIndex % filtered.length) ? 1 : -1);
                    setActiveIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${i === (activeIndex % filtered.length) ? "w-8 bg-primary" : "w-2 bg-muted opacity-40 hover:opacity-100"}`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setDirection(-1);
                  setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
                }}
                className="h-11 w-11 rounded-full border border-border/60 flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary active:scale-90 transition-all shadow-sm"
                aria-label="Previous"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setDirection(1);
                  setActiveIndex((i) => (i + 1) % filtered.length);
                }}
                className="h-11 w-11 rounded-full bg-primary flex items-center justify-center text-white active:scale-90 transition-all shadow-xl shadow-primary/20"
                aria-label="Next"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </section>

      <AnimatePresence>
        {selected && <PreviewOverlay cs={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}
