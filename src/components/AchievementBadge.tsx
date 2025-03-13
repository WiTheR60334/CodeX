
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Award, 
  Clock, 
  Bug, 
  Code, 
  Cpu, 
  Flame, 
  BookOpen, 
  Coffee,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export type AchievementType = 
  | 'first100'
  | 'fastestCoder'
  | 'bestDebugger'
  | 'streakMaster'
  | 'problemSolver'
  | 'algorithmMaster'
  | 'consistentLearner'
  | 'challengeAcceptor'
  | 'codingGuru'
  | 'top10';

type BadgeConfig = {
  icon: React.ReactNode;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
};

const badgeConfigs: Record<AchievementType, BadgeConfig> = {
  first100: {
    icon: <Award className="h-5 w-5" />,
    label: "First 100",
    description: "Solved first 100 problems",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200"
  },
  fastestCoder: {
    icon: <Clock className="h-5 w-5" />,
    label: "Fastest Coder",
    description: "Consistently submits solutions faster than 95% of users",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  bestDebugger: {
    icon: <Bug className="h-5 w-5" />,
    label: "Best Debugger",
    description: "Fixed 50+ issues with minimal attempts",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  streakMaster: {
    icon: <Flame className="h-5 w-5" />,
    label: "Streak Master",
    description: "Maintained a 30-day coding streak",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200"
  },
  problemSolver: {
    icon: <Zap className="h-5 w-5" />,
    label: "Problem Solver",
    description: "Tackled problems across all difficulty levels",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  algorithmMaster: {
    icon: <Cpu className="h-5 w-5" />,
    label: "Algorithm Master",
    description: "Mastered all classic algorithms",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200"
  },
  consistentLearner: {
    icon: <BookOpen className="h-5 w-5" />,
    label: "Consistent Learner",
    description: "Completed 10+ tutorials and courses",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200"
  },
  challengeAcceptor: {
    icon: <Coffee className="h-5 w-5" />,
    label: "Challenge Acceptor",
    description: "Participated in 5+ coding contests",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200"
  },
  codingGuru: {
    icon: <Code className="h-5 w-5" />,
    label: "Coding Guru",
    description: "Top-rated solutions in multiple categories",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200"
  },
  top10: {
    icon: <Star className="h-5 w-5" />,
    label: "Top 10",
    description: "Ranked in the top 10 global leaderboard",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200"
  }
};

interface AchievementBadgeProps {
  type: AchievementType;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  className?: string;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ 
  type, 
  size = 'md',
  animate = true,
  className
}) => {
  const config = badgeConfigs[type];
  
  const sizeClasses = {
    sm: "h-6 w-6 text-xs",
    md: "h-8 w-8 text-sm",
    lg: "h-10 w-10 text-base"
  };
  
  const badge = (
    <motion.div
      whileHover={animate ? { scale: 1.1 } : undefined}
      whileTap={animate ? { scale: 0.95 } : undefined}
      className={cn(
        "flex items-center justify-center rounded-full",
        config.bgColor,
        config.color,
        "border",
        config.borderColor,
        sizeClasses[size],
        "shadow-sm",
        className
      )}
    >
      {config.icon}
    </motion.div>
  );
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent side="top" className="flex flex-col gap-1">
          <p className="font-medium">{config.label}</p>
          <p className="text-xs text-muted-foreground">{config.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default AchievementBadge;