import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Analytics from "@/models/Analytics";
import Lead from "@/models/Lead";
import { getCurrentAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await connectToDatabase();

        const totalVisitors = await Analytics.countDocuments().catch(() => 0);
        const totalLeads = await Lead.countDocuments().catch(() => 0);
        const conversionRate = totalVisitors > 0 ? ((totalLeads / totalVisitors) * 100).toFixed(1) : "0";

        // Real daily traffic from Analytics grouped by day of week
        const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dailyAgg = await Analytics.aggregate([
            {
                $group: {
                    _id: { $dayOfWeek: "$createdAt" }, // 1=Sun...7=Sat
                    count: { $sum: 1 },
                },
            },
        ]).catch(() => []);

        const dailyCounts: Record<number, number> = {};
        for (const row of dailyAgg) {
            dailyCounts[row._id] = row.count; // 1-indexed (1=Sun)
        }
        const dailyTraffic = DAY_LABELS.map((label, i) => ({
            label,
            value: dailyCounts[i + 1] ?? 0, // i+1 maps to MongoDB's 1-indexed dayOfWeek
        }));

        // Real traffic sources from Analytics.referrer field
        const sourceAgg = await Analytics.aggregate([
            { $group: { _id: "$referrer", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 6 },
        ]).catch(() => []);

        const totalSourceCount = sourceAgg.reduce((a: number, b: any) => a + b.count, 0);
        const sources = sourceAgg.map((s: any) => ({
            name: s._id || "Direct",
            percent: totalSourceCount > 0 ? Math.round((s.count / totalSourceCount) * 100) : 0,
        }));

        // Real top pages from Analytics.path field
        const topPagesAgg = await Analytics.aggregate([
            { $group: { _id: "$path", views: { $sum: 1 } } },
            { $sort: { views: -1 } },
            { $limit: 5 },
        ]).catch(() => []);

        const topPages = topPagesAgg.map((p: any) => ({
            path: p._id || "/",
            views: p.views,
            visitors: p.views, // analytics doesn't separate unique visitors per page
            avgTime: "—",
            conversions: 0,
        }));

        // Real device breakdown
        const deviceAgg = await Analytics.aggregate([
            { $group: { _id: "$device", count: { $sum: 1 } } },
        ]).catch(() => []);

        const totalDevices = deviceAgg.reduce((a: number, b: any) => a + b.count, 0);
        let desktopPct = 0, mobilePct = 0;
        for (const d of deviceAgg) {
            const pct = totalDevices > 0 ? Math.round((d.count / totalDevices) * 100) : 0;
            if ((d._id || "").toLowerCase().includes("mobile")) mobilePct = pct;
            else desktopPct += pct;
        }
        if (totalDevices > 0 && desktopPct + mobilePct < 100) desktopPct += 100 - desktopPct - mobilePct;

        // Recent leads for activity feed
        const recentLeadsRaw = await Lead.find().sort({ createdAt: -1 }).limit(5).catch(() => []);
        const recentLeads = recentLeadsRaw.map((l: any) => ({
            name: l.name,
            source: l.source || "Direct",
            timeAgo: (() => {
                const diff = Date.now() - new Date(l.createdAt).getTime();
                const mins = Math.floor(diff / 60000);
                if (mins < 60) return `${mins}m ago`;
                const hrs = Math.floor(mins / 60);
                if (hrs < 24) return `${hrs}h ago`;
                return `${Math.floor(hrs / 24)}d ago`;
            })(),
        }));

        return NextResponse.json({
            success: true,
            data: {
                totalVisitors,
                totalLeads,
                conversionRate,
                bounceRate: "N/A",
                dailyTraffic,
                sources: sources.length > 0 ? sources : [{ name: "No data yet", percent: 100 }],
                devices: { desktop: desktopPct || 100, mobile: mobilePct || 0 },
                topPages,
                recentLeads,
            },
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
