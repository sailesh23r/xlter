import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import PerformanceMetric from "@/models/PerformanceMetric";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();

    const latest = await PerformanceMetric.find({}).sort({ timestamp: -1 }).limit(10);

    if (latest.length === 0) {
      return NextResponse.json({ success: true, data: null });
    }

    const summary = latest[0];
    
    const data = {
      avgLoadTime: (summary.metrics.lcp / 1000).toFixed(1),
      bundleSize: (summary.details.pageSize / 1024).toFixed(1),
      avgRenderTime: summary.details.renderTime,
      avgApiLatency: summary.details.apiLatency,
      routes: latest.map(m => ({
        path: m.path,
        loadTime: (m.metrics.lcp / 1000).toFixed(1),
        renderTime: m.details.renderTime,
        apiLatency: m.details.apiLatency
      })),
      alerts: summary.details.unusedAssets > 0 ? [{
        title: "Unused CSS/JS",
        description: `Detected ${summary.details.unusedAssets} unused assets on the homepage.`,
        severity: "warning" as const
      }] : []
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
