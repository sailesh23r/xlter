import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Admin from "@/models/Admin";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectToDatabase();
    
    const email = "admin@xeltr.com";
    const password = "password";
    
    let responseMessage = "Setup check complete.";
    let adminCreated = false;

    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash(password, 10);
      await Admin.create({
        name: "Super Admin",
        email: email,
        passwordHash: passwordHash,
        role: "SUPER_ADMIN",
        twoFactorEnabled: false
      });
      adminCreated = true;
      responseMessage = "Default admin user created successfully!";
    } else {
      responseMessage = "Admin user already exists.";
    }

    // Create default settings
    const Settings = (await import("@/models/Settings")).default;
    const existingSettings = await Settings.findOne({});
    if (!existingSettings) {
      await Settings.create({
        siteName: "Xeltr",
        siteDescription: "Everything Digital. Done Right.",
        seo: {
          defaultTitle: "Xeltr | Premium Digital Agency",
          defaultDescription: "Xeltr builds high-performance websites and digital experiences.",
          sitemapEnabled: true
        }
      });
    }

    // Create default Hero SEO
    const HeroSEO = (await import("@/models/HeroSEO")).default;
    const existingHero = await HeroSEO.findOne({});
    if (!existingHero) {
      await HeroSEO.create({
        metaTitle: "Xeltr | Digital Excellence",
        metaDescription: "We build the future of digital experiences.",
        focusKeyword: "Digital Agency, Web Development, SEO",
        canonicalUrl: "https://xeltr.com"
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: responseMessage,
      adminCreated,
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
