import mongoose, { Schema, Document, Model } from "mongoose";

export interface IScriptInjection extends Document {
  name: string;
  location: "head" | "body";
  content: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ScriptInjectionSchema: Schema<IScriptInjection> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    location: {
      type: String,
      enum: ["head", "body"],
      required: [true, "Location is required"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      // Basic sanitization/validation can be added here or in the API route
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const ScriptInjection: Model<IScriptInjection> =
  mongoose.models.ScriptInjection ||
  mongoose.model<IScriptInjection>("ScriptInjection", ScriptInjectionSchema);

export default ScriptInjection;
