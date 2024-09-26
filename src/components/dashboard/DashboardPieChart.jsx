import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { returnPetPie } from "@/lib/functions";

// eslint-disable-next-line react/prop-types
function DashboardPieChart({ pets }) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pet Popularity by Species</CardTitle>
        <CardDescription>A breakdown of pet ownership by species, showing the percentage of each type.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={(returnPetPie(pets))?.chartConfig}
          className="mx-auto aspect-square max-h-[400px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={(returnPetPie(pets))?.petData} dataKey="pets" nameKey="species">
              <LabelList
                dataKey="species"
                nameKey="species"
                className="fill-background"
                position={`${pets.length > 0 ? '' : 'center'}`} 
                stroke="none"
                fontSize={12}
                formatter={(value) => value}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default DashboardPieChart;