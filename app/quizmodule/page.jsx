// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/quizmodule/page.jsx


"use client";

import HomeCard from "@/components/quiz/HomeCard";
import { useGlobalContext } from "@/context/globalContext";
import { motion } from "framer-motion";

export default function Home() {
  const { categories } = useGlobalContext();

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center"
      >
        Quiz Catalog
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {categories.map((category) => (
          <HomeCard key={category.id} category={category} />
        ))}
      </motion.div>
    </div>
  );
}