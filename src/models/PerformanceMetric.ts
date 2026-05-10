import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPerformanceMetric extends Document {
  path: string;
  device: "mobile" | "desktop";
  metrics: {
    lcp: number;
    fcp: number;
    cls: number;
    inp: number;
    ttfb: number;
    score: number;
  };
  details: {
    pageSize: number; // in KB
    renderTime: number; // in ms
    apiLatency: number; // in ms
    unusedAssets: number; // count
  };
  timestamp: Date;
}

const PerformanceMetricSchema: Schema<IPerformanceMetric> = new Schema(
  {
    path: { type: String, required: true, index: true },
    device: { type: String, enum: ["mobile", "desktop"], required: true },
    metrics: {
      lcp: { type: Number, default: 0 },
      fcp: { type: Number, default: 0 },
      cls: { type: Number, default: 0 },
      inp: { type: Number, default: 0 },
      ttfb: { type: Number, default: 0 },
      score: { type: Number, default: 0 },
    },
    details: {
      pageSize: { type: Number, default: 0 },
      renderTime: { type: Number, default: 0 },
      apiLatency: { type: Number, default: 0 },
      unusedAssets: { type: Number, default: 0 },
    },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const PerformanceMetric: Model<IPerformanceMetric> =
  mongoose.models.PerformanceMetric ||
  mongoose.model<IPerformanceMetric>("PerformanceMetric", PerformanceMetricSchema);

export default PerformanceMetric;
