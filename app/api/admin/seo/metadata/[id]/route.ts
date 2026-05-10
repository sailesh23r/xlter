import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import connectToDatabase from "@/lib/mongodb";
import PageSEO from "@/models/PageSEO";
import { getCurrentAdmin, logActivity, ROLES } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentAdmin = await getCurrentAdmin();
    if (!currentAdmin || (currentAdmin.role !== ROLES.SUPER_ADMIN && currentAdmin.role !== ROLES.SEO_MANAGER)) {
      return NextResponse.json({ success: false, error: "Insufficient permissions" }, { status: 403 });
    }

    await connectToDatabase();
    const { id } = await params;
    const body = await request.json();

    const oldSeo = await PageSEO.findById(id);
    if (!oldSeo) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    const seo = await PageSEO.findByIdAndUpdate(id, body, { new: true });
    
    await logActivity(
        currentAdmin,
        "UPDATE",
        "SEO",
        { oldValue: oldSeo, newValue: seo, description: `Updated SEO metadata for route: ${seo?.route}` },
        id,
        seo?.route
    );

    return NextResponse.json({ success: true, seo });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to update SEO entry" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentAdmin = await getCurrentAdmin();
    if (!currentAdmin || (currentAdmin.role !== ROLES.SUPER_ADMIN && currentAdmin.role !== ROLES.SEO_MANAGER)) {
      return NextResponse.json({ success: false, error: "Insufficient permissions" }, { status: 403 });
    }

    await connectToDatabase();
    const { id } = await params;
    
    const oldSeo = await PageSEO.findById(id);
    const seo = await PageSEO.findByIdAndDelete(id);
    if (!seo) {
      return NextResponse.json({ success: false, error: "SEO entry not found" }, { status: 404 });
    }

    await logActivity(
        currentAdmin,
        "DELETE",
        "SEO",
        { oldValue: oldSeo, description: `Deleted SEO metadata for route: ${oldSeo?.route}` },
        id,
        oldSeo?.route
    );

    return NextResponse.json({ success: true, message: "SEO entry deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete SEO entry" }, { status: 500 });
  }
}
