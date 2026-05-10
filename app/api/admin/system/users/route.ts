import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { getCurrentAdmin, ROLES } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin || currentAdmin.role !== ROLES.SUPER_ADMIN) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();
        const users = await Admin.find({}, "-passwordHash").sort({ createdAt: -1 });
        return NextResponse.json({ success: true, users });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin || currentAdmin.role !== ROLES.SUPER_ADMIN) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { name, email, password, role } = await req.json();
        if (!name || !email || !password || !role) {
            return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
        }

        await connectToDatabase();
        const exists = await Admin.findOne({ email });
        if (exists) {
            return NextResponse.json({ success: false, error: "User already exists" }, { status: 400 });
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await Admin.create({
            name,
            email,
            passwordHash,
            role,
        });

        return NextResponse.json({ success: true, user: { _id: newUser._id, name, email, role } });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin || currentAdmin.role !== ROLES.SUPER_ADMIN) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

        const { name, email, password, role } = await req.json();
        await connectToDatabase();

        const updateData: any = { name, email, role };
        if (password) {
            updateData.passwordHash = await bcrypt.hash(password, 10);
        }

        const updated = await Admin.findByIdAndUpdate(id, updateData, { new: true });
        if (!updated) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin || currentAdmin.role !== ROLES.SUPER_ADMIN) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

        // Prevent self-deletion
        if (id === currentAdmin._id.toString()) {
            return NextResponse.json({ success: false, error: "Cannot delete your own account" }, { status: 400 });
        }

        await connectToDatabase();
        await Admin.findByIdAndDelete(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
