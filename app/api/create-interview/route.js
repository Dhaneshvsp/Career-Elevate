// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/api/create-interview/route.js
// pages/api/create-interview.js
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { auth } from '@clerk/nextjs/server'; // For Clerk auth
import moment from 'moment';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, emailAddresses } = auth();
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const {
    jsonMockResp,
    jobPosition,
    jobDesc,
    jobExperience,
  } = req.body;

  try {
    const resp = await db.insert(MockInterview)
      .values({
        mockId: uuidv4(),
        jsonMockResp: JSON.stringify(jsonMockResp),
        jobPosition,
        jobDesc,
        jobExperience,
        createdBy: emailAddresses[0].emailAddress,
        createdAt: moment().format('DD-MM-yyyy'),
      })
      .returning({ mockId: MockInterview.mockId });

    return res.status(200).json({ mockId: resp[0].mockId });
  } catch (error) {
    console.error('Error inserting interview:', error);
    return res.status(500).json({ error: 'Failed to create interview' });
  }
}