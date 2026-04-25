import connectToDatabase from "@/lib/mongodb";
import Redirect from "@/models/Redirect";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();
    const redirects = await Redirect.find({ enabled: true }, { source: 1, destination: 1, permanent: 1 }).lean();
    return NextResponse.json({ success: true, redirects });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
