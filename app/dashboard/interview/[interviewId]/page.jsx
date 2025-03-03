"use client";

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
    <div className="my-11">
      <h1 className="font-bold text-2xl">Let's Get Started</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-11">
        <div className="flex flex-col my-6 gap-6">
          <div className="flex flex-col p-6 rounded-lg border">
            {interviewData ? (
              <>
                <h2 className="text-lg">
                  <strong>Job position:</strong> {interviewData.jobPosition}
                </h2>
                <h2 className="text-lg">
                  <strong>Job Description:</strong> {interviewData.jobDesc}
                </h2>
                <h2 className="text-lg">
                  <strong>Years of Experience:</strong> {interviewData.jobExperience}
                </h2>
              </>
            ) : (
              <p>Loading interview details...</p>
            )}
          </div>
          <div className="p-6 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-600">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-600">{process.env.NEXT_PUBLIC_INFORMATION}</h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <Webcam
              onUserMedia={() => {
                setWebCamEnabled(true);
                setCameraError(false); // Reset error on success
              }}
              onUserMediaError={() => {
                setWebCamEnabled(false);
                setCameraError(true); // Handle error
              }}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : cameraError ? (
            <div className="flex flex-col items-center justify-center h-72 w-full my-8 p-20 bg-red-100 rounded-lg border border-red-500">
              <p className="text-red-500 font-bold">Camera access denied.</p>
              <p className="text-red-500">Please allow access to proceed.</p>
            </div>
          ) : (
            <>
              <WebcamIcon className="h-72 w-full my-8 p-20 bg-secondary rounded-lg border" />
              <Button variant="ghost" className="w-full" onClick={() => setWebCamEnabled(true)}>
                Enable Web Cam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end items-end mt-11">
        <Link href={`/dashboard/interview/${params?.interviewId}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
