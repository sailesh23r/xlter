import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  category: string;
  description: string;
  content: string;
  thumbnail: string;
  tags: string[];
  author: string;
  publishDate: Date;
  status: "DRAFT" | "PUBLISHED";
  featured: boolean;
  faqs: { question: string; answer: string }[];
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  twitterHandle?: string;
  noIndex?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema<IBlog> = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      default: "GENERAL",
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    content: {
      type: String,
      default: "",
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: String,
      default: "Xlter Studio",
    },
    publishDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED"],
      default: "PUBLISHED",
    },
    featured: {
      type: Boolean,
      default: false,
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
    twitterHandle: String,
    noIndex: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

BlogSchema.pre("save", function (next: any) {
  const self = this as any;
  if (!self.slug) {
    self.slug = self.title
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  }
  next();
});

const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
