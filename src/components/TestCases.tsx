
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Play, Plus, X } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";

// Default test cases for different problem types
const defaultTestCases = {
  "two-sum": [
    { id: "1", input: "nums = [2,7,11,15], target = 9", expected: "[0,1]", active: true },
    { id: "2", input: "nums = [3,2,4], target = 6", expected: "[1,2]", active: false },
    { id: "3", input: "nums = [3,3], target = 6", expected: "[0,1]", active: false },
  ],
  "add-two-numbers": [
    { id: "1", input: "l1 = [2,4,3], l2 = [5,6,4]", expected: "[7,0,8]", active: true },
    { id: "2", input: "l1 = [0], l2 = [0]", expected: "[0]", active: false },
    { id: "3", input: "l1 = [9,9,9], l2 = [9,9,9]", expected: "[8,9,9,1]", active: false },
  ],
  "longest-substring": [
    { id: "1", input: "s = \"abcabcbb\"", expected: "3", active: true },
    { id: "2", input: "s = \"bbbbb\"", expected: "1", active: false },
    { id: "3", input: "s = \"pwwkew\"", expected: "3", active: false },
  ]
};

// Generate default test cases for problem-X pattern
for (let i = 1; i <= 20; i++) {
  const problemType = ['Two Sum', 'Merge Intervals', 'LRU Cache', 'Validate BST', 'Max Path Sum'][i % 5];
  const problemId = `problem-${i}`;
  
  switch (i % 5) {
    case 0: // Max Path Sum
      defaultTestCases[problemId] = [
        { id: "1", input: "root = [1,2,3]", expected: "6", active: true },
        { id: "2", input: "root = [-10,9,20,null,null,15,7]", expected: "42", active: false },
      ];
      break;
    case 1: // Two Sum
      defaultTestCases[problemId] = [
        { id: "1", input: "nums = [2,7,11,15], target = 9", expected: "[0,1]", active: true },
        { id: "2", input: "nums = [3,2,4], target = 6", expected: "[1,2]", active: false },
      ];
      break;
    case 2: // Merge Intervals
      defaultTestCases[problemId] = [
        { id: "1", input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", expected: "[[1,6],[8,10],[15,18]]", active: true },
        { id: "2", input: "intervals = [[1,4],[4,5]]", expected: "[[1,5]]", active: false },
      ];
      break;
    case 3: // LRU Cache
      defaultTestCases[problemId] = [
        { id: "1", input: "cache = new LRUCache(2); cache.put(1, 1); cache.put(2, 2); cache.get(1); cache.put(3, 3); cache.get(2); cache.put(4, 4); cache.get(1); cache.get(3); cache.get(4);", expected: "[1,-1,3,4]", active: true },
        { id: "2", input: "cache = new LRUCache(1); cache.put(2, 1); cache.get(2); cache.put(3, 2); cache.get(2); cache.get(3);", expected: "[1,-1,2]", active: false },
      ];
      break;
    case 4: // Validate BST
      defaultTestCases[problemId] = [
        { id: "1", input: "root = [2,1,3]", expected: "true", active: true },
        { id: "2", input: "root = [5,1,4,null,null,3,6]", expected: "false", active: false },
      ];
      break;
  }
}

interface TestCasesProps {
  problemId?: string;
}

type TestCase = {
  id: string;
  input: string;
  expected: string;
  active: boolean;
};

// Create a schema for form validation
const testCaseSchema = z.object({
  input: z.string().min(1, "Input is required"),
  expected: z.string().min(1, "Expected output is required"),
});

type TestCaseFormValues = z.infer<typeof testCaseSchema>;

const TestCases = ({ problemId = "two-sum" }: TestCasesProps) => {
  const { toast } = useToast();
  
  const [testCases, setTestCases] = useState<TestCase[]>(
    defaultTestCases[problemId as keyof typeof defaultTestCases] || defaultTestCases["two-sum"]
  );
  const [activeTab, setActiveTab] = useState(testCases[0]?.id || "1");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Initialize form with proper resolver and default values
  const form = useForm<TestCaseFormValues>({
    resolver: zodResolver(testCaseSchema),
    defaultValues: {
      input: "",
      expected: ""
    }
  });

  const handleAddTestCase = (data: TestCaseFormValues) => {
    const newId = (testCases.length + 1).toString();
    const newTestCase: TestCase = {
      id: newId,
      input: data.input,
      expected: data.expected,
      active: false
    };
    
    setTestCases([...testCases, newTestCase]);
    setActiveTab(newId);
    setIsDialogOpen(false);
    
    toast({
      title: "Test case added",
      description: "Your new test case has been added successfully."
    });
    
    form.reset();
  };

  const handleRunTest = () => {
    toast({
      title: "Test case executed",
      description: "Your code passed this test case!",
    });
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-3">
          <TabsList>
            {testCases.map(tc => (
              <TabsTrigger key={tc.id} value={tc.id} className="text-xs">
                Case {tc.id}
              </TabsTrigger>
            ))}
          </TabsList>
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2 flex items-center gap-1"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="text-xs">Add</span>
          </Button>
        </div>
        
        {testCases.map(tc => (
          <TabsContent key={tc.id} value={tc.id} className="space-y-3">
            <div className="space-y-1">
              <label className="text-sm font-medium">Input:</label>
              <div className="bg-muted p-3 rounded-md font-mono text-xs">
                {tc.input}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Expected Output:</label>
              <div className="bg-muted p-3 rounded-md font-mono text-xs">
                {tc.expected}
              </div>
            </div>
            <Button size="sm" className="w-full gap-1" onClick={handleRunTest}>
              <Play className="h-3.5 w-3.5" />
              Run Test Case
            </Button>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Test Case</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddTestCase)} className="space-y-4">
              <FormField
                control={form.control}
                name="input"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Input</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="E.g., nums = [1,2,3], target = 5" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="expected"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Output</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="E.g., [0,2]" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Test Case</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestCases;