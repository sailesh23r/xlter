import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import { client } from "@/sanity/lib/client";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        // Fetch Sanity Counts safely
        const errMessage = "Unable to sync content data";
        const [blogPosts, publishedPosts, draftPosts, categories, authors] = await Promise.all([
            client.fetch(`count(*[_type == "post"])`).catch((e) => {
                console.error("Sanity total posts error:", e);
                return errMessage;
            }),
            client.fetch(`count(*[_type == "post" && !(_id in path("drafts.**"))])`).catch(() => errMessage),
            client.fetch(`count(*[_id in path("drafts.**")])`).catch(() => errMessage),
            client.fetch(`count(*[_type == "category"])`).catch(() => errMessage),
            client.fetch(`count(*[_type == "author"])`).catch(() => errMessage),
        ]);

        const dashboardData = {
            counts: {
                totalPosts: blogPosts,
                publishedPosts: publishedPosts,
                draftPosts: draftPosts,
                categories: categories,
            },
            contentStats: {
                totalPosts: typeof blogPosts === 'number' ? blogPosts : 0,
                publishedPosts: typeof publishedPosts === 'number' ? publishedPosts : 0,
                draftPosts: typeof draftPosts === 'number' ? draftPosts : 0,
                categories: typeof categories === 'number' ? categories : 0,
                authors: typeof authors === 'number' ? authors : 0
            },
            seoHealth: { score: 92, indexedPages: 45, brokenLinks: 0, topKeywords: ["AI", "Web"] },
            performance: { lcp: "1.2s", cls: "0.01" },
            traffic: { totalViews: 1240, uniqueVisitors: 980, bounceRate: "42%", avgSession: "1m 24s" },
            security: { recentLogins: [{ name: admin.name, time: "Just now", ip: "127.0.0.1" }] },
            marketing: { leads: 12, conversionRate: "4.5%", activeLandingPages: 3 },
            recentContent: []
        };

        return NextResponse.json({ success: true, analytics: dashboardData });
    } catch (error) {
        console.error("Dashboard Sync API Error:", error);
        return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
    }
}
