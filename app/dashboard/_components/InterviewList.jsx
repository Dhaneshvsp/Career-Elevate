// "use client"
// import { db } from '@/utils/db';
// import { MockInterview } from '@/utils/schema';
// import { useUser } from '@clerk/nextjs'
// import { desc, eq } from 'drizzle-orm';
// import React, { useEffect, useState } from 'react'
// import InterviewItemCard from './InterviewItemCard';

// function InterviewList() {
//     const {user}=useUser();
//     const [interviewList,setInterviewList]=useState([]);

//     useEffect(()=>{
//         user&&GetInterviewList();
//     },[user])
//     const GetInterviewList=async()=>{
//         const res=await db.select().from(MockInterview)
//         .where(eq(MockInterview.createdBy,user?.primaryEmailAddress?.emailAddress))
//         .orderBy(desc(MockInterview.id));
//         setInterviewList(res);
//     }
//     console.log(interviewList);
//     console.log(interviewList?.jobPosition);
//   return (
//     <div>
//         <h2 className='text-xl font-medium'>Previous Mock Interviews</h2>
//         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-3'>
//             {interviewList&&interviewList.map((item,index)=>(
//                 <InterviewItemCard key={index} interview={item}/>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default InterviewList

"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

function InterviewList() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        if (user) GetInterviewList();
    }, [user]);

    const GetInterviewList = async () => {
        setLoading(true); // Show loading state
        try {
            const res = await fetch("/api/interviews"); // Call API route
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to fetch");

            setInterviewList(data);
        } catch (error) {
            console.error("Error fetching interviews:", error);
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    return (
        <div>
            <h2 className="text-xl font-medium">Previous Mock Interviews</h2>

            {loading ? (
                <SkeletonLoader /> // Show animation while loading
            ) : interviewList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-3">
                    {interviewList.map((item, index) => (
                        <InterviewItemCard key={index} interview={item} />
                    ))}
                </div>
            ) : (
                <p>No interviews found.</p>
            )}
        </div>
    );
}

// 🎨 Skeleton Loader Component (Animated Placeholder)
function SkeletonLoader() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-3">
            {Array(3)
                .fill(0)
                .map((_, i) => (
                    <div key={i} className="animate-pulse p-4 bg-gray-300 rounded-md h-24"></div>
                ))}
        </div>
    );
}

export default InterviewList;
