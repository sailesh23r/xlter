import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/models/Category";

import { client } from "@/sanity/lib/client";

export async function GET() {
  try {
    const query = `*[_type == "category"] | order(title asc) { _id, "name": title }`;
    const categories = await client.fetch(query);
    return NextResponse.json({ success: true, categories });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ success: false, error: "Name is required" }, { status: 400 });
    }

    const category = await Category.create({ name });
    return NextResponse.json({ success: true, category });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ success: false, error: "Category already exists" }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
