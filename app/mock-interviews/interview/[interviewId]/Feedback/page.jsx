// "use client"
// import { UserAnswer } from '@/utils/schema'
// import React, { useEffect, useState } from 'react'
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible"
// import { db } from '@/utils/db';
// import { eq } from 'drizzle-orm';
// import { ChevronsUpDown } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useRouter } from 'next/navigation';

// function Feedback({ params }) {
//   const [feedbackList, setFeedbackList] = useState([]);
//   const [interviewId, setInterviewId] = useState(null);
//   const router=useRouter();

//   useEffect(() => {
//     (async () => {
//       const unwrappedParams = await params;
//       setInterviewId(unwrappedParams.interviewId);
//     })();
//   }, [params]);

//   useEffect(() => {
//     if (interviewId) {
//       GetFeedback();
//     }
//   }, [interviewId]);

//   const GetFeedback = async () => {
//     const res = await db
//       .select()
//       .from(UserAnswer)
//       .where(eq(UserAnswer.mockIdRef, interviewId))
//       .orderBy(UserAnswer.id);

//     setFeedbackList(res);
//     console.log(res);
//   };

//   return (
//     <div className='p-11'>
//       {
//       feedbackList.length==0? <h2 className='font-bold text-xl text-gray-600'>
//         No interview feedback record found</h2>:
//         <>
//       <h2 className='text-3xl text-green-600 font-bold'>Congratulations!</h2>
//       <h2 className='text-2xl font-bold'>Here is your interview feedback</h2>
      
//       <h2 className='text-primary text-lg my-3'>Your overall interview rating: 6/10</h2>

//       <h2 className='text-sm text-gray-600'>Find interview questions and answers below for improvement along with feedback</h2>
      
//         {feedbackList && feedbackList.map((item, index)=>(
//         <Collapsible key={index} className='mt-6'>
//           <CollapsibleTrigger className='p-3 bg-secondary rounded-lg flex justify-between my-1 text-left gap-6 w-full'>
//           {item?.question} <ChevronsUpDown className='w-6 h-6'/></CollapsibleTrigger>
//           <CollapsibleContent className='flex flex-col gap-1'>
//           <h2 className='text-red-600 p-1 rounded-lg'></h2>
//           <div className='flex flex-col gap-3'>
//             <h2 className='text-red-600 p-1 border rounded-lg'><strong>Rating: </strong>{item.rating}</h2>
//             <h2 className='p-11 border rounded-lg bg-red-50 text-md text-red-600'><strong>Your Answer: </strong>{item.userAns}</h2>
//             <h2 className='p-11 border rounded-lg bg-green-50 text-md text-green-600'><strong>Correct Answer: </strong>{item.correctAns}</h2>
//             <h2 className='p-11 border rounded-lg bg-blue-50 text-md text-primary'><strong>Feedback: </strong>{item.feedback}</h2></div>
//           </CollapsibleContent>
//         </Collapsible>  
//       ))}
//       </>
//       }
//       <Button className='mt-3' onClick={()=>router.replace('/mock-interviews')}>Go Home</Button>
//     </div>
//   );
// }

// export default Feedback;

"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [interviewId, setInterviewId] = useState(null);
  const [overallRating, setOverallRating] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const unwrappedParams = await params;
      setInterviewId(unwrappedParams.interviewId);
    })();
  }, [params]);

  useEffect(() => {
    if (interviewId) {
      GetFeedback();
    }
  }, [interviewId]);

  const GetFeedback = async () => {
    const res = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);

    setFeedbackList(res);
    calculateOverallRating(res);
  };

  const calculateOverallRating = (feedback) => {
    if (feedback.length === 0) return;
    const totalRating = feedback.reduce((sum, item) => sum + (item.rating || 0), 0);
    const avgRating = totalRating / feedback.length; // Average of raw ratings
    const normalizedRating = Math.min(Math.floor(avgRating / 10), 10); // Normalize to 0-10, cap at 10
    setOverallRating(normalizedRating);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col py-10 px-4">
      <motion.div
        className="max-w-4xl mx-auto w-full bg-gradient-to-b from-teal-800 to-indigo-900 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-indigo-400" />

        {feedbackList.length === 0 ? (
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-2xl font-bold text-teal-300">
              No Insights Yet
            </h2>
            <p className="text-gray-300 mt-2">
              Complete an interview to see your results here.
            </p>
          </motion.div>
        ) : (
          <>
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-10">
              <h2 className="text-4xl font-extrabold text-teal-200 tracking-tight">
                Performance Breakdown
              </h2>
              <p className="text-indigo-200 mt-2 text-lg">
                Elevate your skills with these insights
              </p>
              <div
                className={`mt-6 text-5xl font-bold ${
                  overallRating >= 7
                    ? "text-teal-400"
                    : overallRating >= 5
                    ? "text-indigo-400"
                    : "text-red-400"
                }`}
              >
                {overallRating !== null ? `${overallRating}/10` : "Loading..."}
              </div>
            </motion.div>

            {/* Feedback List */}
            <div className="space-y-6">
              {feedbackList.map((item, index) => (
                <Collapsible
                  key={index}
                  className="bg-indigo-800/50 rounded-xl overflow-hidden shadow-md"
                >
                  <CollapsibleTrigger className="p-5 flex justify-between items-center w-full text-left bg-teal-700/70 hover:bg-teal-600 transition-colors duration-300">
                    <span className="text-lg font-semibold text-teal-100 flex-1 truncate">
                      {item?.question}
                    </span>
                    <motion.div
                      animate={{ rotate: item.isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.isOpen ? (
                        <ChevronUp className="w-6 h-6 text-teal-300" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-teal-300" />
                      )}
                    </motion.div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-5 bg-indigo-900/80">
                    <div className="space-y-4">
                      <div
                        className={`text-xl font-semibold ${
                          item.rating >= 70
                            ? "text-teal-400"
                            : item.rating >= 50
                            ? "text-indigo-400"
                            : "text-red-400"
                        }`}
                      >
                        Score: {Math.floor(item.rating / 10)}/10
                      </div>
                      <div className="p-4 bg-teal-800/50 rounded-lg text-teal-200">
                        <strong>Your Answer:</strong> {item.userAns}
                      </div>
                      <div className="p-4 bg-indigo-800/50 rounded-lg text-indigo-200">
                        <strong>Best Answer:</strong> {item.correctAns}
                      </div>
                      <div className="p-4 bg-gray-800/50 rounded-lg text-gray-200">
                        <strong>Notes:</strong> {item.feedback}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </>
        )}

        {/* Navigation */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center mt-10"
        >
          <Button
            onClick={() => router.replace("/mock-interviews")}
            className="bg-teal-500 text-white px-8 py-3 rounded-full hover:bg-teal-600 transition-all duration-300 text-lg font-semibold shadow-lg"
          >
            Return to Dashboard
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Feedback;


