
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LanguageProps {
  name: string;
  problems: number;
  totalProblems: number;
  color: string;
}

const Language = ({ name, problems, totalProblems, color }: LanguageProps) => {
  const percentage = Math.round((problems / totalProblems) * 100);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="font-medium text-sm">{name}</div>
        <div className="text-xs text-muted-foreground">{problems}/{totalProblems} problems</div>
      </div>
      <Progress value={percentage} className="h-2" indicatorColor={color} />
    </div>
  );
};

export const LanguageProficiency = () => {
  return (
    <Card className="col-span-1 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
      <CardHeader>
        <CardTitle className="text-base">Language Proficiency</CardTitle>
        <CardDescription>Your skills across programming languages</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <Language name="JavaScript" problems={86} totalProblems={120} color="bg-yellow-400" />
        <Language name="Python" problems={72} totalProblems={120} color="bg-blue-500" />
        <Language name="Java" problems={42} totalProblems={120} color="bg-red-500" />
        <Language name="C++" problems={33} totalProblems={120} color="bg-purple-500" />
        <Language name="Go" problems={18} totalProblems={120} color="bg-cyan-400" />
        <Language name="Ruby" problems={7} totalProblems={120} color="bg-red-400" />
      </CardContent>
    </Card>
  );
};
