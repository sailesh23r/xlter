"use server";

import connectToDatabase from "@/lib/mongodb";
import Admin from "@/models/Admin";
import crypto from "crypto";
import { hashPassword } from "@/lib/security";
import { cookies, headers } from "next/headers";
import { verifyJWT, signJWT, logActivity } from "@/lib/auth";
import { trackSession } from "@/lib/session";
import { redirect } from "next/navigation";

/**
 * Handles 'Forgot Password' request
 */
export async function forgotPasswordAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) return { error: "Email is required.", success: "" };

  try {
    await connectToDatabase();
    const admin = await Admin.findOne({ email });

    if (!admin) {
      // For security, don't reveal if admin exists
      return { success: "If an account exists with that email, a reset link has been sent.", error: "" };
    }

    // Generate secure token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    admin.resetPasswordToken = hashedToken;
    admin.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await admin.save();

    // In a real app, send email here
    console.log(`[AUTH] Reset Link for ${email}: http://localhost:3000/xeltr-admin/reset-password?token=${resetToken}`);

    return { success: "If an account exists with that email, a reset link has been sent.", error: "" };
  } catch (error) {
    console.error("Forgot password error:", error);
    return { error: "An error occurred. Please try again later.", success: "" };
  }
}

/**
 * Handles 'Reset Password' submission
 */
export async function resetPasswordAction(prevState: any, formData: FormData) {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || password.length < 8) return { error: "Password must be at least 8 characters.", success: "" };
  if (password !== confirmPassword) return { error: "Passwords do not match.", success: "" };

  try {
    await connectToDatabase();
    
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    
    const admin = await Admin.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!admin) {
      return { error: "Invalid or expired reset token.", success: "" };
    }

    // Update password
    admin.passwordHash = await hashPassword(password);
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpires = undefined;
    
    // Clear sessions for security after password change
    admin.activeSessions = [];
    
    await admin.save();

    return { success: "Password has been successfully reset. You can now login.", error: "" };
  } catch (error) {
    console.error("Reset password error:", error);
    return { error: "An error occurred. Please try again later.", success: "" };
  }
}

/**
 * Handles 2FA verification
 */
export async function verify2FAAction(prevState: any, formData: FormData) {
  const otp = formData.get("otp") as string;
  const cookieStore = await cookies();
  const tempToken = cookieStore.get("admin_2fa_temp")?.value;

  if (!tempToken) return { error: "Session expired. Please login again.", success: "" };
  if (!otp || otp.length !== 6) return { error: "Please enter a valid 6-digit code.", success: "" };

  try {
    const payload = await verifyJWT(tempToken);
    if (!payload || payload.purpose !== "2FA") {
      return { error: "Invalid security session.", success: "" };
    }

    // Mock OTP verification (in production, check against DB or Redis)
    if (otp !== "123456") {
      return { error: "Invalid verification code.", success: "" };
    }

    await connectToDatabase();
    const admin = await Admin.findById(payload.tempId);
    if (!admin) return { error: "Admin not found.", success: "" };

    // OTP Verified! Now establish full session
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for") || "127.0.0.1";
    const userAgent = headerList.get("user-agent") || "unknown";
    const deviceId = crypto.randomUUID();
    
    await trackSession(admin, deviceId, ip, userAgent);

    const token = await signJWT({ 
      id: admin._id.toString(), 
      email: admin.email, 
      role: admin.role,
      deviceId 
    }, "24h");

    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    // Cleanup temp token
    cookieStore.delete("admin_2fa_temp");

    await logActivity(admin, "LOGIN", "AUTH", { 
      description: `Successful 2FA login from ${ip}`,
      ip 
    });

  } catch (error) {
    console.error("2FA error:", error);
    return { error: "Verification failed. Please try again.", success: "" };
  }

  redirect("/xeltr-admin/dashboard");
}
