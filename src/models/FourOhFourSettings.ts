import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFourOhFourSettings extends Document {
  title: string;
  description: string;
  suggestedLinks: { label: string; href: string }[];
  showContactCTA: boolean;
  showWhatsAppCTA: boolean;
  updatedAt: Date;
}

const FourOhFourSettingsSchema: Schema<IFourOhFourSettings> = new Schema(
  {
    title: { type: String, default: "404 - Page Not Found" },
    description: { type: String, default: "The page you are looking for doesn't exist or has been moved." },
    suggestedLinks: [
      {
        label: String,
        href: String,
      },
    ],
    showContactCTA: { type: Boolean, default: true },
    showWhatsAppCTA: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const FourOhFourSettings: Model<IFourOhFourSettings> =
  mongoose.models.FourOhFourSettings || mongoose.model<IFourOhFourSettings>("FourOhFourSettings", FourOhFourSettingsSchema);

export default FourOhFourSettings;
