import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISession {
  deviceId: string;
  ip: string;
  userAgent: string;
  lastActive: Date;
}

export interface IAdmin extends Document {
  email: string;
  passwordHash: string;
  name: string;
  role: string;
  
  // Security
  twoFactorSecret?: string;
  twoFactorEnabled: boolean;
  failedLoginAttempts: number;
  lockUntil?: Date;
  
  // Password Reset
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  
  // Sessions
  activeSessions: ISession[];
  lastLogin?: Date;
  lastLoginIp?: string;

  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema: Schema<IAdmin> = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: [true, "Password is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    role: {
      type: String,
      default: "VIEWER",
      uppercase: true,
      enum: ["SUPER_ADMIN", "ADMIN", "SEO_MANAGER", "EDITOR", "VIEWER", "super_admin", "admin", "seo_manager", "editor", "viewer"],
    },
    
    // Security fields
    twoFactorSecret: String,
    twoFactorEnabled: { type: Boolean, default: false },
    failedLoginAttempts: { type: Number, default: 0 },
    lockUntil: Date,
    
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    
    activeSessions: [{
      deviceId: String,
      ip: String,
      userAgent: String,
      lastActive: { type: Date, default: Date.now }
    }],
    
    lastLogin: Date,
    lastLoginIp: String,
  },
  {
    timestamps: true,
  }
);

const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);

export default Admin;
