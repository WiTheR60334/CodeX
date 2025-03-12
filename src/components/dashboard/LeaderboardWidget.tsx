
import React from 'react';
import { Crown, Trophy, Medal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BlurImage from '@/components/ui/BlurImage';
import AnimatedNumber from '@/components/ui/AnimatedNumber';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  score: number;
  position: number;
  change: 'up' | 'down' | 'same';
}

const leaderboardUsers: LeaderboardUser[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    score: 8750,
    position: 1,
    change: 'same'
  },
  {
    id: '2',
    name: 'Amir Patel',
    avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
    score: 8320,
    position: 2,
    change: 'up'
  },
  {
    id: '3',
    name: 'Jessica Nguyen',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    score: 7890,
    position: 3,
    change: 'up'
  },
  {
    id: '4',
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    score: 7650,
    position: 4,
    change: 'down'
  },
  {
    id: '5',
    name: 'Miguel Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    score: 7420,
    position: 5,
    change: 'same'
  }
];

const getPositionIcon = (position: number) => {
  switch (position) {
    case 1:
      return <Crown className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Trophy className="h-5 w-5 text-slate-400" />;
    case 3:
      return <Medal className="h-5 w-5 text-amber-700" />;
    default:
      return <span className="text-muted-foreground font-medium">{position}</span>;
  }
};

const getChangeColor = (change: LeaderboardUser['change']) => {
  switch (change) {
    case 'up':
      return 'text-green-500';
    case 'down':
      return 'text-red-500';
    default:
      return 'text-muted-foreground';
  }
};

const getChangeIcon = (change: LeaderboardUser['change']) => {
  switch (change) {
    case 'up':
      return (
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    case 'down':
      return (
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      );
    default:
      return (
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
        </svg>
      );
  }
};

const LeaderboardWidget: React.FC = () => {
  return (
    <Card className="rounded-xl animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Leaderboard
          </CardTitle>
          <button className="text-xs text-primary font-medium hover:underline">
            View Full Rankings
          </button>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-4">
          {leaderboardUsers.map((user) => (
            <div
              key={user.id}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                user.position <= 3 ? 'bg-primary/5' : ''
              }`}
            >
              {/* Position */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
                {getPositionIcon(user.position)}
              </div>
              
              {/* Avatar */}
              <div className="flex-shrink-0 w-9 h-9 rounded-full overflow-hidden">
                <BlurImage src={user.avatar} alt={user.name} className="w-full h-full" />
              </div>
              
              {/* User info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <div className="flex items-center gap-1">
                  <div className={`flex items-center text-xs ${getChangeColor(user.change)}`}>
                    {getChangeIcon(user.change)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <AnimatedNumber 
                      value={user.score} 
                      formatter={(val) => `${Math.round(val).toLocaleString()} pts`}
                    />
                  </p>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="hidden sm:block w-24 bg-muted h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full"
                  style={{ width: `${100 - (user.position - 1) * 10}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardWidget;
