import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { users } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  try {
    console.log("[SyncUser] API called");

    // Authenticate the user
    const authData = await auth();
    const userId = authData?.userId;

    if (!userId) {
      console.log("[SyncUser] No userId found, user not logged in");
      return new Response(JSON.stringify({ error: "User not authenticated" }), { status: 401 });
    }

    console.log("[SyncUser] UserId (clerkId):", userId);

    // Check if the user exists in the database
    const userData = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        clerkId: users.clerkId,
      })
      .from(users)
      .where(eq(users.clerkId, userId));

    if (userData && userData.length > 0) {
      console.log("[SyncUser] User already exists:", JSON.stringify(userData[0], null, 2));
      return new Response(JSON.stringify({ success: "User already exists", user: userData[0] }), { status: 200 });
    }

    // Create a new user in the database
    console.log("[SyncUser] User not found, creating new user");
    const clerkUser = authData.user;
    const email = clerkUser?.emailAddresses?.[0]?.emailAddress || "unknown@example.com";
    const name = clerkUser?.firstName || clerkUser?.lastName 
      ? `${clerkUser?.firstName || ""} ${clerkUser?.lastName || ""}`.trim()
      : "Unknown User";

    const newUser = await db
      .insert(users)
      .values({
        email,
        name,
        clerkId: userId,
      })
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        clerkId: users.clerkId,
      });

    console.log("[SyncUser] New user created:", JSON.stringify(newUser, null, 2));
    return new Response(JSON.stringify({ success: "User created", user: newUser[0] }), { status: 201 });
  } catch (error) {
    console.error("[SyncUser] Error:", error);
    return new Response(JSON.stringify({ error: "Error syncing user" }), { status: 500 });
  }
}