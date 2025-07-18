import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

export async function POST(req) {
  try {
    const body = await req.json();

    const { jobPosition, jobDesc, jobExperience, createdBy, questions } = body;

    const resp = await db.insert(MockInterview)
      .values({
        mockId: uuidv4(),
        jsonMockResp: JSON.stringify(questions),
        jobPosition,
        jobDesc,
        jobExperience,
        createdBy,
        createdAt: moment().format('DD-MM-yyyy'),
      })
      .returning({ mockId: MockInterview.mockId });

    return NextResponse.json({ success: true, mockId: resp[0].mockId });
  } catch (error) {
    console.error("Error in create-interview route:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
