"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import QuestionsSection from "./QuestionsSection";
import RecordAnswersSection from "./RecordAnswersSection";
import { toast } from "sonner";

// This is the new Client Component that receives data as props
export default function InterviewPlayer({ interviewData, mockInterviewQuestion }) {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180);
  const [shouldSpeak, setShouldSpeak] = useState(true);

  // Show initial info toast
  useEffect(() => {
    toast.info(
      "Info: Your video will not be recorded. Each question has a 3-minute time limit. Please wait for confirmation before moving to the next question.",
      {
        duration: 10000,
        position: "top-center",
      }
    );
  }, []);

  // Timer logic
  useEffect(() => {
    if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) return;

    setTimeLeft(180); // Reset timer for each question
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(timer);
      window.speechSynthesis.cancel();
      setShouldSpeak(false);
      // Automatically move to next question if time runs out
      if (activeQuestionIndex < mockInterviewQuestion.length - 1) {
        setActiveQuestionIndex((prev) => prev + 1);
        setTimeout(() => setShouldSpeak(true), 300);
      }
    }, 180000); // 3 minutes

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [activeQuestionIndex, mockInterviewQuestion]);


  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Handle "Next Question" button click
  const handleNextQuestion = () => {
    if (activeQuestionIndex < mockInterviewQuestion.length - 1) {
      window.speechSynthesis.cancel();
      setShouldSpeak(false);
      setActiveQuestionIndex((prev) => prev + 1);
      setTimeout(() => setShouldSpeak(true), 300);
    }
  };

  if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) {
      return <div>Loading questions...</div> // Or a proper loader
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with Timer */}
      <motion.div
        className="bg-teal-600 text-white p-4 sticky top-0 z-10 shadow-md"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            {interviewData?.jobPosition || "Mock Interview"}
          </h1>
          <div className="text-lg font-medium">
            Time Left: {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="flex-grow py-8 px-6 max-w-5xl mx-auto w-full">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Progress Indicator */}
          <motion.div
            className="mb-6 text-center text-gray-700"
            variants={itemVariants}
          >
            Question {activeQuestionIndex + 1} of {mockInterviewQuestion.length}
          </motion.div>

          {/* Questions & Recording */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-lg shadow-md p-6 border-t-2 border-teal-500">
                <QuestionsSection
                  mockInterviewQuestion={mockInterviewQuestion}
                  activeQuestionIndex={activeQuestionIndex}
                  shouldSpeak={shouldSpeak}
                />
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-lg shadow-md p-6 border-t-2 border-indigo-500">
                <RecordAnswersSection
                  mockInterviewQuestion={mockInterviewQuestion}
                  activeQuestionIndex={activeQuestionIndex}
                  interviewData={interviewData}
                />
              </div>
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <motion.div
            className="flex justify-center gap-6 mt-8"
            variants={itemVariants}
          >
            {activeQuestionIndex !== mockInterviewQuestion.length - 1 ? (
              <Button
                onClick={handleNextQuestion}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-500"
              >
                Next Question
              </Button>
            ) : (
              <Link
                href={`/mock-interviews/interview/${interviewData?.mockId}/Feedback`}
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setShouldSpeak(false);
                }}
              >
                <Button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-500">
                  End Interview
                </Button>
              </Link>
            )}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}