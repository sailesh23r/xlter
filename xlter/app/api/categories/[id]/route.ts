import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/models/Category";
import Blog from "@/models/Blog";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;

    // 1. Find the category to get its name
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ success: false, error: "Category not found" }, { status: 404 });
    }

    const catName = category.name;

    // 2. Delete the category
    await Category.findByIdAndDelete(id);

    // 3. Update all blogs using this category to "GENERAL"
    await Blog.updateMany({ category: catName }, { category: "GENERAL" });

    return NextResponse.json({ success: true, message: `Category '${catName}' deleted. Associated blogs moved to GENERAL.` });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
