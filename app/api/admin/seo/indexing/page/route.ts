import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import PageSEO from "@/models/PageSEO";
import { getCurrentAdmin } from "@/lib/auth";

export async function PUT(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const data = await request.json();
        const page = await PageSEO.findByIdAndUpdate(id, data, { new: true });
        return NextResponse.json({ success: true, page });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to update page indexing" }, { status: 500 });
    }
}
