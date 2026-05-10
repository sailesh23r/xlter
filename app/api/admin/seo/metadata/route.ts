import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import connectToDatabase from "@/lib/mongodb";
import PageSEO from "@/models/PageSEO";
import { getCurrentAdmin, logActivity, ROLES } from "@/lib/auth";

export async function GET() {
  try {
    const currentAdmin = await getCurrentAdmin();
    if (!currentAdmin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    await connectToDatabase();
    const seoEntries = await PageSEO.find({}).sort({ route: 1 });
    return NextResponse.json({ success: true, seoEntries });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch SEO entries" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const currentAdmin = await getCurrentAdmin();
    if (!currentAdmin || (currentAdmin.role !== ROLES.SUPER_ADMIN && currentAdmin.role !== ROLES.SEO_MANAGER)) {
      return NextResponse.json({ success: false, error: "Insufficient permissions" }, { status: 403 });
    }

    await connectToDatabase();
    const body = await request.json();
    const seo = await PageSEO.create(body);

    await logActivity(
        currentAdmin,
        "CREATE",
        "SEO",
        { newValue: seo, description: `Created SEO metadata for route: ${seo.route}` },
        seo._id.toString(),
        seo.route
    );

    return NextResponse.json({ success: true, seo }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to create SEO entry" }, { status: 500 });
  }
}
