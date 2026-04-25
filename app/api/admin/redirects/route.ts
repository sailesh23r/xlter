import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import Redirect from "@/models/Redirect";

export const dynamic = "force-dynamic";

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session");
}

export async function GET() {
  const session = await checkAuth();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const redirects = await Redirect.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, redirects });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch redirects" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await checkAuth();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const body = await request.json();
    
    // Basic validation
    if (!body.source || !body.destination) {
      return NextResponse.json({ success: false, error: "Source and destination are required." }, { status: 400 });
    }

    // Ensure source starts with /
    if (!body.source.startsWith("/")) {
      body.source = "/" + body.source;
    }

    const redirect = await Redirect.create(body);
    return NextResponse.json({ success: true, redirect }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: "This source path already has a redirect." }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message || "Failed to create redirect" }, { status: 500 });
  }
}
