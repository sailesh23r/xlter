import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILandingPage extends Document {
  name: string;
  slug: string;
  status: "Published" | "Draft";
  views: number;
  conversions: number;
  campaign: string;
  seo: {
    title: string;
    description: string;
  };
  content: any;
  createdAt: Date;
}

const LandingPageSchema: Schema<ILandingPage> = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    status: { type: String, enum: ["Published", "Draft"], default: "Draft" },
    views: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
    campaign: { type: String, default: "General" },
    seo: {
      title: { type: String },
      description: { type: String },
    },
    content: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

const LandingPage: Model<ILandingPage> = mongoose.models.LandingPage || mongoose.model<ILandingPage>("LandingPage", LandingPageSchema);
export default LandingPage;
