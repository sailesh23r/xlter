import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectToDatabase from "@/lib/mongodb";
import Redirect from "@/models/Redirect";

export const dynamic = "force-dynamic";

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

    const redirect = await Redirect.findByIdAndUpdate(id, body, { new: true });
    if (!redirect) {
      return NextResponse.json({ success: false, error: "Redirect not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, redirect });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Failed to update redirect" }, { status: 500 });
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
    const redirect = await Redirect.findByIdAndDelete(id);
    if (!redirect) {
      return NextResponse.json({ success: false, error: "Redirect not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Redirect deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to delete redirect" }, { status: 500 });
  }
}
