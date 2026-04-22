import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import connectToDatabase from "@/lib/mongodb";
import CaseStudy from "@/models/CaseStudy";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// DELETE /api/casestudies/[id]
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const cs = await CaseStudy.findByIdAndDelete(id);
    if (!cs) {
      return NextResponse.json(
        { success: false, error: "Case study not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Case study deleted" });
  } catch (error) {
    console.error("Error deleting case study:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete case study" },
      { status: 500 }
    );
  }
}

// PATCH /api/casestudies/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const skillsRaw = formData.get("skills") as string;
    const liveUrl = (formData.get("liveUrl") as string) || "";
    
    // Files
    const thumbnailFile = formData.get("thumbnail") as File | null;
    const pdfFile = formData.get("pdfFile") as File | null;
    const mockupFile = formData.get("mockupFile") as File | null;
    const posterFile = formData.get("posterFile") as File | null;

    const existingCaseStudy = await CaseStudy.findById(id);
    if (!existingCaseStudy) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    const updates: any = {
      title,
      description,
      category,
      liveUrl,
    };

    if (skillsRaw) {
      try {
        updates.skills = JSON.parse(skillsRaw);
      } catch {
        updates.skills = [];
      }
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads", "casestudies");
    await mkdir(uploadsDir, { recursive: true });

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

    if (thumbnailFile && thumbnailFile instanceof File && thumbnailFile.size > 0) {
       updates.thumbnail = await saveFile(thumbnailFile, ["image/jpeg", "image/png", "image/webp"]);
    }
    if (pdfFile && pdfFile instanceof File && pdfFile.size > 0) {
       updates.pdfUrl = await saveFile(pdfFile);
    }
    if (mockupFile && mockupFile instanceof File && mockupFile.size > 0) {
       updates.mockupUrl = await saveFile(mockupFile);
    }
    if (posterFile && posterFile instanceof File && posterFile.size > 0) {
       updates.posterUrl = await saveFile(posterFile);
    }

    const updated = await CaseStudy.findByIdAndUpdate(id, updates, { new: true });

    return NextResponse.json({ success: true, casestudy: updated });
  } catch (error: any) {
    console.error("Error updating case study:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update case study" },
      { status: error.message?.includes("limit") || error.message?.includes("type") ? 400 : 500 }
    );
  }
}

