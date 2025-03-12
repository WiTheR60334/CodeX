
import React from 'react';
import WelcomeHeader from './WelcomeHeader';
import ChallengeCard, { ChallengeProps } from './ChallengeCard';
import ActivityFeed from './ActivityFeed';
import LeaderboardWidget from './LeaderboardWidget';

// Sample data for the recommended challenges
const recommendedChallenges: ChallengeProps[] = [
  {
    id: 'ch1',
    title: 'Binary Search Tree Implementation',
    description: 'Create a binary search tree with insertion, deletion, and search operations. Optimize for balanced trees.',
    difficulty: 'medium',
    estimatedTime: '45 min',
    participants: 1250,
    tags: ['Data Structures', 'Trees', 'Algorithms'],
    popularity: 89,
    imageUrl: 'https://images.unsplash.com/photo-1623282033815-40b05d96c903?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'ch2',
    title: 'Recursive Factorial with Memoization',
    description: 'Implement a recursive factorial function that uses memoization to optimize performance for repeated calls.',
    difficulty: 'easy',
    estimatedTime: '20 min',
    participants: 984,
    tags: ['Recursion', 'Optimization', 'Algorithms'],
    popularity: 75
  },
  {
    id: 'ch3',
    title: 'Event Loop Visualization',
    description: 'Create a visual representation of JavaScript's event loop, including the call stack and callback queue.',
    difficulty: 'hard',
    estimatedTime: '90 min',
    participants: 567,
    tags: ['JavaScript', 'Async', 'Visualization'],
    popularity: 95,
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'ch4',
    title: 'API Rate Limiter Design',
    description: 'Design and implement a rate limiter that can be used to control the rate of requests to an API.',
    difficulty: 'medium',
    estimatedTime: '60 min',
    participants: 823,
    tags: ['System Design', 'API', 'Backend'],
    popularity: 82
  }
];

const Dashboard: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <WelcomeHeader 
          username="Alex"
          streak={7}
          rank={435}
          progress={65}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - Challenges */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recommended challenges section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recommended for You</h2>
              <button className="text-sm text-primary font-medium hover:underline">
                View All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedChallenges.slice(0, 2).map((challenge, index) => (
                <ChallengeCard 
                  key={challenge.id} 
                  {...challenge} 
                />
              ))}
            </div>
          </div>
          
          {/* Trending challenges section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Trending Challenges</h2>
              <button className="text-sm text-primary font-medium hover:underline">
                View All
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedChallenges.slice(2, 4).map((challenge, index) => (
                <ChallengeCard 
                  key={challenge.id} 
                  {...challenge} 
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar - Activity and Leaderboard */}
        <div className="space-y-6">
          <ActivityFeed />
          <LeaderboardWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
