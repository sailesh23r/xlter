import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectToDatabase();
    
    const email = "admin@xeltr.com";
    const password = "password";
    
    const existingAdmin = await Admin.findOne({ email });
    
    if (existingAdmin) {
      return NextResponse.json({ 
        message: "Admin user already exists.", 
        email: email 
      });
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
    
    const newAdmin = await Admin.create({
      name: "Super Admin",
      email: email,
      passwordHash: passwordHash,
      role: "SUPER_ADMIN",
      twoFactorEnabled: false
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "Default admin user created successfully!",
      credentials: {
        email: email,
        password: password
      }
    });
    
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}
