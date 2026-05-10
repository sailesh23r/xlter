import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPageSEO extends Document {
  route: string; // e.g. "/", "/about"
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  twitterHandle?: string;
  noIndex?: boolean;
  faqs: { question: string; answer: string }[];
  createdAt: Date;
  updatedAt: Date;
}

const PageSEOSchema: Schema<IPageSEO> = new Schema(
  {
    route: {
      type: String,
      required: [true, "Route is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    keywords: String,
    ogImage: String,
    canonicalUrl: String,
    twitterHandle: {
      type: String,
      default: "@xlterstudio",
    },
    noIndex: {
      type: Boolean,
      default: false,
    },
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  { timestamps: true }
);

const PageSEO: Model<IPageSEO> =
  mongoose.models.PageSEO || mongoose.model<IPageSEO>("PageSEO", PageSEOSchema);

export default PageSEO;
