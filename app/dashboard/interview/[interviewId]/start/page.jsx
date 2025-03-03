"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswersSection from './_components/RecordAnswersSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({ params: paramsPromise }) {
  const [params, setParams] = useState(null);
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  // Resolve params Promise
  useEffect(() => {
    async function resolveParams() {
      try {
        const resolvedParams = await paramsPromise;
        setParams(resolvedParams);
      } catch (error) {
        console.error("Error resolving params:", error);
      }
    }
    resolveParams();
  }, [paramsPromise]);

  // Fetch interview details once params are available
  useEffect(() => {
    if (params?.interviewId) {
      GetInterviewDetails(params.interviewId);
    } else if (params) {
      console.error("Interview ID is not available in params");
    }
  }, [params]);

  // Fetch interview details by ID
  const GetInterviewDetails = async (interviewId) => {
    try {
      const res = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));
  
      if (res && res.length > 0) {
        const jsonMockResp = res[0].jsonMockResp;
  
        console.log("Raw jsonMockResp:", jsonMockResp); // Log raw data for debugging
  
        // Clean and parse JSON
        const cleanedJsonResp = jsonMockResp.trim().replace(/^\ufeff/, "").replace(/```/g, "");
        console.log("Cleaned JSON String:", cleanedJsonResp);
  
        try {
          const parsedMockResp = JSON.parse(cleanedJsonResp || "{}");
          console.log("Parsed Response:", parsedMockResp);
  
          // Ensure 'interviewQuestions' is an array
          // const questions = Array.isArray(parsedMockResp?.interview_questions)
          //   ? parsedMockResp.interview_questions
          //   : [];
          const questions = Array.isArray(parsedMockResp) ? parsedMockResp : [];

          console.log("mock: ",questions);
          if (questions.length === 0) {
            console.warn("No valid questions found in the parsed response.");
          }
  
          setMockInterviewQuestion(questions);
          setInterviewData(res[0]);
        } catch (parseError) {
          console.error("Error parsing JSON response:", parseError);
          setMockInterviewQuestion([]); // Set empty array if JSON is invalid
        }
      } else {
        console.error("No interview data found for the given ID");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };
  
  console.log("Questions in page.jsx: ",mockInterviewQuestion);

  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-11">
      {/* Questions Section */}
      <QuestionsSection
        mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
      />
      {/* Placeholder for Audio and Video Recording */}
      <div>
        <RecordAnswersSection mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex} interviewData={interviewData}/>
      </div>
    </div>
    <div className='flex justify-end gap-6'>
        {activeQuestionIndex>0&&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Pevious Question</Button>}
        {activeQuestionIndex!=mockInterviewQuestion?.length-1&&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
        
        {activeQuestionIndex==mockInterviewQuestion?.length-1&&<Link href={'/dashboard/interview/'+interviewData?.mockId+'/Feedback'}><Button>End Interview</Button></Link>}
        
      </div>
      </>
  );
}

export default StartInterview;
