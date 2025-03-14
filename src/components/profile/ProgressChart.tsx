
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const data = [
  { day: "Mon", problems: 4 },
  { day: "Tue", problems: 7 },
  { day: "Wed", problems: 5 },
  { day: "Thu", problems: 8 },
  { day: "Fri", problems: 12 },
  { day: "Sat", problems: 15 },
  { day: "Sun", problems: 9 },
  { day: "Mon", problems: 11 },
  { day: "Tue", problems: 13 },
  { day: "Wed", problems: 10 },
  { day: "Thu", problems: 14 },
  { day: "Fri", problems: 16 },
  { day: "Sat", problems: 18 },
  { day: "Sun", problems: 12 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-md px-4 py-2 shadow-sm">
        <p className="font-medium">{`${label}`}</p>
        <p className="text-sm text-muted-foreground">{`Problems: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export const ProgressChart = () => {
  return (
    <Card className="col-span-1 md:col-span-2 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base">Your Progress</CardTitle>
          <CardDescription>Problems solved over the last 14 days</CardDescription>
        </div>
        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-secondary text-xs font-medium">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>+27% vs prior period</span>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pl-0">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorProblems" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="problems" 
                stroke="#000000" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorProblems)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
