
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Award, Bug, Clock, Code, FileCode, Medal, Star, Trophy, Zap } from "lucide-react";

interface BadgeProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  date: string;
  unlocked: boolean;
}

const Badge = ({ icon, name, description, date, unlocked }: BadgeProps) => {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              unlocked ? "" : "grayscale opacity-50"
            }`}
          >
            <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-secondary flex items-center justify-center border-[3px] border-transparent dark:hover:border-white hover:border-black">
              {icon}
            </div>
            {!unlocked && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-full rounded-full bg-black/5 backdrop-blur-[1px] flex items-center justify-center">
                  <div className="h-5 w-5 rounded-full bg-secondary flex items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="12" 
                      height="12" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M18 11h-9v9" />
                      <path d="M9 5v4" />
                      <path d="M14 5h5v5" />
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-64">
          <div className="space-y-1 p-1">
            <p className="font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
            {unlocked && (
              <p className="text-xs text-muted-foreground">Earned on {date}</p>
            )}
            {!unlocked && (
              <p className="text-xs text-muted-foreground">Keep coding to unlock!</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const AchievementBadges = () => {
  return (
    <Card className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
      <CardHeader>
        <CardTitle className="text-base">Achievements & Badges</CardTitle>
        <CardDescription>Unlock more by completing challenges</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 justify-items-center">
          <Badge
            icon={<Trophy className="h-8 w-8" />}
            name="First 100 Problems"
            description="Successfully solved 100 coding problems"
            date="June 15, 2023"
            unlocked={true}
          />
          <Badge
            icon={<Star className="h-8 w-8" />}
            name="Perfect Score"
            description="Achieved 100% on a Hard difficulty problem"
            date="July 3, 2023"
            unlocked={true}
          />
          <Badge
            icon={<Medal className="h-8 w-8" />}
            name="Contest Winner"
            description="Placed 1st in a weekly coding contest"
            date="August 12, 2023"
            unlocked={true}
          />
          <Badge
            icon={<Zap className="h-8 w-8" />}
            name="Speed Demon"
            description="Solved a medium problem in under 5 minutes"
            date="May 22, 2023"
            unlocked={true}
          />
          <Badge
            icon={<Bug className="h-8 w-8" />}
            name="Master Debugger"
            description="Fixed 50 bugs in your code"
            date="September 8, 2023"
            unlocked={true}
          />
          <Badge
            icon={<Code className="h-8 w-8" />}
            name="Code Maestro"
            description="Created an optimized solution with O(n) complexity"
            date="October 1, 2023"
            unlocked={true}
          />
          <Badge
            icon={<Clock className="h-8 w-8" />}
            name="30-Day Streak"
            description="Coded for 30 consecutive days"
            date=""
            unlocked={false}
          />
          <Badge
            icon={<FileCode className="h-8 w-8" />}
            name="Algorithm Expert"
            description="Mastered all algorithm types"
            date=""
            unlocked={false}
          />
          <Badge
            icon={<Award className="h-8 w-8" />}
            name="Top Contributor"
            description="Provided 100 helpful comments"
            date=""
            unlocked={false}
          />
        </div>
      </CardContent>
    </Card>
  );
};
