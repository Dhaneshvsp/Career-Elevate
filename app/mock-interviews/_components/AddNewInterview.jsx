// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/mock-interviews/_components/AddNewInterview.jsx
"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  generationConfig: {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  },
});

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

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const prompt = `Generate ${numQuestions} interview questions and answers in JSON format based on the following details:
- Job Position: ${jobPosition}
- Technology Stack: ${jobDesc}
- Years of Experience: ${jobExperience}
- Difficulty Level: ${difficultyLevel} (easy, medium, or hard)

Return a JSON array where each element is an object containing:
- 'question': a relevant interview question
- 'answer': a detailed and accurate answer

Ensure questions match the specified difficulty level and are relevant to the job position and technology stack.`;

    try {
      const chat = model.startChat();
      const result = await chat.sendMessage(prompt);
      const raw = await result.response.text();

      const cleaned = raw.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      setJsonMockResponse(parsed);

      const response = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp: JSON.stringify(parsed),
        jobPosition,
        jobDesc,
        jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy'),
      }).returning({ mockId: MockInterview.mockId });

      setOpenDialog(false);
      router.push('/mock-interviews/interview/' + response[0]?.mockId);
    } catch (err) {
      console.error("Mock Interview Generation Failed:", err.message);
      alert("Failed to generate mock interview. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div
        className='p-3 border rounded-full text-center bg-gray-700 text-white hover:scale-110 hover:shadow-md hover:cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}
      >
        <h2 className='text-lg'>+ Start New Interview</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Tell us more about your Job interviewing</DialogTitle>
            <DialogDescription asChild>
              <form onSubmit={onSubmit}>
                <div className='my-1'>
                  Add Details about job position, Your Skills and Years of Experience
                </div>
                <div className="mt-7 my-3">
                  <label>Job role</label>
                  <Input
                    placeholder="Ex. Full Stack Developer"
                    required
                    onChange={(e) => setJobPosition(e.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label>Technology Stack</label>
                  <Textarea
                    placeholder="Ex. React, Angular, NodeJS, MySQL etc"
                    required
                    onChange={(e) => setJobDesc(e.target.value)}
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
                    onChange={(e) => setJobExperience(e.target.value)}
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
                        <LoaderCircle className="animate-spin mr-2" />
                        Generating
                      </>
                    ) : (
                      'Start Interview'
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;

