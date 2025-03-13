
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContestCard from '../components/ContestCard';
import Navbar from '../components/Navbar';
import AnimatedTransition from '../components/AnimatedTransition';

const difficultyColor = {
    easy: 'bg-green-500/10 text-green-500',
    medium: 'bg-orange-500/10 text-orange-500',
    hard: 'bg-red-500/10 text-red-500',
  };
  
const Contests = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'previous'>('upcoming');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock data for upcoming contests
  const upcomingContests = [
    {
      id: 'weekly-challenge-24',
      title: 'Weekly Challenge #24',
      description: 'Solve 5 algorithmic problems in 2 hours and compete with others to climb the leaderboard.',
      startDate: new Date(Date.now() + 86400000), // Tomorrow
      endDate: new Date(Date.now() + 86400000 + 7200000), // Tomorrow + 2 hours
      difficulty: 'Medium' as const,
      participants: 348,
    },
    {
      id: 'biweekly-algorithms-12',
      title: 'Biweekly Algorithms #12',
      description: 'A biweekly contest featuring graph algorithms and dynamic programming problems.',
      startDate: new Date(Date.now() + 259200000), // 3 days from now
      endDate: new Date(Date.now() + 259200000 + 7200000), // 3 days + 2 hours
      difficulty: 'Hard' as const,
      participants: 215,
    },
    {
      id: 'beginner-friendly-7',
      title: 'Beginner Friendly Contest #7',
      description: 'A contest designed for beginners with easy to medium problems and extensive explanations.',
      startDate: new Date(Date.now() + 432000000), // 5 days from now
      endDate: new Date(Date.now() + 432000000 + 10800000), // 5 days + 3 hours
      difficulty: 'Easy' as const,
      participants: 532,
    },
  ];

  // Mock data for previous contests
  const previousContests = [
    {
      id: 'weekly-challenge-23',
      title: 'Weekly Challenge #23',
      description: 'Test your skills with 5 algorithm problems covering arrays, strings, and binary trees.',
      startDate: new Date(Date.now() - 604800000), // 7 days ago
      endDate: new Date(Date.now() - 604800000 + 7200000), // 7 days ago + 2 hours
      difficulty: 'Medium' as const,
      participants: 412,
    },
    {
      id: 'database-systems-5',
      title: 'Database Systems Contest #5',
      description: 'A specialized contest focusing on database queries, optimizations, and system design.',
      startDate: new Date(Date.now() - 1209600000), // 14 days ago
      endDate: new Date(Date.now() - 1209600000 + 9000000), // 14 days ago + 2.5 hours
      difficulty: 'Hard' as const,
      participants: 187,
    },
    {
      id: 'beginner-friendly-6',
      title: 'Beginner Friendly Contest #6',
      description: 'Easy problems designed to help beginners understand fundamental programming concepts.',
      startDate: new Date(Date.now() - 1814400000), // 21 days ago
      endDate: new Date(Date.now() - 1814400000 + 10800000), // 21 days ago + 3 hours
      difficulty: 'Easy' as const,
      participants: 567,
    },
    {
      id: 'biweekly-algorithms-11',
      title: 'Biweekly Algorithms #11',
      description: 'Advanced algorithmic problems focusing on graph theory and combinatorial optimization.',
      startDate: new Date(Date.now() - 2419200000), // 28 days ago
      endDate: new Date(Date.now() - 2419200000 + 7200000), // 28 days ago + 2 hours
      difficulty: 'Hard' as const,
      participants: 230,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
        <Navbar/>
      <AnimatedTransition className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <motion.h1 
                className="text-3xl md:text-4xl font-bold"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Trophy className="inline-block mr-2 h-8 w-8" />
                Coding Contests
              </motion.h1>
              <motion.p 
                className="text-muted-foreground mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Compete with others and improve your coding skills
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Link
                to="/create-contest"
                className="flex items-center gap-2 px-5 py-2.5 bg-black dark:bg-white text-primary-foreground rounded-lg hover:bg-black/90 transition-colors"
              >
                <Plus className="h-5 w-5" />
                Create Custom Contest
              </Link>
            </motion.div>
          </div>
          
          <div className="mb-8">
            <div className="border-b">
              <div className="flex space-x-8">
                <button
                  className="pb-2 px-1 font-medium relative hover:text-muted-foreground"
                  onClick={() => setActiveTab('upcoming')}
                >
                  Upcoming Contests
                  {activeTab === 'upcoming' && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white"
                    />
                  )}
                </button>
                
                <button
                  className="pb-2 px-1 font-medium relative hover:text-muted-foreground"
                  onClick={() => setActiveTab('previous')}
                >
                  Previous Contests
                  {activeTab === 'previous' && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'upcoming' 
              ? upcomingContests.map((contest) => (
                  <ContestCard 
                    key={contest.id}
                    {...contest}
                    isUpcoming
                  />
                ))
              : previousContests.map((contest) => (
                  <ContestCard 
                    key={contest.id}
                    {...contest}
                  />
                ))
            }
          </div>
        </div>
      </AnimatedTransition>
      
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} CodeX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contests;