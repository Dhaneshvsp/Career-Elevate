// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/mock-interviews/interview/[interviewId]/start/page.jsx
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
        
//         {activeQuestionIndex==mockInterviewQuestion?.length-1&&<Link href={'/mock-interviews/interview/'+interviewData?.mockId+'/Feedback'}><Button>End Interview</Button></Link>}
        
//       </div>
//       </div>
//     </div>
    
//       </>
//   );
// }

// export default StartInterview;

// "use client";
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { db } from "@/utils/db";
// import { MockInterview } from "@/utils/schema";
// import { eq } from "drizzle-orm";
// import Link from "next/link";
// import QuestionsSection from "./_components/QuestionsSection";
// import RecordAnswersSection from "./_components/RecordAnswersSection";

// export default function StartInterview({ params: paramsPromise }) {
//   const [params, setParams] = useState(null);
//   const [interviewData, setInterviewData] = useState(null);
//   const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
//   const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(180); // 3 minutes per question

//   // Resolve params Promise (unchanged)
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

//   // Fetch interview details (unchanged)
//   useEffect(() => {
//     if (params?.interviewId) {
//       GetInterviewDetails(params.interviewId);
//     }
//   }, [params]);

//   const GetInterviewDetails = async (interviewId) => {
//     try {
//       const res = await db
//         .select()
//         .from(MockInterview)
//         .where(eq(MockInterview.mockId, interviewId));
//       //Whenever I got error just have a look here beacause it is the core logic behind my project
//       if (res && res.length > 0) {
//         const jsonMockResp = res[0].jsonMockResp;
//         console.log("Raw jsonMockResp:", jsonMockResp);
//         const cleanedJsonResp = jsonMockResp.trim().replace(/^\ufeff/, "").replace(/```/g, "");
//         console.log("Cleaned JSON String:", cleanedJsonResp);
//         try {
//           const parsedMockResp = JSON.parse(cleanedJsonResp || "{}");
//           console.log("Parsed Response:", parsedMockResp);
//           // console.log("parsedMockResp.interview_questions: ",Array.isArray(parsedMockResp.interview_questions));
//           console.log("parsedMockResp:",Array.isArray(parsedMockResp))
//           const questions = Array.isArray(parsedMockResp) ? parsedMockResp: [];
//           // if(!questions){
//           //   questions = Array.isArray(parsedMockResp.interview_questions) ? parsedMockResp.interview_questions : []; 
//           // }
//           console.log("Questions: ",questions);
//           setMockInterviewQuestion(questions);
//           setInterviewData(res[0]);
//         } catch (parseError) {
//           console.error("Error parsing JSON response:", parseError);
//         }
//       } else {
//         console.error("No interview data found for the given ID");
//       }
//     } catch (error) {
//       console.error("Error fetching interview details:", error);
//     }
    
//   };
// //  console.log("MockInterview:",mockInterviewQuestion);
//   // Timer Logic (unchanged)
//   useEffect(() => {
//     setTimeLeft(180); // Reset timer for the new question
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => prevTime - 1);
//     }, 1000);
//     const timeout = setTimeout(() => {
//       clearInterval(timer);
//       setActiveQuestionIndex((prev) =>
//         prev < mockInterviewQuestion.length - 1 ? prev + 1 : prev
//       );
//     }, 180000); // 3 minutes
//     return () => {
//       clearInterval(timer);
//       clearTimeout(timeout);
//     };
//   }, [activeQuestionIndex, mockInterviewQuestion.length]);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
//   };
//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* Header with Timer */}
//       <motion.div
//         className="bg-teal-600 text-white p-4 sticky top-0 z-10 shadow-md"
//         initial={{ y: -50 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <div className="max-w-5xl mx-auto flex justify-between items-center">
//           <h1 className="text-xl font-semibold">
//             {interviewData?.jobPosition || "Mock Interview"}
//           </h1>
//           <div className="text-lg font-medium">
//             Time Left: {Math.floor(timeLeft / 60)}:
//             {(timeLeft % 60).toString().padStart(2, "0")}
//           </div>
//         </div>
//       </motion.div>

//       {/* Main Content */}
//       <main className="flex-grow py-8 px-6 max-w-5xl mx-auto w-full">
//         <motion.div variants={containerVariants} initial="hidden" animate="visible">
//           {/* Progress Indicator */}
//           <motion.div
//             className="mb-6 text-center text-gray-700"
//             variants={itemVariants}
//           >
//             Question {activeQuestionIndex + 1} of {mockInterviewQuestion.length || "N/A"}
//           </motion.div>

//           {/* Questions & Recording */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <motion.div variants={itemVariants}>
//               <div className="bg-white rounded-lg shadow-md p-6 border-t-2 border-teal-500">
//                 <QuestionsSection
//                   mockInterviewQuestion={mockInterviewQuestion}
//                   activeQuestionIndex={activeQuestionIndex}
//                 />
//               </div>
//             </motion.div>
//             <motion.div variants={itemVariants}>
//               <div className="bg-white rounded-lg shadow-md p-6 border-t-2 border-indigo-500">
//                 <RecordAnswersSection
//                   mockInterviewQuestion={mockInterviewQuestion}
//                   activeQuestionIndex={activeQuestionIndex}
//                   interviewData={interviewData}
//                 />
//               </div>
//             </motion.div>
//           </div>

//           {/* Navigation Buttons (Unchanged Logic & Styling) */}
//           <motion.div
//             className="flex justify-center gap-6 mt-8"
//             variants={itemVariants}
//           >
//             {activeQuestionIndex !== mockInterviewQuestion?.length - 1 ? (
//               <Button
//                 onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
//                 className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-500"
//               >
//                 Next Question
//               </Button>
//             ) : (
//               <Link href={`/mock-interviews/interview/${interviewData?.mockId}/Feedback`}>
//                 <Button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-500">
//                   End Interview
//                 </Button>
//               </Link>
//             )}
//           </motion.div>
//         </motion.div>
//       </main>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswersSection from "./_components/RecordAnswersSection";
import { toast } from "sonner"; // Import sonner for toast

export default function StartInterview({ params: paramsPromise }) {
  const [params, setParams] = useState(null);
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes per question

  // Show toast message when the component mounts
  useEffect(() => {
    toast.info(
      "Info: Your video will not be recorded for privacy. Each question has a 3-minute time limit. Please wait for a confirmation that your answer recording is complete before moving to the next question.",
      {
        duration: 10000, // Display for 10 seconds
        position: "top-center", // Position at the top center
      }
    );
  }, []); // Empty dependency array to run only once on mount

  // Resolve params Promise (unchanged)
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

  // Fetch interview details (unchanged)
  useEffect(() => {
    if (params?.interviewId) {
      GetInterviewDetails(params.interviewId);
    }
  }, [params]);

  const GetInterviewDetails = async (interviewId) => {
    try {
      const res = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewId));
      if (res && res.length > 0) {
        const jsonMockResp = res[0].jsonMockResp;
        console.log("Raw jsonMockResp:", jsonMockResp);
        const cleanedJsonResp = jsonMockResp.trim().replace(/^\ufeff/, "").replace(/```/g, "");
        console.log("Cleaned JSON String:", cleanedJsonResp);
        try {
          const parsedMockResp = JSON.parse(cleanedJsonResp || "{}");
          console.log("Parsed Response:", parsedMockResp);
          const questions = Array.isArray(parsedMockResp) ? parsedMockResp : [];
          console.log("Questions: ", questions);
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

  // Timer Logic (unchanged)
  useEffect(() => {
    setTimeLeft(180); // Reset timer for the new question
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    const timeout = setTimeout(() => {
      clearInterval(timer);
      setActiveQuestionIndex((prev) =>
        prev < mockInterviewQuestion.length - 1 ? prev + 1 : prev
      );
    }, 180000); // 3 minutes
    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [activeQuestionIndex, mockInterviewQuestion.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

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
            Question {activeQuestionIndex + 1} of {mockInterviewQuestion.length || "N/A"}
          </motion.div>

          {/* Questions & Recording */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-lg shadow-md p-6 border-t-2 border-teal-500">
                <QuestionsSection
                  mockInterviewQuestion={mockInterviewQuestion}
                  activeQuestionIndex={activeQuestionIndex}
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

          {/* Navigation Buttons (Unchanged Logic & Styling) */}
          <motion.div
            className="flex justify-center gap-6 mt-8"
            variants={itemVariants}
          >
            {activeQuestionIndex !== mockInterviewQuestion?.length - 1 ? (
              <Button
                onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}
                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-500"
              >
                Next Question
              </Button>
            ) : (
              <Link href={`/mock-interviews/interview/${interviewData?.mockId}/Feedback`}>
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
