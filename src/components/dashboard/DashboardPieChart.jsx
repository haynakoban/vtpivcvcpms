import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// eslint-disable-next-line react/prop-types
function DashboardPieChart({ dashboard }) {
  const maxCases = Math.max(
    ...((dashboard?.illnesses || []).map((d) => Math.max(d.lastWeekCases, d.currentWeekCases))),
    0
  );  

  return (
    <Card className="flex flex-col mt-5">
      <CardHeader className="items-center">
        <CardTitle>{dashboard?.title || ""}</CardTitle>
        <CardDescription>{dashboard?.description || ""}</CardDescription>
      </CardHeader>
      <CardContent className="h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={dashboard?.illnesses || []}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, maxCases + 50]} allowDataOverflow />
            <Tooltip
              formatter={(value, name) => [
                value,
                name === "lastWeekCases"
                  ? "Last Week Cases"
                  : "Current Week Cases",
              ]}
            />
            <Legend
              formatter={(value) =>
                value === "lastWeekCases"
                  ? "Last Week Cases"
                  : "Current Week Cases"
              }
            />
            <Line dataKey="lastWeekCases" stroke="#8884d8" />
            <Line
              dataKey="currentWeekCases"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default DashboardPieChart;
