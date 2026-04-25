import mongoose, { Schema, Document, Model } from "mongoose";

export interface IRedirect extends Document {
  source: string;
  destination: string;
  permanent: boolean; // true = 301/308, false = 302/307
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RedirectSchema: Schema<IRedirect> = new Schema(
  {
    source: {
      type: String,
      required: [true, "Source path is required"],
      trim: true,
      unique: true,
    },
    destination: {
      type: String,
      required: [true, "Destination path is required"],
      trim: true,
    },
    permanent: {
      type: Boolean,
      default: false,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Redirect: Model<IRedirect> =
  mongoose.models.Redirect ||
  mongoose.model<IRedirect>("Redirect", RedirectSchema);

export default Redirect;
