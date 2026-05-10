import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUserActivity extends Document {
  adminId: mongoose.Types.ObjectId;
  adminName: string;
  role: string;
  action: string; // e.g., "CREATE", "UPDATE", "DELETE", "BACKUP", "RESTORE"
  targetType: string; // e.g., "BLOG", "SEO", "PAGE", "USER"
  targetId?: string;
  targetName?: string;
  details: {
    oldValue?: any;
    newValue?: any;
    description: string;
  };
  createdAt: Date;
}

const UserActivitySchema: Schema<IUserActivity> = new Schema(
  {
    adminId: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
    adminName: { type: String, required: true },
    role: { type: String, required: true },
    action: { type: String, required: true },
    targetType: { type: String, required: true },
    targetId: { type: String },
    targetName: { type: String },
    details: {
      oldValue: { type: Schema.Types.Mixed },
      newValue: { type: Schema.Types.Mixed },
      description: { type: String, required: true },
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

const UserActivity: Model<IUserActivity> =
  mongoose.models.UserActivity || mongoose.model<IUserActivity>("UserActivity", UserActivitySchema);

export default UserActivity;
