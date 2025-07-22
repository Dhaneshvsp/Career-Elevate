// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/mock-interviews/interview/[interviewId]/start/_components/QuestionsSection.jsx

"use client";
import React, { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";
import Avatar from "@/components/Avatar";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex, shouldSpeak }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const textToSpeech = (text) => {
    if (!shouldSpeak) return; // ✅ Prevent TTS if shouldSpeak is false

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Stop previous speech

      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";
      speech.onstart = () => setIsSpeaking(true);
      speech.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text-to-speech");
    }
  };

  useEffect(() => {
    if (
      shouldSpeak &&
      mockInterviewQuestion &&
      mockInterviewQuestion[activeQuestionIndex]
    ) {
      window.speechSynthesis.cancel(); // Cancel before speaking new
      textToSpeech(mockInterviewQuestion[activeQuestionIndex].question);
    }
  }, [activeQuestionIndex, mockInterviewQuestion, shouldSpeak]);

  const questions = Array.isArray(mockInterviewQuestion)
    ? mockInterviewQuestion
    : [];

  const isValidQuestion =
    Array.isArray(questions) &&
    questions.length > 0 &&
    activeQuestionIndex >= 0 &&
    activeQuestionIndex < questions.length;

  return (
    <div className="bg-[#37474F] rounded-lg p-6 shadow-lg text-white">
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {questions.length > 0 ? (
          questions.map((_, index) => (
            <div
              key={index}
              className={`px-3 py-1 rounded-md text-sm font-medium text-center cursor-pointer transition-colors duration-200 ${
                activeQuestionIndex === index
                  ? "bg-teal-600 text-white"
                  : "bg-gray-600 text-gray-200 hover:bg-gray-500"
              }`}
            >
              Q{index + 1}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">Questions loading...</p>
        )}
      </div>

      <div className="text-center">
        {isValidQuestion ? (
          <div>
            <Avatar isSpeaking={isSpeaking} />
            <h2 className="text-lg md:text-xl font-semibold text-white leading-relaxed mt-4">
              {questions[activeQuestionIndex].question}
            </h2>
            <div className="mt-4 flex justify-center">
              <Volume2
                className="h-6 w-6 text-teal-400 cursor-pointer hover:text-teal-300"
                onClick={() =>
                  textToSpeech(questions[activeQuestionIndex]?.question)
                }
              />
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No question selected yet.</p>
        )}
      </div>
    </div>
  );
}

export default QuestionsSection;
