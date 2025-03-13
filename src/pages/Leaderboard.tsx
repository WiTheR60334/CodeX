
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Trophy, Medal, 
  Award, BarChart3, ChevronUp, 
  ChevronDown, Filter, User, Users
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { 
  Table, TableBody, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Define types for user data
type RankingTrend = 'up' | 'down' | 'stable';
type AchievementType = 'first100' | 'bestDebugger' | 'challengeAcceptor' | 'fastestCoder' | 'streakMaster' | 'codingGuru' | 'algorithmMaster' | 'problemSolver' | 'consistentLearner' | 'top10';
type TimeFrame = 'daily' | 'weekly' | 'monthly' | 'all-time';

interface UserData {
  id: string;
  rank: number;
  username: string;
  avatarUrl: string;
  xp: number;
  problemsSolved: number;
  accuracy: number;
  rankingTrend: RankingTrend;
  rankChange?: number;
  achievements: AchievementType[];
  country?: string;
  streak?: number;
}

// Mock data
const mockGlobalUsers: UserData[] = [
  {
    id: "u1",
    rank: 1,
    username: "CodeMaster",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=1",
    xp: 15750,
    problemsSolved: 342,
    accuracy: 97,
    rankingTrend: "stable",
    achievements: ["first100", "fastestCoder", "algorithmMaster", "top10"],
    country: "US",
    streak: 68
  },
  {
    id: "u2",
    rank: 2,
    username: "ByteWizard",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=2",
    xp: 14320,
    problemsSolved: 310,
    accuracy: 95,
    rankingTrend: "up",
    rankChange: 2,
    achievements: ["first100", "problemSolver", "consistentLearner", "top10"],
    country: "JP",
    streak: 45
  },
  {
    id: "u3",
    rank: 3,
    username: "AlgoQueen",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=3",
    xp: 13980,
    problemsSolved: 295,
    accuracy: 94,
    rankingTrend: "up",
    rankChange: 1,
    achievements: ["first100", "bestDebugger", "challengeAcceptor", "top10"],
    country: "DE",
    streak: 64
  },
  {
    id: "u4",
    rank: 4,
    username: "DevChampion",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=4",
    xp: 12840,
    problemsSolved: 278,
    accuracy: 92,
    rankingTrend: "down",
    rankChange: 1,
    achievements: ["first100", "streakMaster", "codingGuru"],
    country: "CA",
    streak: 37
  },
  {
    id: "u5",
    rank: 5,
    username: "BugHunter",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=5",
    xp: 11760,
    problemsSolved: 245,
    accuracy: 91,
    rankingTrend: "up",
    rankChange: 3,
    achievements: ["bestDebugger", "problemSolver", "streakMaster"],
    country: "UK",
    streak: 29
  },
  {
    id: "u6",
    rank: 6,
    username: "CodeNinja",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=6",
    xp: 10950,
    problemsSolved: 230,
    accuracy: 89,
    rankingTrend: "down",
    rankChange: 2,
    achievements: ["fastestCoder", "challengeAcceptor"],
    country: "IN",
    streak: 22
  },
  {
    id: "u7",
    rank: 7,
    username: "SyntaxSage",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=7",
    xp: 10120,
    problemsSolved: 212,
    accuracy: 87,
    rankingTrend: "up",
    rankChange: 1,
    achievements: ["consistentLearner", "codingGuru"],
    country: "FR",
    streak: 19
  },
  {
    id: "u8",
    rank: 8,
    username: "LogicLord",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=8",
    xp: 9840,
    problemsSolved: 198,
    accuracy: 86,
    rankingTrend: "stable",
    achievements: ["algorithmMaster", "problemSolver"],
    country: "BR",
    streak: 15
  },
  {
    id: "u9",
    rank: 9,
    username: "ByteCoder",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=9",
    xp: 9250,
    problemsSolved: 185,
    accuracy: 84,
    rankingTrend: "down",
    rankChange: 3,
    achievements: ["first100", "fastestCoder"],
    country: "AU",
    streak: 11
  },
  {
    id: "u10",
    rank: 10,
    username: "ProgProdigy",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=10",
    xp: 8950,
    problemsSolved: 170,
    accuracy: 82,
    rankingTrend: "stable",
    achievements: ["streakMaster", "top10"],
    country: "KR",
    streak: 8
  },
];

const mockFriendsData: UserData[] = [
  {
    id: "f1",
    rank: 24,
    username: "DevBuddy",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=11",
    xp: 5250,
    problemsSolved: 132,
    accuracy: 78,
    rankingTrend: "up",
    rankChange: 2,
    achievements: ["first100", "bestDebugger"],
    country: "US",
    streak: 14
  },
  {
    id: "f2",
    rank: 36,
    username: "CodePal",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=12",
    xp: 4320,
    problemsSolved: 104,
    accuracy: 75,
    rankingTrend: "down",
    rankChange: 1,
    achievements: ["consistentLearner"],
    country: "MX",
    streak: 8
  },
  {
    id: "f3",
    rank: 42,
    username: "AlgoAmigo",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=13",
    xp: 3980,
    problemsSolved: 92,
    accuracy: 72,
    rankingTrend: "stable",
    achievements: ["challengeAcceptor"],
    country: "ES",
    streak: 5
  },
  {
    id: "f4",
    rank: 51,
    username: "BitBuddy",
    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=14",
    xp: 3450,
    problemsSolved: 85,
    accuracy: 70,
    rankingTrend: "up",
    rankChange: 5,
    achievements: ["fastestCoder"],
    country: "IT",
    streak: 3
  },
];

const achievementIcons: Record<AchievementType, React.ReactNode> = {
  first100: <Award className="h-3.5 w-3.5" />,
  bestDebugger: <BarChart3 className="h-3.5 w-3.5" />,
  challengeAcceptor: <Trophy className="h-3.5 w-3.5" />,
  fastestCoder: <ChevronUp className="h-3.5 w-3.5" />,
  streakMaster: <Award className="h-3.5 w-3.5" />,
  codingGuru: <Trophy className="h-3.5 w-3.5" />,
  algorithmMaster: <BarChart3 className="h-3.5 w-3.5" />,
  problemSolver: <Award className="h-3.5 w-3.5" />,
  consistentLearner: <Trophy className="h-3.5 w-3.5" />,
  top10: <Medal className="h-3.5 w-3.5" />
};

// Achievement colors
const achievementColors: Record<AchievementType, string> = {
  first100: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
  bestDebugger: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
  challengeAcceptor: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
  fastestCoder: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
  streakMaster: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  codingGuru: "bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500/20",
  algorithmMaster: "bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20",
  problemSolver: "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20",
  consistentLearner: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
  top10: "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20"
};

const Leaderboard: React.FC = () => {
  const [activeLeaderboard, setActiveLeaderboard] = useState<'global' | 'friends'>('global');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('all-time');
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedUsers, setDisplayedUsers] = useState<UserData[]>(mockGlobalUsers);
  const [activeSortField, setActiveSortField] = useState<'rank' | 'xp' | 'problemsSolved' | 'accuracy' | 'streak'>('rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Handle user data filtering and sorting
  useEffect(() => {
    const sourceData = activeLeaderboard === 'global' ? mockGlobalUsers : mockFriendsData;
    
    // Apply search filter
    let filteredUsers = sourceData;
    if (searchTerm.trim() !== '') {
      filteredUsers = sourceData.filter(user => 
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply sorting
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      const fieldA = a[activeSortField];
      const fieldB = b[activeSortField];
      
      if (sortDirection === 'asc') {
        return (fieldA as number) - (fieldB as number);
      } else {
        return (fieldB as number) - (fieldA as number);
      }
    });
    
    setDisplayedUsers(sortedUsers);
  }, [activeLeaderboard, searchTerm, activeSortField, sortDirection, timeFrame]);
  
  // Handle sort click
  const handleSortClick = (field: 'rank' | 'xp' | 'problemsSolved' | 'accuracy' | 'streak') => {
    if (activeSortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setActiveSortField(field);
      setSortDirection('desc'); // Default to descending for new sort fields (except rank)
      if (field === 'rank') setSortDirection('asc');
    }
  };
  
  // Get sort icon
  const getSortIcon = (field: 'rank' | 'xp' | 'problemsSolved' | 'accuracy' | 'streak') => {
    if (activeSortField !== field) return null;
    
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-4 w-4 ml-1" /> 
      : <ChevronDown className="h-4 w-4 ml-1" />;
  };
  
  // Render achievement badge
  const renderAchievementBadge = (type: AchievementType) => {
    return (
      <Badge variant="outline" className={cn("flex items-center gap-1 px-2 py-1", achievementColors[type])}>
        {achievementIcons[type]}
        <span className="text-xs">{type.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
      </Badge>
    );
  };

  // Get rank styling
  const getRankStyle = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-amber-400 to-yellow-500 text-black";
    if (rank === 2) return "bg-gradient-to-r from-gray-300 to-gray-400 text-black";
    if (rank === 3) return "bg-gradient-to-r from-amber-700 to-amber-800 text-white";
    return "bg-muted text-muted-foreground";
  };
  
  // Get trend icon and style
  const getTrendIcon = (trend: RankingTrend, change?: number) => {
    if (trend === 'up') {
      return (
        <div className="flex items-center text-green-500">
          <ChevronUp className="h-4 w-4" />
          {change && <span className="text-xs ml-0.5">{change}</span>}
        </div>
      );
    }
    if (trend === 'down') {
      return (
        <div className="flex items-center text-red-500">
          <ChevronDown className="h-4 w-4" />
          {change && <span className="text-xs ml-0.5">{change}</span>}
        </div>
      );
    }
    return (
      <div className="flex items-center text-muted-foreground">
        <span className="text-xs">-</span>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container px-4 py-6 mt-16 mx-auto max-w-7xl">
        <div className="space-y-6">
          {/* Header section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-1"
            >
              <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
              <p className="text-muted-foreground max-w-3xl">
                Track your progress and see how you stack up against the top coders globally or among your friends.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <Select value={timeFrame} onValueChange={(value) => setTimeFrame(value as TimeFrame)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Time frame" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="all-time">All Time</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main leaderboard table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="lg:col-span-2 bg-card rounded-xl border shadow-sm overflow-hidden"
            >
              <div className="p-4 border-b">
                <Tabs 
                  defaultValue={activeLeaderboard} 
                  onValueChange={(value) => setActiveLeaderboard(value as 'global' | 'friends')}
                  className="w-full"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <TabsList className="bg-muted h-10">
                      <TabsTrigger value="global" className="data-[state=active]:bg-background rounded-md">
                        <Trophy className="h-4 w-4 mr-2" />
                        Global
                      </TabsTrigger>
                      <TabsTrigger value="friends" className="data-[state=active]:bg-background rounded-md">
                        <Users className="h-4 w-4 mr-2" />
                        Friends
                      </TabsTrigger>
                    </TabsList>
                    
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 w-full sm:w-[240px]"
                      />
                    </div>
                  </div>
                  
                  <TabsContent value="global" className="mt-0 pt-4">
                    <LeaderboardTable 
                      users={displayedUsers} 
                      onSortClick={handleSortClick}
                      getSortIcon={getSortIcon}
                      activeSortField={activeSortField}
                      getRankStyle={getRankStyle}
                      getTrendIcon={getTrendIcon}
                      renderAchievementBadge={renderAchievementBadge}
                    />
                  </TabsContent>
                  
                  <TabsContent value="friends" className="mt-0 pt-4">
                    <LeaderboardTable 
                      users={displayedUsers} 
                      onSortClick={handleSortClick}
                      getSortIcon={getSortIcon}
                      activeSortField={activeSortField}
                      getRankStyle={getRankStyle}
                      getTrendIcon={getTrendIcon}
                      renderAchievementBadge={renderAchievementBadge}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </motion.div>
            
            {/* Sidebar content */}
            <div className="space-y-6">
              {/* Your stats card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="bg-card rounded-xl border shadow-sm overflow-hidden"
              >
                <div className="p-4 border-b bg-muted/30">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Your Stats</h3>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Current Rank</span>
                      <div className="flex items-center">
                        <span className="font-medium">47th</span>
                        <div className="ml-2 text-green-500 flex items-center">
                          <ChevronUp className="h-4 w-4" />
                          <span className="text-xs">3</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Beginner</span>
                        <span>Expert</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full w-2/5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <StatCard title="Problems Solved" value="65" />
                    <StatCard title="Total XP" value="2,850" />
                    <StatCard title="Accuracy" value="82%" />
                    <StatCard title="Day Streak" value="12" />
                  </div>
                  
                  <Button className="w-full">View Your Profile</Button>
                </div>
              </motion.div>
              
              {/* Achievements card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="bg-card rounded-xl border shadow-sm overflow-hidden"
              >
                <div className="p-4 border-b bg-muted/30">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">Achievement Leaders</h3>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <AchievementRow
                    title="Most Problems Solved"
                    username="CodeMaster"
                    value="342"
                    icon={<Award className="h-4 w-4 text-blue-500" />}
                  />
                  <AchievementRow
                    title="Highest Accuracy"
                    username="CodeMaster"
                    value="97%"
                    icon={<BarChart3 className="h-4 w-4 text-green-500" />}
                  />
                  <AchievementRow
                    title="Fastest Solutions"
                    username="ByteWizard"
                    value="avg. 4.2m"
                    icon={<ChevronUp className="h-4 w-4 text-amber-500" />}
                  />
                  <AchievementRow
                    title="Longest Streak"
                    username="AlgoQueen"
                    value="64 days"
                    icon={<Trophy className="h-4 w-4 text-purple-500" />}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
interface LeaderboardTableProps {
  users: UserData[];
  onSortClick: (field: 'rank' | 'xp' | 'problemsSolved' | 'accuracy' | 'streak') => void;
  getSortIcon: (field: 'rank' | 'xp' | 'problemsSolved' | 'accuracy' | 'streak') => React.ReactNode;
  activeSortField: 'rank' | 'xp' | 'problemsSolved' | 'accuracy' | 'streak';
  getRankStyle: (rank: number) => string;
  getTrendIcon: (trend: RankingTrend, change?: number) => React.ReactNode;
  renderAchievementBadge: (type: AchievementType) => React.ReactNode;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  users,
  onSortClick,
  getSortIcon,
  getRankStyle,
  getTrendIcon,
  renderAchievementBadge
}) => {
  return (
    <div className="overflow-auto">
      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="p-4 rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">No users found</h3>
          <p className="text-muted-foreground max-w-sm">
            We couldn't find any users matching your search criteria.
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] cursor-pointer" onClick={() => onSortClick('rank')}>
                <div className="flex items-center">
                  Rank
                  {getSortIcon('rank')}
                </div>
              </TableHead>
              <TableHead>User</TableHead>
              <TableHead className="cursor-pointer" onClick={() => onSortClick('xp')}>
                <div className="flex items-center">
                  XP
                  {getSortIcon('xp')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => onSortClick('problemsSolved')}>
                <div className="flex items-center">
                  Solved
                  {getSortIcon('problemsSolved')}
                </div>
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => onSortClick('accuracy')}>
                <div className="flex items-center">
                  Accuracy
                  {getSortIcon('accuracy')}
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell">Achievements</TableHead>
              <TableHead className="cursor-pointer hidden lg:table-cell" onClick={() => onSortClick('streak')}>
                <div className="flex items-center">
                  Streak
                  {getSortIcon('streak')}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id} className="hover:bg-muted/20">
                <TableCell>
                  <div className="flex items-center">
                    <div className={cn(
                      "flex items-center justify-center h-7 w-7 rounded-full text-sm font-bold",
                      getRankStyle(user.rank)
                    )}>
                      {user.rank}
                    </div>
                    {getTrendIcon(user.rankingTrend, user.rankChange)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8 border-2 border-muted">
                      <AvatarImage src={user.avatarUrl} alt={user.username} />
                      <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.username}</div>
                      <div className="text-xs text-muted-foreground">{user.country}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{user.xp.toLocaleString()}</TableCell>
                <TableCell>{user.problemsSolved}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span>{user.accuracy}%</span>
                    <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        style={{ width: `${user.accuracy}%` }}
                      ></div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {user.achievements.slice(0, 2).map((achievement, i) => (
                      <span key={i}>{renderAchievementBadge(achievement)}</span>
                    ))}
                    {user.achievements.length > 2 && (
                      <Badge variant="outline" className="bg-muted/50">
                        +{user.achievements.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{user.streak}</span>
                    <span className="text-xs text-muted-foreground">days</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <Card className="bg-muted/30 border">
    <CardContent className="p-4 flex flex-col items-center justify-center text-center">
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-xs text-muted-foreground">{title}</span>
    </CardContent>
  </Card>
);

interface AchievementRowProps {
  title: string;
  username: string;
  value: string;
  icon: React.ReactNode;
}

const AchievementRow: React.FC<AchievementRowProps> = ({ title, username, value, icon }) => (
  <div className="flex justify-between items-center p-3 rounded-lg border hover:bg-muted/30 transition-colors">
    <div className="flex items-center gap-2">
      {icon}
      <span className="font-medium text-sm">{title}</span>
    </div>
    <div className="flex items-center gap-1">
      <span className="text-sm font-medium">{username}</span>
      <span className="text-xs text-muted-foreground">({value})</span>
    </div>
  </div>
);

export default Leaderboard;