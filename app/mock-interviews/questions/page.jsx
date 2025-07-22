// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/mock-interviews/questions/page.jsx

"use client"
import Head from "next/head";
import { ChevronDown, ChevronUp } from "lucide-react";

import { useState } from "react";

const faqs = [
  {
    id: 1,
    category: "Technical",
    question: "How does the AI feedback system work in Career Elevate?",
    answer:
      "The AI analyzes your responses in real-time, providing feedback on key metrics like clarity, tone, and relevance to the question.",
  },
  {
    id: 2,
    category: "Application Usage",
    question: "How do you track your progress in the mock interview module?",
    answer:
      "Users can track their progress using the dashboard, which shows metrics like completed interviews, feedback summaries, and improvement over time.",
  },
  {
    id: 3,
    category: "Application Usage",
    question: "What types of mock interviews are available in the application?",
    answer:
      "Career Elevate supports technical, behavioral, and situational mock interviews to cater to different job roles and scenarios.",
  },
  {
    id: 4,
    category: "Behavioral",
    question: "How would you explain the application's value to a first-time user?",
    answer:
      "Career Elevate offers a structured way to practice interviews, with instant AI feedback and progress tracking to help users improve their skills efficiently.",
  },
  {
    id: 5,
    category: "Application Usage",
    question: "How do users access feedback after a mock interview session?",
    answer:
      "Once a mock interview session ends, the feedback is displayed on the results page and stored in the user's dashboard for future reference.",
  },
  {
    id: 6,
    category: "Situational",
    question:
      "A user reports that their interview session did not save. How would you handle this?",
    answer:
      "Check the user's session logs, ensure their data is saved in the database, and guide them through retrying the session if needed.",
  },
  {
    id: 7,
    category: "Technical",
    question:
      "What is the purpose of the 'How It Works' page in the application?",
    answer:
      "The 'How It Works' page explains the application workflow, helping users understand the steps to use the mock interview module effectively.",
  },
  {
    id: 8,
    category: "Application Usage",
    question:
      "Can users customize the type of questions they receive during mock interviews?",
    answer:
      "Yes, users can select categories like technical, behavioral, or situational, and tailor the questions to their specific needs.",
  },
  {
    id: 9,
    category: "Situational",
    question:
      "What should a user do if they encounter an error during a mock interview?",
    answer:
      "Users can report the issue through the 'Support' section or restart the session using the retry button.",
  },
  {
    id: 10,
    category: "Technical",
    question: "How does the application ensure data privacy for users?",
    answer:
      "Career Elevate implements secure encryption for user data and follows best practices for GDPR compliance to protect user information.",
  },
  {
    id: 11,
    category: "Behavioral",
    question: "How would you motivate a user to keep practicing on the app?",
    answer:
      "Highlight the benefits of consistent practice, share success stories, and emphasize the progress tracking feature to show measurable improvement.",
  },
];

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <section
      className="py-16 px-6 lg:px-20 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://cdn.prod.website-files.com/65e89895c5a4b8d764c0d710/66d030e65d6df2a0e0b5b304_Frame%202087325276.svg')",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10">
        {/* Left Side (Title) */}
        <div className="md:w-1/3">
          <h2 className="text-4xl font-bold text-gray-900">
            Mock Interview <br /> FAQs
          </h2>
        </div>

        {/* Right Side (FAQ List) */}
        <div className="md:w-2/3 space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-[#F5F8FF] rounded-xl p-5 cursor-pointer transition-all shadow-sm hover:shadow-md"
              onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                {openFAQ === faq.id ? (
                  <ChevronUp className="text-blue-600" />
                ) : (
                  <ChevronDown className="text-blue-600" />
                )}
              </div>
              {openFAQ === faq.id && (
                <p className="text-gray-600 mt-3 transition-opacity duration-300 ease-in-out">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
