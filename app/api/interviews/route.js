// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/api/interviews/route.js
import { db } from "@/utils/db"; // Import Drizzle ORM instance
import { MockInterview } from "@/utils/schema"; // Import schema
import { eq, desc } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server"; // Correct way to get user in server route

export async function GET() {
    const user = await currentUser(); // Get logged-in user
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const interviews = await db
            .select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, user.emailAddresses[0]?.emailAddress)) // Use email to match records
            .orderBy(desc(MockInterview.id));

        return Response.json(interviews);
    } catch (error) {
        console.error("Error fetching interviews:", error);
        return Response.json({ error: "Server Error" }, { status: 500 });
    }
}
