import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Backup from "@/models/Backup";
import Blog from "@/models/Blog";
import PageSEO from "@/models/PageSEO";
import Page from "@/models/Page";
import Redirect from "@/models/Redirect";
import { getCurrentAdmin, ROLES } from "@/lib/auth";

export async function GET() {
    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin || (currentAdmin.role !== ROLES.SUPER_ADMIN && currentAdmin.role !== ROLES.ADMIN)) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();
        const backups = await Backup.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, backups });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Database error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const currentAdmin = await getCurrentAdmin();
        if (!currentAdmin || currentAdmin.role !== ROLES.SUPER_ADMIN) {
            return NextResponse.json({ success: false, error: "Only Super Admins can run backups" }, { status: 401 });
        }

        const { type } = await req.json();
        await connectToDatabase();

        const backupData: any = {};
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const filename = `backup-${type}-${timestamp}.json`;

        if (type === "FULL" || type === "BLOGS") {
            backupData.blogs = await Blog.find({});
        }
        if (type === "FULL" || type === "SEO") {
            backupData.seo = await PageSEO.find({});
        }
        if (type === "FULL" || type === "PAGES") {
            backupData.pages = await Page.find({});
        }
        if (type === "FULL" || type === "REDIRECTS") {
            backupData.redirects = await Redirect.find({});
        }

        const newBackup = await Backup.create({
            type,
            filename,
            data: JSON.stringify(backupData),
            createdBy: currentAdmin.name,
        });

        return NextResponse.json({ success: true, backup: newBackup });
    } catch (error) {
        console.error("Backup error:", error);
        return NextResponse.json({ success: false, error: "Backup failed" }, { status: 500 });
    }
}
