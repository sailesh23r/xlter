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
    const slug = (formData.get("slug") as string) || undefined;
    const category = (formData.get("category") as string) || "GENERAL";
    const description = formData.get("description") as string;
    const content = formData.get("content") as string;
    const thumbnail = formData.get("thumbnail") as File;
    const tags = ((formData.get("tags") as string) || "").split(",").map(t => t.trim()).filter(t => t !== "");
    const author = (formData.get("author") as string) || "Xlter Studio";
    const publishDate = formData.get("publishDate") ? new Date(formData.get("publishDate") as string) : new Date();
    const status = (formData.get("status") as string) || "PUBLISHED";
    const featured = formData.get("featured") === "true";
    const faqs = JSON.parse((formData.get("faqs") as string) || "[]");
    
    // SEO fields
    const metaTitle = formData.get("metaTitle") as string;
    const metaDescription = formData.get("metaDescription") as string;
    const canonicalUrl = formData.get("canonicalUrl") as string;
    const twitterHandle = formData.get("twitterHandle") as string;
    const noIndex = formData.get("noIndex") === "true";

    if (!title || !description || !thumbnail || typeof thumbnail === 'string') {
      return NextResponse.json(
        { success: false, error: "Title, description, and thumbnail are required" },
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

    const blog = await Blog.create({ 
      title, 
      slug,
      category, 
      description, 
      content,
      thumbnail: thumbnailUrl,
      tags,
      author,
      publishDate,
      status,
      featured,
      faqs,
      metaTitle,
      metaDescription,
      canonicalUrl,
      twitterHandle,
      noIndex,
      ogImage: thumbnailUrl // Default OG image to thumbnail
    });
    return NextResponse.json({ success: true, blog }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
