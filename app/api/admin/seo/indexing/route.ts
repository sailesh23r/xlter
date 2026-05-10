import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import PageSEO from "@/models/PageSEO";
import TechnicalSEO from "@/models/TechnicalSEO";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        await connectToDatabase();
        const pages = await PageSEO.find({}, "route title noIndex noFollow");
        const global = await TechnicalSEO.findOne({}, "forceHttps globalNoIndex sitemapAutoUpdate sslStatus sslExpiry indexedPages lcp cls lastCrawl");
        return NextResponse.json({ success: true, pages, global });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
    }
}
