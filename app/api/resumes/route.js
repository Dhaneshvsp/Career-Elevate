// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/api/resumes/route.js
// import { NextResponse } from 'next/server';
// import { db } from '@/utils/db';
// import { Resumes } from '@/utils/schema';

// export async function POST(req) {
//     try {
//         const { name, email, phone, summary, skills, education, experience } = await req.json();
//         await db.insert(resumes).values({
//             name,
//             email,
//             phone,
//             summary,
//             skills,
//             education,
//             experience,
//         });
//         return NextResponse.json({ message: 'Resume created successfully' }, { status: 201 });
//     } catch (error) {
//         return NextResponse.json({ error: 'Error creating resume' }, { status: 500 });
//     }
// }

// export async function GET() {
//     try {
//         const allResumes = await db.select().from(Resumes);
//         return NextResponse.json(allResumes, { status: 200 });
//     } catch (error) {
//         return NextResponse.json({ error: 'Error fetching resumes' }, { status: 500 });
//     }
// }

import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { Resumes } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    const resumeData = await req.json(); // Expect full resumeData object
    const { email } = resumeData.personalInfo || {};

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if resume exists for this email
    const existingResume = await db
      .select()
      .from(Resumes)
      .where(eq(Resumes.email, email))
      .limit(1);

    if (existingResume.length > 0) {
      // Update existing resume
      await db
        .update(Resumes)
        .set({ data: resumeData, lastSaved: new Date() })
        .where(eq(Resumes.email, email));
      return NextResponse.json({ message: "Resume updated successfully" }, { status: 200 });
    } else {
      // Insert new resume
      await db.insert(Resumes).values({
        email,
        data: resumeData,
      });
      return NextResponse.json({ message: "Resume created successfully" }, { status: 201 });
    }
  } catch (error) {
    console.error("Error in POST /api/resumes:", error);
    return NextResponse.json({ error: "Error saving resume" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (email) {
      // Fetch single resume by email
      const resume = await db
        .select()
        .from(Resumes)
        .where(eq(Resumes.email, email))
        .limit(1);

      if (resume.length === 0) {
        return NextResponse.json({ error: "Resume not found" }, { status: 404 });
      }
      return NextResponse.json(resume[0], { status: 200 });
    } else {
      // Fetch all resumes (optional: remove if not needed)
      const allResumes = await db.select().from(Resumes);
      return NextResponse.json(allResumes, { status: 200 });
    }
  } catch (error) {
    console.error("Error in GET /api/resumes:", error);
    return NextResponse.json({ error: "Error fetching resumes" }, { status: 500 });
  }
}