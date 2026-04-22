import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import connectToDatabase from "@/lib/mongodb";

/**
 * GET /api/db-test
 * A simple endpoint to verify the MongoDB connection is working.
 * Remove or protect this route in production.
 */
export async function GET() {
  try {
    await connectToDatabase();
    return NextResponse.json(
      { success: true, message: "MongoDB connected successfully ✅" },
      { status: 200 }
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to connect to MongoDB ❌" },
      { status: 500 }
    );
  }
}
