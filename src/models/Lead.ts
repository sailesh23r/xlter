import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;
  phone: string;
  source: string; // e.g., "Google", "Facebook", "Landing Page A"
  status: "New" | "Contacted" | "Qualified" | "Converted" | "Closed";
  details: string;
  createdAt: Date;
}

const LeadSchema: Schema<ILead> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    source: { type: String, default: "Direct" },
    status: { 
      type: String, 
      enum: ["New", "Contacted", "Qualified", "Converted", "Closed"],
      default: "New" 
    },
    details: { type: String },
  },
  { timestamps: true }
);

const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);
export default Lead;
