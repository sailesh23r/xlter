import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function GET() {
  try {
    await connectToDatabase();

    const result = await Admin.findOneAndUpdate(
      { email: "admin@xeltr.com" },
      {
        $set: { failedLoginAttempts: 0 },
        $unset: { lockUntil: "" },
      },
      { new: true }
    );

    if (!result) {
      return NextResponse.json({ success: false, message: "Admin not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Account unlocked. You can now log in with admin@xeltr.com.",
      debug: {
        failedLoginAttempts: result.failedLoginAttempts,
        lockUntil: result.lockUntil ?? null,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
