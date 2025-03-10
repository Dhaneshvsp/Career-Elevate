// "use client"

// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { chatSession } from '@/utils/GeminiAIModal';
// import { LoaderCircle } from 'lucide-react';
// import { db } from '@/utils/db';
// import { MockInterview } from '@/utils/schema';
// import { v4 as uuidv4 } from 'uuid';
// import { useUser } from '@clerk/nextjs';
// import moment from 'moment/moment';
// import { useRouter } from 'next/navigation';
// import { BorderBeam } from '@/components/magicui/border-beam'; // Adjust the import path as necessary

// function AddNewInterview() {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [jobPosition, setJobPosition] = useState();
//   const [jobDesc, setJobDesc] = useState();
//   const [jobExperience, setJobExperience] = useState();
//   const [loading, setLoading] = useState(false);
//   const [jsonMockResponse, setJsonMockResponse] = useState([]);
//   const { user } = useUser();
//   const router = useRouter();

//   const onSubmit = async (e) => {
//     setLoading(true);
//     e.preventDefault();
//     console.log(jobPosition, jobDesc, jobExperience);

//     const InputPrompt = "Job position: " + jobPosition + ", Job Description: " + jobDesc + ", Years of Experience: " + jobExperience + " and now based on the given information generate " + process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT + " interview questions with answers in JSON format. Return the result as a JSON array where each element is a JSON object containing a 'question' and an 'answer' key.";
//     const res = await chatSession.sendMessage(InputPrompt);
//     const MockJsonRes = (res.response.text()).replace(/```json/g, '').replace(/```/g, '');
//     console.log("In ADD new interview : ",JSON.parse(MockJsonRes));
//     setJsonMockResponse(MockJsonRes);

//     if (MockJsonRes) {
//       const resp = await db.insert(MockInterview)
//         .values({
//           mockId: uuidv4(),
//           jsonMockResp: MockJsonRes,
//           jobPosition: jobPosition,
//           jobDesc: jobDesc,
//           jobExperience: jobExperience,
//           createdBy: user?.primaryEmailAddress?.emailAddress,
//           createdAt: moment().format('DD-MM-yyyy')
//         }).returning({ mockId: MockInterview.mockId });

//       console.log("Inserted Id:", resp);
//       if (resp) {
//         setOpenDialog(false);
//         router.push('/mock-interviews/interview/' + resp[0]?.mockId);
//       }
//     } else {
//       console.log("ERROR");
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="relative"> {/* Add relative positioning here */}
//       <div className='p-3 border rounded-full text-center bg-gray-700 text-white hover:scale-110 hover:shadow-md hover:cursor-pointer transition-all'
//         onClick={() => setOpenDialog(true)}>
//         <h2 className='text-lg '>+ Start New Interview</h2>
//         </div>
//       {/* <BorderBeam
//         className="rounded-full"
//         size={500}
//         colorFrom="#ffaa40"
//         colorTo="#9c40ff"
//         duration={1}
//       />  */}
//       <Dialog open={openDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle className="text-2xl">Tell us more about your Job interviewing</DialogTitle>
//             <DialogDescription asChild>
//               <div>
//                 <form onSubmit={onSubmit}>
//                   <div className='my-1'>Add Details about job position, Your Skills and Years of Experience</div>
//                   <div className="mt-7 my-3">
//                     <label>Job role</label>
//                     <Input
//                       placeholder="Ex. Full Stack Developer"
//                       required
//                       onChange={(event) => setJobPosition(event.target.value)}
//                     />
//                   </div>
//                   <div className="my-3">
//                     <label>
//                       {/* Job Description */}Technology Stack
//                       </label>
//                     <Textarea
//                       placeholder="Ex. React, Angular, NodeJS, MySQL etc"
//                       required
//                       onChange={(event) => setJobDesc(event.target.value)}
//                     />
//                   </div>
//                   <div className="my-3">
//                     <label>Years of Experience</label>
//                     <Input
//                       type="number"
//                       placeholder="Ex. 5"
//                       min="1"
//                       max="100"
//                       required
//                       onChange={(event) => setJobExperience(event.target.value)}
//                     />
//                   </div>
//                   <div className="flex gap-6 justify-end">
//                     <Button variant="ghost" type="button" onClick={() => setOpenDialog(false)}>
//                       Cancel
//                     </Button>
//                     <Button type="submit" disabled={loading}>
//                       {loading ? (
//                         <>
//                           <LoaderCircle className="animate-spin" />
//                           Generating
//                         </>
//                       ) : (
//                         'Start Interview'
//                       )}
//                     </Button>
//                   </div>
//                 </form>
//               </div>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default AddNewInterview;

"use client"

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
import { useRouter } from 'next/navigation';
import { BorderBeam } from '@/components/magicui/border-beam';

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('medium');
  const [numQuestions, setNumQuestions] = useState('5');
  const [loading, setLoading] = useState(false);
  const [jsonMockResponse, setJsonMockResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  // const onSubmit = async (e) => {
  //   setLoading(true);
  //   e.preventDefault();
  //   console.log(jobPosition, jobDesc, jobExperience, difficultyLevel, numQuestions);

  //   const InputPrompt = `Generate ${numQuestions} interview questions and answers in JSON format based on the following details:
  //   - Job Position: ${jobPosition}
  //   - Technology Stack: ${jobDesc}
  //   - Years of Experience: ${jobExperience}
  //   - Difficulty Level: ${difficultyLevel} (easy, medium, or hard)
    
  //   Return a JSON array where each element is an object containing:
  //   - 'question': a relevant interview question
  //   - 'answer': a detailed and accurate answer
    
  //   Ensure questions match the specified difficulty level and are relevant to the job position and technology stack.`;
    
  //   const res = await chatSession.sendMessage(InputPrompt);
  //   const MockJsonRes = (res.response.text()).replace(/```json/g, '').replace(/```/g, '');
  //   console.log("In ADD new interview : ", JSON.parse(MockJsonRes));
  //   setJsonMockResponse(MockJsonRes);

  //   if (MockJsonRes) {
  //     const resp = await db.insert(MockInterview)
  //       .values({
  //         mockId: uuidv4(),
  //         jsonMockResp: MockJsonRes,
  //         jobPosition: jobPosition,
  //         jobDesc: jobDesc,
  //         jobExperience: jobExperience,
  //         createdBy: user?.primaryEmailAddress?.emailAddress,
  //         createdAt: moment().format('DD-MM-yyyy')
  //       }).returning({ mockId: MockInterview.mockId });

  //     console.log("Inserted Id:", resp);
  //     if (resp) {
  //       setOpenDialog(false);
  //       router.push('/mock-interviews/interview/' + resp[0]?.mockId);
  //     }
  //   } else {
  //     console.log("ERROR");
  //   }
  //   setLoading(false);
  // };
  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience, difficultyLevel, numQuestions);
  
    const InputPrompt = `Generate ${numQuestions} interview questions and answers in JSON format based on the following details:
      - Job Position: ${jobPosition}
      - Technology Stack: ${jobDesc}
      - Years of Experience: ${jobExperience}
      - Difficulty Level: ${difficultyLevel} (easy, medium, or hard)
      
      Return a JSON array where each element is an object containing:
      - 'question': a relevant interview question
      - 'answer': a detailed and accurate answer
      
      Ensure questions match the specified difficulty level and are relevant to the job position and technology stack.`;
      
    try {
      const res = await chatSession.sendMessage(InputPrompt);
      const rawResponse = res.response.text();
      console.log("Raw Response:", rawResponse); // Log the full raw response
  
      // Clean the response
      const cleanedResponse = rawResponse
        .replace(/```json/g, '') // Remove ```json markers
        .replace(/```/g, '')     // Remove closing ```
        .trim();                 // Remove leading/trailing whitespace
  
      console.log("Cleaned Response:", cleanedResponse); // Log the cleaned response
  
      // Debugging: Show the context around the error position (12804)
      const errorPosition = 12804;
      const contextSize = 50; // Characters to show before and after
      const start = Math.max(0, errorPosition - contextSize);
      const end = Math.min(cleanedResponse.length, errorPosition + contextSize);
      console.log("Context around error:", cleanedResponse.slice(start, end));
  
      // Attempt to parse the JSON
      const parsedJson = JSON.parse(cleanedResponse);
      console.log("Parsed JSON:", parsedJson);
      setJsonMockResponse(parsedJson);
  
      // Insert into the database
      const resp = await db.insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: JSON.stringify(parsedJson), // Store as string in DB
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-yyyy'),
        })
        .returning({ mockId: MockInterview.mockId });
  
      console.log("Inserted Id:", resp);
      if (resp) {
        setOpenDialog(false);
        router.push('/mock-interviews/interview/' + resp[0]?.mockId);
      }
    } catch (error) {
      console.error("Error processing response:", error);
      console.log("Error occurred at position:", error.message.match(/position (\d+)/)?.[1]);
      alert("Failed to generate interview questions due to invalid JSON response. Check the console for details.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative">
      <div className='p-3 border rounded-full text-center bg-gray-700 text-white hover:scale-110 hover:shadow-md hover:cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}>
        <h2 className='text-lg '>+ Start New Interview</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about your Job interviewing</DialogTitle>
            <DialogDescription asChild>
              <div>
                <form onSubmit={onSubmit}>
                  <div className='my-1'>Add Details about job position, Your Skills and Years of Experience</div>
                  <div className="mt-7 my-3">
                    <label>Job role</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Technology Stack</label>
                    <Textarea
                      placeholder="Ex. React, Angular, NodeJS, MySQL etc"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Years of Experience</label>
                    <Input
                      type="number"
                      placeholder="Ex. 5"
                      min="0"
                      max="100"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Difficulty Level</label>
                    <Select onValueChange={setDifficultyLevel} defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="my-3">
                    <label>Number of Questions</label>
                    <Select onValueChange={setNumQuestions} defaultValue="5">
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of questions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="7">7</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-6 justify-end">
                    <Button variant="ghost" type="button" onClick={() => setOpenDialog(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <LoaderCircle className="animate-spin" />
                          Generating
                        </>
                      ) : (
                        'Start Interview'
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;