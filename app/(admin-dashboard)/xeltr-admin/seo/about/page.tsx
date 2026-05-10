"use client";

import { useState, type ChangeEvent } from "react";
import { Info, Globe, Layout, FileText, Users } from "lucide-react";
import { SeoInput, SeoTextarea, SeoLayout, SeoSectionCard, SeoCTAFields } from "@/Components/Admin/Seo/SeoComponents";
import type { AboutPageSEO } from "@/Components/Admin/Seo/types";

const defaultData: AboutPageSEO = {
  metaTitle: "About XELTR | Digital Agency Kerala",
  metaDescription: "Learn about XELTR — a digital agency built on excellence, creativity, and results. Meet our team and mission.",
  focusKeyword: "About XELTR digital agency",
  canonicalUrl: "https://xeltr.com/about",
  ogImage: "",
  mainHeading: "WE BUILD. WE BRAND. WE GROW.",
  highlightedWord: "BUILD",
  topLabel: "Our Story",
  description: "XELTR was born from the belief that every brand deserves world-class digital experiences. Our team of designers, developers, and strategists works to make that happen.",
  primaryCTAText: "MEET THE TEAM",
  primaryCTALink: "/about#team",
  secondaryCTAText: "OUR WORK",
  secondaryCTALink: "/work",
  content: "## About XELTR\n\nWe are a full-service digital agency based in Kerala, India. Write detailed about page content here.",
  status: "published",
  lastUpdated: "Yesterday",
};

export default function AboutSEOPage() {
  const [data, setData] = useState<AboutPageSEO>(defaultData);
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
      title="About Page SEO"
      subtitle="Craft the narrative and metadata for your agency's mission and team page"
      badge="Agency Profile"
      badgeColor="pink"
      headerIcon={<Users size={28} />}
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
        <SeoSectionCard title="Search Engine Metadata" status={data.status} lastUpdated={data.lastUpdated} icon={<Globe size={18} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
                <SeoInput label="Meta Title" name="metaTitle" value={data.metaTitle} onChange={handleChange} maxLength={60} placeholder="About us page title..." />
            </div>
            <div className="md:col-span-2">
                <SeoTextarea label="Meta Description" name="metaDescription" value={data.metaDescription} onChange={handleChange} maxLength={160} rows={3} placeholder="Concise agency summary..." />
            </div>
            <SeoInput label="Focus Keyword" name="focusKeyword" value={data.focusKeyword} onChange={handleChange} placeholder="e.g. Agency Mission" />
            <SeoInput label="Canonical URL" name="canonicalUrl" value={data.canonicalUrl} onChange={handleChange} placeholder="https://xeltr.com/about" />
          </div>
        </SeoSectionCard>

        {/* Hero Section Content */}
        <SeoSectionCard title="Identity & Brand Story" icon={<Layout size={18} />}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SeoInput label="Top Label" name="topLabel" value={data.topLabel} onChange={handleChange} placeholder="Floating label text..." />
              <SeoInput label="Highlighted Word" name="highlightedWord" value={data.highlightedWord} onChange={handleChange} placeholder="Word to highlight in hero..." />
              <div className="md:col-span-2">
                 <SeoInput label="Main Heading" name="mainHeading" value={data.mainHeading} onChange={handleChange} placeholder="Primary landing page heading..." />
              </div>
              <div className="md:col-span-2">
                 <SeoTextarea label="Introduction Text" name="description" value={data.description} onChange={handleChange} rows={4} placeholder="Main intro description..." />
              </div>
           </div>
        </SeoSectionCard>

        {/* Call to Actions */}
        <SeoSectionCard title="Engagement Points" icon={<Users size={18} />}>
            <SeoCTAFields
              primaryText={data.primaryCTAText}
              primaryLink={data.primaryCTALink}
              secondaryText={data.secondaryCTAText}
              secondaryLink={data.secondaryCTALink}
              onChange={handleChange}
            />
        </SeoSectionCard>

        {/* Body Content */}
        <SeoSectionCard title="Rich Page Content" icon={<FileText size={18} />}>
          <SeoTextarea 
            label="Detailed Agency Narrative" 
            name="content" 
            value={data.content} 
            onChange={handleChange} 
            rows={10} 
            hint="Markdown supported. Use this to describe your history, team, and values in detail." 
          />
        </SeoSectionCard>
      </div>
    </SeoLayout>
  );
}
