import { Lightbulb, Volume2 } from 'lucide-react';

import React from 'react';

function QuestionsSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const textToSpeech=(text)=>{
    if('SpeechSynthesis' in window){
      const speech=new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    }
    else{
      alert('Sorry, Your browser does not supporttext to speech')
    }

  }
  console.log("mockInterviewQuestion: ",mockInterviewQuestion);
  const questions = Array.isArray(mockInterviewQuestion) ? mockInterviewQuestion : [];
  console.log("Displaying Questions: ",questions);
  

  // Validate activeQuestionIndex
  const isValidQuestion =
    Array.isArray(questions) &&
    questions.length > 0 &&
    activeQuestionIndex >= 0 &&
    activeQuestionIndex < questions.length;

  return (
    <div className="p-6 border rounded-lg my-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-5">
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <h2
              key={index}
              className={`p-3 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                activeQuestionIndex === index && 'bg-primary text-white'
              }`}
            >
              Question {index + 1}
            </h2>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </div>
      <div>
        {isValidQuestion ? (
          <h2 className='my-5 text-md md:text-lg'>{questions[activeQuestionIndex].question}</h2>
        ) : (
          <p>Select a valid question to view its details.</p>
        )}

        <Volume2 className="hover:cursor-pointer" onClick={()=>textToSpeech(questions[activeQuestionIndex].question)}/>
        <div className='border rounded-lg p-6 bg-blue-100 mt-20'>
            <h2 className='flex gap-1 items-center text-primary'>
            <Lightbulb/><strong>Note:</strong>
            </h2>
            <h2 className='text-sm text-primary my-3'>{process.env.NEXT_PUBLIC_NOTE}</h2>
        </div>
      </div>
    </div>
  );
}

export default QuestionsSection;
