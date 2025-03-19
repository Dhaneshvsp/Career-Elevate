// import { Lightbulb, Volume2 } from 'lucide-react';

// import React from 'react';

// function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
//   const textToSpeech=(text)=>{
//     if('SpeechSynthesis' in window){
//       const speech=new SpeechSynthesisUtterance(text);
//       window.speechSynthesis.speak(speech);
//     }
//     else{
//       alert('Sorry, Your browser does not supporttext to speech')
//     }

//   }
//   console.log("mockInterviewQuestion: ",mockInterviewQuestion);
//   const questions = Array.isArray(mockInterviewQuestion) ? mockInterviewQuestion : [];
//   console.log("Displaying Questions: ",questions);
  

//   // Validate activeQuestionIndex
//   const isValidQuestion =
//     Array.isArray(questions) &&
//     questions.length > 0 &&
//     activeQuestionIndex >= 0 &&
//     activeQuestionIndex < questions.length;

//   return (
//     <div className="p-6 border rounded-lg my-6">
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-5">
//         {questions.length > 0 ? (
//           questions.map((question, index) => (
//             <h2
//               key={index}
//               className={`p-3 rounded-full text-xs md:text-sm text-center cursor-pointer ${
//                 activeQuestionIndex === index && 'bg-primary text-white'
//               }`}
//             >
//               Question {index + 1}
//             </h2>
//           ))
//         ) : (
//           <p>No questions available.</p>
//         )}
//       </div>
//       <div>
//         {isValidQuestion ? (
//           <h2 className='my-5 text-md md:text-lg'>{questions[activeQuestionIndex].question}</h2>
//         ) : (
//           <p>Select a valid question to view its details.</p>
//         )}

//         <Volume2 className="hover:cursor-pointer" onClick={()=>textToSpeech(questions[activeQuestionIndex].question)}/>
//         <div className='border rounded-lg p-6 bg-blue-100 mt-20'>
//             <h2 className='flex gap-1 items-center text-primary'>
//             <Lightbulb/><strong>Note:</strong>
//             </h2>
//             <h2 className='text-sm text-primary my-3'>{process.env.NEXT_PUBLIC_NOTE}</h2>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default QuestionsSection;


// "use client";
// import React from "react";
// import { Volume2 } from "lucide-react";

// function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
//   const textToSpeech = (text) => {
//     if ("SpeechSynthesis" in window) {
//       const speech = new SpeechSynthesisUtterance(text);
//       window.speechSynthesis.speak(speech);
//     } else {
//       alert("Sorry, your browser does not support text-to-speech");
//     }
//   };

//   console.log("mockInterviewQuestion: ", mockInterviewQuestion);
//   const questions = Array.isArray(mockInterviewQuestion) ? mockInterviewQuestion : [];
//   console.log("Displaying Questions: ", questions);

//   const isValidQuestion =
//     Array.isArray(questions) &&
//     questions.length > 0 &&
//     activeQuestionIndex >= 0 &&
//     activeQuestionIndex < questions.length;

//   return (
//     <div className="bg-[#37474F] rounded-lg p-6 shadow-lg text-white">
//       {/* Question Navigation */}
//       <div className="flex flex-wrap justify-center gap-2 mb-6">
//         {questions.length > 0 ? (
//           questions.map((_, index) => (
//             <div
//               key={index}
//               className={`px-3 py-1 rounded-md text-sm font-medium text-center cursor-pointer transition-colors duration-200 ${
//                 activeQuestionIndex === index
//                   ? "bg-teal-600 text-white"
//                   : "bg-gray-600 text-gray-200 hover:bg-gray-500"
//               }`}
//             >
//               Q{index + 1}
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-400 text-sm">Questions loading...</p>
//         )}
//       </div>

//       {/* Active Question Display */}
//       <div className="text-center">
//         {isValidQuestion ? (
//           <div>
//             <h2 className="text-lg md:text-xl font-semibold text-white leading-relaxed">
//               {questions[activeQuestionIndex].question}
//             </h2>
//             <div className="mt-4 flex justify-center">
//               <Volume2
//                 className="h-6 w-6 text-teal-400 cursor-pointer hover:text-teal-300"
//                 onClick={() => textToSpeech(questions[activeQuestionIndex]?.question)}
//               />
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-400 text-sm">No question selected yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default QuestionsSection;

"use client";
import React, { useState, useEffect } from "react"; // Add useEffect
import { Volume2 } from "lucide-react";
import Avatar from "@/components/Avatar";

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = "en-US";
      speech.onstart = () => setIsSpeaking(true);
      speech.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text-to-speech");
    }
  };

  // Auto-play TTS when the active question changes
  useEffect(() => {
    if (mockInterviewQuestion && mockInterviewQuestion[activeQuestionIndex]) {
      textToSpeech(mockInterviewQuestion[activeQuestionIndex].question);
    }
  }, [activeQuestionIndex, mockInterviewQuestion]);

  console.log("mockInterviewQuestion: ", mockInterviewQuestion);
  const questions = Array.isArray(mockInterviewQuestion) ? mockInterviewQuestion : [];
  console.log("Displaying Questions: ", questions);

  const isValidQuestion =
    Array.isArray(questions) &&
    questions.length > 0 &&
    activeQuestionIndex >= 0 &&
    activeQuestionIndex < questions.length;

  return (
    <div className="bg-[#37474F] rounded-lg p-6 shadow-lg text-white">
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {questions.length > 0 ? (
          questions.map((_, index) => (
            <div
              key={index}
              className={`px-3 py-1 rounded-md text-sm font-medium text-center cursor-pointer transition-colors duration-200 ${
                activeQuestionIndex === index
                  ? "bg-teal-600 text-white"
                  : "bg-gray-600 text-gray-200 hover:bg-gray-500"
              }`}
            >
              Q{index + 1}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">Questions loading...</p>
        )}
      </div>

      <div className="text-center">
        {isValidQuestion ? (
          <div>
            <Avatar isSpeaking={isSpeaking} />
            <h2 className="text-lg md:text-xl font-semibold text-white leading-relaxed mt-4">
              {questions[activeQuestionIndex].question}
            </h2>
            <div className="mt-4 flex justify-center">
              <Volume2
                className="h-6 w-6 text-teal-400 cursor-pointer hover:text-teal-300"
                onClick={() => textToSpeech(questions[activeQuestionIndex]?.question)}
              />
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No question selected yet.</p>
        )}
      </div>
    </div>
  );
}

export default QuestionsSection;