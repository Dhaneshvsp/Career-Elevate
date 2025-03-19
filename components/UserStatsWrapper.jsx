"use client";

import dynamic from "next/dynamic";

// Dynamically import UserStats with SSR disabled
const UserStats = dynamic(() => import("@/components/UserStats"), { ssr: false });

export default function UserStatsWrapper({ userStats }) {
  return <UserStats userStats={userStats} />;
}