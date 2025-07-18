// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/mock-interviews/interview/[interviewId]/Feedback/page.jsx
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
import { ChevronDown, ChevronUp, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [interviewId, setInterviewId] = useState(null);
  const [overallRating, setOverallRating] = useState(0);
  const [openStates, setOpenStates] = useState({});
  const [isAllOpen, setIsAllOpen] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");

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
    try {
      const res = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId))
        .orderBy(UserAnswer.id);
      console.log("Feedback List:", res);
      setFeedbackList(res);

      const initialOpenStates = res.reduce((acc, _, index) => {
        acc[index] = false;
        return acc;
      }, {});
      setOpenStates(initialOpenStates);

      calculateOverallRating(res);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const calculateOverallRating = (feedback) => {
    if (feedback.length === 0) {
      setOverallRating(0);
      return;
    }
    const totalRating = feedback.reduce((sum, item) => {
      const rating = parseFloat(item.rating);
      console.log(`Item Rating for ${item.question}:`, item.rating, "Parsed:", rating); // Debug each rating
      return sum + (isNaN(rating) ? 0 : rating);
    }, 0);
    console.log("Total Rating:", totalRating); // Debug total
    const avgRating = totalRating / feedback.length;
    console.log("Average Rating:", avgRating); // Debug average
    // Since ratings are already on a 0-10 scale (as seen in the UI), no need to divide by 10
    const finalRating = isNaN(avgRating) ? 0 : Math.min(Math.round(avgRating), 10);
    console.log("Final Overall Rating:", finalRating); // Debug final rating
    setOverallRating(finalRating);
  };

  const handleToggle = (index) => {
    setOpenStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleAll = () => {
    const newState = !isAllOpen;
    setIsAllOpen(newState);
    setOpenStates((prev) =>
      Object.keys(prev).reduce((acc, key) => {
        acc[key] = newState;
        return acc;
      }, {})
    );
  };

  const formatIdealAnswer = (answer) => {
    try {
      if (typeof answer === "string" && (answer.startsWith("{") || answer.startsWith("["))) {
        const parsed = JSON.parse(answer);
        if (parsed.correctAns) return parsed.correctAns;
        if (parsed.answer) return parsed.answer;
        return JSON.stringify(parsed, null, 2).replace(/["{\[\]}]/g, "");
      }
      return answer;
    } catch (e) {
      return answer;
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopyMessage(`Copied feedback for Q${index + 1}`);
    setTimeout(() => setCopyMessage(""), 2000);
  };

  const getRatingColor = (rating) => {
    if (rating >= 7) return "bg-green-500";
    if (rating >= 4) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getDisplayRating = (rating) => {
    const parsedRating = parseFloat(rating);
    return isNaN(parsedRating) ? 0 : parsedRating;
  };

  const radius = 17;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-gray-900 to-indigo-900 flex flex-col py-8 px-4 sm:px-6 lg:px-12">
      <motion.div
        className="max-w-4xl mx-auto w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-6 text-white border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {feedbackList.length === 0 ? (
          <motion.div className="text-center py-12">
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text">
              No Feedback Yet
            </h2>
            <p className="text-gray-400 mt-3 text-base max-w-md mx-auto">
              Start an interview to unlock detailed performance insights.
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">
                Performance Insights
              </h2>
              <p className="text-gray-400 mt-2 text-base">
                Master your skills with expert feedback
              </p>
              <div className="mt-6 flex justify-center items-center">
                <svg width="100" height="100" viewBox="0 0 36 36">
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "#00D4FF", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#3B82F6", stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    fill="none"
                    stroke="#6B7280"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r={radius}
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="3"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (overallRating / 10) * circumference}
                    transform="rotate(-90 18 18)"
                    style={{ filter: "drop-shadow(0 0 4px #00D4FF)" }}
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    className="text-sm font-bold"
                    fill="#E5E7EB"
                    style={{ textShadow: "0 0 4px rgba(0, 212, 255, 0.5)" }}
                  >
                    {overallRating}/10
                  </text>
                </svg>
              </div>
              <div className="mt-2 text-xs text-gray-400 uppercase tracking-wide">
                Your Overall Score
              </div>
              <Button
                onClick={toggleAll}
                className="mt-4 bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 px-4 py-1 rounded-full border border-teal-500/50 text-sm"
              >
                {isAllOpen ? "Collapse All" : "Expand All"}
              </Button>
            </motion.div>

            <div className="space-y-4">
              {feedbackList.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Collapsible open={openStates[index]}>
                    <CollapsibleTrigger
                      onClick={() => handleToggle(index)}
                      className="p-4 flex justify-between items-center w-full text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Badge className={`${getRatingColor(getDisplayRating(item.rating))} text-white text-xs`}>
                          {getDisplayRating(item.rating)}/10
                        </Badge>
                        <span className="text-base font-medium text-white flex-1">
                          Q{index + 1}: {item?.question}
                        </span>
                      </div>
                      <motion.div
                        animate={{ rotate: openStates[index] ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {openStates[index] ? (
                          <ChevronUp className="w-5 h-5 text-teal-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-teal-400" />
                        )}
                      </motion.div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={openStates[index] ? { opacity: 1, height: "auto" } : {}}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="p-4 bg-white/5"
                      >
                        <div className="p-4 bg-teal-500/10 rounded-lg border border-teal-400/20">
                          <strong className="block mb-1 text-teal-300 text-sm">Your Response:</strong>
                          <p className="text-gray-200 text-sm whitespace-pre-wrap">{item.userAns}</p>
                        </div>
                        <div className="p-4 bg-indigo-500/10 rounded-lg border border-indigo-400/20 mt-3">
                          <strong className="block mb-1 text-indigo-300 text-sm">Ideal Answer:</strong>
                          <p className="text-gray-200 text-sm whitespace-pre-wrap">{formatIdealAnswer(item.correctAns)}</p>
                        </div>
                        <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-400/20 mt-3">
                          <strong className="block mb-1 text-purple-300 text-sm">Feedback:</strong>
                          <p className="text-gray-200 text-sm whitespace-pre-wrap">{item.feedback}</p>
                        </div>
                        <Button
                          onClick={() => copyToClipboard(
                            `Q${index + 1}: ${item.question}\nYour Response: ${item.userAns}\nIdeal Answer: ${formatIdealAnswer(item.correctAns)}\nFeedback: ${item.feedback}`,
                            index
                          )}
                          className="mt-3 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm"
                        >
                          <Copy className="w-4 h-4" /> Copy Feedback
                        </Button>
                      </motion.div>
                    </CollapsibleContent>
                  </Collapsible>
                </motion.div>
              ))}
            </div>

            {copyMessage && (
              <motion.div
                className="fixed bottom-6 right-6 bg-teal-600 text-white px-4 py-2 rounded-full shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                {copyMessage}
              </motion.div>
            )}
          </>
        )}

        <motion.div className="flex justify-center gap-4 mt-8">
          <Button
            onClick={() => router.push(`/mock-interviews/interview/${interviewId}`)}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-2 rounded-full text-sm"
          >
            Retry Interview
          </Button>
          <Button
            onClick={() => router.replace("/mock-interviews")}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-2 rounded-full text-sm"
          >
            Back to Dashboard
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Feedback;



