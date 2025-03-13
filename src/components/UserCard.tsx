
import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronUp, ChevronDown, Trophy } from 'lucide-react';
import AchievementBadge, { AchievementType } from './AchievementBadge';
import { cn } from '@/lib/utils';

export interface UserData {
  id: string;
  rank: number;
  username: string;
  avatarUrl: string;
  xp: number;
  problemsSolved: number;
  accuracy: number;
  rankingTrend: 'up' | 'down' | 'stable';
  rankChange?: number;
  achievements: AchievementType[];
}

interface UserCardProps {
  user: UserData;
  highlight?: boolean;
  index: number;
}

const UserCard: React.FC<UserCardProps> = ({ user, highlight = false, index }) => {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-gold text-black';
    if (rank === 2) return 'bg-silver text-black';
    if (rank === 3) return 'bg-bronze text-black';
    return 'bg-muted text-muted-foreground';
  };
  
  const getTrendIcon = () => {
    if (user.rankingTrend === 'up') {
      return <ChevronUp className="text-green-500 h-5 w-5" />;
    }
    if (user.rankingTrend === 'down') {
      return <ChevronDown className="text-red-500 h-5 w-5" />;
    }
    return null;
  };
  
  const getInitials = (name: string) => {
    return name.slice(0, 2).toUpperCase();
  };
  
  const getPodiumEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "relative group p-4 rounded-xl transition-all",
        highlight 
          ? "border border-primary/20 bg-primary/5 shadow-md" 
          : "border border-border bg-card hover:border-primary/20 hover:bg-primary/5"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex items-center justify-center min-w-8 h-8 rounded-full text-sm font-bold",
            getRankColor(user.rank)
          )}>
            {user.rank}
          </div>
          
          <Avatar className="h-10 w-10 ring-2 ring-primary/10">
            <AvatarImage src={user.avatarUrl} alt={user.username} />
            <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-medium">{user.username}</span>
              {getPodiumEmoji(user.rank)}
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Trophy className="h-3 w-3" /> {user.xp.toLocaleString()} XP
            </div>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-1">
          {user.achievements.slice(0, 3).map((achievement, i) => (
            <AchievementBadge key={i} type={achievement} size="sm" />
          ))}
          {user.achievements.length > 3 && (
            <div className="text-xs text-muted-foreground">
              +{user.achievements.length - 3}
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 text-sm">
            <span>Solved: <strong>{user.problemsSolved}</strong></span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Accuracy: {user.accuracy}%</span>
            {getTrendIcon()}
            {user.rankChange && (
              <span className={cn(
                "text-xs",
                user.rankingTrend === 'up' ? "text-green-500" : "text-red-500"
              )}>
                {user.rankingTrend === 'up' ? '+' : ''}{user.rankChange}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-3 progress-bar">
        <div 
          className="progress-bar-fill bg-primary"
          style={{ width: `${user.accuracy}%` }}
        ></div>
      </div>
      
      {/* Expanded view that appears on hover */}
      <div className="absolute inset-0 flex items-center justify-center bg-card/95 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex flex-col items-center gap-2 p-4">
          <div className="text-center">
            <h3 className="font-medium">{user.username}</h3>
            <p className="text-sm text-muted-foreground">Rank #{user.rank}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{user.problemsSolved}</span>
              <span className="text-xs text-muted-foreground">Problems</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{user.xp}</span>
              <span className="text-xs text-muted-foreground">XP</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold">{user.accuracy}%</span>
              <span className="text-xs text-muted-foreground">Accuracy</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-1 mt-2">
            {user.achievements.map((achievement, i) => (
              <AchievementBadge key={i} type={achievement} size="sm" />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;