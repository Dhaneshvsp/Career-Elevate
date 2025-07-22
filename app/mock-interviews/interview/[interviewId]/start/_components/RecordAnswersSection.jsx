// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/mock-interviews/interview/[interviewId]/start/_components/RecordAnswersSection.jsx
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

// Import the server action INSTEAD of db, chatSession, etc.
import { processAndSaveAnswer } from "../_actions/interviewActions";

function RecordAnswersSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Effect to concatenate spoken results into a single answer string
  useEffect(() => {
    if (results.length > 0) {
      const newTranscript = results.map((result) => result?.transcript).join(" ");
      setUserAnswer(newTranscript);
    }
  }, [results]);

  // Effect to automatically save the answer when recording stops
  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      setLoading(true);
      const currentQuestion = mockInterviewQuestion[activeQuestionIndex];

      // Call the server action with all the necessary data
      processAndSaveAnswer(
        userAnswer,
        currentQuestion,
        interviewData,
        user?.primaryEmailAddress?.emailAddress
      )
        .then((result) => {
          if (result.success) {
            toast.success("Your answer was recorded successfully!");
            // Reset state for the next question
            setUserAnswer("");
            setResults([]);
          } else {
            toast.error(result.message || "Failed to save answer.");
          }
        })
        .catch((err) => {
          console.error("Error calling server action:", err);
          toast.error("An unexpected error occurred.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isRecording]); // Reruns when isRecording changes

  const handleStartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      // Reset previous answer before starting a new recording
      setUserAnswer("");
      setResults([]);
      startSpeechToText();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex flex-col justify-center items-center mt-11 rounded-lg p-6 bg-black h-[340px] w-full">
        <Image
          src={"/Camera-retro-icon-removebg-preview.png"}
          width={200}
          height={200}
          className="absolute opacity-30"
          alt="webcam background"
        />
        <Webcam
          mirrored={true}
          style={{
            height: "100%",
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="mt-5 mb-6"
        onClick={handleStartStopRecording}
      >
        {loading ? (
          "Processing Answer..."
        ) : isRecording ? (
          <h2 className="flex gap-1 text-red-600 animate-pulse items-center">
            <StopCircle />
            Stop Recording
          </h2>
        ) : (
          <h2 className="flex gap-1 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
}

export default RecordAnswersSection;
