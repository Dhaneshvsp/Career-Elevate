"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

// Dynamically import the ChartResponsive component with SSR disabled
const ChartResponsive = dynamic(() => import("./chart-responsive"), { ssr: false });

const THEMES = { light: "", dark: ".dark" };

const ChartContext = React.createContext(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

const ChartContainer = React.forwardRef(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn("flex aspect-video justify-center text-xs", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <ChartResponsive>{children}</ChartResponsive>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "ChartContainer";

const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config || {}).filter(([, cfg]) => cfg?.theme || cfg?.color);
  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, cfg]) => {
    const color = cfg.theme?.[theme] || cfg.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join("\n")}
}`
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef(({ active, payload, className, hideLabel = false, color }, ref) => {
  const { config } = useChart();
  if (!active || !payload?.length) return null;

  return (
    <div ref={ref} className={cn("grid min-w-[8rem] p-2.5 text-xs shadow-xl", className)}>
      {payload.map((item) => (
        <div key={item.dataKey} className="flex items-center gap-2">
          <div
            className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
            style={{ backgroundColor: color || item.payload.fill || item.color }}
          />
          <span className="text-muted-foreground">{item.name}</span>
          <span className="font-mono font-medium">{item.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
});
ChartTooltipContent.displayName = "ChartTooltipContent";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef(({ className, payload }, ref) => {
  const { config } = useChart();
  if (!payload?.length) return null;

  return (
    <div ref={ref} className={cn("flex items-center gap-4", className)}>
      {payload.map((item) => (
        <div key={item.value} className="flex items-center gap-1.5">
          <div className="h-2 w-2 shrink-0 rounded-[2px]" style={{ backgroundColor: item.color }} />
          {item.value}
        </div>
      ))}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegendContent";

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, ChartStyle };