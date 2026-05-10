import { NextRequest, NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";
import connectToDatabase from "@/lib/mongodb";
import Media from "@/models/Media";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");
        const search = searchParams.get("search");

        let query: any = {};
        if (category && category !== "All") query.category = category;
        if (search) query.name = { $regex: search, $options: "i" };

        const media = await Media.find(query).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, media });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const formData = await request.formData();
        const file = formData.get("file") as File;
        const alt = formData.get("alt") as string || "";
        const category = formData.get("category") as string || "General";

        if (!file) {
            return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + "-" + file.name.replaceAll(" ", "_");
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await writeFile(path.join(uploadDir, filename), buffer);

        await connectToDatabase();
        const newMedia = await Media.create({
            name: file.name,
            url: `/uploads/${filename}`,
            alt,
            type: file.type,
            size: file.size,
            category,
            createdBy: admin.name,
        });

        return NextResponse.json({ success: true, media: newMedia });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

        await connectToDatabase();
        // Note: In a real app, you'd also delete the file from disk/S3
        await Media.findByIdAndDelete(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Delete failed" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

        const data = await request.json();
        await connectToDatabase();
        const media = await Media.findByIdAndUpdate(id, data, { new: true });

        return NextResponse.json({ success: true, media });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Update failed" }, { status: 500 });
    }
}
