"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", in: 186, out: 80 },
  { month: "February", in: 305, out: 200 },
  { month: "March", in: 237, out: 120 },
  { month: "April", in: 73, out: 190 },
  { month: "May", in: 209, out: 130 },
  { month: "June", in: 214, out: 140 },
];

const chartConfig = {
  in: {
    label: "In",
    color: "#FFC23D",
  },
  out: {
    label: "Out",
    color: "#FFDEA5",
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] border border-[#DADADA] rounded-lg w-full"
    >
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="in" fill="var(--color-in)" radius={4} />
        <Bar dataKey="out" fill="var(--color-out)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
