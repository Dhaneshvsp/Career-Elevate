// "use client";

// import React, { useEffect } from "react";
// import { Bar, BarChart, Rectangle, XAxis } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import formatTime from "@/utils/formatTime";

// function CategoryBarChart({ categoryData }) {
//   // Log renders to debug infinite loop
//   useEffect(() => {
//     console.log("[CategoryBarChart] Rendered with categoryData:", categoryData);
//   });

//   const chartData = [
//     { key: "attempts", value: categoryData.stats?.attempts || 0, fill: "var(--blue-400)" },
//     { key: "completed", value: categoryData.stats?.completed || 0, fill: "var(--green-400)" },
//   ];

//   const chartConfig = {
//     attempts: { label: "Attempts", color: "hsl(var(--chart-1))" },
//     completed: { label: "Completed", color: "hsl(var(--chart-2))" },
//   };

//   return (
//     <Card className="border-2 shadow-[0_.3rem_0_0_rgba(0,0,0,0.1)]">
//       <CardHeader>
//         <CardTitle>{categoryData.name}</CardTitle>
//         <CardDescription>Attempts vs Completions</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <BarChart accessibilityLayer data={chartData}>
//             <XAxis
//               dataKey="key"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) => chartConfig[value]?.label}
//             />
//             <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
//             <Bar
//               dataKey="value"
//               strokeWidth={2}
//               radius={8}
//               activeBar={({ ...props }) => (
//                 <Rectangle
//                   {...props}
//                   fillOpacity={0.8}
//                   stroke={props.payload.fill}
//                   strokeDasharray={4}
//                   strokeDashoffset={4}
//                 />
//               )}
//             />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-start gap-2 text-sm">
//         <div className="flex gap-2 font-semibold text-muted-foreground">
//           Attempted on {formatTime(categoryData.stats?.lastAttempt)}
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }

// export default CategoryBarChart;
"use client";

import React, { useEffect } from "react";
import { Bar, BarChart, Rectangle, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import formatTime from "@/utils/formatTime";
import { motion } from "framer-motion";

function CategoryBarChart({ categoryData }) {
  useEffect(() => {
    console.log("[CategoryBarChart] Rendered with categoryData:", categoryData);
  });

  const chartData = [
    { key: "attempts", value: categoryData.stats?.attempts || 0, fill: "#60A5FA" },
    { key: "completed", value: categoryData.stats?.completed || 0, fill: "#34D399" },
  ];

  const chartConfig = {
    attempts: { label: "Attempts", color: "hsl(var(--chart-1))" },
    completed: { label: "Completed", color: "hsl(var(--chart-2))" },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="border-2 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg sm:text-xl font-semibold text-gray-800">
            {categoryData.name}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            Attempts vs Completions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <XAxis
                dataKey="key"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => chartConfig[value]?.label}
                className="text-sm"
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar
                dataKey="value"
                strokeWidth={2}
                radius={8}
                activeBar={({ ...props }) => (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                )}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm text-gray-600">
          <div className="font-medium">
            Attempted on {formatTime(categoryData.stats?.lastAttempt)}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default CategoryBarChart;