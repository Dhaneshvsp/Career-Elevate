"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Image from "next/image";
import formatTime from "@/utils/formatTime";
import CategoryBarChart from "./CategoryBarChart";

function UserStats({ userStats }) {
  const { user: clerkUser, isLoaded: clerkIsLoaded } = useUser();
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("[UserStats] useUser updated, clerkIsLoaded:", clerkIsLoaded, "clerkUser:", clerkUser);
    setIsLoaded(clerkIsLoaded);
    setUser(clerkUser);
  }, [clerkIsLoaded, clerkUser]);

  // Log renders to debug infinite loop
  useEffect(() => {
    console.log("[UserStats] Rendered with userStats:", userStats);
  });

  if (!isLoaded) {
    console.log("[UserStats] Not loaded, showing Loader");
    return <Loader />;
  }

  if (!userStats?.categoryStats?.length) {
    console.log("[UserStats] No stats available");
    return <p className="text-center text-gray-500">No stats available.</p>;
  }

  const validCategoryStats = userStats.categoryStats.filter(
    (stat) => stat.category !== null
  );

  const totalAttempts = validCategoryStats.reduce(
    (acc, curr) => acc + (curr.category.stats?.attempts || 0),
    0
  );
  const totalCompleted = validCategoryStats.reduce(
    (acc, curr) => acc + (curr.category.stats?.completed || 0),
    0
  );

  const latestStats = validCategoryStats
    .sort((a, b) => new Date(b.category.stats?.lastAttempt || 0) - new Date(a.category.stats?.lastAttempt || 0))
    .slice(0, 2);

  return (
    <div className="flex flex-col gap-4">
      <div className="h-[15rem] px-8 flex items-center justify-center border-2 rounded-xl shadow-md">
        <Image
          src={user?.imageUrl || "/user.png"}
          alt="Profile Image"
          width={200}
          height={200}
          className="rounded-full border-2 shadow-md"
        />
      </div>

      <div className="mt-4">
        <h1 className="font-bold text-2xl">Overview</h1>
        <p className="text-gray-500">A summary of your recent activity and performance</p>
      </div>

      <div className="grid grid-cols-3 gap-6 font-semibold">
        <div className="p-4 border rounded-lg shadow-md">
          <p className="text-lg">Total Attempts</p>
          <h2 className="text-2xl font-bold">{totalAttempts}</h2>
        </div>
        <div className="p-4 border rounded-lg shadow-md">
          <p className="text-lg">Total Completed</p>
          <h2 className="text-2xl font-bold">{totalCompleted}</h2>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-6">
        {latestStats.length > 0 ? (
          latestStats.map((category) => (
            <CategoryBarChart key={category.id} categoryData={category.category} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-2">
            No recent attempts available.
          </p>
        )}
      </div>

      <div className="mt-4">
        <h1 className="font-bold text-2xl">Detailed Category Stats</h1>
        <p className="text-gray-500">Breakdown of performance by category</p>
      </div>

      <div className="border-2 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-4 px-6 text-left">Category</th>
              <th className="px-6 text-left">Attempts</th>
              <th className="px-6 text-left">Completed</th>
              <th className="px-6 text-left">Average Score</th>
              <th className="px-6 text-left">Last Attempt</th>
            </tr>
          </thead>
          <tbody>
            {validCategoryStats.map((category) => (
              <tr key={category.id} className="border-t">
                <td className="py-4 px-6 font-semibold">
                  {category.category?.name || "Unknown Category"}
                </td>
                <td className="px-6">{category.category.stats?.attempts || 0}</td>
                <td className="px-6">{category.category.stats?.completed || 0}</td>
                <td className="px-6">
                  {category.averageScore !== null
                    ? category.averageScore.toFixed(2)
                    : "N/A"}
                </td>
                <td className="px-6">
                  {category.category.stats?.lastAttempt
                    ? formatTime(category.category.stats.lastAttempt)
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserStats;