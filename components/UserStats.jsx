"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Image from "next/image";
import formatTime from "@/utils/formatTime";
import CategoryBarChart from "./CategoryBarChart";
import { motion } from "framer-motion";

function UserStats({ userStats }) {
  const { user: clerkUser, isLoaded: clerkIsLoaded } = useUser();
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("[UserStats] useUser updated, clerkIsLoaded:", clerkIsLoaded, "clerkUser:", clerkUser);
    setIsLoaded(clerkIsLoaded);
    setUser(clerkUser);
  }, [clerkIsLoaded, clerkUser]);

  useEffect(() => {
    console.log("[UserStats] Rendered with userStats:", userStats);
  });

  if (!isLoaded) {
    console.log("[UserStats] Not loaded, showing Loader");
    return <Loader />;
  }

  if (!userStats?.categoryStats?.length) {
    console.log("[UserStats] No stats available");
    return (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center text-gray-600 text-lg sm:text-xl py-12"
      >
        No stats available.
      </motion.p>
    );
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col items-center p-6 bg-white border-2 rounded-xl shadow-lg">
        <Image
          src={user?.imageUrl || "/user.png"}
          alt="Profile Image"
          width={120}
          height={120}
          className="rounded-full border-2 shadow-md mb-4 sm:w-32 sm:h-32"
        />
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          {user?.fullName || "User"}
        </h2>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Overview</h1>
        <p className="text-sm sm:text-base text-gray-500">A summary of your recent activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-white border-2 rounded-lg shadow-md"
        >
          <p className="text-sm sm:text-lg text-gray-600">Total Attempts</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-500">{totalAttempts}</h2>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-4 bg-white border-2 rounded-lg shadow-md"
        >
          <p className="text-sm sm:text-lg text-gray-600">Total Completed</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-green-500">{totalCompleted}</h2>
        </motion.div>
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Recent Activity</h1>
        <p className="text-sm sm:text-base text-gray-500">Your latest category stats</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {latestStats.length > 0 ? (
          latestStats.map((category) => (
            <CategoryBarChart key={category.id} categoryData={category.category} />
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg sm:text-xl col-span-2">
            No recent attempts available.
          </p>
        )}
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Detailed Stats</h1>
        <p className="text-sm sm:text-base text-gray-500">Performance breakdown by category</p>
      </div>

      <div className="bg-white border-2 rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 sm:px-6 text-left font-semibold text-gray-700">Category</th>
              <th className="py-3 px-4 sm:px-6 text-left font-semibold text-gray-700">Attempts</th>
              <th className="py-3 px-4 sm:px-6 text-left font-semibold text-gray-700">Completed</th>
              <th className="py-3 px-4 sm:px-6 text-left font-semibold text-gray-700">Avg Score</th>
              <th className="py-3 px-4 sm:px-6 text-left font-semibold text-gray-700">Last Attempt</th>
            </tr>
          </thead>
          <tbody>
            {validCategoryStats.map((category) => (
              <motion.tr
                key={category.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 sm:px-6 font-semibold text-gray-800">
                  {category.category?.name || "Unknown Category"}
                </td>
                <td className="py-3 px-4 sm:px-6 text-gray-600">
                  {category.category.stats?.attempts || 0}
                </td>
                <td className="py-3 px-4 sm:px-6 text-gray-600">
                  {category.category.stats?.completed || 0}
                </td>
                <td className="py-3 px-4 sm:px-6 text-gray-600">
                  {category.averageScore !== null
                    ? category.averageScore.toFixed(2)
                    : "N/A"}
                </td>
                <td className="py-3 px-4 sm:px-6 text-gray-600">
                  {category.category.stats?.lastAttempt
                    ? formatTime(category.category.stats.lastAttempt)
                    : "N/A"}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default UserStats;