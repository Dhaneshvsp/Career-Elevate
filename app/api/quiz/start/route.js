import { db } from "@/utils/db";
import { Quiz } from "@/utils/schema";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { categoryId, difficulty, totalQuestions } = await req.json();
    const quiz = await db.insert(Quiz).values({ categoryId, difficulty, totalQuestions }).returning();
    return NextResponse.json(quiz);
}