import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// GET /api/blogs — fetch all blogs sorted by newest first
export async function GET() {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST /api/blogs — create a new blog with thumbnail upload
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const category = (formData.get("category") as string) || "GENERAL";
    const description = formData.get("description") as string;
    const thumbnail = formData.get("thumbnail") as File;

    if (!title || !description || !thumbnail || typeof thumbnail === 'string') {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Save thumbnail to /public/uploads/blogs/
    const bytes = await thumbnail.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "blogs");
    await mkdir(uploadsDir, { recursive: true });

    const filename = `${Date.now()}-${thumbnail.name.replace(/\s+/g, "-")}`;
    const filepath = path.join(uploadsDir, filename);
    await writeFile(filepath, buffer);
    const thumbnailUrl = `/uploads/blogs/${filename}`;

    const blog = await Blog.create({ title, category, description, thumbnail: thumbnailUrl });
    return NextResponse.json({ success: true, blog }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
