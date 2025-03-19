"use client";

import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/globalContext";
import { play } from "@/utils/icons";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const router = useRouter();
  const { quizResponses, selectedQuiz } = useGlobalContext();
  const [scorePercentage, setScorePercentage] = useState(null);
  const [message, setMessage] = useState("");
  const [resources, setResources] = useState([]);

  useEffect(() => {
    if (!quizResponses || quizResponses.length === 0) {
      router.push("/quizmodule"); // Redirect to /quizmodule instead of /
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
    <div className="py-20 flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-center">Quiz Results</h1>

      <p className="text-2xl text-center mt-4">
        You scored <span className="font-bold">{quizResponses.filter((res) => res.isCorrect).length}</span>
        out of <span className="font-bold text-3xl">{quizResponses.length}</span>
      </p>

      {scorePercentage !== null && (
        <>
          <p className="text-blue-400 font-bold text-4xl text-center">{scorePercentage.toFixed()}%</p>
          <p className="text-2xl text-center mt-2 font-semibold">{message}</p>
        </>
      )}

      {resources.length > 0 && (
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold">Recommended Resources:</h2>
          <ul className="list-disc mt-2">
            {resources.map((resource, index) => (
              <li key={index}>
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-center mt-8 gap-4">
        <Button
          className="px-10 py-6 font-bold text-white text-xl rounded-xl"
          onClick={() => router.push(`/quiz/setup/${selectedQuiz.id}`)}
        >
          {play} Play Again
        </Button>
        {/* <Button
          className="px-10 py-6 font-bold text-white text-xl rounded-xl"
          onClick={() => router.push(`/quiz/retry/${selectedQuiz.id}`)}
        >
          Retry Failed Questions
        </Button> */}
        <Button
          className="px-10 py-6 font-bold text-white text-xl rounded-xl"
          onClick={() => router.push("/quizmodule")}
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
}

export default Page;