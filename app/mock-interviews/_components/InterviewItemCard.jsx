// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/mock-interviews/_components/InterviewItemCard.jsx

"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function InterviewItemCard({ interview }) {
  const router = useRouter();
  const onStart = () => {
    router.push("/mock-interviews/interview/" + interview?.mockId);
  };
  const onFeedBackClick = () => {
    router.push("/mock-interviews/interview/" + interview?.mockId + "/Feedback");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-teal-600 hover:shadow-lg transition-shadow duration-300">
      <h2 className="font-semibold text-teal-800 text-lg truncate">
        {interview?.jobPosition || "N/A"}
      </h2>
      <h2 className="text-sm text-indigo-700 mt-1">
        {interview?.jobExperience} Years of Experience
      </h2>
      <h2 className="text-xs text-gray-500 mt-1">
        Created: {interview?.createdAt || "Unknown"}
      </h2>
      <div className="flex justify-between gap-4 mt-4">
        <Button
          size="sm"
          variant="ghost"
          className="w-full border border-teal-600 text-teal-600 hover:bg-teal-50 hover:text-teal-800 transition-colors duration-200"
          onClick={onFeedBackClick}
        >
          Feedback
        </Button>
        <Button
          size="sm"
          className="w-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200"
          onClick={onStart}
        >
          Start
        </Button>
      </div>
    </div>
  );
}

export default InterviewItemCard;