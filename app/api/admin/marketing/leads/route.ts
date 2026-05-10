import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Lead from "@/models/Lead";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await connectToDatabase();
        const leads = await Lead.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, leads });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const data = await request.json();

        await connectToDatabase();
        const lead = await Lead.findByIdAndUpdate(id, data, { new: true });
        return NextResponse.json({ success: true, lead });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Update failed" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        await connectToDatabase();
        await Lead.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Delete failed" }, { status: 500 });
    }
}
