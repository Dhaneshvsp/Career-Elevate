// "use client"
// import Head from "next/head";
// import { useState } from "react";

// const questionsData = [
//   {
//     id: 1,
//     category: "Technical",
//     question: "How does the AI feedback system work in Career Elevate?",
//     answer:
//       "The AI analyzes your responses in real-time, providing feedback on key metrics like clarity, tone, and relevance to the question.",
//   },
// //   {
// //     id: 2,
// //     category: "Application Usage",
// //     question: "How do you track your progress in the mock interview module?",
// //     answer:
// //       "Users can track their progress using the dashboard, which shows metrics like completed interviews, feedback summaries, and improvement over time.",
// //   },
//   {
//     id: 3,
//     category: "Application Usage",
//     question: "What types of mock interviews are available in the application?",
//     answer:
//       "Career Elevate supports technical, behavioral, and situational mock interviews to cater to different job roles and scenarios.",
//   },
//   {
//     id: 4,
//     category: "Behavioral",
//     question: "How would you explain the application's value to a first-time user?",
//     answer:
//       "Career Elevate offers a structured way to practice interviews, with instant AI feedback and progress tracking to help users improve their skills efficiently.",
//   },
//   {
//     id: 5,
//     category: "Application Usage",
//     question: "How do users access feedback after a mock interview session?",
//     answer:
//       "Once a mock interview session ends, the feedback is displayed on the results page and stored in the user's dashboard for future reference.",
//   },
//   {
//     id: 6,
//     category: "Situational",
//     question:
//       "A user reports that their interview session did not save. How would you handle this?",
//     answer:
//       "Check the user's session logs, ensure their data is saved in the database, and guide them through retrying the session if needed.",
//   },
//   {
//     id: 7,
//     category: "Technical",
//     question:
//       "What is the purpose of the 'How It Works' page in the application?",
//     answer:
//       "The 'How It Works' page explains the application workflow, helping users understand the steps to use the mock interview module effectively.",
//   },
//   {
//     id: 8,
//     category: "Application Usage",
//     question:
//       "Can users customize the type of questions they receive during mock interviews?",
//     answer:
//       "Yes, users can select categories like technical, behavioral, or situational, and tailor the questions to their specific needs.",
//   },
//   {
//     id: 9,
//     category: "Situational",
//     question:
//       "What should a user do if they encounter an error during a mock interview?",
//     answer:
//       "Users can report the issue through the 'Support' section or restart the session using the retry button.",
//   },
//   {
//     id: 10,
//     category: "Technical",
//     question: "How does the application ensure data privacy for users?",
//     answer:
//       "Career Elevate implements secure encryption for user data and follows best practices for GDPR compliance to protect user information.",
//   },
//   {
//     id: 11,
//     category: "Behavioral",
//     question: "How would you motivate a user to keep practicing on the app?",
//     answer:
//       "Highlight the benefits of consistent practice, share success stories, and emphasize the progress tracking feature to show measurable improvement.",
//   },
// ];

// export default function Questions() {
//   const [search, setSearch] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [expandedQuestion, setExpandedQuestion] = useState(null);

//   const filteredQuestions = questionsData.filter(
//     (q) =>
//       (selectedCategory === "All" || q.category === selectedCategory) &&
//       q.question.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <>
//       <Head>
//         <title>Questions - Career Elevate</title>
//         <meta
//           name="description"
//           content="Practice mock interview questions and prepare for your next big opportunity."
//         />
//       </Head>
//       <div className="min-h-screen bg-gray-50 mt-3">
//         {/* Header */}
//         <header className="bg-blue-700 text-white py-6 shadow-md">
//           <div className="container mx-auto px-4">
//             <h1 className="text-3xl font-bold">Mock Interview Questions</h1>
//             <p className="text-sm mt-1">
//               Practice questions categorized by type to prepare effectively.
//             </p>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="container mx-auto px-4 py-10">
//           {/* Filters */}
//           <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
//             <input
//               type="text"
//               placeholder="Search questions..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-blue-500"
//             />
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4 focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="All">All Categories</option>
//               <option value="Technical">Technical</option>
//               <option value="Behavioral">Behavioral</option>
//               <option value="Situational">Situational</option>
//               <option value="Application Usage">Application Usage</option>
//             </select>
//           </div>

//           {/* Questions List */}
//           <div className="space-y-4">
//             {filteredQuestions.map((q) => (
//               <div
//                 key={q.id}
//                 className="bg-white shadow-md rounded-lg p-6 cursor-pointer"
//                 onClick={() =>
//                   setExpandedQuestion(expandedQuestion === q.id ? null : q.id)
//                 }
//               >
//                 <h3 className="text-lg font-semibold text-blue-600">
//                   {q.question}
//                 </h3>
//                 {expandedQuestion === q.id && (
//                   <p className="text-gray-700 mt-3">{q.answer}</p>
//                 )}
//               </div>
//             ))}
//             {filteredQuestions.length === 0 && (
//               <p className="text-gray-700 text-center">
//                 No questions found. Try adjusting your search or filters.
//               </p>
//             )}
//           </div>
//         </main>

//         {/* Footer */}
       
//       </div>
//       <footer className="bg-blue-700 text-white py-4 bottom-0">
//           <div className="container mx-auto px-4 text-center">
//             <p>&copy; {new Date().getFullYear()} Career Elevate. All rights reserved.</p>
//           </div>
//         </footer>
//     </>
//   );
// }

"use client"
import Head from "next/head";
import { useState } from "react";

const questionsData = [
  {
    id: 1,
    category: "Technical",
    question: "How does the AI feedback system work in Career Elevate?",
    answer:
      "The AI analyzes your responses in real-time, providing feedback on key metrics like clarity, tone, and relevance to the question.",
  },
//   {
//     id: 2,
//     category: "Application Usage",
//     question: "How do you track your progress in the mock interview module?",
//     answer:
//       "Users can track their progress using the dashboard, which shows metrics like completed interviews, feedback summaries, and improvement over time.",
//   },
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

export default function Questions() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const filteredQuestions = questionsData.filter(
    (q) =>
      (selectedCategory === "All" || q.category === selectedCategory) &&
      q.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head>
        <title>Questions - Career Elevate</title>
        <meta
          name="description"
          content="Practice mock interview questions and prepare for your next big opportunity."
        />
      </Head>
      <div className="min-h-screen bg-[#37474F] text-white mt-3">
        {/* Header */}
        <header className="bg-[#263238] py-6 shadow-md">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Mock Interview Questions</h1>
            <p className="text-sm mt-1">
              Practice questions categorized by type to prepare effectively.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-10">
          {/* Filters */}
          <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 text-black focus:ring-2 focus:ring-[#90A4AE]"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4 text-black focus:ring-2 focus:ring-[#90A4AE]"
            >
              <option value="All">All Categories</option>
              <option value="Technical">Technical</option>
              <option value="Behavioral">Behavioral</option>
              <option value="Situational">Situational</option>
              <option value="Application Usage">Application Usage</option>
            </select>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            {filteredQuestions.map((q) => (
              <div
                key={q.id}
                className="bg-[#455A64] shadow-md rounded-lg p-6 cursor-pointer"
                onClick={() =>
                  setExpandedQuestion(expandedQuestion === q.id ? null : q.id)
                }
              >
                <h3 className="text-lg font-semibold text-[#CFD8DC]">
                  {q.question}
                </h3>
                {expandedQuestion === q.id && (
                  <p className="text-gray-300 mt-3">{q.answer}</p>
                )}
              </div>
            ))}
            {filteredQuestions.length === 0 && (
              <p className="text-gray-300 text-center">
                No questions found. Try adjusting your search or filters.
              </p>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="text-[#263238] bg-white py-4 bottom-0">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Career Elevate. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}