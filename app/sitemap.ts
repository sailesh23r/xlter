import type { MetadataRoute } from "next";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Page from "@/models/Page";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://xlter.com";

// All public static routes with their SEO properties
const staticRoutes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog", changeFrequency: "daily", priority: 0.9 },
  { path: "/casestudy", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  { path: "/ai-strategy", changeFrequency: "monthly", priority: 0.7 },
  { path: "/branding", changeFrequency: "monthly", priority: 0.7 },
  { path: "/graphic-design", changeFrequency: "monthly", priority: 0.7 },
  { path: "/ui-ux", changeFrequency: "monthly", priority: 0.7 },
  { path: "/web-development", changeFrequency: "monthly", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static Pages
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // 2. Dynamic Blog Posts
  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    await connectToDatabase();
    // Fetch only published and indexable blogs
    const blogs = await Blog.find(
      { status: "PUBLISHED", noIndex: { $ne: true } }, 
      { slug: 1, updatedAt: 1 }
    ).lean();
    
    blogEntries = blogs.map((blog: any) => ({
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastModified: blog.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8, // Increased priority for blog content
    }));
  } catch (error) {
    console.error("Sitemap: Error fetching blog posts:", error);
  }

  // 3. Dynamic Custom Pages (from Page model)
  let pageEntries: MetadataRoute.Sitemap = [];
  try {
    const pages = await Page.find(
      { noIndex: { $ne: true } }, 
      { slug: 1, updatedAt: 1 }
    ).lean();
    
    pageEntries = pages.map((page: any) => ({
      url: `${BASE_URL}/${page.slug}`,
      lastModified: page.updatedAt || new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Sitemap: Error fetching dynamic pages:", error);
  }

  // Combine all entries, ensuring no duplicates and excluding administrative paths
  return [...staticEntries, ...blogEntries, ...pageEntries].filter(
    (entry) => !entry.url.includes("/xlter-admin") && !entry.url.includes("/api")
  );
}
