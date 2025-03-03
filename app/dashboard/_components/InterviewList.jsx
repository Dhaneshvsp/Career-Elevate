"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
    const {user}=useUser();
    const [interviewList,setInterviewList]=useState([]);

    useEffect(()=>{
        user&&GetInterviewList();
    },[user])
    const GetInterviewList=async()=>{
        const res=await db.select().from(MockInterview)
        .where(eq(MockInterview.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id));
        setInterviewList(res);
    }
    console.log(interviewList);
    console.log(interviewList?.jobPosition);
  return (
    <div>
        <h2 className='text-xl font-medium'>Previous Mock Interviews</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-3'>
            {interviewList&&interviewList.map((item,index)=>(
                <InterviewItemCard key={index} interview={item}/>
            ))}
        </div>
    </div>
  )
}

export default InterviewList