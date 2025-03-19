"use client";

import { ResponsiveContainer } from "recharts";

export default function ChartResponsive({ children }) {
  return <ResponsiveContainer>{children}</ResponsiveContainer>;
}