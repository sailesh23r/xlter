import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import ScriptInjection from "@/models/ScriptInjection";

export const dynamic = "force-dynamic";

function isContentSafe(content: string): boolean {
  const cleanContent = content.replace(/<!--[\s\S]*?-->/g, "");
  if (!cleanContent.trim()) return true;
  const otherTags = cleanContent.match(/<(?!(script|meta|\/script|\/meta|!))[^>]+>/gi);
  return !otherTags;
}

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session");
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await checkAuth();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectToDatabase();
    const body = await request.json();

    if (body.content && !isContentSafe(body.content)) {
      return NextResponse.json({ success: false, error: "Invalid content. Only <script> and <meta> tags are allowed." }, { status: 400 });
    }

    const script = await ScriptInjection.findByIdAndUpdate(id, body, { new: true });
    if (!script) {
      return NextResponse.json({ success: false, error: "Script not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, script });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to update script" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await checkAuth();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectToDatabase();
    const script = await ScriptInjection.findByIdAndDelete(id);
    if (!script) {
      return NextResponse.json({ success: false, error: "Script not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Script deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete script" }, { status: 500 });
  }
}
