import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISettings extends Document {
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  contactEmail: string;
  phone: string;
  timezone: string;
  language: string;
  socials: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  // SEO
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    canonicalDomain: string;
    googleVerification: string;
    defaultOgImage: string;
    robotsNoIndex: boolean;
    sitemapEnabled: boolean;
  };
  // Security
  security: {
    forceHttps: boolean;
    secureCookies: boolean;
    sessionTimeoutMinutes: number;
    maxLoginAttempts: number;
    passwordMinLength: number;
    requireSpecialChars: boolean;
  };
  // Integrations
  integrations: {
    googleAnalyticsId: string;
    googleTagManagerId: string;
    facebookPixelId: string;
    whatsappNumber: string;
    searchConsoleVerification: string;
    recaptchaSiteKey: string;
    recaptchaSecretKey: string;
  };
  updatedAt: Date;
}

const SettingsSchema: Schema<ISettings> = new Schema(
  {
    siteName: { type: String, default: "Xlter Studio" },
    siteDescription: { type: String, default: "Premium Digital Studio" },
    logo: { type: String, default: "" },
    favicon: { type: String, default: "" },
    contactEmail: { type: String, default: "" },
    phone: { type: String, default: "" },
    timezone: { type: String, default: "Asia/Kolkata" },
    language: { type: String, default: "en" },
    socials: {
      facebook: String,
      twitter: String,
      instagram: String,
      linkedin: String,
      youtube: String,
    },
    seo: {
      defaultTitle: { type: String, default: "" },
      defaultDescription: { type: String, default: "" },
      canonicalDomain: { type: String, default: "" },
      googleVerification: { type: String, default: "" },
      defaultOgImage: { type: String, default: "" },
      robotsNoIndex: { type: Boolean, default: false },
      sitemapEnabled: { type: Boolean, default: true },
    },
    security: {
      forceHttps: { type: Boolean, default: true },
      secureCookies: { type: Boolean, default: true },
      sessionTimeoutMinutes: { type: Number, default: 60 },
      maxLoginAttempts: { type: Number, default: 5 },
      passwordMinLength: { type: Number, default: 8 },
      requireSpecialChars: { type: Boolean, default: true },
    },
    integrations: {
      googleAnalyticsId: { type: String, default: "" },
      googleTagManagerId: { type: String, default: "" },
      facebookPixelId: { type: String, default: "" },
      whatsappNumber: { type: String, default: "" },
      searchConsoleVerification: { type: String, default: "" },
      recaptchaSiteKey: { type: String, default: "" },
      recaptchaSecretKey: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const Settings: Model<ISettings> =
  mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);

export default Settings;
