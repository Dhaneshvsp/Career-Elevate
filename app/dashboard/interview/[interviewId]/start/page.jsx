// "use client";
// import { db } from '@/utils/db';
// import { MockInterview } from '@/utils/schema';
// import { eq } from 'drizzle-orm';
// import React, { useEffect, useState } from 'react';
// import QuestionsSection from './_components/QuestionsSection';
// import RecordAnswersSection from './_components/RecordAnswersSection';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

// function StartInterview({ params: paramsPromise }) {
//   const [params, setParams] = useState(null);
//   const [interviewData, setInterviewData] = useState(null);
//   const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
//   const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

//   // Resolve params Promise
//   useEffect(() => {
//     async function resolveParams() {
//       try {
//         const resolvedParams = await paramsPromise;
//         setParams(resolvedParams);
//       } catch (error) {
//         console.error("Error resolving params:", error);
//       }
//     }
//     resolveParams();
//   }, [paramsPromise]);

//   // Fetch interview details once params are available
//   useEffect(() => {
//     if (params?.interviewId) {
//       GetInterviewDetails(params.interviewId);
//     } else if (params) {
//       console.error("Interview ID is not available in params");
//     }
//   }, [params]);

//   // Fetch interview details by ID
//   const GetInterviewDetails = async (interviewId) => {
//     try {
//       const res = await db
//         .select()
//         .from(MockInterview)
//         .where(eq(MockInterview.mockId, interviewId));
  
//       if (res && res.length > 0) {
//         const jsonMockResp = res[0].jsonMockResp;
  
//         console.log("Raw jsonMockResp:", jsonMockResp); // Log raw data for debugging
  
//         // Clean and parse JSON
//         const cleanedJsonResp = jsonMockResp.trim().replace(/^\ufeff/, "").replace(/```/g, "");
//         console.log("Cleaned JSON String:", cleanedJsonResp);
  
//         try {
//           const parsedMockResp = JSON.parse(cleanedJsonResp || "{}");
//           console.log("Parsed Response:", parsedMockResp);
  
//           // Ensure 'interviewQuestions' is an array
//           // const questions = Array.isArray(parsedMockResp?.interview_questions)
//           //   ? parsedMockResp.interview_questions
//           //   : [];
//           const questions = Array.isArray(parsedMockResp) ? parsedMockResp : [];

//           console.log("mock: ",questions);
//           if (questions.length === 0) {
//             console.warn("No valid questions found in the parsed response.");
//           }
  
//           setMockInterviewQuestion(questions);
//           setInterviewData(res[0]);
//         } catch (parseError) {
//           console.error("Error parsing JSON response:", parseError);
//           setMockInterviewQuestion([]); // Set empty array if JSON is invalid
//         }
//       } else {
//         console.error("No interview data found for the given ID");
//       }
//     } catch (error) {
//       console.error("Error fetching interview details:", error);
//     }
//   };
  
//   console.log("Questions in page.jsx: ",mockInterviewQuestion);

//   return (
//     <>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-11">
//       {/* Questions Section */}
//       <QuestionsSection
//         mockInterviewQuestion={mockInterviewQuestion}
//         activeQuestionIndex={activeQuestionIndex}
//       />
//       {/* Placeholder for Audio and Video Recording */}
//       <div>
//         <RecordAnswersSection mockInterviewQuestion={mockInterviewQuestion}
//         activeQuestionIndex={activeQuestionIndex} interviewData={interviewData}/>
//         <div className='w-[100%] flex justify-center gap-6 mr-[6rem]'>
//         {activeQuestionIndex>0&&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Pevious Question</Button>}
//         {activeQuestionIndex!=mockInterviewQuestion?.length-1&&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
        
//         {activeQuestionIndex==mockInterviewQuestion?.length-1&&<Link href={'/dashboard/interview/'+interviewData?.mockId+'/Feedback'}><Button>End Interview</Button></Link>}
        
//       </div>
//       </div>
//     </div>
    
//       </>
//   );
// }

// export default StartInterview;

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
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes per question

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

        // Clean and parse JSON
        const cleanedJsonResp = jsonMockResp.trim().replace(/^\ufeff/, "").replace(/```/g, "");

        try {
          const parsedMockResp = JSON.parse(cleanedJsonResp || "{}");
          const questions = Array.isArray(parsedMockResp) ? parsedMockResp : [];

          setMockInterviewQuestion(questions);
          setInterviewData(res[0]);
        } catch (parseError) {
          console.error("Error parsing JSON response:", parseError);
        }
      } else {
        console.error("No interview data found for the given ID");
      }
    } catch (error) {
      console.error("Error fetching interview details:", error);
    }
  };

  // Timer Logic
  useEffect(() => {
    setTimeLeft(180); // Reset timer for the new question

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(timer); // Stop the timer

      // Move to next question after timeout
      setActiveQuestionIndex((prev) => {
        if (prev < mockInterviewQuestion.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 180000); // 3 minutes

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [activeQuestionIndex, mockInterviewQuestion.length]);

  return (
    <div className="h-[90vh] flex flex-col justify-between">
      {/* Timer Display */}
      <div className="text-center text-lg font-bold text-red-600">
        Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-11 flex-grow">
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />
        <div>
          <RecordAnswersSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-6 pb-4">
        {activeQuestionIndex !== mockInterviewQuestion?.length - 1 ? (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
            Next Question
          </Button>
        ) : (
          <Link href={`/dashboard/interview/${interviewData?.mockId}/Feedback`}>
            <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
