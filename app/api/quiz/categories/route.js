import { db } from "@/utils/db";
import { QuizCategory } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function GET() {
    const categories = await db.select().from(QuizCategory);
    return NextResponse.json(categories);
}