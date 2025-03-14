
import { 
  Zap, 
  Award, 
  Clock, 
  BarChart2, 
  ArrowUpRight,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatisticsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

const StatisticsCard = ({ 
  title, 
  value, 
  description, 
  icon,
  trend,
  trendValue 
}: StatisticsCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <CardDescription className="flex items-center gap-1 mt-1 text-xs">
          {trend && (
            <span className={`flex items-center gap-0.5 ${
              trend === "up" ? "text-green-500" : 
              trend === "down" ? "text-red-500" : "text-muted-foreground"
            }`}>
              {trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : 
               trend === "down" ? <TrendingUp className="h-3 w-3 rotate-180" /> : null}
              {trendValue}
            </span>
          )}
          <span>{description}</span>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export const StatisticsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
      <StatisticsCard
        title="Problems Solved"
        value={164}
        description="from 400+ problems"
        icon={<Award className="h-4 w-4" />}
        trend="up"
        trendValue="12 this week"
      />
      <StatisticsCard
        title="Accuracy Rate"
        value="87%"
        description="first-try success"
        icon={<BarChart2 className="h-4 w-4" />}
        trend="up"
        trendValue="3% increase"
      />
      <StatisticsCard
        title="Fastest Solution"
        value="00:46"
        description="on Easy problems"
        icon={<Clock className="h-4 w-4" />}
      />
      <StatisticsCard
        title="Current Streak"
        value="14 days"
        description="keep it going!"
        icon={<Zap className="h-4 w-4" />}
        trend="up"
        trendValue="Best: 30 days"
      />
    </div>
  );
};
