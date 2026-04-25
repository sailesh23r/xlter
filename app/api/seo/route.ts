import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import connectToDatabase from "@/lib/mongodb";
import PageSEO from "@/models/PageSEO";

export async function GET() {
  try {
    await connectToDatabase();
    const seoEntries = await PageSEO.find({}).sort({ route: 1 });
    return NextResponse.json({ success: true, seoEntries });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch SEO entries" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const seo = await PageSEO.create(body);
    return NextResponse.json({ success: true, seo }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to create SEO entry" }, { status: 500 });
  }
}
