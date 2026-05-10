"use client";

import { useState, type ChangeEvent } from "react";
import { Briefcase, Globe, Layout } from "lucide-react";
import { SeoInput, SeoTextarea, SeoLayout, SeoSectionCard } from "@/Components/Admin/Seo/SeoComponents";
import type { CaseStudyPageSEO } from "@/Components/Admin/Seo/types";

const defaultData: CaseStudyPageSEO = {
  metaTitle: "Case Studies | Digital Agency Work | XELTR",
  metaDescription: "Explore XELTR's portfolio of successful digital projects. Real results, real impact—web, branding, SEO, and AI strategy.",
  focusKeyword: "Digital Agency Case Studies",
  canonicalUrl: "https://xeltr.com/work",
  ogImage: "",
  mainHeading: "OUR WORK. YOUR FUTURE.",
  highlightedWord: "WORK",
  topLabel: "Success Stories",
  description: "We believe results speak louder than promises. Explore our curated portfolio of transformative digital engagements.",
  status: "published",
  lastUpdated: "Today",
};

export default function CaseStudySEOPage() {
  const [data, setData] = useState<CaseStudyPageSEO>(defaultData);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSaving(false);
  };

  return (
    <SeoLayout
      title="Case Study SEO"
      subtitle="Optimize the main portfolio gallery and work archive for search indexing"
      badge="Portfolio Optimization"
      badgeColor="green"
      headerIcon={<Briefcase size={28} />}
      onSave={handleSave}
      onReset={() => setData(defaultData)}
      isSaving={isSaving}
      scoreProps={{
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        focusKeyword: data.focusKeyword,
        canonicalUrl: data.canonicalUrl,
      }}
      previewProps={{
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        canonicalUrl: data.canonicalUrl,
        ogImage: data.ogImage,
      }}
    >
      <div className="space-y-8">
        {/* Metadata Section */}
        <SeoSectionCard 
            title="Search Engine Metadata" 
            status={data.status} 
            lastUpdated={data.lastUpdated}
            icon={<Globe size={18} />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
                <SeoInput label="Meta Title" name="metaTitle" value={data.metaTitle} onChange={handleChange} maxLength={60} placeholder="Archive page title..." />
            </div>
            <div className="md:col-span-2">
                <SeoTextarea label="Meta Description" name="metaDescription" value={data.metaDescription} onChange={handleChange} maxLength={160} rows={3} placeholder="Concise archive summary..." />
            </div>
            <SeoInput label="Focus Keyword" name="focusKeyword" value={data.focusKeyword} onChange={handleChange} placeholder="e.g. Best Digital Case Studies" />
            <SeoInput label="Canonical URL" name="canonicalUrl" value={data.canonicalUrl} onChange={handleChange} placeholder="https://xeltr.com/work" />
          </div>
        </SeoSectionCard>

        {/* Display Content Section */}
        <SeoSectionCard title="Archive Display Content" icon={<Layout size={18} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SeoInput label="Top Label" name="topLabel" value={data.topLabel} onChange={handleChange} placeholder="Small heading label..." />
            <SeoInput label="Highlighted Word" name="highlightedWord" value={data.highlightedWord} onChange={handleChange} placeholder="Word to highlight in hero..." />
            <div className="md:col-span-2">
               <SeoInput label="Main Heading" name="mainHeading" value={data.mainHeading} onChange={handleChange} placeholder="Primary archive heading..." />
            </div>
            <div className="md:col-span-2">
               <SeoTextarea label="Description" name="description" value={data.description} onChange={handleChange} rows={4} placeholder="Marketing text for the work page..." />
            </div>
          </div>
        </SeoSectionCard>
      </div>
    </SeoLayout>
  );
}
