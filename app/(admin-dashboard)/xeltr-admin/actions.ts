"use server";

import connectToDatabase from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { isLocked, incrementFailedAttempts, resetFailedAttempts } from "@/lib/security";
import { trackSession } from "@/lib/session";
import { signJWT, logActivity } from "@/lib/auth";

export async function loginAdmin(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const rememberMe = formData.get("rememberMe") === "on";

  if (!email || !password) {
    return { error: "Please provide both email and password." };
  }

  try {
    await connectToDatabase();

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return { error: "Invalid email or password." };
    }

    // 1. Check if account is locked
    if (isLocked(admin)) {
      const remainingTime = Math.ceil((admin.lockUntil!.getTime() - Date.now()) / (60 * 1000));
      return { error: `Account is temporarily locked. Please try again in ${remainingTime} minutes.` };
    }

    // 2. Verify password
    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      await incrementFailedAttempts(admin);
      return { error: "Invalid email or password." };
    }

    // 3. Reset failed attempts on success
    await resetFailedAttempts(admin);

    // 3.5 Check for 2FA
    if (admin.twoFactorEnabled) {
      // Create a temporary session token for 2FA verification
      const tempToken = await signJWT({ 
        tempId: admin._id.toString(), 
        purpose: "2FA" 
      }, "10m");
      
      const cookieStore = await cookies();
      cookieStore.set("admin_2fa_temp", tempToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 600, // 10 minutes
        path: "/",
      });
      
      // Send OTP (mock for now, but infrastructure is ready)
      console.log(`[AUTH] 2FA OTP for ${admin.email}: 123456`);
      
      redirect("/xeltr-admin/login/2fa");
    }

    // 4. Track session
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for") || "127.0.0.1";
    const userAgent = headerList.get("user-agent") || "unknown";
    const deviceId = crypto.randomUUID(); // Simplified device ID for this demo
    
    await trackSession(admin, deviceId, ip, userAgent);

    // 5. Sign JWT
    const expiresIn = rememberMe ? "30d" : "24h";
    const token = await signJWT({ 
      id: admin._id.toString(), 
      email: admin.email, 
      role: admin.role,
      deviceId 
    }, expiresIn);

    // 6. Set Cookie
    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
      path: "/",
    });

    // 7. Log Activity
    await logActivity(admin, "LOGIN", "AUTH", { 
      description: `Successful login from ${ip} using ${userAgent}`,
      ip 
    });

  } catch (error) {
    console.error("Login error:", error);
    return { error: "An error occurred during login. Please try again." };
  }

  redirect("/xeltr-admin/dashboard");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/xeltr-admin/login");
}
