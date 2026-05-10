import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    // In a real prod env, this would fetch from Vercel/Cloudflare API or internal cache stats
    // For now, if no monitoring system is active, return null to show "No data" UI
    return NextResponse.json({ success: true, data: null });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
