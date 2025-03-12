
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
    <section className="relative w-full glass-dark rounded-2xl p-6 md:p-8 overflow-hidden animate-fade-in">
      {/* Progress tracker */}
      <div className="absolute bottom-0 left-0 h-1.5 bg-primary/20 w-full">
        <div 
          className="h-full bg-primary transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="md:flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{formattedDate}</p>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">
            Welcome back, <span className="text-primary">{username}</span>!
          </h1>
          
          <div className="flex items-center gap-4 md:gap-6 mt-2">
            {/* Streak counter */}
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
            
            {/* Rank */}
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
            
            {/* Next goal */}
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
        
        <div className="mt-6 md:mt-0 flex gap-3">
          <Button className="rounded-lg">
            Start New Challenge
          </Button>
          <Button variant="outline" className="rounded-lg">
            View Progress
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeHeader;
