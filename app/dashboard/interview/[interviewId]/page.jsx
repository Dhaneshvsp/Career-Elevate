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
//         <Link href={`/dashboard/interview/${params?.interviewId}/start`}>
//           <Button>Start Interview</Button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Interview;


"use client"
import { HyperText } from '@/components/magicui/hyper-text';
import { RetroGrid } from '@/components/magicui/retro-grid';
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';


function Interview({ params: asyncParams }) {
  const [params, setParams] = useState(null);
  const [interviewData, setInterviewData] = useState(null);
  const [webCamEnabled, setWebCamEnabled] = useState(false);
  const [cameraError, setCameraError] = useState(false);

  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await asyncParams;
      setParams(resolvedParams);
    }
    fetchParams();
  }, [asyncParams]);

  useEffect(() => {
    if (params) {
      GetInterviewDetails();
    }
  }, [params]);

  /** Fetch interview details by mocker/interview ID */
  const GetInterviewDetails = async () => {
    const res = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    setInterviewData(res[0]);
  };

  return (
    <div className='relative'>
    <RetroGrid/>
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-6">
      <HyperText className="text-3xl font-bold text-[#37474F] text-center">
  Let's Get Started
</HyperText>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-11 rounded-2xl" style={{
        backgroundImage: "url('https://cdn.prod.website-files.com/65e89895c5a4b8d764c0d710/66017f425a91654f12e4b20c_template-section-bg-p-1600.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
          <div className="space-y-6">
            <div className="p-6 rounded-lg border shadow-md bg-white">
              {interviewData ? (
                <>
                  <h2 className="text-lg font-semibold text-[#37474F]">Job Position: <span className="font-normal">{interviewData.jobPosition}</span></h2>
                  <h2 className="text-lg font-semibold text-[#37474F]">Job Description: <span className="font-normal">{interviewData.jobDesc}</span></h2>
                  <h2 className="text-lg font-semibold text-[#37474F]">Experience Required: <span className="font-normal">{interviewData.jobExperience} Years</span></h2>
                </>
              ) : (
                <p className="text-gray-500">Loading interview details...</p>
              )}
            </div>
            
            <div className="p-6 border rounded-lg bg-yellow-100 border-yellow-300 shadow-sm">
              <h2 className="flex gap-2 items-center text-yellow-600 text-lg font-semibold">
                <Lightbulb /> Information
              </h2>
              <p className="mt-3 text-yellow-700">{process.env.NEXT_PUBLIC_INFORMATION}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-6">
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
                className="w-72 h-72 rounded-lg border"
              />
            ) : cameraError ? (
              <div className="flex flex-col items-center justify-center w-72 h-72 bg-red-100 rounded-lg border border-red-500 text-center p-6">
                <p className="text-red-600 font-semibold">Camera access denied.</p>
                <p className="text-red-500 text-sm">Please allow access to proceed.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <WebcamIcon className="h-72 w-72 bg-gray-200 rounded-lg border p-6" />
                <Button variant="ghost" className="w-full border border-[#37474F] bg-gray-200 text-[#37474F] hover:bg-white hover:shadow-lg" onClick={() => setWebCamEnabled(true)}>
                  Enable Webcam & Microphone
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-center">
          <Link href={`/dashboard/interview/${params?.interviewId}/start`}>
            <Button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-500">Start Interview</Button>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Interview;
