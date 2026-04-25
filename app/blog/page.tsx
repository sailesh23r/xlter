import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";
import BlogClient from "./BlogClient";
import { Metadata } from "next";
import { getPageMetadata } from "@/lib/getSEO";

export async function generateMetadata(): Promise<Metadata> {
  const meta = await getPageMetadata("/blog");
  return meta || {
    title: "Blog | Xlter Studio",
    description: "Insights, stories, and updates from Xlter Studio.",
  };
}

interface BlogDoc {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  thumbnail: string;
  createdAt: string;
}

async function getBlogs(): Promise<BlogDoc[]> {
  try {
    await connectToDatabase();
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

async function getCategories(): Promise<any[]> {
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
  const [blogs, categories] = await Promise.all([
    getBlogs(),
    getCategories()
  ]);

  return <BlogClient blogs={blogs} categories={categories} />;
}
