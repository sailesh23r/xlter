import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";
import BlogClient from "./BlogClient";
import { Metadata } from "next";
import { getPageMetadata } from "@/lib/getSEO";
import { BlogDoc } from "@/Components/Blog/BlogCard";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getPageMetadata("/blog");
  return (
    meta || {
      title: "Blog | Xeltr Studio",
      description: "Insights, stories, and updates from Xeltr Studio.",
    }
  );
}

async function getBlogs(): Promise<BlogDoc[]> {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({ status: "PUBLISHED" })
      .sort({ featured: -1, publishDate: -1, createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

async function getCategories(): Promise<{ _id: string; name: string }[]> {
  try {
    await connectToDatabase();
    const Category = (await import("@/models/Category")).default;
    const categories = await Category.find({}).sort({ name: 1 }).lean();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export default async function BlogPage() {
  const [blogs, categories] = await Promise.all([getBlogs(), getCategories()]);

  return <BlogClient blogs={blogs} categories={categories} />;
}
