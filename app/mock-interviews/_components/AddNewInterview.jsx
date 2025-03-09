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
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
import { useRouter } from 'next/navigation';
import { BorderBeam } from '@/components/magicui/border-beam'; // Adjust the import path as necessary

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState();
  const [jobDesc, setJobDesc] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonMockResponse, setJsonMockResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt = "Job position: " + jobPosition + ", Job Description: " + jobDesc + ", Years of Experience: " + jobExperience + " and now based on the given information generate " + process.env.NEXT_PUBLIC_INTERVIEW_QUESTIONS_COUNT + " interview questions with answers in JSON format. Return the result as a JSON array where each element is a JSON object containing a 'question' and an 'answer' key.";
    const res = await chatSession.sendMessage(InputPrompt);
    const MockJsonRes = (res.response.text()).replace(/```json/g, '').replace(/```/g, '');
    console.log("In ADD new interview : ",JSON.parse(MockJsonRes));
    setJsonMockResponse(MockJsonRes);

    if (MockJsonRes) {
      const resp = await db.insert(MockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonRes,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD-MM-yyyy')
        }).returning({ mockId: MockInterview.mockId });

      console.log("Inserted Id:", resp);
      if (resp) {
        setOpenDialog(false);
        router.push('/mock-interviews/interview/' + resp[0]?.mockId);
      }
    } else {
      console.log("ERROR");
    }
    setLoading(false);
  };

  return (
    <div className="relative"> {/* Add relative positioning here */}
      <div className='p-3 border rounded-full text-center bg-gray-700 text-white hover:scale-110 hover:shadow-md hover:cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}>
        <h2 className='text-lg '>+ Start New Interview</h2>
        </div>
      {/* <BorderBeam
        className="rounded-full"
        size={500}
        colorFrom="#ffaa40"
        colorTo="#9c40ff"
        duration={1}
      />  */}
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
                    <label>Job Description</label>
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
                      min="1"
                      max="100"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
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