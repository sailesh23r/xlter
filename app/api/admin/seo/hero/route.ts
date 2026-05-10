import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import HeroSEO from "@/models/HeroSEO";
import { getCurrentAdmin, ROLES } from "@/lib/auth";

export async function GET() {
    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await connectToDatabase();
        let hero = await HeroSEO.findOne({});
        if (!hero) {
            // Create default hero configuration if not exists
            hero = await HeroSEO.create({
                updatedBy: currentAdmin.name
            });
        }
        return NextResponse.json({ success: true, hero });
    } catch (error) {
        console.error("Hero API GET error:", error);
        return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        // SEO Managers can also update Hero SEO, but maybe restrict some fields if needed.
        // For now, let's allow SUPER_ADMIN and SEO_MANAGER.
        const allowedRoles = [ROLES.SUPER_ADMIN, ROLES.SEO_MANAGER];
        if (!allowedRoles.includes(currentAdmin.role as any)) {
            return NextResponse.json({ success: false, error: "Insufficient permissions" }, { status: 403 });
        }

        const body = await req.json();
        await connectToDatabase();

        const updated = await HeroSEO.findOneAndUpdate(
            {}, 
            { ...body, updatedBy: currentAdmin.name }, 
            { new: true, upsert: true }
        );
        
        return NextResponse.json({ success: true, hero: updated });
    } catch (error) {
        console.error("Hero API PUT error:", error);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
