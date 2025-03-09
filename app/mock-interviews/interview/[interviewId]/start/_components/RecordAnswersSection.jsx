"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModal'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'
import { db } from '@/utils/db'

function RecordAnswersSection({mockInterviewQuestion,activeQuestionIndex,interviewData}) {
  const [userAnswer,setUserAnswer]=useState('');
  const {user}=useUser();
  const [loading,setLoading]=useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });
  useEffect(()=>{
    results.map((result)=>(
      setUserAnswer(prevAns=>prevAns+result?.transcript)
    ))
  },[results])

  useEffect(()=>{
    if(!isRecording&&userAnswer.length>10){
      updateUserAnswer();
    }
  },[userAnswer])

  const StartStopRecording=async()=>{
    if(isRecording)
    {
      
      stopSpeechToText();
    }
    else{
      startSpeechToText()
    }
  }
  // const updateUserAnswer=async()=>{
  //   console.log(userAnswer);
  //   setLoading(true);
  //   const questions = Array.isArray(mockInterviewQuestion) ? mockInterviewQuestion : [];

  //   const feedbackPrompt="Question:"+questions[activeQuestionIndex]?.question+
  //     ",User Answer:"+userAnswer+",Depend on question and user answer for give interview question "+
  //     "please give us rating for answer and feedback as area of improvement if any "+
  //     "in just 3 to 5 lines to improve it and also provide some tips for interview preparation based on his response as Personalized Tip field in JSON format with rating field and feedback field";
      
  //     const res=await chatSession.sendMessage(feedbackPrompt);

  //     const mockJsonParse=(res.response.text()).replace(/```json/g, '').replace(/```/g, '');
  //     console.log(mockJsonParse);

  //     const JSONFeedback=JSON.parse(mockJsonParse);

  //     const resp= await db.insert(UserAnswer).values({
  //       mockIdRef:interviewData?.mockId,
  //       question:questions[activeQuestionIndex]?.question,
  //       correctAns:questions[activeQuestionIndex]?.answer,
  //       userAns:userAnswer,
  //       feedback:JSONFeedback?.feedback,
  //       rating:JSONFeedback?.rating,
  //       userEmail:user?.primaryEmailAddress?.emailAddress,
  //       createdAt:moment().format('DD-MM-yyyy')
  //     })

  //     if(resp){
  //       toast('Your answer recorded successfully');
  //       setUserAnswer('');
  //       setResults([]);
  //     }
  //     setResults([]);
  //     setLoading(false);
  // }

  const updateUserAnswer = async () => {
    console.log(userAnswer);
    setLoading(true);
    const questions = Array.isArray(mockInterviewQuestion) ? mockInterviewQuestion : [];
  
    const feedbackPrompt = `Question: ${questions[activeQuestionIndex]?.question},
      User Answer: ${userAnswer},
      Depend on question and user answer, please provide:
      1. A rating for the answer.
      2. Feedback (3 to 5 lines) for improvement.
      3. Some tips for interview preparation.
      Return the response in JSON format with fields: rating, feedback, and personalized_tips.`;
  
    try {
      const res = await chatSession.sendMessage(feedbackPrompt);
      const resText = await res.response.text(); // Get raw response
      console.log("Raw AI Response:", resText);  // Debugging log
  
      // Extract only JSON from the response
      const jsonMatch = resText.match(/\{[\s\S]*\}/); 
  
      if (!jsonMatch) {
        console.error("Error: No valid JSON found in AI response");
        setLoading(false);
        return;
      }
  
      const mockJsonParse = jsonMatch[0];  // Extracted JSON string
      console.log("Extracted JSON:", mockJsonParse);
  
      const JSONFeedback = JSON.parse(mockJsonParse);  // Now safely parse JSON
  
      // Save response in the database
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: questions[activeQuestionIndex]?.question,
        correctAns: questions[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JSONFeedback?.feedback,
        rating: JSONFeedback?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy'),
      });
  
      if (resp) {
        toast("Your answer recorded successfully");
        setUserAnswer("");
        setResults([]);
      }
    } catch (error) {
      console.error("Error processing AI response:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className='flex flex-col items-center justify-center'>
    <div className='flex flex-col justify-center items-center mt-11 rounded-lg p-6 bg-black'>
        <Image src={'/Camera-retro-icon-removebg-preview.png'} width={200} height={600} className='absolute my-11' alt='webcam logo'/>
        <Webcam 
        mirrored={true}
        style={{
            height:'300',
            width:'100%',
            zIndex:10,
        }}/>
    </div>
    <Button disabled={loading} variant="outline" className='mt-5 mb-6'
    onClick={StartStopRecording}>
      {
       isRecording?<h2 className='flex gap-1 text-red-600 animate-pulse items-center'><StopCircle/>Stop Recording</h2> : 'Record Answer'
      }
      </Button>
      {/* <Button onClick={() => console.log(userAnswer)}>Show Answer</Button> */}
      </div>
  )
}

export default RecordAnswersSection