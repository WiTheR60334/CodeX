
import React from 'react';
import { Activity, Check, Code, MessageSquare, Sparkles, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ActivityItem {
  id: string;
  type: 'completed' | 'feedback' | 'insight' | 'achievement' | 'comment';
  content: string;
  timestamp: string;
  challengeId?: string;
  challengeTitle?: string;
}

const activityItems: ActivityItem[] = [
  {
    id: '1',
    type: 'completed',
    content: 'You completed "Binary Search Implementation"',
    timestamp: '2 hours ago',
    challengeId: 'ch1',
    challengeTitle: 'Binary Search Implementation'
  },
  {
    id: '2',
    type: 'feedback',
    content: 'AI provided feedback on your solution for "Recursive Factorial"',
    timestamp: '5 hours ago',
    challengeId: 'ch2',
    challengeTitle: 'Recursive Factorial'
  },
  {
    id: '3',
    type: 'insight',
    content: 'AI insight: Your code could use memoization to improve performance',
    timestamp: '1 day ago'
  },
  {
    id: '4',
    type: 'achievement',
    content: 'You earned the "5-Day Streak" badge!',
    timestamp: '1 day ago'
  },
  {
    id: '5',
    type: 'comment',
    content: 'Alex commented on your solution to "String Manipulation"',
    timestamp: '2 days ago',
    challengeId: 'ch3',
    challengeTitle: 'String Manipulation'
  }
];

const getActivityIcon = (type: ActivityItem['type']) => {
  switch (type) {
    case 'completed':
      return <Check className="h-4 w-4 text-green-500" />;
    case 'feedback':
      return <MessageSquare className="h-4 w-4 text-blue-500" />;
    case 'insight':
      return <Sparkles className="h-4 w-4 text-purple-500" />;
    case 'achievement':
      return <Award className="h-4 w-4 text-yellow-500" />;
    case 'comment':
      return <Code className="h-4 w-4 text-pink-500" />;
    default:
      return <Activity className="h-4 w-4 text-primary" />;
  }
};

const ActivityFeed: React.FC = () => {
  return (
    <Card className="rounded-xl animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
          <button className="text-xs text-primary font-medium hover:underline">
            View All
          </button>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-4">
          {activityItems.map((item) => (
            <div key={item.id} className="relative pl-6 pb-4 border-l border-border last:pb-0">
              {/* Activity dot */}
              <div className="absolute top-0.5 left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-background border-2 border-primary" />
              
              <div className="flex items-start gap-2">
                <div className="flex-shrink-0 p-1.5 rounded-md bg-primary/10">
                  {getActivityIcon(item.type)}
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm">{item.content}</p>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{item.timestamp}</span>
                    {item.challengeId && (
                      <>
                        <span>•</span>
                        <a href="#" className="text-primary hover:underline">
                          View Challenge
                        </a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
