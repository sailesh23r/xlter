import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHeroSEO extends Document {
  // Hero Content
  heroLabel: string;
  h1: string;
  highlightedWord: string;
  subheading: string;
  description: string;
  primaryCTA: {
    text: string;
    link: string;
  };
  secondaryCTA: {
    text: string;
    link: string;
  };
  isActive: boolean;

  // SEO Metadata
  metaTitle: string;
  metaDescription: string;
  focusKeyword: string;
  canonicalUrl: string;
  seoSlug: string;
  noIndex: boolean;

  // Social Preview
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  twitterCard: string;

  // Schema Controls
  organizationSchema: boolean;
  localBusinessSchema: boolean;
  faqSchema: boolean;
  breadcrumbSchema: boolean;

  // Performance / Tracking
  preloadFonts: boolean;
  animationEnabled: boolean;
  ctaTrackingId: string;

  // Metadata
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const HeroSEOSchema: Schema<IHeroSEO> = new Schema(
  {
    heroLabel: { type: String, default: "Digital Excellence Studio" },
    h1: { type: String, default: "EVERYTHING DIGITAL. DONE RIGHT." },
    highlightedWord: { type: String, default: "DIGITAL" },
    subheading: { type: String, default: "" },
    description: { type: String, default: "We craft compelling digital solutions—from high-performance websites to branding and AI-driven experiences." },
    primaryCTA: {
      text: { type: String, default: "EXPLORE SERVICES" },
      link: { type: String, default: "/services" },
    },
    secondaryCTA: {
      text: { type: String, default: "VIEW PORTFOLIO" },
      link: { type: String, default: "/work" },
    },
    isActive: { type: Boolean, default: true },

    metaTitle: { type: String, default: "Digital Agency in Kerala | XELTR" },
    metaDescription: { type: String, default: "XELTR builds high-performance websites, branding systems, SEO strategies and digital experiences." },
    focusKeyword: { type: String, default: "Digital Agency Kerala" },
    canonicalUrl: { type: String, default: "https://xeltr.com" },
    seoSlug: { type: String, default: "home" },
    noIndex: { type: Boolean, default: false },

    ogTitle: { type: String, default: "Digital Agency in Kerala | XELTR" },
    ogDescription: { type: String, default: "XELTR builds high-performance websites, branding systems, SEO strategies and digital experiences." },
    ogImage: { type: String },
    twitterCard: { type: String, default: "summary_large_image" },

    organizationSchema: { type: Boolean, default: true },
    localBusinessSchema: { type: Boolean, default: false },
    faqSchema: { type: Boolean, default: false },
    breadcrumbSchema: { type: Boolean, default: true },

    preloadFonts: { type: Boolean, default: true },
    animationEnabled: { type: Boolean, default: true },
    ctaTrackingId: { type: String, default: "hero_cta_main" },

    updatedBy: { type: String },
  },
  { timestamps: true }
);

const HeroSEO: Model<IHeroSEO> =
  mongoose.models.HeroSEO || mongoose.model<IHeroSEO>("HeroSEO", HeroSEOSchema);

export default HeroSEO;
