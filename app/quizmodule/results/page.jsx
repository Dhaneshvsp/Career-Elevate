// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/quizmodule/results/page.jsx
//quizmodule/results/page.jsx:

"use client";

import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/globalContext";
import { play } from "@/utils/icons";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

function Page() {
  const router = useRouter();
  const { quizResponses, selectedQuiz } = useGlobalContext();
  const [scorePercentage, setScorePercentage] = useState(null);
  const [message, setMessage] = useState("");
  const [resources, setResources] = useState([]);

  useEffect(() => {
    if (!quizResponses || quizResponses.length === 0) {
      router.push("/quizmodule");
    } else {
      const correctAnswers = quizResponses.filter((res) => res.isCorrect).length;
      const totalQuestions = quizResponses.length;
      const percentage = (correctAnswers / totalQuestions) * 100;
      setScorePercentage(percentage);

      if (percentage < 25) {
        setMessage("You need to try harder!");
        setResources([
          { name: "Byju's", url: "https://byjus.com" },
          { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org" },
          { name: "Khan Academy", url: "https://www.khanacademy.org" },
        ]);
      } else if (percentage < 50) {
        setMessage("You're getting there! Keep practicing.");
        setResources([
          { name: "TutorialsPoint", url: "https://www.tutorialspoint.com" },
          { name: "W3Schools", url: "https://www.w3schools.com" },
        ]);
      } else if (percentage < 75) {
        setMessage("Good effort! You're above average.");
        setResources([
          { name: "Coursera", url: "https://www.coursera.org" },
          { name: "Udemy", url: "https://www.udemy.com" },
        ]);
      } else if (percentage < 100) {
        setMessage("Great job! You're so close to perfect!");
      } else {
        setMessage("Outstanding! You got everything right!");
      }
    }
  }, [quizResponses, router]);

  if (!quizResponses || quizResponses.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 sm:p-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-6">Quiz Results</h1>
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-lg sm:text-xl text-gray-600">
              You scored{" "}
              <span className="font-bold">{quizResponses.filter((res) => res.isCorrect).length}</span> out of{" "}
              <span className="font-bold">{quizResponses.length}</span>
            </p>
            {scorePercentage !== null && (
              <div className="mt-4">
                <Progress value={scorePercentage} className="w-full h-3 mb-2" />
                <p className="text-blue-600 font-bold text-3xl sm:text-4xl">{scorePercentage.toFixed()}%</p>
                <p className="text-lg sm:text-xl text-gray-700 mt-2">{message}</p>
              </div>
            )}
          </div>
          {resources.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Recommended Resources</h2>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-600">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {resource.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-lg flex items-center gap-2 transition-colors"
              onClick={() => router.push(`/quiz/setup/${selectedQuiz.id}`)}
            >
              <span className="flex items-center gap-2">{play} Play Again</span>
            </Button>
            <Button
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold text-lg rounded-lg transition-colors"
              onClick={() => router.push("/quizmodule")}
            >
              Go to Home
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Page;