import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import LandingPage from "@/models/LandingPage";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await connectToDatabase();
        const pages = await LandingPage.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, pages });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await connectToDatabase();
        const data = await request.json();
        const page = await LandingPage.create(data);
        return NextResponse.json({ success: true, page });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Creation failed" }, { status: 500 });
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
        const page = await LandingPage.findByIdAndUpdate(id, data, { new: true });
        return NextResponse.json({ success: true, page });
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
        await LandingPage.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Delete failed" }, { status: 500 });
    }
}
