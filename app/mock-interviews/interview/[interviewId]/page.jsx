// "use client";

// import { Button } from '@/components/ui/button';
// import { db } from '@/utils/db';
// import { MockInterview } from '@/utils/schema';
// import { eq } from 'drizzle-orm';
// import { Lightbulb, WebcamIcon } from 'lucide-react';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import Webcam from 'react-webcam';

// function Interview({ params: asyncParams }) {
//   const [params, setParams] = useState(null);
//   const [interviewData, setInterviewData] = useState(null);
//   const [webCamEnabled, setWebCamEnabled] = useState(false);
//   const [cameraError, setCameraError] = useState(false);

//   useEffect(() => {
//     async function fetchParams() {
//       const resolvedParams = await asyncParams;
//       setParams(resolvedParams);
//     }
//     fetchParams();
//   }, [asyncParams]);

//   useEffect(() => {
//     if (params) {
//       GetInterviewDetails();
//     }
//   }, [params]);

//   /** Fetch interview details by mocker/interview ID */
//   const GetInterviewDetails = async () => {
//     const res = await db
//       .select()
//       .from(MockInterview)
//       .where(eq(MockInterview.mockId, params.interviewId));
//     setInterviewData(res[0]);
//   };

//   return (
//     <div className="my-11">
//       <h1 className="font-bold text-2xl">Let's Get Started</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-11">
//         <div className="flex flex-col my-6 gap-6">
//           <div className="flex flex-col p-6 rounded-lg border">
//             {interviewData ? (
//               <>
//                 <h2 className="text-lg">
//                   <strong>Job position:</strong> {interviewData.jobPosition}
//                 </h2>
//                 <h2 className="text-lg">
//                   <strong>Job Description:</strong> {interviewData.jobDesc}
//                 </h2>
//                 <h2 className="text-lg">
//                   <strong>Years of Experience:</strong> {interviewData.jobExperience}
//                 </h2>
//               </>
//             ) : (
//               <p>Loading interview details...</p>
//             )}
//           </div>
//           <div className="p-6 border rounded-lg border-yellow-300 bg-yellow-100">
//             <h2 className="flex gap-2 items-center text-yellow-600">
//               <Lightbulb />
//               <strong>Information</strong>
//             </h2>
//             <h2 className="mt-3 text-yellow-600">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
//           </div>
//         </div>
//         <div>
//           {webCamEnabled ? (
//             <Webcam
//               onUserMedia={() => {
//                 setWebCamEnabled(true);
//                 setCameraError(false); // Reset error on success
//               }}
//               onUserMediaError={() => {
//                 setWebCamEnabled(false);
//                 setCameraError(true); // Handle error
//               }}
//               mirrored={true}
//               style={{
//                 height: 300,
//                 width: 300,
//               }}
//             />
//           ) : cameraError ? (
//             <div className="flex flex-col items-center justify-center h-72 w-full my-8 p-20 bg-red-100 rounded-lg border border-red-500">
//               <p className="text-red-500 font-bold">Camera access denied.</p>
//               <p className="text-red-500">Please allow access to proceed.</p>
//             </div>
//           ) : (
//             <>
//               <WebcamIcon className="h-72 w-full my-8 p-20 bg-secondary rounded-lg border" />
//               <Button variant="ghost" className="w-full" onClick={() => setWebCamEnabled(true)}>
//                 Enable Web Cam and Microphone
//               </Button>
//             </>
//           )}
//         </div>
//       </div>

//       <div className="flex justify-end items-end mt-11">
//         <Link href={`/mock-interviews/interview/${params?.interviewId}/start`}>
//           <Button>Start Interview</Button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Interview;


"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { WebcamIcon, Info } from "lucide-react";
import Link from "next/link";
import Webcam from "react-webcam";

// Wrap Button with motion for animations
const MotionButton = motion(Button);

export default function Interview({ params: asyncParams }) {
  const [params, setParams] = useState(null);
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  // Resolve params from async
  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await asyncParams;
      setParams(resolvedParams);
    }
    fetchParams();
  }, [asyncParams]);

  // Fetch interview details
  useEffect(() => {
    if (params) {
      GetInterviewDetails();
    }
  }, [params]);

  const GetInterviewDetails = async () => {
    const res = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    setInterviewData(res[0]);
  };

  console.log(params?.interviewId);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b max-w-[100vw] from-teal-50 via-blue-100 to-indigo-100 flex flex-col">
      {/* Animated Background Elements */}
      <motion.div
        className="absolute w-96 h-96 bg-teal-400/20 rounded-full blur-3xl top-[-100px] left-[-150px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl bottom-[-50px] right-[-100px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Content */}
      <main className="flex-grow py-16 px-6 max-w-5xl mx-auto w-full relative z-10">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {/* Header */}
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600"
            variants={itemVariants}
          >
            Prepare for Your Interview
          </motion.h1>

          {/* Interview Details & Webcam */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Interview Details */}
            <motion.div variants={itemVariants}>
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-8 border-t-4 border-teal-600">
                {interviewData ? (
                  <>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Interview Details</h2>
                    <div className="space-y-3">
                      <p className="text-gray-700">
                        <span className="font-medium text-teal-600">Job Role:</span> {interviewData.jobPosition}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium text-teal-600">Description:</span> {interviewData.jobDesc}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium text-teal-600">Experience:</span> {interviewData.jobExperience} Years
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 text-center">Loading details...</p>
                )}
              </div>
            </motion.div>

            {/* Webcam */}
            <motion.div variants={itemVariants} className="flex flex-col items-center">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 w-full max-w-sm">
                {webCamEnabled ? (
                  <Webcam
                    onUserMedia={() => {
                      setWebCamEnabled(true);
                      setCameraError(false);
                    }}
                    onUserMediaError={() => {
                      setWebCamEnabled(false);
                      setCameraError(true);
                    }}
                    mirrored={true}
                    className="w-full h-64 rounded-lg border border-gray-200"
                  />
                ) : cameraError ? (
                  <div className="flex flex-col items-center justify-center h-64 bg-red-50 rounded-lg border border-red-300 p-4">
                    <p className="text-red-600 font-semibold mb-2">Camera Access Denied</p>
                    <p className="text-red-500 text-sm text-center">Please grant permission to use your webcam.</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg border border-gray-200">
                    <WebcamIcon className="w-16 h-16 text-teal-600 mb-4" />
                    <Button
                      variant="outline"
                      className="border-teal-600 text-teal-600 hover:bg-teal-50 hover:text-teal-700 transition-all duration-300"
                      onClick={() => setWebCamEnabled(true)}
                    >
                      Enable Webcam & Mic
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Info Section */}
          <motion.div
            className="bg-teal-100 rounded-2xl shadow-lg p-6 mb-12 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 mb-3">
              <Info className="w-6 h-6 text-teal-600" />
              <h2 className="text-xl font-semibold text-teal-900">Quick Tips</h2>
            </div>
            <p className="text-teal-800">
              {process.env.NEXT_PUBLIC_INFORMATION ||
                "Ensure a quiet space, good lighting, and test your equipment before starting."}
            </p>
          </motion.div>

          {/* Start Button */}
          <motion.div className="text-center" variants={itemVariants}>
            <Link href={`/mock-interviews/interview/${params?.interviewId}/start`}>
              <MotionButton
                className="bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Interview
              </MotionButton>
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
