import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISchemaMarkup extends Document {
  pageUrl: string; // e.g., "/", "/blog/post-1"
  type: string; // e.g., "Organization", "LocalBusiness", "Article", "FAQPage"
  content: string; // JSON string of the schema
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SchemaMarkupSchema: Schema<ISchemaMarkup> = new Schema(
  {
    pageUrl: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    content: { type: String, required: true },
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const SchemaMarkup: Model<ISchemaMarkup> =
  mongoose.models.SchemaMarkup || mongoose.model<ISchemaMarkup>("SchemaMarkup", SchemaMarkupSchema);

export default SchemaMarkup;
