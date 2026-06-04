import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import connectToDatabase, { withTimeout } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function GET() {
  try {
    console.log("GET /api/admin/content/testimonials - Connecting...");
    await withTimeout(connectToDatabase(), 5000);
    console.log("GET /api/admin/content/testimonials - Connected. Fetching...");
    const testimonials = await withTimeout(
      Testimonial.find({}).sort({ createdAt: -1 }),
      5000
    );
    return NextResponse.json(testimonials);
  } catch (error: any) {
    console.error("Error in GET /api/admin/content/testimonials:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const testimonial = await Testimonial.create(body);
    return NextResponse.json(testimonial);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
