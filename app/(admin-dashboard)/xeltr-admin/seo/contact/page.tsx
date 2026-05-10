"use client";

import { useState, type ChangeEvent } from "react";
import { MessageSquare, Globe, Layout, FileText, Send } from "lucide-react";
import { SeoInput, SeoTextarea, SeoLayout, SeoSectionCard, SeoCTAFields } from "@/Components/Admin/Seo/SeoComponents";
import type { ContactPageSEO } from "@/Components/Admin/Seo/types";

const defaultData: ContactPageSEO = {
  metaTitle: "Contact XELTR | Let's Build Together",
  metaDescription: "Get in touch with XELTR digital agency. Whether you have a project in mind or just want to talk, we're ready to listen.",
  focusKeyword: "Contact XELTR digital agency",
  canonicalUrl: "https://xeltr.com/contact",
  ogImage: "",
  mainHeading: "LET'S CREATE SOMETHING GREAT.",
  highlightedWord: "CREATE",
  topLabel: "Get In Touch",
  description: "We love working with ambitious brands. Tell us about your project and let's get started.",
  primaryCTAText: "SEND MESSAGE",
  primaryCTALink: "/contact#form",
  secondaryCTAText: "EXPLORE WORK",
  secondaryCTALink: "/work",
  content: "## Contact Us\n\nWe typically respond within 24 hours. Add your contact page body content here.",
  status: "published",
  lastUpdated: "3 days ago",
};

export default function ContactSEOPage() {
  const [data, setData] = useState<ContactPageSEO>(defaultData);
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
      title="Contact Page SEO"
      subtitle="Optimize the gateway to your client intake and project inquiries"
      badge="Lead Acquisition"
      badgeColor="indigo"
      headerIcon={<MessageSquare size={28} />}
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
        {/* Metadata */}
        <SeoSectionCard title="Search Engine Metadata" status={data.status} lastUpdated={data.lastUpdated} icon={<Globe size={18} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
                <SeoInput label="Meta Title" name="metaTitle" value={data.metaTitle} onChange={handleChange} maxLength={60} placeholder="Contact page title..." />
            </div>
            <div className="md:col-span-2">
                <SeoTextarea label="Meta Description" name="metaDescription" value={data.metaDescription} onChange={handleChange} maxLength={160} rows={3} placeholder="Engaging contact summary..." />
            </div>
            <SeoInput label="Focus Keyword" name="focusKeyword" value={data.focusKeyword} onChange={handleChange} placeholder="e.g. Agency Contact" />
            <SeoInput label="Canonical URL" name="canonicalUrl" value={data.canonicalUrl} onChange={handleChange} placeholder="https://xeltr.com/contact" />
          </div>
        </SeoSectionCard>

        {/* Display Content */}
        <SeoSectionCard title="Identity & Engagement" icon={<Layout size={18} />}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SeoInput label="Top Label" name="topLabel" value={data.topLabel} onChange={handleChange} placeholder="Floating label text..." />
              <SeoInput label="Highlighted Word" name="highlightedWord" value={data.highlightedWord} onChange={handleChange} placeholder="Word to highlight in heading..." />
              <div className="md:col-span-2">
                 <SeoInput label="Main Heading" name="mainHeading" value={data.mainHeading} onChange={handleChange} placeholder="Primary landing page heading..." />
              </div>
              <div className="md:col-span-2">
                 <SeoTextarea label="Introduction Text" name="description" value={data.description} onChange={handleChange} rows={4} placeholder="Main intro description..." />
              </div>
           </div>
        </SeoSectionCard>

        {/* CTA Section */}
        <SeoSectionCard title="Interaction Targets" icon={<Send size={18} />}>
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
            label="Inquiry Context Text" 
            name="content" 
            value={data.content} 
            onChange={handleChange} 
            rows={10} 
            hint="Markdown supported. Use this to set expectations or provide additional contact info." 
          />
        </SeoSectionCard>
      </div>
    </SeoLayout>
  );
}
