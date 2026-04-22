import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICaseStudy extends Document {
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  skills: string[];
  liveUrl?: string;
  pdfUrl?: string;
  mockupUrl?: string;
  posterUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CaseStudySchema: Schema<ICaseStudy> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      uppercase: true,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    liveUrl: { type: String, default: "" },
    pdfUrl: { type: String, default: "" },
    mockupUrl: { type: String, default: "" },
    posterUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

// Fix for Next.js HMR: delete the cached model so the new schema fields are registered
if (mongoose.models.CaseStudy) {
  delete mongoose.models.CaseStudy;
}

const CaseStudy: Model<ICaseStudy> = mongoose.model<ICaseStudy>(
  "CaseStudy",
  CaseStudySchema
);

export default CaseStudy;
