import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Analytics from "@/models/Analytics";
import Lead from "@/models/Lead";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await connectToDatabase();

        // In a real app, you'd aggregate data based on date ranges
        // Here we'll provide a sophisticated summary of current data
        const totalVisitors = await Analytics.countDocuments();
        const totalLeads = await Lead.countDocuments();
        const conversionRate = totalVisitors > 0 ? ((totalLeads / totalVisitors) * 100).toFixed(1) : "0";
        
        // Sample daily traffic aggregation
        const dailyTraffic = [
            { label: "Mon", value: 450 },
            { label: "Tue", value: 520 },
            { label: "Wed", value: 380 },
            { label: "Thu", value: 640 },
            { label: "Fri", value: 710 },
            { label: "Sat", value: 490 },
            { label: "Sun", value: 320 },
        ];

        // Sample source aggregation
        const sources = [
            { name: "Google Search", percent: 45 },
            { name: "Direct Traffic", percent: 25 },
            { name: "Social Media", percent: 20 },
            { name: "Referral", percent: 10 },
        ];

        // Sample top pages
        const topPages = [
            { path: "/", views: 1240, visitors: 980, avgTime: "1m 24s", conversions: 12 },
            { path: "/services", views: 850, visitors: 620, avgTime: "2m 10s", conversions: 8 },
            { path: "/blog/future-of-ai", views: 540, visitors: 410, avgTime: "3m 45s", conversions: 3 },
            { path: "/contact", views: 320, visitors: 280, avgTime: "0m 55s", conversions: 15 },
        ];

        // Fetch recent leads for activity feed
        const recentLeadsRaw = await Lead.find().sort({ createdAt: -1 }).limit(5);
        const recentLeads = recentLeadsRaw.map(l => ({
            name: l.name,
            source: l.source,
            timeAgo: "Just now" // Simplified for now
        }));

        return NextResponse.json({ 
            success: true, 
            data: {
                totalVisitors,
                totalLeads,
                conversionRate,
                bounceRate: "42.5",
                dailyTraffic,
                sources,
                devices: { desktop: 65, mobile: 35 },
                topPages,
                recentLeads
            }
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
