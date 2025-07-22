// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/quizmodule/categories/[categoryId]/QuizClient.jsx

"use client";

import QuizCard from "@/components/quiz/QuizCard";
import { motion } from "framer-motion";

export default function QuizClient({ quizzes }) {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-3xl sm:text-4xl font-bold text-gray-800 text-center"
      >
        All Quizzes
      </motion.h1>
      {quizzes.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </motion.div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl text-gray-600 text-center mt-8"
        >
          No quizzes found for this category
        </motion.p>
      )}
    </div>
  );
}