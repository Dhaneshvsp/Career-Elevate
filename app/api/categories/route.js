// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/api/categories/route.js
import { db } from "@/utils/db";
import { categories } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categoryList = await db.select().from(categories);
    return NextResponse.json(categoryList);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
