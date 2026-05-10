import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import connectToDatabase from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Page from "@/models/Page";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await connectToDatabase();

        const staticRoutes = [
            { path: "/", changeFrequency: "weekly", priority: 1.0, type: "static" },
            { path: "/about", changeFrequency: "monthly", priority: 0.8, type: "static" },
            { path: "/blog", changeFrequency: "daily", priority: 0.9, type: "static" },
            { path: "/casestudy", changeFrequency: "weekly", priority: 0.8, type: "static" },
            { path: "/contact", changeFrequency: "yearly", priority: 0.7, type: "static" },
        ];

        const blogs = await Blog.find({ status: "PUBLISHED", noIndex: { $ne: true } }).lean();
        const pages = await Page.find({ noIndex: { $ne: true } }).lean();

        const routes = [
            ...staticRoutes.map(r => ({ url: r.path, lastModified: new Date().toISOString(), changeFrequency: r.changeFrequency, priority: r.priority, type: "static" })),
            ...blogs.map((b: any) => ({ url: `/blog/${b.slug}`, lastModified: b.updatedAt, changeFrequency: "weekly", priority: 0.8, type: "blog" })),
            ...pages.map((p: any) => ({ url: `/${p.slug}`, lastModified: p.updatedAt, changeFrequency: "monthly", priority: 0.6, type: "page" }))
        ];

        return NextResponse.json({ success: true, routes });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
    }
}
