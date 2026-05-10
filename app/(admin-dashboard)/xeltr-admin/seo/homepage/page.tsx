"use client";

import { useState, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Layers, Star, MessageSquare, HelpCircle, Home, Globe } from "lucide-react";
import { SeoInput, SeoTextarea, SeoCTAFields, SeoLayout, SeoSectionCard } from "@/Components/Admin/Seo/SeoComponents";
import { FAQManager } from "@/Components/Admin/Seo/FAQManager";
import type { HomepageSEOData, HeroSEO, SectionSEO, FAQSectionSEO } from "@/Components/Admin/Seo/types";

const defaultHero: HeroSEO = {
  metaTitle: "Digital Agency in Kerala | XELTR",
  metaDescription: "XELTR builds high-performance websites, branding systems, SEO strategies and digital experiences.",
  focusKeyword: "Digital Agency Kerala",
  canonicalUrl: "https://xeltr.com",
  ogImage: "",
  mainHeading: "EVERYTHING DIGITAL. DONE RIGHT.",
  highlightedWord: "DIGITAL",
  topLabel: "Digital Excellence Studio",
  description: "We craft compelling digital solutions—from high-performance websites to branding and AI-driven experiences.",
  primaryCTAText: "EXPLORE SERVICES",
  primaryCTALink: "/services",
  secondaryCTAText: "VIEW PORTFOLIO",
  secondaryCTALink: "/work",
  status: "published",
  lastUpdated: "2 hours ago",
};

const defaultSection = (title: string): SectionSEO => ({
  metaTitle: `${title} | XELTR`,
  metaDescription: `Discover our ${title.toLowerCase()} at XELTR digital agency.`,
  focusKeyword: title,
  canonicalUrl: "https://xeltr.com",
  mainHeading: title.toUpperCase(),
  description: `This is the ${title} section of the homepage.`,
  status: "published",
  lastUpdated: "Today",
});

const defaultData: HomepageSEOData = {
  hero: defaultHero,
  ecosystem: defaultSection("Ecosystem"),
  selectedWorks: defaultSection("Selected Works"),
  clientVoices: defaultSection("Client Voices"),
  faq: { ...defaultSection("FAQ"), faqs: [
    { id: "1", question: "What services does XELTR offer?", answer: "XELTR offers web development, branding, AI strategy, UI/UX design and more." },
    { id: "2", question: "Where is XELTR based?", answer: "XELTR is based in Kerala, India, serving clients globally." },
  ]},
};

const tabs = [
  { id: "hero", label: "Hero Section", icon: Layout },
  { id: "ecosystem", label: "Ecosystem", icon: Layers },
  { id: "selectedWorks", label: "Selected Works", icon: Star },
  { id: "clientVoices", label: "Client Voices", icon: MessageSquare },
  { id: "faq", label: "FAQ Section", icon: HelpCircle },
];

type SectionKey = keyof HomepageSEOData;

export default function HomepageSEOPage() {
  const [data, setData] = useState<HomepageSEOData>(defaultData);
  const [activeTab, setActiveTab] = useState<SectionKey>("hero");
  const [isSaving, setIsSaving] = useState(false);

  const updateSection = (section: SectionKey, field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const handleChange = (section: SectionKey) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateSection(section, e.target.name, e.target.value);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSaving(false);
  };

  const handleReset = () => setData(defaultData);

  const current = data[activeTab] as any;

  return (
    <SeoLayout
      title="Homepage SEO"
      subtitle="Optimize every section of your main landing page for search engine visibility"
      badge="Homepage Management"
      badgeColor="blue"
      headerIcon={<Home size={28} />}
      onSave={handleSave}
      onReset={handleReset}
      isSaving={isSaving}
      scoreProps={{
        metaTitle: current?.metaTitle || "",
        metaDescription: current?.metaDescription || "",
        focusKeyword: current?.focusKeyword || "",
        canonicalUrl: current?.canonicalUrl || "",
      }}
      previewProps={{
        metaTitle: current?.metaTitle || "",
        metaDescription: current?.metaDescription || "",
        canonicalUrl: current?.canonicalUrl || "",
        ogImage: current?.ogImage,
      }}
    >
      {/* Tab Navigation */}
      <div className="bg-white/[0.03] border border-white/10 p-2 rounded-2xl flex flex-wrap gap-2 shadow-inner">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SectionKey)}
              className={`flex-1 min-w-[150px] flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                isActive
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Form Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* SEO Meta Section */}
          <SeoSectionCard 
            title="Search Engine Metadata" 
            status={current?.status} 
            lastUpdated={current?.lastUpdated}
            icon={<Globe size={18} />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2">
                <SeoInput 
                    label="Meta Title" 
                    name="metaTitle" 
                    value={current?.metaTitle || ""} 
                    onChange={handleChange(activeTab)} 
                    maxLength={60} 
                    placeholder="Enter the title for search engines..." 
                />
              </div>
              <div className="md:col-span-2">
                <SeoTextarea 
                    label="Meta Description" 
                    name="metaDescription" 
                    value={current?.metaDescription || ""} 
                    onChange={handleChange(activeTab)} 
                    maxLength={160} 
                    rows={3} 
                    placeholder="Provide a concise summary for search results..." 
                />
              </div>
              <SeoInput 
                label="Focus Keyword" 
                name="focusKeyword" 
                value={current?.focusKeyword || ""} 
                onChange={handleChange(activeTab)} 
                placeholder="e.g. Digital Agency" 
              />
              <SeoInput 
                label="Canonical URL" 
                name="canonicalUrl" 
                value={current?.canonicalUrl || ""} 
                onChange={handleChange(activeTab)} 
                placeholder="https://xeltr.com" 
              />
            </div>
          </SeoSectionCard>

          {/* Section Content Section */}
          <SeoSectionCard title="On-Page Display Content" icon={<Layout size={18} />}>
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                    <SeoInput 
                        label="Main Heading" 
                        name="mainHeading" 
                        value={current?.mainHeading || ""} 
                        onChange={handleChange(activeTab)} 
                        placeholder="Primary heading text..." 
                    />
                </div>
                {current?.highlightedWord !== undefined && (
                    <SeoInput 
                        label="Highlighted Word" 
                        name="highlightedWord" 
                        value={current?.highlightedWord || ""} 
                        onChange={handleChange(activeTab)} 
                        placeholder="Keyword to emphasize..." 
                    />
                )}
                {current?.topLabel !== undefined && (
                    <SeoInput 
                        label="Top Label" 
                        name="topLabel" 
                        value={current?.topLabel || ""} 
                        onChange={handleChange(activeTab)} 
                        placeholder="Floating text above heading..." 
                    />
                )}
              </div>
              <SeoTextarea 
                label="Section Description" 
                name="description" 
                value={current?.description || ""} 
                onChange={handleChange(activeTab)} 
                rows={4} 
                placeholder="Marketing copy for this section..." 
              />
            </div>
          </SeoSectionCard>

          {/* CTAs — Hero only */}
          {activeTab === "hero" && (
            <SeoSectionCard title="Interactive Call-to-Actions" icon={<MessageSquare size={18} />}>
              <SeoCTAFields
                primaryText={data.hero.primaryCTAText}
                primaryLink={data.hero.primaryCTALink}
                secondaryText={data.hero.secondaryCTAText}
                secondaryLink={data.hero.secondaryCTALink}
                onChange={handleChange("hero")}
              />
            </SeoSectionCard>
          )}

          {/* FAQs — FAQ section only */}
          {activeTab === "faq" && (
            <SeoSectionCard title="Structured FAQ Data" icon={<HelpCircle size={18} />}>
              <FAQManager
                faqs={(data.faq as FAQSectionSEO).faqs}
                onChange={(faqs) => setData((prev) => ({ ...prev, faq: { ...prev.faq, faqs } }))}
              />
            </SeoSectionCard>
          )}
        </motion.div>
      </AnimatePresence>
    </SeoLayout>
  );
}
