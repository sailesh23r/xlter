import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import ScriptInjection from "@/models/ScriptInjection";

export const dynamic = "force-dynamic";

// Simple sanitization function
function isContentSafe(content: string): boolean {
  // Allow only <script> and <meta> tags (basic check)
  // This is a naive implementation; in a real-world app, use a proper sanitizer
  const allowedTagsRegex = /^(\s*<(script|meta)[^>]*>[\s\S]*?<\/(script|meta)>|\s*<meta[^>]*>|\s*<(script|meta)[^>]*>[\s\S]*)*$/i;
  
  // Strip comments for checking
  const cleanContent = content.replace(/<!--[\s\S]*?-->/g, "");
  
  // Basic validation: must contain at least one allowed tag and no other tags
  if (!cleanContent.trim()) return true; // Empty is safe but maybe not useful
  
  // Check if it contains any tag that is NOT script or meta
  const otherTags = cleanContent.match(/<(?!(script|meta|\/script|\/meta|!))[^>]+>/gi);
  return !otherTags;
}

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
    const scripts = await ScriptInjection.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, scripts });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch scripts" }, { status: 500 });
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
    
    if (!isContentSafe(body.content)) {
      return NextResponse.json({ success: false, error: "Invalid content. Only <script> and <meta> tags are allowed." }, { status: 400 });
    }

    const script = await ScriptInjection.create(body);
    return NextResponse.json({ success: true, script }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to create script" }, { status: 500 });
  }
}
