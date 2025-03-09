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


// "use client";
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { UserButton } from "@clerk/nextjs";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function MockInterview() {
//   const router = useRouter();
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
//   };
//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   // Form state for interview setup
//   const [setup, setSetup] = useState({
//     role: "",
//     difficulty: "Medium",
//     duration: "30",
//   });
//   const [started, setStarted] = useState(false);

//   const handleChange = (e) => {
//     setSetup({ ...setup, [e.target.name]: e.target.value });
//   };

//   const handleStart = (e) => {
//     e.preventDefault();
//     if (!setup.role) {
//       alert("Please enter a job role!");
//       return;
//     }
//     setStarted(true);
//     // Simulate starting the interview (replace with your logic)
//     console.log("Interview started:", setup);
//     // Optionally redirect to a live interview page
//     // router.push(`/mock-interviews/live?role=${setup.role}&difficulty=${setup.difficulty}&duration=${setup.duration}`);
//   };

//   // Navigation Links
//   const navLinks = [
//     { href: "/", label: "Home" },
//     { href: "/about", label: "About" },
//     { href: "/mock-interviews", label: "Mock Interviews" },
//     { href: "/dashboard", label: "Dashboard" },
//     { href: "/contact", label: "Contact" },
//   ];

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="flex justify-between items-center p-6 bg-gradient-to-r from-teal-700 to-indigo-700 text-white shadow-lg sticky top-0 z-50">
//         <motion.div
//           className="flex items-center space-x-4"
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Link href="/">
//             <img 
//               src="/logo.svg" 
//               alt="CareerElevate Logo" 
//               className="h-14 w-14 transition-transform duration-300 hover:scale-110 hover:rotate-3" 
//             />
//           </Link>
//           <Link href="/">
//             <span className="text-3xl font-bold">CareerElevate</span>
//           </Link>
//         </motion.div>
//         <nav className="hidden md:flex items-center space-x-8">
//           {navLinks.map((item, index) => (
//             <motion.div
//               key={index}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <Link
//                 href={item.href}
//                 className={`text-lg font-medium ${item.href === "/mock-interviews" ? "text-teal-300" : "text-white"} hover:text-teal-300 transition-colors duration-300 relative group`}
//               >
//                 {item.label}
//                 <span className={`absolute left-0 bottom-[-6px] w-0 h-1 bg-teal-300 group-hover:w-full transition-all duration-300 ${item.href === "/mock-interviews" ? "w-full" : ""}`}></span>
//               </Link>
//             </motion.div>
//           ))}
//         </nav>
//         <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
//           <UserButton />
//         </motion.div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-grow py-24 px-6 max-w-5xl mx-auto w-full">
//         <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center">
//           <motion.h1
//             className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600"
//             variants={itemVariants}
//           >
//             Mock Interviews
//           </motion.h1>
//           <motion.p
//             className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto"
//             variants={itemVariants}
//           >
//             Practice with AI-powered interviewers and get tailored feedback to ace your next job interview.
//           </motion.p>
//         </motion.div>

//         {/* Interview Setup */}
//         <motion.div
//           className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl mx-auto mb-16"
//           variants={itemVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
//             {started ? "Interview In Progress" : "Set Up Your Mock Interview"}
//           </h2>
//           {started ? (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="text-center"
//             >
//               <p className="text-teal-600 text-lg mb-6">Your {setup.role} interview ({setup.difficulty}, {setup.duration} mins) has started!</p>
//               <div className="flex justify-center space-x-4">
//                 <button
//                   onClick={() => setStarted(false)}
//                   className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
//                 >
//                   End Interview
//                 </button>
//                 <button
//                   onClick={() => router.push("/dashboard")} // Replace with actual feedback page
//                   className="bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
//                 >
//                   View Feedback (Demo)
//                 </button>
//               </div>
//             </motion.div>
//           ) : (
//             <form onSubmit={handleStart} className="space-y-6">
//               <div>
//                 <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
//                   Job Role
//                 </label>
//                 <input
//                   type="text"
//                   id="role"
//                   name="role"
//                   value={setup.role}
//                   onChange={handleChange}
//                   placeholder="e.g., Software Engineer"
//                   className="w-full p-4 rounded-xl border border-gray-300 focus:border-teal-600 focus:ring focus:ring-teal-200 transition-all duration-300"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="difficulty" className="block text-gray-700 font-medium mb-2">
//                   Difficulty Level
//                 </label>
//                 <select
//                   id="difficulty"
//                   name="difficulty"
//                   value={setup.difficulty}
//                   onChange={handleChange}
//                   className="w-full p-4 rounded-xl border border-gray-300 focus:border-teal-600 focus:ring focus:ring-teal-200 transition-all duration-300"
//                 >
//                   <option value="Easy">Easy</option>
//                   <option value="Medium">Medium</option>
//                   <option value="Hard">Hard</option>
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="duration" className="block text-gray-700 font-medium mb-2">
//                   Duration (minutes)
//                 </label>
//                 <select
//                   id="duration"
//                   name="duration"
//                   value={setup.duration}
//                   onChange={handleChange}
//                   className="w-full p-4 rounded-xl border border-gray-300 focus:border-teal-600 focus:ring focus:ring-teal-200 transition-all duration-300"
//                 >
//                   <option value="15">15</option>
//                   <option value="30">30</option>
//                   <option value="45">45</option>
//                 </select>
//               </div>
//               <motion.button
//                 type="submit"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="w-full bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
//               >
//                 Start Interview
//               </motion.button>
//             </form>
//           )}
//         </motion.div>

//         {/* Benefits & Progress */}
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           {/* Benefits */}
//           <motion.div
//             className="bg-white rounded-2xl shadow-lg p-6"
//             variants={itemVariants}
//           >
//             <h3 className="text-2xl font-semibold text-gray-900 mb-4">Why Practice with Us?</h3>
//             <ul className="space-y-3 text-gray-700">
//               <li className="flex items-center">
//                 <span className="text-teal-600 mr-2">✔️</span> Real-time AI feedback
//               </li>
//               <li className="flex items-center">
//                 <span className="text-teal-600 mr-2">✔️</span> Customizable scenarios
//               </li>
//               <li className="flex items-center">
//                 <span className="text-teal-600 mr-2">✔️</span> Boost confidence & skills
//               </li>
//             </ul>
//           </motion.div>

//           {/* Progress Teaser */}
//           <motion.div
//             className="bg-white rounded-2xl shadow-lg p-6"
//             variants={itemVariants}
//           >
//             <h3 className="text-2xl font-semibold text-gray-900 mb-4">Your Progress</h3>
//             <p className="text-gray-700 mb-4">Track your improvement over time.</p>
//             <div className="space-y-2">
//               <div className="flex justify-between text-sm text-gray-600">
//                 <span>Interviews Completed</span>
//                 <span className="font-semibold text-teal-600">4</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-teal-600 h-2 rounded-full" style={{ width: "40%" }}></div>
//               </div>
//             </div>
//             <Link
//               href="/dashboard"
//               className="mt-4 inline-block text-teal-600 hover:text-teal-700 font-semibold transition-colors duration-300"
//             >
//               See Full Stats
//             </Link>
//           </motion.div>
//         </motion.div>
//       </main>

//       {/* Footer */}
//       <footer className="py-12 bg-gradient-to-r from-teal-900 to-indigo-900 text-white text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <p className="text-gray-200 text-lg mb-4">
//             Powered by <span className="font-semibold text-teal-400">CareerElevate AI</span>
//           </p>
//           <div className="flex justify-center space-x-8 mb-6">
//             {["Home", "About", "Mock Interviews", "Contact"].map((item, index) => (
//               <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
//                 <Link
//                   href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
//                   className="text-gray-300 hover:text-teal-400 transition-colors duration-300"
//                 >
//                   {item}
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//           <p className="text-gray-400 text-sm">
//             © {new Date().getFullYear()} CareerElevate. All rights reserved.
//           </p>
//         </motion.div>
//       </footer>
//     </div>
//   );
// }

"use client";
import React from "react";
import { motion } from "framer-motion";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";
import Image from "next/image";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { HyperText } from "@/components/magicui/hyper-text";
import { BoxReveal } from "@/components/magicui/box-reveal";

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
  "https://logo.clearbit.com/salesforce.com",
];

// How It Works steps
const steps = [
  {
    icon: "📋",
    title: "Fill Out Initial Information",
    description: "Provide job details, interview type, and language to customize your experience.",
  },
  {
    icon: "💬",
    title: "Practice Unlimited Interviews",
    description: "Engage in live AI-driven simulations with instant feedback.",
  },
  {
    icon: "🔒",
    title: "Your Data Stays Private",
    description: "Complete confidentiality—no data stored on our servers.",
  },
];

export default function MockInterviews() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-gradient-to-r from-teal-700 to-indigo-700 text-white shadow-lg sticky top-0 z-50">
        <motion.div
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <img
              src="/logo.svg"
              alt="CareerElevate Logo"
              className="h-14 w-14 transition-transform duration-300 hover:scale-110 hover:rotate-3"
            />
          </Link>
          <Link href="/">
            <span className="text-3xl font-bold">CareerElevate</span>
          </Link>
        </motion.div>
        <nav className="hidden md:flex items-center space-x-8">
          {["Home", "About", "Mock Interviews", "Dashboard", "Contact Us"].map((item, index) => (
            <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={item === "Home" ? "/homepage" : `/${item.toLowerCase().replace(" ", "-")}`}
                className={`text-lg font-medium ${item === "Mock Interviews" ? "text-teal-300" : "text-white"} hover:text-teal-300 transition-colors duration-300 relative group`}
              >
                {item}
                <span
                  className={`absolute left-0 bottom-[-6px] w-0 h-1 bg-teal-300 group-hover:w-full transition-all duration-300 ${item === "Mock Interviews" ? "w-full" : ""}`}
                ></span>
              </Link>
            </motion.div>
          ))}
        </nav>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <UserButton />
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-24 px-6 max-w-6xl mx-auto w-full">
        {/* Hero Section */}
        <motion.section
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600"
            variants={itemVariants}
          >
            <TypingAnimation>Master Your Next Interview</TypingAnimation>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Say goodbye to interview nerves with CareerElevate’s AI-powered mock interviews—practice, refine, and succeed.
            {/* <BoxReveal>Say goodbye to interview nerves with CareerElevate’s AI-powered mock interviews—practice, refine, and succeed.</BoxReveal> */}
          </motion.p>
          <motion.div variants={itemVariants}>
            <AddNewInterview />
          </motion.div>
        </motion.section>

        {/* Video Section */}
        <motion.section
          className="w-full mb-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your demo video
              title="CareerElevate Mock Interview Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </motion.section>

        {/* Company Logos */}
        <motion.section
          className="w-full bg-white/90 backdrop-blur-md py-6 overflow-hidden rounded-2xl shadow-lg mb-16"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex whitespace-nowrap animate-marquee">
            {companyLogos.concat(companyLogos).map((logo, index) => (
              <Image
                key={index}
                src={logo}
                alt="Company Logo"
                width={120}
                height={40}
                className="mx-6 opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            ))}
          </div>
        </motion.section>

        {/* How It Works */}
        <motion.section
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Get started in three simple steps.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-5xl text-teal-600 mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Interview List */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <InterviewList />
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-gradient-to-r from-teal-900 to-indigo-900 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-200 text-lg mb-4">
            Powered by <span className="font-semibold text-teal-400">CareerElevate AI</span>
          </p>
          <div className="flex justify-center space-x-8 mb-6">
            {["Home", "About", "Mock Interviews", "Contact"].map((item, index) => (
              <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                  className="text-gray-300 hover:text-teal-400 transition-colors duration-300"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} CareerElevate. All rights reserved.
          </p>
        </motion.div>
      </footer>
    </div>
  );
}