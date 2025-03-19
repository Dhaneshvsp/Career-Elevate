import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { QuizCategory, QuizQuestions, UserQuizAttempts } from "@/utils/schema";

// Fetch quiz categories
export async function GET() {
  try {
    const categories = await db.select().from(QuizCategory);
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

// Fetch quiz questions based on category & difficulty
export async function POST(req) {
  try {
    const { category, difficulty, numQuestions } = await req.json();
    const questions = await db
      .select()
      .from(QuizQuestions)
      .where(QuizQuestions.category.eq(category))
      .and(QuizQuestions.difficulty.eq(difficulty))
      .limit(numQuestions);

    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}
