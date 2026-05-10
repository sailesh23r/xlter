import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { getCurrentAdmin, ROLES } from "@/lib/auth";

export async function GET() {
    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await connectToDatabase();
        let settings = await Settings.findOne({});
        if (!settings) {
            settings = await Settings.create({ siteName: "Xeltr Studio" });
        }
        return NextResponse.json({ success: true, settings });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin || currentAdmin.role !== ROLES.SUPER_ADMIN) {
            return NextResponse.json({ success: false, error: "Only Super Admins can change settings" }, { status: 401 });
        }

        const body = await req.json();
        await connectToDatabase();

        const updated = await Settings.findOneAndUpdate({}, body, { new: true, upsert: true });
        return NextResponse.json({ success: true, settings: updated });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
