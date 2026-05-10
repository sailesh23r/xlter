import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import SchemaMarkup from "@/models/Schema";
import { getCurrentAdmin, ROLES } from "@/lib/auth";

export async function GET() {
    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await connectToDatabase();
        const schemas = await SchemaMarkup.find({}).sort({ updatedAt: -1 });
        return NextResponse.json({ success: true, schemas });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        await connectToDatabase();

        const exists = await SchemaMarkup.findOne({ pageUrl: body.pageUrl });
        if (exists) return NextResponse.json({ success: false, error: "Schema for this URL already exists" }, { status: 400 });

        const newSchema = await SchemaMarkup.create(body);
        return NextResponse.json({ success: true, schema: newSchema });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

        const body = await req.json();
        await connectToDatabase();

        const updated = await SchemaMarkup.findByIdAndUpdate(id, body, { new: true });
        if (!updated) return NextResponse.json({ success: false, error: "Schema not found" }, { status: 404 });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

        await connectToDatabase();
        await SchemaMarkup.findByIdAndDelete(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
