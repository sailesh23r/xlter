import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET() {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Not logged in" }, { status: 401 });

        return NextResponse.json({ 
            success: true, 
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            } 
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
