"use server";

import connectToDatabase from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAdmin(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please provide both email and password." };
  }

  try {
    await connectToDatabase();

    // TEMPORARY: Auto-create a default admin if the database is empty
    // Remove this in production for security!
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log("No admins found, creating default admin...");
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await Admin.create({
        email: "admin@xlter.com",
        passwordHash: hashedPassword,
        name: "Super Admin",
      });
      console.log("Default admin created: admin@xlter.com / admin123");
    }

    // Find the admin user
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return { error: "Invalid email or password." };
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return { error: "Invalid email or password." };
    }

    // Set a simple cookie session (In production, use JWT or NextAuth)
    const cookieStore = await cookies();
    cookieStore.set("admin_session", admin._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

  } catch (error) {
    console.error("Login error:", error);
    return { error: "An error occurred during login. Please try again." };
  }

  // Redirect on success
  redirect("/xlter-admin/dashboard");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/xlter-admin/login");
}
