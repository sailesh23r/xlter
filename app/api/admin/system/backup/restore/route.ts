import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Backup from "@/models/Backup";
import Blog from "@/models/Blog";
import PageSEO from "@/models/PageSEO";
import Page from "@/models/Page";
import Redirect from "@/models/Redirect";
import { getCurrentAdmin, ROLES } from "@/lib/auth";

export async function POST(req: NextRequest) {
    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin || currentAdmin.role !== ROLES.SUPER_ADMIN) {
            return NextResponse.json({ success: false, error: "Only Super Admins can restore data" }, { status: 401 });
        }

        const { backupId } = await req.json();
        await connectToDatabase();

        const backup = await Backup.findById(backupId);
        if (!backup) {
            return NextResponse.json({ success: false, error: "Backup not found" }, { status: 404 });
        }

        const backupData = JSON.parse(backup.data);

        // Restore Blogs
        if (backupData.blogs) {
            await Blog.deleteMany({});
            await Blog.insertMany(backupData.blogs);
        }

        // Restore SEO
        if (backupData.seo) {
            await PageSEO.deleteMany({});
            await PageSEO.insertMany(backupData.seo);
        }

        // Restore Pages
        if (backupData.pages) {
            await Page.deleteMany({});
            await Page.insertMany(backupData.pages);
        }

        // Restore Redirects
        if (backupData.redirects) {
            await Redirect.deleteMany({});
            await Redirect.insertMany(backupData.redirects);
        }

        return NextResponse.json({ success: true, message: "System restored successfully" });
    } catch (error) {
        console.error("Restore error:", error);
        return NextResponse.json({ success: false, error: "Restore failed" }, { status: 500 });
    }
}
