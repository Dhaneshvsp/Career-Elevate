// import { Button } from '@/components/ui/button'
// import { useRouter } from 'next/navigation'
// import React from 'react'

// function InterviewItemCard({interview}) {
//     const router=useRouter();
//     const onStart=()=>{
//         router.push('/dashboard/interview/'+interview?.mockId)
//     }
//     const onFeedBackClick=()=>{
//         router.push('/dashboard/interview/'+interview?.mockId+'/Feedback')
//     }
//   return (
//     <div className='border shadow-sm rounded-lg p-3'>
//         <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
//         <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Experience</h2>
//         <h2 className='text-xs text-gray-600'>Created At: {interview?.createdAt}</h2>
//         <div className='flex justify-between gap-6 mt-3'>
//             <Button size="sm" variant="outline" className='w-full'
//             onClick={onFeedBackClick}>Feedback</Button>
//             <Button size="sm" className='w-full'
//             onClick={onStart}>Start</Button>
//         </div>
//     </div>
//   )
// }

// export default InterviewItemCard

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

function InterviewItemCard({ interview }) {
    const router = useRouter();
    const onStart = () => {
        router.push('/dashboard/interview/' + interview?.mockId);
    };
    const onFeedBackClick = () => {
        router.push('/dashboard/interview/' + interview?.mockId + '/Feedback');
    };

    return (
        <div className='border border-gray-400 shadow-md rounded-xl p-4 bg-gradient-to-r from-gray-200 to-gray-100'>
            <h2 className='font-semibold text-[#37474F] text-lg'>{interview?.jobPosition}</h2>
            <h2 className='text-sm text-gray-800'>{interview?.jobExperience} Years of Experience</h2>
            <h2 className='text-xs text-gray-600'>Created At: {interview?.createdAt}</h2>
            <div className='flex justify-between gap-4 mt-4'>
                <Button size="sm" variant="ghost" className='w-full border border-[#37474F] text-[#37474F] hover:bg-gray-300 hover:text-gray-900'
                    onClick={onFeedBackClick}>Feedback</Button>
                <Button size="sm" className='w-full bg-[#37474F] text-white hover:bg-gray-700'
                    onClick={onStart}>Start</Button>
            </div>
        </div>
    );
}

export default InterviewItemCard;

