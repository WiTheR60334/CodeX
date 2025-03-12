import React from 'react';
import { CalendarDays, Flame, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedNumber from '@/components/ui/AnimatedNumber';

interface WelcomeHeaderProps {
  username: string;
  streak: number;
  rank: number;
  progress: number;
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({
  username,
  streak,
  rank,
  progress,
}) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="bg-background border border-border rounded-lg p-6 mb-8">
      <div className="md:flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{formattedDate}</p>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Welcome back, <span className="text-primary">{username}</span>!
          </h1>
          
          <div className="flex items-center gap-4 md:gap-6 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Flame className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Streak</p>
                <p className="font-semibold">
                  <AnimatedNumber value={streak} duration={1500} formatter={(val) => `${Math.round(val)} days`} />
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rank</p>
                <p className="font-semibold">
                  <AnimatedNumber value={rank} duration={1500} formatter={(val) => `#${Math.round(val)}`} />
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CalendarDays className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Goal</p>
                <p className="font-semibold">3 challenges today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeHeader;
