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


import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const textToSpeech = (text) => {
    if ('SpeechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, Your browser does not support text-to-speech');
    }
  };

  console.log('mockInterviewQuestion: ', mockInterviewQuestion);
  const questions = Array.isArray(mockInterviewQuestion) ? mockInterviewQuestion : [];
  console.log('Displaying Questions: ', questions);

  const isValidQuestion =
    Array.isArray(questions) &&
    questions.length > 0 &&
    activeQuestionIndex >= 0 &&
    activeQuestionIndex < questions.length;

  return (
    <div className="p-8 border rounded-lg shadow-lg bg-[#37474F] my-6 max-w-3xl mx-auto text-white">
      {/* Question Navigation */}
      <div className="flex flex-wrap justify-center gap-3">
        {questions.length > 0 ? (
          questions.map((_, index) => (
            <h2
              key={index}
              className={`px-4 py-2 rounded-lg text-sm md:text-base text-center cursor-pointer transition-all duration-200 shadow-md ${
                activeQuestionIndex === index ? 'bg-[#37474F] text-white' : 'bg-gray-700 border text-gray-300 hover:bg-gray-600'
              }`}
            >
              Q{index + 1}
            </h2>
          ))
        ) : (
          <p className="text-gray-300">No questions available.</p>
        )}
      </div>

      {/* Active Question Display */}
      <div className="mt-6 text-center">
        {isValidQuestion ? (
          <h2 className='text-lg md:text-xl font-semibold text-white'>{questions[activeQuestionIndex].question}</h2>
        ) : (
          <p className="text-gray-300">Select a valid question to view its details.</p>
        )}
        <div className="mt-4 flex justify-center">
          <Volume2
            className="h-6 w-6 text-orange-300 cursor-pointer hover:text-gray-400"
            onClick={() => textToSpeech(questions[activeQuestionIndex]?.question)}
          />
        </div>
      </div>

      {/* Note Section */}
      <div className='border rounded-lg p-6 bg-gray-600 mt-10 text-gray-200 shadow-sm'>
        <h2 className='flex items-center gap-2 font-semibold text-white'>
          <Lightbulb className="h-5 w-5 text-yellow-300" />
          Note:
        </h2>
        <p className='text-sm mt-3 text-white]'>{process.env.NEXT_PUBLIC_NOTE}</p>
      </div>
    </div>
  );
}

export default QuestionsSection;
