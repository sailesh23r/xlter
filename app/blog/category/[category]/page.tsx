import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";
import BlogClient from "../../BlogClient";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ category: string }>;
}

async function getBlogsByCategory(categoryName: string) {
  try {
    await connectToDatabase();
    // Case-insensitive search for category
    const blogs = await Blog.find({ 
      category: { $regex: new RegExp(`^${categoryName}$`, 'i') } 
    }).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(blogs));
  } catch (error) {
    console.error("Failed to fetch blogs by category:", error);
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
    return [];
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  
  const [blogs, categories] = await Promise.all([
    getBlogsByCategory(category),
    getCategories()
  ]);

  return <BlogClient blogs={blogs} categories={categories} initialCategory={category.toUpperCase()} />;
}
