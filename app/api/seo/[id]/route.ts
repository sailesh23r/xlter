import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import connectToDatabase from "@/lib/mongodb";
import PageSEO from "@/models/PageSEO";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await request.json();
    const seo = await PageSEO.findByIdAndUpdate(id, body, { new: true });
    if (!seo) {
      return NextResponse.json({ success: false, error: "SEO entry not found" }, { status: 404 });
    }
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
    await connectToDatabase();
    const { id } = await params;
    const seo = await PageSEO.findByIdAndDelete(id);
    if (!seo) {
      return NextResponse.json({ success: false, error: "SEO entry not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "SEO entry deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete SEO entry" }, { status: 500 });
  }
}
