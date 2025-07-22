// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/quizmodule/actions.js
"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { categories, users, categoryStats } from "@/utils/schema";
import { eq, and } from "drizzle-orm";

// Get or Create User
export async function getOrCreateUser() {
  const { userId, user } = auth();
  if (!userId) return null;

  const existingUser = await db.select().from(users).where(eq(users.email, user.email)).limit(1);
  if (existingUser.length > 0) return existingUser[0];

  const newUser = await db.insert(users).values({
    email: user.email,
    name: user.firstName + " " + user.lastName,
  }).returning();

  return newUser[0];
}

// Fetch all categories
export async function getCategories() {
  try {
    const categoryList = await db.select().from(categories);
    return categoryList;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { error: "There was an error getting categories." };
  }
}

// Fetch user details
export async function getUser() {
  try {
    const authData = await auth();
    const userId = authData?.userId;

    if (!userId) {
      return { error: "Unauthorized" };
    }

    const user = await db.select().from(users).where(eq(users.clerkId, userId));

    if (!user.length) {
      return { error: "User not found" };
    }

    return user[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: "Error getting user" };
  }
}

// Register user
export async function registerUser() {
  try {
    const authData = await auth();
    const userId = authData?.userId;

    if (!userId) {
      console.log("[registerUser] No userId, unauthorized");
      return { error: "Unauthorized" };
    }

    const existingUser = await db.select().from(users).where(eq(users.clerkId, userId));

    if (!existingUser.length) {
      const { user } = authData;
      await db.insert(users).values({
        clerkId: userId,
        email: user?.emailAddresses?.[0]?.emailAddress || "unknown@example.com",
        name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Unknown User",
      });
      console.log("[registerUser] New user registered with clerkId:", userId);
    } else {
      console.log("[registerUser] User already exists with clerkId:", userId);
    }

    return { success: "User registered successfully." };
  } catch (error) {
    console.error("[registerUser] Error registering user:", error);
    return { error: "Error creating user" };
  }
}

// Start a quiz
export async function startQuiz(categoryId) {
  try {
    console.log("[startQuiz] Starting with categoryId:", categoryId);
    console.log("[startQuiz] Type of categoryId:", typeof categoryId);

    const authData = await auth();
    console.log("[startQuiz] Auth data:", authData);
    const clerkId = authData?.userId;
    console.log("[startQuiz] Clerk ID:", clerkId);

    if (!clerkId) {
      console.log("[startQuiz] No clerkId, unauthorized");
      return { error: "Unauthorized" };
    }

    // Ensure clerkId is a string
    const clerkIdStr = String(clerkId);
    console.log("[startQuiz] Clerk ID (string):", clerkIdStr);

    // Debug the query
    console.log("[startQuiz] Querying users with clerkId:", clerkIdStr);
    const user = await db.select().from(users).where(eq(users.clerkId, clerkIdStr));
    console.log("[startQuiz] User query result:", user);

    if (!user.length) {
      console.log("[startQuiz] User not found for clerkId:", clerkIdStr);
      return { error: "User not found" };
    }

    const userId = user[0].id;
    console.log("[startQuiz] Found user with ID:", userId);

    const category = await db.select().from(categories).where(eq(categories.id, categoryId));
    console.log("[startQuiz] Category query result:", category);
    if (!category.length) {
      console.log("[startQuiz] Category not found for categoryId:", categoryId);
      return { error: "Category not found" };
    }

    let stat = await db
      .select()
      .from(categoryStats)
      .where(and(eq(categoryStats.userId, userId), eq(categoryStats.categoryId, categoryId)));
    console.log("[startQuiz] CategoryStats query result:", stat);

    if (!stat.length) {
      console.log("[startQuiz] No stats found, inserting new...");
      const insertData = {
        userId,
        categoryId: parseInt(categoryId), // Ensure categoryId is an integer
        attempts: 1,
        lastAttempt: new Date(),
      };
      console.log("[startQuiz] Inserting data:", insertData);
      await db.insert(categoryStats).values(insertData);
      console.log("[startQuiz] Inserted new categoryStats");
    } else {
      console.log("[startQuiz] Updating stats:", stat[0]);
      const updateData = {
        attempts: stat[0].attempts + 1,
        lastAttempt: new Date(),
      };
      console.log("[startQuiz] Updating with data:", updateData);
      await db
        .update(categoryStats)
        .set(updateData)
        .where(and(eq(categoryStats.userId, userId), eq(categoryStats.categoryId, categoryId)));
      console.log("[startQuiz] Updated categoryStats");
    }

    return { success: "Quiz started successfully." };
  } catch (error) {
    console.error("[startQuiz] Error starting quiz:", error.message);
    console.error("[startQuiz] Error stack:", error.stack);
    return { error: "Error starting quiz" };
  }
}

// Finish a quiz
export async function finishQuiz(categoryId, quizId, score, responses) {
  console.log("[finishQuiz] Function called with:", { categoryId, quizId, score, responses });

  try {
    console.log("[finishQuiz] Step 1: Fetching auth data...");
    const authData = await auth();
    const clerkId = authData?.userId;
    console.log("[finishQuiz] Clerk ID:", clerkId);

    if (!clerkId) {
      console.log("[finishQuiz] No clerkId, unauthorized");
      return { error: "Unauthorized" };
    }

    console.log("[finishQuiz] Step 2: Validating payload...");
    if (!categoryId || !quizId || typeof score !== "number" || !Array.isArray(responses)) {
      console.log("[finishQuiz] Invalid request payload:", { categoryId, quizId, score, responses });
      return { error: "Invalid request payload" };
    }

    console.log("[finishQuiz] Step 3: Querying users with clerkId:", clerkId);
    const user = await db.select().from(users).where(eq(users.clerkId, clerkId));
    console.log("[finishQuiz] User query result:", user);

    if (!user.length) {
      console.log("[finishQuiz] User not found for clerkId:", clerkId);
      return { error: "User not found" };
    }

    const userId = user[0].id;
    console.log("[finishQuiz] Found user with ID:", userId);

    console.log("[finishQuiz] Step 4: Querying categoryStats for userId:", userId, "and categoryId:", categoryId);
    let stat = await db
      .select()
      .from(categoryStats)
      .where(and(eq(categoryStats.userId, userId), eq(categoryStats.categoryId, categoryId)));
    console.log("[finishQuiz] CategoryStats query result:", stat);

    if (stat.length) {
      console.log("[finishQuiz] Step 5: Existing stats found, updating...");
      const prevScore = stat[0].averageScore ?? 0;
      const totalScore = prevScore * stat[0].completed + score;
      const newAverageScore = totalScore / (stat[0].completed + 1);

      console.log("[finishQuiz] Updating categoryStats with:", {
        completed: stat[0].completed + 1,
        attempts: (stat[0].attempts ?? 0) + 1,
        averageScore: newAverageScore,
        lastAttempt: new Date(),
      });
      await db
        .update(categoryStats)
        .set({
          completed: stat[0].completed + 1,
          attempts: (stat[0].attempts ?? 0) + 1,
          averageScore: newAverageScore,
          lastAttempt: new Date(),
        })
        .where(eq(categoryStats.id, stat[0].id));
      console.log("[finishQuiz] Updated categoryStats");
    } else {
      console.log("[finishQuiz] Step 5: No stats found, inserting new...");
      const insertData = {
        userId,
        categoryId,
        attempts: 1,
        completed: 1,
        averageScore: score,
        lastAttempt: new Date(),
      };
      console.log("[finishQuiz] Inserting categoryStats with:", insertData);
      await db.insert(categoryStats).values(insertData);
      console.log("[finishQuiz] Inserted new categoryStats");
    }

    console.log("[finishQuiz] Quiz finished successfully");
    return { success: "Quiz finished successfully." };
  } catch (error) {
    console.error("[finishQuiz] Error finishing quiz:", error.message);
    console.error("[finishQuiz] Error stack:", error.stack);
    return { error: "Error finishing quiz" };
  }
}