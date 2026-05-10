"use client";

import { useState, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Brain, Palette, Megaphone, PenTool, Globe, Layout, Layers, FileText } from "lucide-react";
import { SeoInput, SeoTextarea, SeoCTAFields, SeoLayout, SeoSectionCard } from "@/Components/Admin/Seo/SeoComponents";
import type { ServicePageSEO } from "@/Components/Admin/Seo/types";

const servicePages: { id: string; label: string; icon: any; color: string }[] = [
  { id: "webDev", label: "Web Development", icon: Code2, color: "text-blue-400" },
  { id: "aiStrategy", label: "AI Digital Strategy", icon: Brain, color: "text-purple-400" },
  { id: "uiux", label: "UI/UX Design", icon: Palette, color: "text-pink-400" },
  { id: "branding", label: "Branding", icon: Megaphone, color: "text-yellow-400" },
  { id: "graphicDesign", label: "Graphic Design", icon: PenTool, color: "text-green-400" },
];

const makeService = (label: string): ServicePageSEO => ({
  metaTitle: `${label} Agency | XELTR`,
  metaDescription: `Professional ${label.toLowerCase()} services by XELTR. We deliver results-driven solutions tailored to your brand.`,
  focusKeyword: label,
  canonicalUrl: `https://xeltr.com/services/${label.toLowerCase().replace(/ /g, "-")}`,
  ogImage: "",
  mainHeading: `${label.toUpperCase()}. REIMAGINED.`,
  highlightedWord: label.split(" ")[0].toUpperCase(),
  topLabel: "Expert Service",
  description: `Our ${label} service is built to drive growth, maximize ROI, and create lasting impressions for your brand.`,
  primaryCTAText: "GET STARTED",
  primaryCTALink: "/contact",
  secondaryCTAText: "VIEW WORK",
  secondaryCTALink: "/work",
  content: `## ${label}\n\nWrite detailed page content here. This will be indexed by search engines and shown on the service page.`,
  status: "published",
  lastUpdated: "Today",
});

const defaultData = Object.fromEntries(servicePages.map((s) => [s.id, makeService(s.label)])) as Record<string, ServicePageSEO>;

export default function ServicesSEOPage() {
  const [data, setData] = useState<Record<string, ServicePageSEO>>(defaultData);
  const [activeService, setActiveService] = useState("webDev");
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [activeService]: { ...prev[activeService], [name]: value } }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSaving(false);
  };

  const current = data[activeService];

  return (
    <SeoLayout
      title="Services SEO"
      subtitle="Manage on-page search optimization for every individual service landing page"
      badge="Service Ecosystem"
      badgeColor="purple"
      headerIcon={<Layers size={28} />}
      onSave={handleSave}
      onReset={() => setData(defaultData)}
      isSaving={isSaving}
      scoreProps={{
        metaTitle: current.metaTitle,
        metaDescription: current.metaDescription,
        focusKeyword: current.focusKeyword,
        canonicalUrl: current.canonicalUrl,
      }}
      previewProps={{
        metaTitle: current.metaTitle,
        metaDescription: current.metaDescription,
        canonicalUrl: current.canonicalUrl,
        ogImage: current.ogImage,
      }}
    >
      {/* Service Selection Tabs */}
      <div className="bg-white/[0.03] border border-white/10 p-2 rounded-2xl flex flex-wrap gap-2 shadow-inner">
        {servicePages.map((s) => {
          const Icon = s.icon;
          const isActive = activeService === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveService(s.id)}
              className={`flex-1 min-w-[180px] flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={14} className={isActive ? "text-white" : s.color} />
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeService}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Metadata */}
          <SeoSectionCard title="Search Engine Metadata" status={current.status} lastUpdated={current.lastUpdated} icon={<Globe size={18} />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <SeoInput label="Meta Title" name="metaTitle" value={current.metaTitle} onChange={handleChange} maxLength={60} placeholder="Service page title..." />
              </div>
              <div className="md:col-span-2">
                <SeoTextarea label="Meta Description" name="metaDescription" value={current.metaDescription} onChange={handleChange} maxLength={160} rows={3} placeholder="Concise summary for search engines..." />
              </div>
              <SeoInput label="Focus Keyword" name="focusKeyword" value={current.focusKeyword} onChange={handleChange} placeholder="e.g. Web Development Kerala" />
              <SeoInput label="Canonical URL" name="canonicalUrl" value={current.canonicalUrl} onChange={handleChange} placeholder="https://xeltr.com/services/..." />
            </div>
          </SeoSectionCard>

          {/* Hero Content */}
          <SeoSectionCard title="Hero & Display Content" icon={<Layout size={18} />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SeoInput label="Top Label" name="topLabel" value={current.topLabel} onChange={handleChange} placeholder="Floating label text..." />
              <SeoInput label="Highlighted Word" name="highlightedWord" value={current.highlightedWord} onChange={handleChange} placeholder="Word to highlight in heading..." />
              <div className="md:col-span-2">
                 <SeoInput label="Main Heading" name="mainHeading" value={current.mainHeading} onChange={handleChange} placeholder="Primary landing page heading..." />
              </div>
              <div className="md:col-span-2">
                 <SeoTextarea label="Short Description" name="description" value={current.description} onChange={handleChange} rows={3} placeholder="Main service description..." />
              </div>
            </div>
          </SeoSectionCard>

          {/* Call to Actions */}
          <SeoSectionCard title="Action Targets" icon={<Megaphone size={18} />}>
            <SeoCTAFields
              primaryText={current.primaryCTAText}
              primaryLink={current.primaryCTALink}
              secondaryText={current.secondaryCTAText}
              secondaryLink={current.secondaryCTALink}
              onChange={handleChange}
            />
          </SeoSectionCard>

          {/* Deep Content */}
          <SeoSectionCard title="Rich SEO Content" icon={<FileText size={18} />}>
            <SeoTextarea 
                label="On-Page Detailed Text" 
                name="content" 
                value={current.content} 
                onChange={handleChange} 
                rows={10} 
                hint="Markdown supported. Use this to provide deep context for search crawlers." 
            />
          </SeoSectionCard>
        </motion.div>
      </AnimatePresence>
    </SeoLayout>
  );
}
