import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import connectToDatabase, { withTimeout } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function GET() {
  try {
    await withTimeout(connectToDatabase(), 5000);
    // .lean() converts the Mongoose Query into a plain Promise so withTimeout works correctly
    const testimonials = await withTimeout(
      Testimonial.find({}).sort({ createdAt: -1 }).lean() as Promise<any[]>,
      5000
    );
    return NextResponse.json(testimonials ?? []);
  } catch (error: any) {
    console.error("Error in GET /api/admin/content/testimonials:", error);
    // Return empty array instead of 500 — the component already has fallback data
    return NextResponse.json([]);
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
