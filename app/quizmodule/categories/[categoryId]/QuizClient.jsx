"use client";

import QuizCard from "@/components/quiz/QuizCard";

export default function QuizClient({ quizzes }) {
  return (
    <div>
      <h1 className="mb-6 text-4xl font-bold">All Quizzes</h1>
      {quizzes.length > 0 ? (
        <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      ) : (
        <h1 className="text-2xl text-center mt-4">No quizzes found for this Category</h1>
      )}
    </div>
  );
}
