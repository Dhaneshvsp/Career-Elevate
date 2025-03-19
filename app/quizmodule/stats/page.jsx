import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { users, categoryStats, categories } from "@/utils/schema";
import { eq } from "drizzle-orm";
import UserStatsWrapper from "@/components/UserStatsWrapper";

export default async function StatsPage() {
  try {
    console.log("[StatsPage] Starting server-side rendering");

    // Authenticate the user
    console.log("[StatsPage] Fetching auth data");
    const authData = await auth();
    const userId = authData?.userId;

    if (!userId) {
      console.log("[StatsPage] No userId found, user not logged in");
      return <p className="text-center text-red-500">You need to be logged in to view this page</p>;
    }

    console.log("[StatsPage] UserId:", userId);

    // Fetch user data
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
      return <p className="text-center text-red-500">User not found</p>;
    }

    const user = userData[0];
    console.log("[StatsPage] User data:", JSON.stringify(user, null, 2));

    // Fetch category stats separately
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
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">User Statistics</h1>
        <UserStatsWrapper userStats={userStats} />
      </div>
    );
  } catch (error) {
    console.error("[StatsPage] Server-side error:", error);
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Error Loading Statistics</h1>
        <p className="text-center text-red-500">An error occurred while loading your statistics. Please try again later.</p>
      </div>
    );
  }
}