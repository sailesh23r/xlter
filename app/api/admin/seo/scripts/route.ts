import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import ScriptInjection from "@/models/ScriptInjection";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await connectToDatabase();
        const scripts = await ScriptInjection.find().sort({ createdAt: -1 });
        return NextResponse.json({ success: true, scripts });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch scripts" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await connectToDatabase();
        const data = await request.json();
        const script = await ScriptInjection.create(data);
        return NextResponse.json({ success: true, script });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to create script" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const data = await request.json();
        const script = await ScriptInjection.findByIdAndUpdate(id, data, { new: true });
        return NextResponse.json({ success: true, script });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to update script" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        await ScriptInjection.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to delete script" }, { status: 500 });
    }
}
