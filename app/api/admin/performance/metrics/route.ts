import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import PerformanceMetric from "@/models/PerformanceMetric";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const device = (searchParams.get("device") as "mobile" | "desktop") || "mobile";

    await connectToDatabase();

    // Fetch the latest metrics for the homepage (or aggregate for whole site)
    const latest = await PerformanceMetric.findOne({ device }).sort({ timestamp: -1 });

    if (!latest) {
      return NextResponse.json({ success: true, data: null });
    }

    // Fetch trend data (last 7 snapshots)
    const history = await PerformanceMetric.find({ device })
      .sort({ timestamp: -1 })
      .limit(7)
      .select('metrics timestamp');

    const trends = {
      lcp: history.map(h => ({ 
        label: h.timestamp.toLocaleDateString('en-US', { weekday: 'short' }), 
        value: h.metrics.lcp 
      })).reverse(),
      inp: history.map(h => ({ 
        label: h.timestamp.toLocaleDateString('en-US', { weekday: 'short' }), 
        value: h.metrics.inp 
      })).reverse()
    };

    return NextResponse.json({
      success: true,
      data: {
        metrics: latest.metrics,
        trends
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
