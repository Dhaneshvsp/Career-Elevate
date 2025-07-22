"use client";

import dynamic from "next/dynamic";

const UserStats = dynamic(() => import("@/components/UserStats"), { ssr: false });

export default function UserStatsWrapper({ userStats }) {
  return (
    <div className="w-full">
      <UserStats userStats={userStats} />
    </div>
  );
}