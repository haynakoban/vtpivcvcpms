/* eslint-disable no-unused-vars */
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDashboardStore from "@/store/useDashboardStore";
import { dashboardChartConfig as chartConfig } from "@/lib/functions";

export default function DashboardMainChart({ dashboard }) {
  const { isLoading, dashboards } = useDashboardStore();
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = React.useMemo(() => {
    if (!dashboards.length) return [];

    // Set reference date & calculate start date based on selected range
    const referenceDate = new Date();
    let daysToSubtract = 90;

    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    // Filter data by date range
    const dataInRange = dashboards
      .filter((item) => new Date(item.date) >= startDate)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (dataInRange.length === 0) return [];

    // Aggregate totals for each appointment type
    const appointmentTotals = dataInRange.reduce((acc, entry) => {
      Object.keys(entry).forEach((key) => {
        if (key !== "date" && key !== "id") {
          acc[key] = (acc[key] || 0) + entry[key];
        }
      });
      return acc;
    }, {});

    // Find most and least frequent appointment types
    const sortedAppointments = Object.entries(appointmentTotals).sort(
      (a, b) => b[1] - a[1] // Sort descending by value
    );

    if (sortedAppointments.length === 0) return [];

    const mostFrequentType = sortedAppointments[0][0]; // Highest count
    const leastFrequentType =
      sortedAppointments[sortedAppointments.length - 1][0]; // Lowest count

    // Keep only the date, most frequent, and least frequent appointment types
    return dataInRange.map(({ id, date, ...rest }) => ({
      date,
      [mostFrequentType]: rest[mostFrequentType] || 0,
      [leastFrequentType]: rest[leastFrequentType] || 0,
    }));
  }, [dashboards, timeRange]);
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>{dashboard?.title}</CardTitle>
          <CardDescription>
            {dashboard?.title}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="illnessUrl1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="purple" stopOpacity={0.8} />
                <stop offset="95%" stopColor="purple" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="illnessUrl2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="blue" stopOpacity={0.8} />
                <stop offset="95%" stopColor="blue" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey={Object.keys(filteredData[0] ?? {})[1]}
              type="natural"
              fill="url(#illnessUrl1)"
              stroke="purple"
              stackId="a"
            />
            <Area
              dataKey={Object.keys(filteredData[0] ?? {})[2]}
              type="natural"
              fill="url(#illnessUrl2)"
              stroke="blue"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
