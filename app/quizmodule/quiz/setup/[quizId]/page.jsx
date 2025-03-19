"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGlobalContext } from "@/context/globalContext";
import { play } from "@/utils/icons";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { startQuiz } from "@/app/quizmodule/actions";

function QuizSetupPage({ params }) {
  const router = useRouter();
  const { quizSetup, setQuizSetup, selectedQuiz, setSelectedQuiz, setFilteredQuestions } = useGlobalContext();
  const [questionCount, setQuestionCount] = useState(quizSetup?.questionCount || 1);
  const [difficulty, setDifficulty] = useState(quizSetup?.difficulty || "unspecified");

  useEffect(() => {
    if (!selectedQuiz) {
      console.log("No selectedQuiz in context, checking sessionStorage...");
      const storedQuiz = sessionStorage.getItem("selectedQuiz");
      if (storedQuiz) {
        const parsedQuiz = JSON.parse(storedQuiz);
        console.log("Restored selectedQuiz from sessionStorage:", parsedQuiz);
        if (parsedQuiz.questions && parsedQuiz.questions.length > 0) {
          setSelectedQuiz(parsedQuiz);
        } else {
          console.warn("Stored quiz lacks questions, redirecting...");
          router.push("/quizmodule");
        }
      } else {
        console.warn("No quiz found in sessionStorage, redirecting...");
        router.push("/quizmodule");
      }
    } else {
      console.log("SelectedQuiz loaded:", selectedQuiz);
      if (!selectedQuiz.questions || selectedQuiz.questions.length === 0) {
        console.warn("SelectedQuiz lacks questions, redirecting...");
        router.push("/quizmodule");
      }
    }
  }, [selectedQuiz, setSelectedQuiz, router]);

  useEffect(() => {
    console.log("Syncing quizSetup with questionCount:", questionCount, "difficulty:", difficulty);
    setQuizSetup((prev) => ({
      ...prev,
      questionCount,
      difficulty,
    }));
  }, [questionCount, difficulty, setQuizSetup]);

  useEffect(() => {
    if (!selectedQuiz?.questions) {
      console.log("No questions in selectedQuiz");
      return;
    }
    const filteredQuestions = selectedQuiz.questions.filter(
      (q) => difficulty === "unspecified" || q.difficulty?.toLowerCase() === difficulty
    );
    console.log("Filtered questions:", filteredQuestions);
    setFilteredQuestions(filteredQuestions);
  }, [difficulty, selectedQuiz, setFilteredQuestions]);

  const handleQuestionChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const maxQuestions = selectedQuiz?.questions?.length || 1;
    const newCount = isNaN(value) || value < 1 ? 1 : Math.min(value, maxQuestions);
    console.log("Changing questionCount to:", newCount, "Max:", maxQuestions);
    setQuestionCount(newCount);
  };

  const handleDifficultyChange = (value) => {
    console.log("Changing difficulty to:", value);
    setDifficulty(value);
  };

  const handleStartQuiz = async () => {
    if (!selectedQuiz || !selectedQuiz.questions || selectedQuiz.questions.length === 0) {
      console.error("Invalid selectedQuiz:", selectedQuiz);
      toast.error("No quiz selected or quiz has no questions!");
      return;
    }

    const selectedQuestions = selectedQuiz.questions
      .filter((q) => difficulty === "unspecified" || q.difficulty?.toLowerCase() === difficulty)
      .slice(0, questionCount);

    console.log("Selected questions for quiz:", selectedQuestions);

    if (selectedQuestions.length === 0) {
      console.error("No questions match the criteria");
      toast.error("No questions found for the selected criteria");
      return;
    }

    try {
      console.log("Calling startQuiz with categoryId:", selectedQuiz.categoryId);
      const response = await startQuiz(selectedQuiz.categoryId);
      console.log("startQuiz response:", response);

      if (response?.success) {
        console.log("Quiz started successfully, navigating to /quizmodule/quiz");
        router.push("/quizmodule/quiz");
      } else {
        console.error("startQuiz failed:", response?.error);
        toast.error(response?.error || "Failed to start quiz");
      }
    } catch (error) {
      console.error("Error in handleStartQuiz:", error);
      toast.error("Failed to start quiz");
    }
  };

  return (
    <div>
      <div className="py-[6rem] w-[50%] fixed left-1/2 top-[45%] translate-x-[-50%] translate-y-[-50%] p-6 border-2 rounded-xl shadow-md mx-auto">
        <h1 className="text-4xl font-bold mb-4">Quiz Setup</h1>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="questionCount" className="text-lg">
              Number of Questions (Max: {selectedQuiz?.questions?.length || 1})
            </Label>
            <Input
              type="number"
              min={1}
              max={selectedQuiz?.questions?.length || 1}
              id="questionCount"
              value={questionCount}
              onChange={handleQuestionChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="difficulty" className="text-lg">
              Difficulty
            </Label>
            <Select value={difficulty} onValueChange={handleDifficultyChange}>
              <SelectTrigger id="difficulty">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unspecified">Unspecified</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="w-full py-4 flex items-center justify-center fixed bottom-0 left-0 bg-white border-t-2">
        <Button className="px-10 py-6 font-bold text-white text-xl rounded-xl" onClick={handleStartQuiz}>
          <span className="flex items-center gap-2">{play} Start</span>
        </Button>
      </div>
    </div>
  );
}

export default QuizSetupPage;