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

// "use client";
// import { UserButton } from "@clerk/nextjs";
// import React from "react";
// import Header from "./_components/Header";
// import AddNewInterview from "./_components/AddNewInterview";
// import InterviewList from "./_components/InterviewList";
// import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
// import { TypingAnimation } from "@/components/magicui/typing-animation";

// const steps = [
//   {
//     icon: "📋",
//     title: "Fill out initial information",
//     description:
//       "Fill out information such as job description, interview type, language.",
//   },
//   {
//     icon: "💬",
//     title: "Practice interviews as many times as you want",
//     description:
//       "Practice multiple live iterations of your interview by talking with our AI and get instantaneous feedback.",
//   },
//   {
//     icon: "🔒",
//     title: "Data stays private",
//     description:
//       "The information you provide such as the job description will remain private. We do not store any of this data on our servers.",
//   },
// ];

// export default function Dashboard() {
//   return (
//     <div className="min-h-screen w-full flex flex-col items-center px-4 md:px-10 lg:px-20 bg-gradient-to-br from-purple-50 to-blue-50 mt-3">
//       {/* Hero Section */}
//       <section className="text-center py-12 max-w-3xl">
//         <h1 className="text-3xl md:text-5xl font-bold text-purple-600 leading-tight">
//           <TypingAnimation>
//             Struggling with the nerves and pressure of preparing for a live job interview?
//           </TypingAnimation>
//         </h1>

//         <marquee>
//           <p className="mt-4 text-gray-600 font-bold text-lg">
//             Say hello to CareerElevate – your ultimate interview preparation partner! Powered by advanced artificial intelligence, CareerElevate offers realistic interview simulations that help you practice, refine, and master your skills in a stress-free environment. Get ready to ace your next interview with confidence!
//           </p>
//         </marquee>

//         <div className="mt-6 flex flex-col sm:flex-row justify-center">
//           <AddNewInterview />
//         </div>
//       </section>

//       {/* Video Section */}
//       <section className="w-full max-w-4xl my-10">
//         <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
//           <iframe
//             className="w-full h-full"
//             src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with actual video link
//             title="Interview Prep AI Demo"
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           ></iframe>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="text-center py-12 w-full max-w-5xl">
//         <h2 className="text-3xl font-bold text-gray-800">How it works?</h2>
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {steps.map((step, index) => (
//             <div
//               key={index}
//               className="p-6 bg-white shadow-lg rounded-lg text-center transition-all duration-300 hover:shadow-xl hover:scale-105 hover:bg-blue-50 cursor-pointer"
//             >
//               <div className="text-4xl mb-4 hover:animate-bounce">{step.icon}</div>
//               <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
//               <p className="text-gray-600 mt-2">{step.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }


"use client";
import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import Image from "next/image";

// Company logos for scrolling effect
const companyLogos = [
  "https://logo.clearbit.com/google.com",
  "https://logo.clearbit.com/amazon.com",
  "https://logo.clearbit.com/microsoft.com",
  "https://logo.clearbit.com/meta.com",
  "https://logo.clearbit.com/apple.com",
  "https://logo.clearbit.com/tesla.com",
  "https://logo.clearbit.com/netflix.com",
  "https://logo.clearbit.com/zoom.us",
  "https://logo.clearbit.com/slack.com",
  "https://logo.clearbit.com/adobe.com",
  "https://logo.clearbit.com/spotify.com",
  "https://logo.clearbit.com/salesforce.com"
];


const steps = [
  {
    icon: "📋",
    title: "Fill out initial information",
    description:
      "Provide job details, interview type, and language to customize your experience.",
  },
  {
    icon: "💬",
    title: "Practice unlimited interviews",
    description:
      "Engage in multiple live AI-driven interview simulations with instant feedback.",
  },
  {
    icon: "🔒",
    title: "Your data stays private",
    description:
      "We ensure complete confidentiality—no data is stored on our servers.",
  },
];

export default function Dashboard() {
  return (
<div className="min-h-screen w-full flex flex-col items-center px-6 md:px-12 lg:px-24 bg-cover bg-center"
      style={{
        backgroundImage: "url('https://cdn.prod.website-files.com/65e89895c5a4b8d764c0d710/66436f06a1016be8fae136f3_Hero-Module.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Hero Section */}
      <section className="text-center py-16 max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold text-[#2D2F7D] leading-tight">
          <TypingAnimation>
            Struggling with the nerves and pressure of preparing for a live job interview?
          </TypingAnimation>
        </h1>

        <p className="mt-4 text-gray-700 font-semibold text-lg">
          Say hello to <span className="text-[#6366F1] font-bold">CareerElevate</span> – your ultimate interview preparation partner! 
          Powered by AI, it offers realistic simulations to help you **practice, refine, and ace** your next interview.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row justify-center">
          <AddNewInterview />
        </div>
      </section>

      {/* Video Section */}
      <section className="w-full max-w-4xl my-10">
        <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Interview Prep AI Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          {/* <video
  className="w-full h-full rounded-lg"
  
  autoPlay
  muted
>
  <source src="/videos/interview-demo.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video> */}

        </div>
      </section>

      {/* Moving Logos */}
      <section className="w-full bg-transparent py-6 overflow-hidden relative shadow-sm rounded-full">
  {/* Blur Overlay */}
  <div className="absolute inset-0 backdrop-blur-md pointer-events-none rounded-full"></div>

  {/* Scrolling Logos */}
  <div className="flex whitespace-nowrap animate-marquee">
    {companyLogos.concat(companyLogos).map((logo, index) => (
      <Image
        key={index}
        src={logo}
        alt="Company Logo"
        width={120}
        height={40}
        className="mx-6"
      />
    ))}
  </div>
</section>


      {/* How It Works Section */}
      <section className="text-center py-16 w-full max-w-6xl mx-auto px-6">
  <h2 className="text-4xl font-extrabold text-gray-900">How It Works</h2>
  <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
    Follow these simple steps to get started with our platform.
  </p>
  <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
    {steps.map((step, index) => (
      <div
        key={index}
        className="relative p-8 bg-white shadow-xl rounded-2xl text-center transition-transform duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
      >
        <div className="text-6xl text-blue-600 mb-6 animate-pulse">{step.icon}</div>
        <h3 className="text-2xl font-semibold text-gray-900">{step.title}</h3>
        <p className="text-gray-600 mt-3 leading-relaxed">{step.description}</p>
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 rounded-t-2xl"></div>
      </div>
    ))}
  </div>
</section>
</div>
  );
}
