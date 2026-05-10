import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITechnicalSEO extends Document {
  sitemapStatus: string;
  robotsTxt: string;
  canonicalEnabled: boolean;
  breadcrumbEnabled: boolean;
  cleanUrls: boolean;
  trailingSlash: boolean;
  healthScore: number;
  sslStatus: string;
  sslExpiry: string;
  globalNoIndex: boolean;
  forceHttps: boolean;
  sitemapAutoUpdate: boolean;
  lcp: string;
  cls: string;
  indexedPages: number;
  lastCrawl: string;
}

const TechnicalSEOSchema: Schema<ITechnicalSEO> = new Schema(
  {
    sitemapStatus: { type: String, default: "Active" },
    robotsTxt: { type: String, default: "User-agent: *\nAllow: /\n" },
    canonicalEnabled: { type: Boolean, default: true },
    breadcrumbEnabled: { type: Boolean, default: true },
    cleanUrls: { type: Boolean, default: true },
    trailingSlash: { type: Boolean, default: false },
    healthScore: { type: Number, default: 100 },
    sslStatus: { type: String, default: "Active" },
    sslExpiry: { type: String, default: "N/A" },
    globalNoIndex: { type: Boolean, default: false },
    forceHttps: { type: Boolean, default: true },
    sitemapAutoUpdate: { type: Boolean, default: true },
    lcp: { type: String, default: "1.2s" },
    cls: { type: String, default: "0.01" },
    indexedPages: { type: Number, default: 0 },
    lastCrawl: { type: String, default: "Never" },
  },
  { timestamps: true }
);

const TechnicalSEO: Model<ITechnicalSEO> =
  mongoose.models.TechnicalSEO || mongoose.model<ITechnicalSEO>("TechnicalSEO", TechnicalSEOSchema);

export default TechnicalSEO;
