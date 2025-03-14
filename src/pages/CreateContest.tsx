
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'; 
import { 
  ArrowLeft, ArrowRight, Calendar, Check, CheckCircle2, Clock, Code, Globe, 
  Lock, Plus, Save, Search, Users, X 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AnimatedTransition from '../components/AnimatedTransition';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { format } from 'date-fns';
import { toast } from 'sonner';


// Form schema
const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  startDate: z.date().refine(date => date > new Date(), {
    message: 'Start date must be in the future',
  }),
  endDate: z.date(),
  timeLimit: z.enum(['1', '2', '3']),
  visibility: z.enum(['public', 'private']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
  registrationLimit: z.string().optional(),
  problems: z.array(z.string()).min(1, 'At least one problem must be selected'),
  sendNotifications: z.boolean().default(true),
});

// Interface for problems
interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
}

const CreateContest = () => {
  const [step, setStep] = useState(1);
  const [selectedProblems, setSelectedProblems] = useState<Problem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [topicFilter, setTopicFilter] = useState<string>('all');
  
  // Form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      timeLimit: '2',
      visibility: 'public',
      difficulty: 'medium',
      languages: ['javascript', 'python', 'java'],
      sendNotifications: true,
      problems: [],
    },
  });
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Validate end date is after start date
    if (data.endDate <= data.startDate) {
      form.setError('endDate', {
        type: 'manual',
        message: 'End date must be after start date',
      });
      return;
    }

    toast.success('Contest created successfully!', {
      description: 'Your contest has been created and will be published according to your settings.',
    });
    
    console.log('Form data:', data);
    // Here you would typically submit the data to your backend
  };
  
  // Mock data for available problems
  const availableProblems: Problem[] = [
    {
      id: 'prob-001',
      title: 'Two Sum',
      difficulty: 'Easy',
      topics: ['Arrays', 'Hash Table'],
    },
    {
      id: 'prob-002',
      title: 'Reverse Linked List',
      difficulty: 'Easy',
      topics: ['Linked List'],
    },
    {
      id: 'prob-003',
      title: 'LRU Cache',
      difficulty: 'Medium',
      topics: ['Design', 'Hash Table'],
    },
    {
      id: 'prob-004',
      title: 'Merge k Sorted Lists',
      difficulty: 'Hard',
      topics: ['Linked List', 'Divide and Conquer', 'Heap'],
    },
    {
      id: 'prob-005',
      title: 'Valid Parentheses',
      difficulty: 'Easy',
      topics: ['Stack', 'String'],
    },
    {
      id: 'prob-006',
      title: 'Binary Tree Maximum Path Sum',
      difficulty: 'Hard',
      topics: ['Tree', 'Depth-First Search'],
    },
    {
      id: 'prob-007',
      title: 'Course Schedule',
      difficulty: 'Medium',
      topics: ['Graph', 'Topological Sort', 'BFS'],
    },
    {
      id: 'prob-008',
      title: 'Word Search',
      difficulty: 'Medium',
      topics: ['Backtracking', 'Array'],
    }
  ];
  
  const filteredProblems = availableProblems.filter((problem) => {
    const matchesSearchTerm = problem.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || 
      problem.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
    const matchesTopic = topicFilter === 'all' || 
      problem.topics.some(t => t.toLowerCase() === topicFilter.toLowerCase());
    
    return matchesSearchTerm && matchesDifficulty && matchesTopic;
  });
  
  const addProblem = (problem: Problem) => {
    if (!selectedProblems.some(p => p.id === problem.id)) {
      const newSelectedProblems = [...selectedProblems, problem];
      setSelectedProblems(newSelectedProblems);
      form.setValue('problems', newSelectedProblems.map(p => p.id));
    }
  };
  
  const removeProblem = (problemId: string) => {
    const newSelectedProblems = selectedProblems.filter(p => p.id !== problemId);
    setSelectedProblems(newSelectedProblems);
    form.setValue('problems', newSelectedProblems.map(p => p.id));
  };

  // Get unique topics from problems
  const uniqueTopics = Array.from(
    new Set(availableProblems.flatMap(p => p.topics))
  ).sort();
  
  const nextStep = async () => {
    // Validate current step before proceeding
    if (step === 1) {
      const result = await form.trigger([
        'title', 
        'description', 
        'startDate', 
        'endDate', 
        'timeLimit', 
        'visibility', 
        'difficulty', 
        'languages'
      ]);
      
      if (result) {
        // Check if end date is after start date
        const startDate = form.getValues('startDate');
        const endDate = form.getValues('endDate');
        
        if (startDate && endDate && endDate <= startDate) {
          form.setError('endDate', {
            type: 'manual',
            message: 'End date must be after start date',
          });
          
          toast.error('Validation error', {
            description: 'End date must be after start date',
          });
          
          return;
        }
        
        setStep(2);
        window.scrollTo(0, 0);
      } else {
        // If validation fails, show a toast
        toast.error('Please fill in all required fields', {
          description: 'Some required information is missing or invalid',
        });
      }
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-500/10 text-green-500';
      case 'medium':
        return 'bg-orange-500/10 text-orange-500';
      case 'hard':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-inherit">
        <Navbar/>
      <AnimatedTransition className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-8">
            <Link
              to="/contests"
              className="inline-flex items-center text-muted-foreground mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Contests
            </Link>
            
            <motion.h1 
              className="text-3xl md:text-4xl font-bold dark:text-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Create Custom Contest
            </motion.h1>
            <motion.p 
              className="text-muted-foreground  mt-2 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              Design your own coding competition and invite participants
            </motion.p>
          </div>
          
          <div className="bg-white border-2 rounded-lg shadow-sm overflow-hidden dark:bg-black dark:border-hsl(var(--border))">
            {/* Progress indicator */}
            <div className="px-6 py-4 border-b dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <div className={`flex items-center ${step >= 1 ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${
                      step >= 1 ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 text-muted-foreground  dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      1
                    </div>
                    <span className="font-medium">Contest Details</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300 dark:text-gray-700">
                    <div className="w-8 border-t border-gray-300 dark:border-gray-700"></div>
                  </div>
                  
                  <div className={`flex items-center ${step >= 2 ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${
                      step >= 2 ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-gray-200 text-muted-foreground  dark:bg-gray-700 dark:text-gray-400'
                    }`}>
                      2
                    </div>
                    <span className="font-medium">Select Problems</span>
                  </div>
                </div>
                
                <div>
                  <Button variant="outline" size="sm" onClick={() => {
                    toast.success('Draft saved!', {
                      description: 'Your contest draft has been saved.',
                    });
                  }}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Draft
                  </Button>
                </div>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="p-6">
                {/* Step 1: Contest Details */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contest Title</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Weekly Challenge #1" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Give your contest a clear, descriptive title
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe the contest, its rules, and goals" 
                                  rows={4}
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Provide details about the contest format and what participants can expect
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div>
                        <FormField
                          control={form.control}
                          name="startDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Start Date & Time</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className="w-full flex justify-start text-left font-normal"
                                    >
                                      <Calendar className="mr-2 h-4 w-4" />
                                      {field.value ? (
                                        format(field.value, "PPP p")
                                      ) : (
                                        <span>Select date and time</span>
                                      )}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <CalendarUI
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(date) => {
                                      if (date) {
                                        const now = new Date();
                                        date.setHours(now.getHours());
                                        date.setMinutes(now.getMinutes());
                                        field.onChange(date);
                                      }
                                    }}
                                    initialFocus
                                  />
                                  <div className="p-3 border-t">
                                    <Input
                                      type="time"
                                      onChange={(e) => {
                                        const [hours, minutes] = e.target.value.split(':');
                                        const date = new Date(field.value);
                                        date.setHours(parseInt(hours));
                                        date.setMinutes(parseInt(minutes));
                                        field.onChange(date);
                                      }}
                                      defaultValue={field.value ? 
                                        `${field.value.getHours().toString().padStart(2, '0')}:${field.value.getMinutes().toString().padStart(2, '0')}` : 
                                        undefined
                                      }
                                    />
                                  </div>
                                </PopoverContent>
                              </Popover>
                              <FormDescription>
                                When will the contest begin?
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div>
                        <FormField
                          control={form.control}
                          name="endDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>End Date & Time</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className="w-full flex justify-start text-left font-normal"
                                    >
                                      <Calendar className="mr-2 h-4 w-4" />
                                      {field.value ? (
                                        format(field.value, "PPP p")
                                      ) : (
                                        <span>Select date and time</span>
                                      )}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <CalendarUI
                                    mode="single"
                                    selected={field.value}
                                    onSelect={(date) => {
                                      if (date) {
                                        const now = new Date();
                                        date.setHours(now.getHours() + 2);
                                        date.setMinutes(now.getMinutes());
                                        field.onChange(date);
                                      }
                                    }}
                                    initialFocus
                                  />
                                  <div className="p-3 border-t">
                                    <Input
                                      type="time"
                                      onChange={(e) => {
                                        const [hours, minutes] = e.target.value.split(':');
                                        const date = new Date(field.value);
                                        date.setHours(parseInt(hours));
                                        date.setMinutes(parseInt(minutes));
                                        field.onChange(date);
                                      }}
                                      defaultValue={field.value ? 
                                        `${field.value.getHours().toString().padStart(2, '0')}:${field.value.getMinutes().toString().padStart(2, '0')}` : 
                                        undefined
                                      }
                                    />
                                  </div>
                                </PopoverContent>
                              </Popover>
                              <FormDescription>
                                When will the contest end?
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div>
                        <FormField
                          control={form.control}
                          name="timeLimit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Time Limit (hours)</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select time limit" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1">1 hour</SelectItem>
                                  <SelectItem value="2">2 hours</SelectItem>
                                  <SelectItem value="3">3 hours</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                How long will participants have to solve problems?
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div>
                        <FormField
                          control={form.control}
                          name="difficulty"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Difficulty Level</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select difficulty level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="easy">Easy</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="hard">Hard</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                The overall difficulty of the contest
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div>
                        <FormField
                          control={form.control}
                          name="visibility"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contest Visibility</FormLabel>
                              <RadioGroup 
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormControl>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="public" id="visibility-public" />
                                    <label htmlFor="visibility-public" className="flex items-center cursor-pointer">
                                      <Globe className="w-4 h-4 mr-2" />
                                      Public (Anyone can join)
                                    </label>
                                  </div>
                                </FormControl>
                                <FormControl>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="private" id="visibility-private" />
                                    <label htmlFor="visibility-private" className="flex items-center cursor-pointer">
                                      <Lock className="w-4 h-4 mr-2" />
                                      Private (Invite only)
                                    </label>
                                  </div>
                                </FormControl>
                              </RadioGroup>
                              <FormDescription>
                                Who can participate in your contest?
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div>
                        <FormField
                          control={form.control}
                          name="registrationLimit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Registration Limit (Optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number"
                                  placeholder="Unlimited" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Maximum number of participants (leave empty for unlimited)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name="languages"
                          render={() => (
                            <FormItem>
                              <FormLabel>Allowed Programming Languages</FormLabel>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                {['javascript', 'python', 'java', 'c++', 'c#', 'go', 'ruby', 'rust', 'php'].map((language) => (
                                  <FormField
                                    key={language}
                                    control={form.control}
                                    name="languages"
                                    render={({ field }) => (
                                      <FormItem
                                        key={language}
                                        className="flex items-center space-x-2"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(language)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, language])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== language
                                                    )
                                                  );
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="cursor-pointer text-sm font-normal">
                                          {language.charAt(0).toUpperCase() + language.slice(1)}
                                        </FormLabel>
                                      </FormItem>
                                    )}
                                  />
                                ))}
                              </div>
                              <FormDescription>
                                Select languages that participants can use to solve problems
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name="sendNotifications"
                          render={({ field }) => (
                            <FormItem className="flex items-start space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="cursor-pointer">
                                  Send notifications to participants
                                </FormLabel>
                                <FormDescription>
                                  Notify users when the contest is about to start
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-8">
                      <Button type="button" onClick={nextStep}>
                        Next: Select Problems
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
                
                {/* Step 2: Problem Selection */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2">
                        <h3 className="text-lg font-medium mb-4 dark:text-white">Select Problems</h3>
                        
                        <div className="mb-6">
                          <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <div className="relative flex-1">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                              <Input
                                placeholder="Search problems"
                                className="pl-10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                              />
                            </div>
                            
                            <div className="flex gap-2">
                              <Select 
                                value={difficultyFilter} 
                                onValueChange={setDifficultyFilter}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="Difficulty" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Levels</SelectItem>
                                  <SelectItem value="easy">Easy</SelectItem>
                                  <SelectItem value="medium">Medium</SelectItem>
                                  <SelectItem value="hard">Hard</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <Select 
                                value={topicFilter} 
                                onValueChange={setTopicFilter}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="Topic" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Topics</SelectItem>
                                  {uniqueTopics.map((topic) => (
                                    <SelectItem key={topic} value={topic.toLowerCase()}>
                                      {topic}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                            {filteredProblems.length > 0 ? (
                              filteredProblems.map((problem) => (
                                <div 
                                  key={problem.id}
                                  className="p-4 border rounded-lg hover:border-black transition-colors cursor-pointer flex justify-between items-center dark:border-gray-700 dark:hover:border-white"
                                  onClick={() => addProblem(problem)}
                                >
                                  <div>
                                    <h4 className="font-medium dark:text-white">{problem.title}</h4>
                                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                      <span className={`tag px-2.5 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                                        {problem.difficulty}
                                      </span>
                                      {problem.topics.map((topic) => (
                                        <span key={topic} className="tag text-secondary-foreground font-semibold bg-secondary border px-2 py-1 text-xs rounded-full border-transparent">
                                          {topic}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button 
                                          variant="ghost" 
                                          size="icon"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            addProblem(problem);
                                          }}
                                          disabled={selectedProblems.some(p => p.id === problem.id)}
                                        >
                                          {selectedProblems.some(p => p.id === problem.id) ? (
                                            <CheckCircle2 className="h-5 w-5 text-green-700 dark:text-green-500" />
                                          ) : (
                                            <Plus className="h-5 w-5" />
                                          )}
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        {selectedProblems.some(p => p.id === problem.id) 
                                          ? 'Already added' 
                                          : 'Add to contest'}
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              ))
                            ) : (
                              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                                <Code className="h-10 w-10 mx-auto mb-2" />
                                <p>No problems match your filters</p>
                                <Button 
                                  variant="link" 
                                  onClick={() => {
                                    setSearchTerm('');
                                    setDifficultyFilter('all');
                                    setTopicFilter('all');
                                  }}
                                >
                                  Clear all filters
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="border-2 p-4 rounded-lg sticky top-24 ">
                          <h3 className="text-lg font-medium mb-4 dark:text-white">Contest Summary</h3>
                          
                          <div className="space-y-4">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Selected Problems ({selectedProblems.length})</p>
                              <FormField
                                control={form.control}
                                name="problems"
                                render={() => (
                                  <FormItem>
                                    <FormMessage />
                                    {selectedProblems.length === 0 ? (
                                      <div className="p-4 text-center text-gray-500 border border-dashed rounded-md mt-2 dark:border-gray-700 dark:text-gray-400">
                                        <p className="text-sm">No problems selected yet</p>
                                      </div>
                                    ) : (
                                      <div className="space-y-2 mt-2 max-h-[200px] overflow-y-auto pr-1">
                                        {selectedProblems.map((problem) => (
                                          <div 
                                            key={problem.id}
                                            className="p-2 border rounded-md flex justify-between items-center dark:border-gray-700"
                                          >
                                            <div className="flex items-center gap-2">
                                              <span className={`tag text-xs px-2 py-1 rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                                                {problem.difficulty.charAt(0)}
                                              </span>
                                              <span className="text-sm truncate max-w-[120px] dark:text-white">
                                                {problem.title}
                                              </span>
                                            </div>
                                            <Button 
                                              variant="ghost" 
                                              size="icon"
                                              onClick={() => removeProblem(problem.id)}
                                            >
                                              <X className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </FormItem>
                                )}
                              />
                            </div>
                            
                            <Separator className="dark:bg-gray-700" />
                            
                            <div className="space-y-1.5">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Title:</span>
                                <span className="text-sm font-medium dark:text-white">{form.watch('title') || 'Not set'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Difficulty:</span>
                                <span className="text-sm font-medium capitalize dark:text-white">{form.watch('difficulty') || 'Not set'}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Duration:</span>
                                <span className="text-sm font-medium dark:text-white">{form.watch('timeLimit') || '0'} hour(s)</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Visibility:</span>
                                <span className="text-sm font-medium capitalize dark:text-white">{form.watch('visibility') || 'Not set'}</span>
                              </div>
                            </div>
                            
                            <div className="pt-4">
                              <div className="flex flex-col gap-3">
                                <Button 
                                  type="button" 
                                  onClick={prevStep}
                                  variant="outline"
                                >
                                  <ArrowLeft className="w-4 h-4 mr-2" />
                                  Back to Details
                                </Button>
                                
                                <Button 
                                  type="submit" 
                                  disabled={selectedProblems.length === 0}
                                >
                                  <Check className="w-4 h-4 mr-2" />
                                  Create Contest
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </form>
            </Form>
          </div>
        </div>
      </AnimatedTransition>
    </div>
  );
};

export default CreateContest;