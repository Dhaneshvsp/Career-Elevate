// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/page.js

"use client"
import React from "react";
import { useRouter } from "next/navigation";
import Header from "./homepage/_components/Header";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-gray-50 min-h-screen">
      
     <Header/>

      {/* Hero Section */}
      <section className="text-center py-24 px-6 bg-gradient-to-r from-blue-50 to-blue-100">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Elevate Your Career with AI-Powered Preparation</h1>
        <p className="text-xl text-gray-600 mb-8">Master interviews, build ATS-friendly resumes, and ace certification quizzes with CareerElevate.</p>
        <button onClick={() => router.push("/homepage")} className="bg-blue-700 hover:bg-blue-800 hover:cursor-pointer text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300">Get Started for Free</button>
      </section>

      {/* Features Section */}    
      <section id="features" className="py-20 px-6 bg-gray-50">
  {/* Heading */}
  <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-16 tracking-tight animate-fade-in">
    Why CareerElevate Stands Out
  </h2>

  {/* Features Grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
    {[
      { 
        icon: "🎤", 
        title: "Mock Interviews", 
        desc: "Practice with lifelike AI avatars and get instant, actionable feedback to nail your next interview.", 
        color: "from-indigo-500 to-blue-600" 
      },
      { 
        icon: "📄", 
        title: "Resume Builder", 
        desc: "Build a standout, ATS-friendly resume in minutes with AI-guided precision.", 
        color: "from-teal-500 to-cyan-600" 
      },
      { 
        icon: "📜", 
        title: "Certification Quizzes", 
        desc: "Master key skills with interactive quizzes and earn certificates that boost your career.", 
        color: "from-purple-500 to-indigo-600" 
      }
    ].map(({ icon, title, desc, color }, index) => (
      <div 
        key={index} 
        className={`relative bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 text-center overflow-hidden group transform hover:-translate-y-3`}
      >
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

        {/* Feature Content */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Icon with Animation */}
          <div className="text-5xl mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
            {icon}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-base leading-relaxed max-w-xs mx-auto group-hover:text-gray-700 transition-colors duration-300">
            {desc}
          </p>

          {/* Subtle Border Accent */}
          <div className={`absolute bottom-0 left-1/2 w-16 h-1 bg-gradient-to-r ${color} transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 bg-gradient-to-b from-gray-100 to-gray-50">
  <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-16 tracking-tight">
    How It Works
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
    {[ 
      { step: "1", title: "Sign Up & Choose a Service", desc: "Create an account and select the service you need." },
      { step: "2", title: "Complete the Session", desc: "Practice interviews, build resumes, or take quizzes." },
      { step: "3", title: "Get Feedback & Improve", desc: "Receive AI-generated feedback and track your progress." }
    ].map(({ step, title, desc }, index) => (
      <div key={index} className="relative bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center overflow-hidden group transform hover:-translate-y-2 hover:scale-105">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="text-white bg-blue-600 w-14 h-14 flex items-center justify-center text-3xl font-bold rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
            {step}
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mt-4 mb-3 group-hover:text-blue-700 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
            {desc}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-6 bg-gradient-to-b from-gray-900 via-indigo-950 to-black">
  <h2 className="text-4xl font-extrabold text-center text-white mb-12">
    What Our Users Say
  </h2>

  <div className="relative max-w-6xl mx-auto overflow-hidden">
    {/* Top Scrolling Line (Left to Right) */}
    <div className="flex space-x-8 animate-scroll-left">
      {[
        { text: "CareerElevate helped me ace my interviews with their AI mock interviews. Highly recommended!", name: "Jane Doe" },
        { text: "The resume builder is a game-changer. I got multiple callbacks after using it!", name: "John Smith" },
        { text: "The certification quizzes are a great way to validate your skills. I landed a job at Google!", name: "Emily Johnson" },
        { text: "Performance analytics helped me improve my weak areas and boost confidence!", name: "Michael Brown" }
      ]
      .flatMap(item => [item, item])
      .map(({ text, name }, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-500 p-6 rounded-xl shadow-lg w-80 flex-shrink-0 hover:shadow-xl hover:from-purple-700 hover:via-indigo-700 hover:to-teal-600 transition-all duration-300 text-white text-center whitespace-normal"
        >
          <p className="italic break-words">"{text}"</p>
          <p className="mt-4 font-bold text-yellow-200">- {name}</p>
        </div>
      ))}
    </div>

    {/* Bottom Scrolling Line (Right to Left) */}
    <div className="flex space-x-8 animate-scroll-right mt-8">
      {[
        { text: "The AI-driven feedback is so accurate! Helped me land my dream job!", name: "Sophia Wilson" },
        { text: "The mock interviews felt like real-world scenarios. Super helpful!", name: "Chris Evans" },
        { text: "Highly recommend CareerElevate to anyone serious about job prep!", name: "Jessica Lee" },
        { text: "My LinkedIn profile views doubled after improving my resume with CareerElevate!", name: "Daniel Carter" }
      ]
      .flatMap(item => [item, item])
      .map(({ text, name }, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-teal-500 via-blue-600 to-purple-600 p-6 rounded-xl shadow-lg w-80 flex-shrink-0 hover:shadow-xl hover:from-teal-600 hover:via-blue-700 hover:to-purple-700 transition-all duration-300 text-white text-center whitespace-normal"
        >
          <p className="italic break-words">"{text}"</p>
          <p className="mt-4 font-bold text-yellow-200">- {name}</p>
        </div>
      ))}
    </div>
  </div>

  <style>
    {`
      @keyframes scrollLeft {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      
      @keyframes scrollRight {
        from { transform: translateX(-50%); }
        to { transform: translateX(0); }
      }
      
      .animate-scroll-left {
        animation: scrollLeft 20s linear infinite;
      }

      .animate-scroll-right {
        animation: scrollRight 20s linear infinite;
      }
    `}
  </style>
</section>


      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-gray-50">
  {/* Heading */}
  <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-16 tracking-tight animate-fade-in">
    Got Questions? We’ve Got Answers
  </h2>

  {/* FAQ Container */}
  <div className="max-w-6xl mx-auto overflow-hidden">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { 
          question: "How much does CareerElevate cost?", 
          answer: "We offer a free tier with core features. Premium plans start at just $19.99/month for advanced tools." 
        },
        { 
          question: "Is my data secure with your platform?", 
          answer: "Absolutely. We use industry-standard encryption and strict privacy protocols to keep your data safe." 
        },
        { 
          question: "Can I cancel my subscription anytime?", 
          answer: "Yes! You can cancel anytime with no hassle—just a few clicks in your account settings." 
        },
        { 
          question: "Do you offer refunds if I’m not satisfied?", 
          answer: "Yes, we provide a 30-day money-back guarantee, no questions asked." 
        },
        { 
          question: "How do I get help if I need it?", 
          answer: "Our support team is available 24/7 via email, live chat, or our help center." 
        },
        { 
          question: "Does the AI really improve my skills?", 
          answer: "Yes! Our AI tailors feedback and resources to your unique needs, accelerating your career growth." 
        }
      ].map((faq, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
        >
          {/* Question Header */}
          <div className="p-6 cursor-pointer flex justify-between items-center group-hover:bg-gray-100 transition-colors duration-300">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
              {faq.question}
            </h3>
            <span className="text-2xl text-gray-500 group-hover:text-blue-700 transition-transform duration-300 group-hover:rotate-45">+</span>
          </div>

          {/* Answer (Accordion Style) */}
          <div className="max-h-0 group-hover:max-h-40 transition-all duration-500 ease-in-out overflow-hidden">
            <p className="px-6 pb-6 text-gray-600 text-base leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Footer */}
      <footer className="text-center py-12 bg-black text-white border-t border-gray-700">
  <p className="text-gray-300 text-lg mb-6 font-medium">
    Trusted by professionals from 
    <span className="text-white font-semibold"> Google, Facebook, Microsoft, Amazon, </span> 
    and <span className="text-white font-semibold">Airbnb.</span>
  </p>

  <div className="flex justify-center space-x-8 mb-6">
    {[
      { name: "About Us", link: "#" },
      { name: "Contact", link: "#" },
      { name: "Privacy Policy", link: "#" },
      { name: "Terms of Service", link: "#" },
    ].map((item, index) => (
      <a 
        key={index} 
        href={item.link} 
        className="text-gray-400 text-lg font-medium hover:text-white transition-all duration-300"
      >
        {item.name}
      </a>
    ))}
  </div>

  <div className="flex justify-center space-x-6 text-gray-400 text-2xl">
    <a href="#" className="hover:text-white transition-colors duration-300">
      🔵
    </a>
    <a href="#" className="hover:text-white transition-colors duration-300">
      🟠
    </a>
    <a href="#" className="hover:text-white transition-colors duration-300">
      🟡
    </a>
  </div>

  <p className="text-gray-500 text-sm mt-6">
    © {new Date().getFullYear()} CareerElevate. All rights reserved.
  </p>
</footer>


    </div>
  );
}