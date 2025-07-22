// filepath: C:/Users/DELL/Desktop/web_project/career_elevate/app/quizmodule/stats/page.jsx


import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { users, categoryStats, categories } from "@/utils/schema";
import { eq } from "drizzle-orm";
import UserStatsWrapper from "@/components/UserStatsWrapper";

export default async function StatsPage() {
  try {
    console.log("[StatsPage] Starting server-side rendering");

    console.log("[StatsPage] Fetching auth data");
    const authData = await auth();
    const userId = authData?.userId;

    if (!userId) {
      console.log("[StatsPage] No userId found, user not logged in");
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
            <p className="text-lg sm:text-xl text-red-500 font-semibold">
              You need to be logged in to view this page
            </p>
          </div>
        </div>
      );
    }

    console.log("[StatsPage] UserId:", userId);

    console.log("[StatsPage] Fetching user data from database");
    const userData = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        clerkId: users.clerkId,
      })
      .from(users)
      .where(eq(users.clerkId, userId));

    if (!userData || userData.length === 0) {
      console.log("[StatsPage] User not found in database");
      return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center">
            <p className="text-lg sm:text-xl text-red-500 font-semibold">User not found</p>
          </div>
        </div>
      );
    }

    const user = userData[0];
    console.log("[StatsPage] User data:", JSON.stringify(user, null, 2));

    console.log("[StatsPage] Fetching category stats");
    const stats = await db
      .select({
        id: categoryStats.id,
        attempts: categoryStats.attempts,
        averageScore: categoryStats.averageScore,
        categoryId: categoryStats.categoryId,
        completed: categoryStats.completed,
        lastAttempt: categoryStats.lastAttempt,
        userId: categoryStats.userId,
        category: {
          id: categories.id,
          name: categories.name,
          description: categories.description,
          image: categories.image,
        },
      })
      .from(categoryStats)
      .leftJoin(categories, eq(categoryStats.categoryId, categories.id))
      .where(eq(categoryStats.userId, user.id));

    console.log("[StatsPage] Category stats:", JSON.stringify(stats, null, 2));

    const userStats = {
      ...user,
      categoryStats: stats.map((stat) => ({
        ...stat,
        category: {
          ...stat.category,
          stats: {
            attempts: stat.attempts,
            completed: stat.completed,
            lastAttempt: stat.lastAttempt,
          },
        },
      })),
    };

    console.log("[StatsPage] Passing userStats to UserStatsWrapper:", JSON.stringify(userStats, null, 2));

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 text-center sm:text-left">
            User Statistics
          </h1>
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <UserStatsWrapper userStats={userStats} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("[StatsPage] Server-side error:", error);
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-500">Error Loading Statistics</h1>
          <p className="text-lg sm:text-xl text-gray-600">
            An error occurred while loading your statistics. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}