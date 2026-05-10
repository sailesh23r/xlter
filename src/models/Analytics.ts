import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAnalytics extends Document {
  path: string;
  referrer: string;
  device: string;
  browser: string;
  os: string;
  country: string;
  ip: string;
  sessionId: string;
  createdAt: Date;
}

const AnalyticsSchema: Schema<IAnalytics> = new Schema(
  {
    path: { type: String, required: true },
    referrer: { type: String, default: "Direct" },
    device: { type: String, default: "Desktop" },
    browser: { type: String },
    os: { type: String },
    country: { type: String, default: "Unknown" },
    ip: { type: String },
    sessionId: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Analytics: Model<IAnalytics> = mongoose.models.Analytics || mongoose.model<IAnalytics>("Analytics", AnalyticsSchema);
export default Analytics;
