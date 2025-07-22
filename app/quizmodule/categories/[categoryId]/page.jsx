// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/quizmodule/categories/[categoryId]/page.jsx

import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { quizzes, questions, options } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuizClient from "./QuizClient";

async function fetchQuizzes(categoryId) {
  const quizzesData = await db.select().from(quizzes).where(eq(quizzes.categoryId, categoryId));
  console.log(`[Server] Quizzes for category ${categoryId}:`, quizzesData);

  const quizzesWithQuestions = await Promise.all(
    quizzesData.map(async (quiz) => {
      const quizQuestions = await db
        .select()
        .from(questions)
        .where(eq(questions.quizId, quiz.id));
      console.log(`[Server] Questions for quiz ${quiz.id}:`, quizQuestions);

      const questionsWithOptions = await Promise.all(
        quizQuestions.map(async (question) => {
          const questionOptions = await db
            .select()
            .from(options)
            .where(eq(options.questionId, question.id));
          return { ...question, options: questionOptions };
        })
      );
      return { ...quiz, questions: questionsWithOptions };
    })
  );

  return quizzesWithQuestions;
}

export default async function Page({ params }) {
  const { categoryId } = await params; // Await params
  const { userId } = auth();

  if (!categoryId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg text-gray-600">No category selected</p>
      </div>
    );
  }

  const quizData = await fetchQuizzes(parseInt(categoryId));
  console.log(`[Server] Quizzes with questions for category ${categoryId}:`, quizData);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <QuizClient quizzes={quizData} />
    </div>
  );
}