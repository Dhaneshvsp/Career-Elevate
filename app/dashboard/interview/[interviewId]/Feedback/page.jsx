"use client"
import { UserAnswer } from '@/utils/schema'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { db } from '@/utils/db';
import { eq } from 'drizzle-orm';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [interviewId, setInterviewId] = useState(null);
  const router=useRouter();

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
    console.log(res);
  };

  return (
    <div className='p-11'>
      {
      feedbackList.length==0? <h2 className='font-bold text-xl text-gray-600'>
        No interview feedback record found</h2>:
        <>
      <h2 className='text-3xl text-green-600 font-bold'>Congratulations!</h2>
      <h2 className='text-2xl font-bold'>Here is your interview feedback</h2>
      
      <h2 className='text-primary text-lg my-3'>Your overall interview rating: 6/10</h2>

      <h2 className='text-sm text-gray-600'>Find interview questions and answers below for improvement along with feedback</h2>
      
        {feedbackList && feedbackList.map((item, index)=>(
        <Collapsible key={index} className='mt-6'>
          <CollapsibleTrigger className='p-3 bg-secondary rounded-lg flex justify-between my-1 text-left gap-6 w-full'>
          {item?.question} <ChevronsUpDown className='w-6 h-6'/></CollapsibleTrigger>
          <CollapsibleContent className='flex flex-col gap-1'>
          <h2 className='text-red-600 p-1 rounded-lg'></h2>
          <div className='flex flex-col gap-3'>
            <h2 className='text-red-600 p-1 border rounded-lg'><strong>Rating: </strong>{item.rating}</h2>
            <h2 className='p-11 border rounded-lg bg-red-50 text-md text-red-600'><strong>Your Answer: </strong>{item.userAns}</h2>
            <h2 className='p-11 border rounded-lg bg-green-50 text-md text-green-600'><strong>Correct Answer: </strong>{item.correctAns}</h2>
            <h2 className='p-11 border rounded-lg bg-blue-50 text-md text-primary'><strong>Feedback: </strong>{item.feedback}</h2></div>
          </CollapsibleContent>
        </Collapsible>  
      ))}
      </>
      }
      <Button className='mt-3' onClick={()=>router.replace('/dashboard')}>Go Home</Button>
    </div>
  );
}

export default Feedback;
