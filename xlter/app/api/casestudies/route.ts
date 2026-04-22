import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import connectToDatabase from "@/lib/mongodb";
import CaseStudy from "@/models/CaseStudy";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// GET /api/casestudies
export async function GET() {
  try {
    await connectToDatabase();
    const casestudies = await CaseStudy.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, casestudies });
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch case studies" },
      { status: 500 }
    );
  }
}

// POST /api/casestudies
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const skillsRaw = formData.get("skills") as string; // JSON string
    const thumbnail = formData.get("thumbnail") as File;
    const liveUrl = (formData.get("liveUrl") as string) || "";
    
    // New file fields
    const pdfFile = formData.get("pdfFile") as File | null;
    const mockupFile = formData.get("mockupFile") as File | null;
    const posterFile = formData.get("posterFile") as File | null;

    if (!title || !description || !category || !thumbnail || typeof thumbnail === 'string') {
      return NextResponse.json(
        { success: false, error: "Title, description, category and thumbnail are required" },
        { status: 400 }
      );
    }

    if (!(thumbnail instanceof File)) {
       return NextResponse.json(
        { success: false, error: "Thumbnail must be a file" },
        { status: 400 }
      );
    }

    // Parse skills array
    let skills: string[] = [];
    try {
      skills = JSON.parse(skillsRaw || "[]");
    } catch {
      skills = [];
    }

    const uploadsDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "casestudies"
    );
    await mkdir(uploadsDir, { recursive: true });

    // Helper to save file with validation
    const saveFile = async (file: File, allowedTypes: string[] = ["image/jpeg", "image/png", "image/webp", "application/pdf"]) => {
      // 5MB Limit
      if (file.size > 5 * 1024 * 1024) {
        throw new Error(`File ${file.name} exceeds 5MB limit`);
      }
      // Type validation
      if (!allowedTypes.includes(file.type)) {
        throw new Error(`File ${file.name} has invalid type: ${file.type}`);
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const filepath = path.join(uploadsDir, filename);
      await writeFile(filepath, buffer);
      return `/uploads/casestudies/${filename}`;
    };

    // Save thumbnail
    const thumbnailUrl = await saveFile(thumbnail, ["image/jpeg", "image/png", "image/webp"]);

    // Save optional files
    let pdfUrl = "";
    if (pdfFile && pdfFile.size > 0) {
      pdfUrl = await saveFile(pdfFile);
    }

    let mockupUrl = "";
    if (mockupFile && mockupFile.size > 0) {
      mockupUrl = await saveFile(mockupFile);
    }

    let posterUrl = "";
    if (posterFile && posterFile.size > 0) {
      posterUrl = await saveFile(posterFile);
    }

    const casestudy = await CaseStudy.create({
      title,
      description,
      category,
      skills,
      thumbnail: thumbnailUrl,
      liveUrl,
      pdfUrl,
      mockupUrl,
      posterUrl,
    });

    return NextResponse.json({ success: true, casestudy }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating case study:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create case study" },
      { status: error.message?.includes("limit") || error.message?.includes("type") ? 400 : 500 }
    );
  }
}
