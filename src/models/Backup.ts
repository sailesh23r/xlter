import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBackup extends Document {
  type: string; // e.g., "FULL", "SEO", "BLOGS", "PAGES"
  filename: string;
  data: string; // JSON string or URL to file
  createdBy: string;
  createdAt: Date;
}

const BackupSchema: Schema<IBackup> = new Schema(
  {
    type: { type: String, required: true },
    filename: { type: String, required: true },
    data: { type: String, required: true },
    createdBy: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const Backup: Model<IBackup> =
  mongoose.models.Backup || mongoose.model<IBackup>("Backup", BackupSchema);

export default Backup;
