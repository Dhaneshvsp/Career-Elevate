// import { UserButton } from '@clerk/nextjs'
// import React from 'react'
// import Header from './_components/Header'
// import AddNewInterview from './_components/AddNewInterview'
// import InterviewList from './_components/InterviewList'
// import { VelocityScroll } from '@/components/magicui/scroll-based-velocity'
// import { TypingAnimation } from '@/components/magicui/typing-animation'

// function Dashboard() {
//   return (
//     <div className='p-10'>
//       <h2 className='font-bold text-2xl'>Dashboard</h2>
//       <h2 className='text-gray-600'>Create and Start your Mockup Interview</h2>
//       <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
//         <AddNewInterview/>
//       </div>
//       {/* Prevoius Interview List */}
//       <InterviewList/>
//     </div>
//   )
// }

// export default Dashboard

"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import Header from "./_components/Header";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { TypingAnimation } from "@/components/magicui/typing-animation";

const steps = [
  {
    icon: "📋",
    title: "Fill out initial information",
    description:
      "Fill out information such as job description, interview type, language.",
  },
  {
    icon: "💬",
    title: "Practice interviews as many times as you want",
    description:
      "Practice multiple live iterations of your interview by talking with our AI and get instantaneous feedback.",
  },
  {
    icon: "🔒",
    title: "Data stays private",
    description:
      "The information you provide such as the job description will remain private. We do not store any of this data on our servers.",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center px-4 md:px-10 lg:px-20 bg-gradient-to-br from-purple-50 to-blue-50 mt-3">
      {/* Hero Section */}
      <section className="text-center py-12 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold text-purple-600 leading-tight">
          <TypingAnimation>
            Struggling with the nerves and pressure of preparing for a live job interview?
          </TypingAnimation>
        </h1>

        <marquee>
          <p className="mt-4 text-gray-600 font-bold text-lg">
            Say hello to CareerElevate – your ultimate interview preparation partner! Powered by advanced artificial intelligence, CareerElevate offers realistic interview simulations that help you practice, refine, and master your skills in a stress-free environment. Get ready to ace your next interview with confidence!
          </p>
        </marquee>

        <div className="mt-6 flex flex-col sm:flex-row justify-center">
          <AddNewInterview />
        </div>
      </section>

      {/* Video Section */}
      <section className="w-full max-w-4xl my-10">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with actual video link
            title="Interview Prep AI Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="text-center py-12 w-full max-w-5xl">
        <h2 className="text-3xl font-bold text-gray-800">How it works?</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-lg text-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-blue-50 cursor-pointer"
            >
              <div className="text-4xl mb-4 hover:animate-bounce">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
