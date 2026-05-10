"use client";

import { useState, useEffect } from "react";
import { BarChart3, MessageCircle, ShieldCheck, Search, Tag, Activity } from "lucide-react";
import {
  SettingsHeader,
  SettingsCard,
  SettingsInput,
  IntegrationCard,
  SaveButton,
} from "@/Components/Admin/Settings/SettingsComponents";

export default function IntegrationsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [integrations, setIntegrations] = useState({
    googleAnalyticsId: "",
    googleTagManagerId: "",
    facebookPixelId: "",
    whatsappNumber: "",
    searchConsoleVerification: "",
    recaptchaSiteKey: "",
    recaptchaSecretKey: "",
  });

  useEffect(() => {
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/admin/system/settings");
        const json = await res.json();
        if (json.success && json.settings?.integrations) {
          setIntegrations(json.settings.integrations);
        }
      } catch (e) {
        console.error("Failed to load integrations:", e);
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
        body: JSON.stringify({ integrations }),
      });
    } catch (e) {
      console.error("Save failed:", e);
    } finally {
      setSaving(false);
    }
  };

  const isConnected = (val: string) => val.trim().length > 0;

  if (loading) return <div className="py-20 text-center text-gray-500 font-black uppercase tracking-widest animate-pulse">Loading integrations…</div>;

  return (
    <div className="space-y-8 pb-20">
      <SettingsHeader
        title="Integrations"
        description="Connect third-party analytics, advertising, and verification services."
        badge="Third-Party"
        actions={<SaveButton onClick={handleSave} loading={saving} />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Google Analytics */}
        <IntegrationCard
          icon={<BarChart3 size={20} className="text-orange-400" />}
          name="Google Analytics 4"
          description="Track site traffic, user behaviour and conversions."
          connected={isConnected(integrations.googleAnalyticsId)}
        >
          <SettingsInput
            label="Measurement ID"
            value={integrations.googleAnalyticsId}
            onChange={(v) => setIntegrations({ ...integrations, googleAnalyticsId: v })}
            placeholder="G-XXXXXXXXXX"
            hint="Found in GA4 → Admin → Data Streams."
          />
        </IntegrationCard>

        {/* Google Tag Manager */}
        <IntegrationCard
          icon={<Tag size={20} className="text-blue-400" />}
          name="Google Tag Manager"
          description="Deploy and manage marketing tags without code changes."
          connected={isConnected(integrations.googleTagManagerId)}
        >
          <SettingsInput
            label="Container ID"
            value={integrations.googleTagManagerId}
            onChange={(v) => setIntegrations({ ...integrations, googleTagManagerId: v })}
            placeholder="GTM-XXXXXXX"
            hint="Found in GTM → Admin → Container Settings."
          />
        </IntegrationCard>

        {/* Facebook Pixel */}
        <IntegrationCard
          icon={<Activity size={20} className="text-blue-500" />}
          name="Meta (Facebook) Pixel"
          description="Track conversions and audiences for Facebook & Instagram Ads."
          connected={isConnected(integrations.facebookPixelId)}
        >
          <SettingsInput
            label="Pixel ID"
            value={integrations.facebookPixelId}
            onChange={(v) => setIntegrations({ ...integrations, facebookPixelId: v })}
            placeholder="1234567890"
            hint="Found in Meta Events Manager → Data Sources."
          />
        </IntegrationCard>

        {/* WhatsApp */}
        <IntegrationCard
          icon={<MessageCircle size={20} className="text-green-400" />}
          name="WhatsApp API"
          description="Enable click-to-chat and WhatsApp lead routing."
          connected={isConnected(integrations.whatsappNumber)}
        >
          <SettingsInput
            label="WhatsApp Number (with country code)"
            value={integrations.whatsappNumber}
            onChange={(v) => setIntegrations({ ...integrations, whatsappNumber: v })}
            placeholder="+919876543210"
            hint="Include country code, no spaces or dashes."
          />
        </IntegrationCard>

        {/* Search Console */}
        <IntegrationCard
          icon={<Search size={20} className="text-green-500" />}
          name="Google Search Console"
          description="Verify site ownership and monitor search performance."
          connected={isConnected(integrations.searchConsoleVerification)}
        >
          <SettingsInput
            label="HTML Meta Verification Code"
            value={integrations.searchConsoleVerification}
            onChange={(v) => setIntegrations({ ...integrations, searchConsoleVerification: v })}
            placeholder="google-site-verification=..."
            hint="Copy the content value from the HTML tag provided by Google."
          />
        </IntegrationCard>

        {/* reCAPTCHA */}
        <IntegrationCard
          icon={<ShieldCheck size={20} className="text-purple-400" />}
          name="Google reCAPTCHA v3"
          description="Protect forms from spam and bot submissions."
          connected={isConnected(integrations.recaptchaSiteKey)}
        >
          <div className="space-y-3">
            <SettingsInput
              label="Site Key (Public)"
              value={integrations.recaptchaSiteKey}
              onChange={(v) => setIntegrations({ ...integrations, recaptchaSiteKey: v })}
              placeholder="6Lc..."
            />
            <SettingsInput
              label="Secret Key (Server)"
              type="password"
              value={integrations.recaptchaSecretKey}
              onChange={(v) => setIntegrations({ ...integrations, recaptchaSecretKey: v })}
              placeholder="6Lc..."
              hint="Never expose the secret key on the frontend."
            />
          </div>
        </IntegrationCard>
      </div>
    </div>
  );
}
