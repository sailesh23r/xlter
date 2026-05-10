"use client";

import { useState, useEffect } from "react";
import { Globe, Mail, Phone, Clock, Languages, Image } from "lucide-react";
import {
  SettingsHeader,
  SettingsCard,
  SettingsInput,
  SettingsTextarea,
  SettingsSelect,
  UploadField,
  SaveButton,
} from "@/Components/Admin/Settings/SettingsComponents";

const TIMEZONES = [
  { value: "Asia/Kolkata", label: "Asia/Kolkata (IST)" },
  { value: "America/New_York", label: "America/New_York (EST)" },
  { value: "Europe/London", label: "Europe/London (GMT)" },
  { value: "Asia/Dubai", label: "Asia/Dubai (GST)" },
  { value: "America/Los_Angeles", label: "America/Los_Angeles (PST)" },
];

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "ar", label: "Arabic" },
  { value: "hi", label: "Hindi" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
];

export default function GeneralSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: "",
    siteDescription: "",
    logo: "",
    favicon: "",
    contactEmail: "",
    phone: "",
    timezone: "Asia/Kolkata",
    language: "en",
  });

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/admin/system/settings");
        const json = await res.json();
        if (json.success && json.settings) {
          const s = json.settings;
          setSettings({
            siteName: s.siteName || "",
            siteDescription: s.siteDescription || "",
            logo: s.logo || "",
            favicon: s.favicon || "",
            contactEmail: s.contactEmail || "",
            phone: s.phone || "",
            timezone: s.timezone || "Asia/Kolkata",
            language: s.language || "en",
          });
        }
      } catch (e) {
        console.error("Failed to load settings:", e);
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
        body: JSON.stringify(settings),
      });
    } catch (e) {
      console.error("Save failed:", e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="py-20 text-center text-gray-500 font-black uppercase tracking-widest animate-pulse">Loading settings…</div>;

  return (
    <div className="space-y-8 pb-20">
      <SettingsHeader
        title="General Settings"
        description="Configure your site's identity, contact information, and locale preferences."
        badge="Site Config"
        actions={<SaveButton onClick={handleSave} loading={saving} />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Site Identity */}
        <SettingsCard title="Site Identity" description="Core brand information shown across the site." icon={<Globe />}>
          <div className="space-y-6">
            <SettingsInput
              label="Site Name"
              value={settings.siteName}
              onChange={(v) => setSettings({ ...settings, siteName: v })}
              placeholder="Your Studio Name"
              required
            />
            <SettingsTextarea
              label="Site Description"
              value={settings.siteDescription}
              onChange={(v) => setSettings({ ...settings, siteDescription: v })}
              placeholder="A short tagline or description of your business…"
              hint="Used in meta tags and search snippets."
            />
          </div>
        </SettingsCard>

        {/* Contact Info */}
        <SettingsCard title="Contact Details" description="Public-facing contact information." icon={<Mail />}>
          <div className="space-y-6">
            <SettingsInput
              label="Contact Email"
              type="email"
              value={settings.contactEmail}
              onChange={(v) => setSettings({ ...settings, contactEmail: v })}
              placeholder="hello@studio.com"
              required
            />
            <SettingsInput
              label="Phone Number"
              type="tel"
              value={settings.phone}
              onChange={(v) => setSettings({ ...settings, phone: v })}
              placeholder="+91 98765 43210"
            />
          </div>
        </SettingsCard>

        {/* Logo & Favicon */}
        <SettingsCard title="Branding Assets" description="Upload your logo and favicon." icon={<Image />}>
          <div className="space-y-8">
            <UploadField
              label="Logo"
              currentUrl={settings.logo || undefined}
              hint="Recommended: SVG or PNG, transparent background."
            />
            <UploadField
              label="Favicon"
              currentUrl={settings.favicon || undefined}
              accept="image/x-icon,image/png"
              hint="Recommended: 32×32 or 64×64 ICO / PNG."
            />
          </div>
        </SettingsCard>

        {/* Locale */}
        <SettingsCard title="Locale" description="Timezone and language used across the admin panel." icon={<Clock />}>
          <div className="space-y-6">
            <SettingsSelect
              label="Timezone"
              value={settings.timezone}
              onChange={(v) => setSettings({ ...settings, timezone: v })}
              options={TIMEZONES}
            />
            <SettingsSelect
              label="Language"
              value={settings.language}
              onChange={(v) => setSettings({ ...settings, language: v })}
              options={LANGUAGES}
            />
          </div>
        </SettingsCard>
      </div>
    </div>
  );
}
