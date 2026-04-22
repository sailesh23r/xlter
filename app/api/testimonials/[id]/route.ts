import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import connectToDatabase from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();
    const deleted = await Testimonial.findByIdAndDelete(id);
    
    if (!deleted) {
      return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Testimonial deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
