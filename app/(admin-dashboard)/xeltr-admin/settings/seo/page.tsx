"use client";

import { useState, useEffect } from "react";
import { Search, Globe, FileText, Image } from "lucide-react";
import {
  SettingsHeader,
  SettingsCard,
  SettingsInput,
  SettingsTextarea,
  ToggleSwitch,
  UploadField,
  SaveButton,
} from "@/Components/Admin/Settings/SettingsComponents";

export default function SeoSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [seo, setSeo] = useState({
    defaultTitle: "",
    defaultDescription: "",
    canonicalDomain: "",
    googleVerification: "",
    defaultOgImage: "",
    robotsNoIndex: false,
    sitemapEnabled: true,
  });

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/admin/system/settings");
        const json = await res.json();
        if (json.success && json.settings?.seo) {
          setSeo(json.settings.seo);
        }
      } catch (e) {
        console.error("Failed to load SEO settings:", e);
      } finally {
        setLoading(false);
      }
    };
    fetch_();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/admin/system/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seo }),
      });
    } catch (e) {
      console.error("Save failed:", e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="py-20 text-center text-gray-500 font-black uppercase tracking-widest animate-pulse">Loading SEO settings…</div>;

  return (
    <div className="space-y-8 pb-20">
      <SettingsHeader
        title="SEO Settings"
        description="Configure global defaults for search engine indexing and social sharing."
        badge="Global SEO"
        actions={<SaveButton onClick={handleSave} loading={saving} />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Defaults */}
        <SettingsCard title="Default Meta Tags" description="Fallback metadata used when a page has no specific meta set." icon={<Search />}>
          <div className="space-y-6">
            <SettingsInput
              label="Default Meta Title"
              value={seo.defaultTitle}
              onChange={(v) => setSeo({ ...seo, defaultTitle: v })}
              placeholder="Xeltr Studio – Premium Digital Agency"
              hint="Keep under 60 characters."
            />
            <SettingsTextarea
              label="Default Meta Description"
              value={seo.defaultDescription}
              onChange={(v) => setSeo({ ...seo, defaultDescription: v })}
              placeholder="We craft high-performance digital products…"
              hint="Keep between 120–160 characters."
            />
          </div>
        </SettingsCard>

        {/* Domain & Verification */}
        <SettingsCard title="Domain & Verification" description="Set your canonical base URL and verify site ownership." icon={<Globe />}>
          <div className="space-y-6">
            <SettingsInput
              label="Canonical Domain"
              value={seo.canonicalDomain}
              onChange={(v) => setSeo({ ...seo, canonicalDomain: v })}
              placeholder="https://xeltr.com"
              hint="Include protocol (https://). No trailing slash."
            />
            <SettingsInput
              label="Google Verification Code"
              value={seo.googleVerification}
              onChange={(v) => setSeo({ ...seo, googleVerification: v })}
              placeholder="google-site-verification=abc123..."
              hint="Paste the content value from Google Search Console."
            />
          </div>
        </SettingsCard>

        {/* OG Image */}
        <SettingsCard title="Default OG Image" description="Used for social media link previews when no page-specific image exists." icon={<Image />}>
          <UploadField
            label="Open Graph Image"
            currentUrl={seo.defaultOgImage || undefined}
            hint="Recommended: 1200×630 PNG or JPG."
          />
        </SettingsCard>

        {/* Robots & Sitemap */}
        <SettingsCard title="Crawl & Indexing" description="Control how search engines interact with your site." icon={<FileText />}>
          <div>
            <ToggleSwitch
              label="Block All Indexing (noindex)"
              description="Adds noindex globally — use only during development or staging."
              checked={seo.robotsNoIndex}
              onChange={(v) => setSeo({ ...seo, robotsNoIndex: v })}
              danger
            />
            <ToggleSwitch
              label="Enable XML Sitemap"
              description="Automatically generates and submits /sitemap.xml to search engines."
              checked={seo.sitemapEnabled}
              onChange={(v) => setSeo({ ...seo, sitemapEnabled: v })}
            />
          </div>
        </SettingsCard>
      </div>
    </div>
  );
}
