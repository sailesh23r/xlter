import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPage extends Document {
  title: string;
  slug: string;
  content: string;
  layout: "DEFAULT" | "LANDING";
  faqs: { question: string; answer: string }[];
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema: Schema<IPage> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      default: "",
    },
    layout: {
      type: String,
      enum: ["DEFAULT", "LANDING"],
      default: "DEFAULT",
    },
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
    metaTitle: String,
    metaDescription: String,
    ogImage: String,
    canonicalUrl: String,
    noIndex: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Page: Model<IPage> =
  mongoose.models.Page || mongoose.model<IPage>("Page", PageSchema);

export default Page;
