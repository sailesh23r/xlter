import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// GET /api/blogs/[id] — fetch a single blog by id
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, blog });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch blog" }, { status: 500 });
  }
}

// PUT /api/blogs/[id] — update an existing blog
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const formData = await request.formData();
    
    const updateData: any = {};
    const fields = [
      "title", "slug", "category", "description", "content", 
      "author", "metaTitle", "metaDescription", "canonicalUrl", "twitterHandle", "status"
    ];
    
    fields.forEach(field => {
      const val = formData.get(field);
      if (val !== null) updateData[field] = val;
    });

    if (formData.get("featured") !== null) {
      updateData.featured = formData.get("featured") === "true";
    }

    if (formData.get("noIndex") !== null) {
      updateData.noIndex = formData.get("noIndex") === "true";
    }

    if (formData.get("faqs")) {
      try {
        updateData.faqs = JSON.parse(formData.get("faqs") as string);
      } catch (e) {
        console.error("Failed to parse FAQs:", e);
      }
    }

    if (formData.get("tags")) {
      updateData.tags = (formData.get("tags") as string).split(",").map(t => t.trim()).filter(t => t !== "");
    }
    
    if (formData.get("publishDate")) {
      updateData.publishDate = new Date(formData.get("publishDate") as string);
    }

    const thumbnail = formData.get("thumbnail");
    if (thumbnail && typeof thumbnail !== 'string') {
      const bytes = await (thumbnail as File).arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadsDir = path.join(process.cwd(), "public", "uploads", "blogs");
      await mkdir(uploadsDir, { recursive: true });
      const filename = `${Date.now()}-${(thumbnail as File).name.replace(/\s+/g, "-")}`;
      const filepath = path.join(uploadsDir, filename);
      await writeFile(filepath, buffer);
      updateData.thumbnail = `/uploads/blogs/${filename}`;
      updateData.ogImage = updateData.thumbnail;
    }

    const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ success: false, error: "Failed to update blog" }, { status: 500 });
  }
}

// DELETE /api/blogs/[id] — remove a blog by id
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
