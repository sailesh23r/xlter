import connectToDatabase from "@/lib/mongodb";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
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
    const query = `*[
      _type == "post" &&
      defined(slug.current) &&
      !(_id in path("drafts.**"))
    ] | order(publishDate desc, _createdAt desc) {
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      publishDate,
      _createdAt,
      _updatedAt,
      author->{name, image},
      category->{title, slug}
    }`;
    
    const sanityBlogs = await client.fetch(query);

    const blogs: BlogDoc[] = sanityBlogs.map((blog: any) => ({
      _id: blog._id,
      title: blog.title || "Untitled",
      slug: blog.slug?.current || "",
      category: blog.category?.title || "Uncategorized",
      description: blog.excerpt || "",
      thumbnail: blog.featuredImage ? urlFor(blog.featuredImage).url() : "",
      publishDate: blog.publishDate || blog._createdAt,
      createdAt: blog._createdAt || new Date().toISOString(),
      author: blog.author?.name || "Xeltr Studio",
      featured: false
    }));
    return blogs;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

async function getCategories(): Promise<{ _id: string; name: string }[]> {
  try {
    const query = `*[_type == "category"] | order(title asc) { _id, "name": title }`;
    const categories = await client.fetch(query);
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export default async function BlogPage() {
  const [blogs, categories] = await Promise.all([getBlogs(), getCategories()]);

  return <BlogClient blogs={blogs} categories={categories} />;
}
