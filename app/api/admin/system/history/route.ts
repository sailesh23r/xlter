import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import UserActivity from "@/models/UserActivity";
import { getCurrentAdmin, ROLES } from "@/lib/auth";

export async function GET() {
    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin || (currentAdmin.role !== ROLES.SUPER_ADMIN && currentAdmin.role !== ROLES.ADMIN)) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();
        // Super admin sees all, Admin sees content changes, SEO Manager sees SEO changes
        let query: any = {};
        if (currentAdmin.role === ROLES.ADMIN) {
            query = { targetType: { $in: ["BLOG", "PAGE", "TESTIMONIAL", "CASESTUDY"] } };
        } else if (currentAdmin.role === ROLES.SEO_MANAGER) {
            query = { targetType: { $in: ["SEO", "REDIRECT"] } };
        }

        const activities = await UserActivity.find(query).sort({ createdAt: -1 }).limit(100);
        return NextResponse.json({ success: true, activities });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
    }
}
