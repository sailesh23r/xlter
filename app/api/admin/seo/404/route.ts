import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import FourOhFourSettings from "@/models/FourOhFourSettings";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await connectToDatabase();
        let settings = await FourOhFourSettings.findOne();
        if (!settings) {
            settings = await FourOhFourSettings.create({});
        }
        return NextResponse.json({ success: true, settings });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await connectToDatabase();
        const data = await request.json();
        const settings = await FourOhFourSettings.findOneAndUpdate({}, data, { upsert: true, new: true });
        return NextResponse.json({ success: true, settings });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 });
    }
}
