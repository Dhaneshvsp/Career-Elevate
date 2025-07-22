// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/mock-interviews/interview/[interviewId]/start/page.jsx

import React from 'react';
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { notFound } from 'next/navigation';
import InterviewPlayer from './_components/InterviewPlayer';

// This is now a Server Component
export default async function StartInterviewPage({ params }) {
  
  // 1. Fetch data on the server
  const getInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (!result || result.length === 0) {
        return null; // Handle case where interview is not found
      }
      return result[0];
    } catch (error) {
      console.error("Error fetching interview details:", error);
      return null;
    }
  };

  const interviewData = await getInterviewDetails();

  // If no data, show a 404 page
  if (!interviewData) {
    notFound();
  }

  // 2. Parse the questions on the server
  let mockInterviewQuestion = [];
  try {
      const jsonMockResp = interviewData.jsonMockResp
        .trim()
        .replace(/^\ufeff/, "") // Remove BOM
        .replace(/```json/g, "") // Remove markdown fences
        .replace(/```/g, "");
      mockInterviewQuestion = JSON.parse(jsonMockResp);
  } catch (e) {
      console.error("Failed to parse mock interview questions JSON", e);
      // Handle the error, maybe show an error page
      notFound();
  }


  // 3. Pass the data as props to the Client Component
  return (
    <InterviewPlayer 
      interviewData={interviewData}
      mockInterviewQuestion={mockInterviewQuestion}
    />
  );
}