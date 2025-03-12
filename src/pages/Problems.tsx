
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Filter, 
  Search, 
  Clock, 
  Users, 
  ArrowRight, 
  ArrowUpDown,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from '@/components/ui/card';
import { toast } from 'sonner';

// Types
type Difficulty = 'easy' | 'medium' | 'hard' | 'all';
type SortOption = 'popularity' | 'newest' | 'mostAttempted';
type Problem = {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topics: string[];
  popularity: number;
  successRate: number;
  attemptCount: number;
  isNew: boolean;
  createdAt: Date;
};

// Mock data
const topics = [
  { id: 'arrays', name: 'Arrays' },
  { id: 'strings', name: 'Strings' },
  { id: 'linkedlist', name: 'Linked Lists' },
  { id: 'trees', name: 'Trees' },
  { id: 'graphs', name: 'Graphs' },
  { id: 'dp', name: 'Dynamic Programming' },
  { id: 'greedy', name: 'Greedy Algorithms' },
  { id: 'sorting', name: 'Sorting' },
  { id: 'searching', name: 'Searching' },
  { id: 'math', name: 'Mathematics' },
  { id: 'recursion', name: 'Recursion' },
  { id: 'bitmanipulation', name: 'Bit Manipulation' },
];

// Sample problem data
const mockProblems: Problem[] = Array(20).fill(null).map((_, i) => {
  const difficultyOptions = ['easy', 'medium', 'hard'] as const;
  const randomTopics = topics
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(Math.random() * 3) + 1);
  
  return {
    id: `problem-${i + 1}`,
    title: `Problem ${i + 1}: ${['Two Sum', 'Merge Intervals', 'LRU Cache', 'Validate BST', 'Max Path Sum'][i % 5]} ${Math.floor(i/5) + 1}`,
    description: 'Solve this challenging problem to improve your coding skills.',
    difficulty: difficultyOptions[Math.floor(Math.random() * 3)],
    topics: randomTopics.map(t => t.id),
    popularity: Math.floor(Math.random() * 1000),
    successRate: Math.floor(Math.random() * 100),
    attemptCount: Math.floor(Math.random() * 5000),
    isNew: i < 3,
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
  };
});

// Map topic IDs to names
const getTopicName = (topicId: string) => {
  const topic = topics.find(t => t.id === topicId);
  return topic ? topic.name : topicId;
};

// Problem card component
const ProblemCard = ({ problem }: { problem: Problem }) => {
  const difficultyColor = {
    easy: 'bg-green-500/10 text-green-500',
    medium: 'bg-orange-500/10 text-orange-500',
    hard: 'bg-red-500/10 text-red-500',
  };

  return (
    <Card className="rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20 animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-base md:text-lg">{problem.title}</h3>
            {problem.isNew && (
              <Badge variant="outline" className="bg-primary/5 text-primary text-xs mt-1">
                New
              </Badge>
            )}
          </div>
          <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${difficultyColor[problem.difficulty]}`}>
            {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {problem.topics.map((topicId) => (
            <Badge key={topicId} variant="secondary" className="text-xs rounded-full px-2">
              {getTopicName(topicId)}
            </Badge>
          ))}
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {problem.description}
        </p>
      </CardContent>
      
      <CardFooter className="pt-0 flex items-center justify-between">
        <div className="flex gap-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Users className="h-3.5 w-3.5 mr-1" />
            {problem.attemptCount.toLocaleString()}
          </div>
          <div>
            Success: {problem.successRate}%
          </div>
        </div>
        
        <Button size="sm" className="rounded-full gap-1">
          Solve <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// Main Problems Page
const Problems = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('all');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProblems, setFilteredProblems] = useState<Problem[]>(mockProblems);
  const [selectedTopicsCount, setSelectedTopicsCount] = useState(0);
  const [expandedTopics, setExpandedTopics] = useState(false);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...mockProblems];
    
    // Apply difficulty filter
    if (selectedDifficulty !== 'all') {
      result = result.filter(problem => problem.difficulty === selectedDifficulty);
    }
    
    // Apply topic filters
    if (selectedTopics.length > 0) {
      result = result.filter(problem => 
        problem.topics.some(topic => selectedTopics.includes(topic))
      );
    }
    
    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(problem => 
        problem.title.toLowerCase().includes(query) ||
        problem.topics.some(topic => getTopicName(topic).toLowerCase().includes(query))
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'popularity':
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'newest':
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case 'mostAttempted':
        result.sort((a, b) => b.attemptCount - a.attemptCount);
        break;
    }
    
    setFilteredProblems(result);
  }, [searchQuery, selectedDifficulty, selectedTopics, sortBy]);

  // Toggle topic selection
  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev => {
      if (prev.includes(topicId)) {
        return prev.filter(id => id !== topicId);
      } else {
        return [...prev, topicId];
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedDifficulty('all');
    setSelectedTopics([]);
    setSearchQuery('');
    toast.success('Filters have been reset');
  };

  // Count selected topics
  useEffect(() => {
    setSelectedTopicsCount(selectedTopics.length);
  }, [selectedTopics]);

  // Render desktop filters sidebar
  const renderDesktopFilters = () => (
    <div className="w-64 h-full hidden lg:block">
      <div className="sticky top-[5.5rem] space-y-6">
        <div>
          <h3 className="font-semibold mb-4">Difficulty</h3>
          <RadioGroup 
            value={selectedDifficulty} 
            onValueChange={(value) => setSelectedDifficulty(value as Difficulty)}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <label htmlFor="all" className="cursor-pointer text-sm">All Difficulties</label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="easy" id="easy" />
              <label htmlFor="easy" className="cursor-pointer text-sm">
                <span className="text-green-500">Easy</span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <label htmlFor="medium" className="cursor-pointer text-sm">
                <span className="text-orange-500">Medium</span>
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="hard" id="hard" />
              <label htmlFor="hard" className="cursor-pointer text-sm">
                <span className="text-red-500">Hard</span>
              </label>
            </div>
          </RadioGroup>
        </div>
        
        <Separator />
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Topics</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-2 text-xs"
              onClick={() => setExpandedTopics(!expandedTopics)}
            >
              {expandedTopics ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <div className={`space-y-2 ${expandedTopics ? '' : 'max-h-[250px] overflow-y-auto'}`}>
            {topics.map((topic) => (
              <div key={topic.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`desktop-${topic.id}`} 
                  checked={selectedTopics.includes(topic.id)}
                  onCheckedChange={() => toggleTopic(topic.id)}
                />
                <label 
                  htmlFor={`desktop-${topic.id}`} 
                  className="cursor-pointer text-sm"
                >
                  {topic.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-semibold mb-2">Show Only</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Switch id="new-problems" />
              <label htmlFor="new-problems" className="text-sm cursor-pointer">New Problems</label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="unsolved" />
              <label htmlFor="unsolved" className="text-sm cursor-pointer">Unsolved</label>
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full mt-6" 
          onClick={clearFilters}
        >
          <X className="h-4 w-4 mr-2" /> Clear Filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16 container">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Coding Problems</h1>
          
          {/* Mobile filter button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="lg:hidden"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {selectedTopicsCount > 0 && (
                  <Badge className="ml-2 bg-primary text-primary-foreground">{selectedTopicsCount}</Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Filter problems by difficulty and topics
                </SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Difficulty</h3>
                  <RadioGroup 
                    value={selectedDifficulty} 
                    onValueChange={(value) => setSelectedDifficulty(value as Difficulty)}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="mobile-all" />
                      <label htmlFor="mobile-all" className="cursor-pointer">All Difficulties</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="easy" id="mobile-easy" />
                      <label htmlFor="mobile-easy" className="cursor-pointer">
                        <span className="text-green-500">Easy</span>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="mobile-medium" />
                      <label htmlFor="mobile-medium" className="cursor-pointer">
                        <span className="text-orange-500">Medium</span>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hard" id="mobile-hard" />
                      <label htmlFor="mobile-hard" className="cursor-pointer">
                        <span className="text-red-500">Hard</span>
                      </label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold mb-4">Topics</h3>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {topics.map((topic) => (
                      <div key={topic.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`mobile-${topic.id}`} 
                          checked={selectedTopics.includes(topic.id)}
                          onCheckedChange={() => toggleTopic(topic.id)}
                        />
                        <label 
                          htmlFor={`mobile-${topic.id}`} 
                          className="cursor-pointer"
                        >
                          {topic.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold mb-2">Show Only</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch id="mobile-new-problems" />
                      <label htmlFor="mobile-new-problems" className="cursor-pointer">New Problems</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="mobile-unsolved" />
                      <label htmlFor="mobile-unsolved" className="cursor-pointer">Unsolved</label>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={clearFilters}
                >
                  <X className="h-4 w-4 mr-2" /> Clear Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Search and sort controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search problems by title or topics..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">
                <div className="flex items-center">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  Most Popular
                </div>
              </SelectItem>
              <SelectItem value="newest">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  Newest
                </div>
              </SelectItem>
              <SelectItem value="mostAttempted">
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Most Attempted
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Main content with sidebar and problem list */}
        <div className="flex gap-8">
          {/* Filters sidebar (desktop) */}
          {renderDesktopFilters()}
          
          {/* Problems grid */}
          <div className="flex-1">
            {/* Filter indicators */}
            {(selectedDifficulty !== 'all' || selectedTopics.length > 0 || searchQuery) && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                
                {selectedDifficulty !== 'all' && (
                  <Badge 
                    variant="outline" 
                    className="flex items-center gap-1"
                  >
                    {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSelectedDifficulty('all')}
                    />
                  </Badge>
                )}
                
                {selectedTopics.map(topicId => (
                  <Badge 
                    key={topicId}
                    variant="outline" 
                    className="flex items-center gap-1"
                  >
                    {getTopicName(topicId)}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => toggleTopic(topicId)}
                    />
                  </Badge>
                ))}
                
                {searchQuery && (
                  <Badge 
                    variant="outline" 
                    className="flex items-center gap-1"
                  >
                    Search: "{searchQuery}"
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSearchQuery('')}
                    />
                  </Badge>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 px-2 text-xs"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
              </div>
            )}
            
            {/* Problems count */}
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredProblems.length} problems
            </p>
            
            {/* Problem cards grid */}
            {filteredProblems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {filteredProblems.map(problem => (
                  <ProblemCard key={problem.id} problem={problem} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg">
                <h3 className="text-lg font-medium">No problems found</h3>
                <p className="text-muted-foreground mt-2">
                  Try adjusting your filters or search query
                </p>
                <Button 
                  className="mt-4" 
                  variant="outline"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Problems;
