import mongoose, { Schema, Document } from "mongoose";

export interface IMedia extends Document {
    name: string;
    url: string;
    alt: string;
    title: string;
    caption: string;
    type: string;
    size: number;
    category: string;
    createdBy: string;
    createdAt: Date;
}

const MediaSchema: Schema = new Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    alt: { type: String, default: "" },
    title: { type: String, default: "" },
    caption: { type: String, default: "" },
    type: { type: String, required: true },
    size: { type: Number, required: true },
    category: { type: String, default: "General" },
    createdBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Media || mongoose.model<IMedia>("Media", MediaSchema);
