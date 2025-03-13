
// import { useState, useEffect } from "react";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { 
//   Accordion, 
//   AccordionContent, 
//   AccordionItem, 
//   AccordionTrigger 
// } from "@/components/ui/accordion";
// import { Badge } from "@/components/ui/badge";
// import { Building, Users, Lightbulb, FileQuestion } from "lucide-react";

// // Define problem data keyed by problemId
// const problemData: Record<string, any> = {
//   "two-sum": {
//     title: "Two Sum",
//     difficulty: "Easy",
//     description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
//     examples: [
//       {
//         input: "nums = [2,7,11,15], target = 9",
//         output: "[0,1]",
//         explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
//       },
//       {
//         input: "nums = [3,2,4], target = 6",
//         output: "[1,2]",
//         explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
//       }
//     ],
//     constraints: [
//       "2 <= nums.length <= 10^4",
//       "-10^9 <= nums[i] <= 10^9",
//       "-10^9 <= target <= 10^9",
//       "Only one valid answer exists."
//     ],
//     topics: ["Array", "Hash Table"],
//     companies: ["Amazon", "Google", "Apple", "Microsoft"],
//     hints: [
//       "A naive approach would be to use a nested loop to check every pair of numbers.",
//       "Can we optimize this using a hash map to store the numbers we've seen so far?",
//       "For each number, check if target - number is in the hash map."
//     ],
//     similar: ["Three Sum", "Two Sum II", "Two Sum IV"]
//   },
//   "add-two-numbers": {
//     title: "Add Two Numbers",
//     difficulty: "Medium",
//     description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list. You may assume the two numbers do not contain any leading zero, except the number 0 itself.",
//     examples: [
//       {
//         input: "l1 = [2,4,3], l2 = [5,6,4]",
//         output: "[7,0,8]",
//         explanation: "342 + 465 = 807."
//       }
//     ],
//     constraints: [
//       "The number of nodes in each linked list is in the range [1, 100].",
//       "0 <= Node.val <= 9",
//       "It is guaranteed that the list represents a number that does not have leading zeros."
//     ],
//     topics: ["Linked List", "Math", "Recursion"],
//     companies: ["Microsoft", "Amazon", "Apple"],
//     hints: [
//       "Remember to handle carry properly.",
//       "What happens when one list is longer than the other?",
//       "What if there's a carry after processing both lists?"
//     ],
//     similar: ["Multiply Strings", "Add Binary", "Sum of Two Integers"]
//   },
//   "longest-substring": {
//     title: "Longest Substring Without Repeating Characters",
//     difficulty: "Medium",
//     description: "Given a string s, find the length of the longest substring without repeating characters.",
//     examples: [
//       {
//         input: "s = \"abcabcbb\"",
//         output: "3",
//         explanation: "The answer is \"abc\", with the length of 3."
//       },
//       {
//         input: "s = \"bbbbb\"",
//         output: "1",
//         explanation: "The answer is \"b\", with the length of 1."
//       }
//     ],
//     constraints: [
//       "0 <= s.length <= 5 * 10^4",
//       "s consists of English letters, digits, symbols and spaces."
//     ],
//     topics: ["Hash Table", "String", "Sliding Window"],
//     companies: ["Amazon", "Bloomberg", "Facebook"],
//     hints: [
//       "Consider using a sliding window approach.",
//       "Use a set to track characters in the current window.",
//       "When you find a duplicate, move the window's left boundary."
//     ],
//     similar: ["Longest Substring with At Most Two Distinct Characters", "Longest Substring with At Most K Distinct Characters"]
//   }
// };

// // Add a default problem data generator for the problem-X format
// Array(20).fill(null).forEach((_, i) => {
//   const index = i + 1;
//   const problemType = ['Two Sum', 'Merge Intervals', 'LRU Cache', 'Validate BST', 'Max Path Sum'][i % 5];
//   const number = Math.floor(i/5) + 1;
//   const title = `Problem ${index}: ${problemType} ${number}`;
//   const difficulties = ["Easy", "Medium", "Hard"];
  
//   problemData[`problem-${index}`] = {
//     title: title,
//     difficulty: difficulties[Math.floor(Math.random() * 3)],
//     description: `This is the problem description for ${title}. Solve this challenging problem to improve your coding skills.`,
//     examples: [
//       {
//         input: "Example input",
//         output: "Example output",
//         explanation: "This is how the solution works."
//       }
//     ],
//     constraints: [
//       "Time complexity: O(n)",
//       "Space complexity: O(n)",
//       "1 <= n <= 10^5"
//     ],
//     topics: ["Array", "Hash Table", "Dynamic Programming"].sort(() => 0.5 - Math.random()).slice(0, 2),
//     companies: ["Google", "Amazon", "Microsoft", "Facebook"].sort(() => 0.5 - Math.random()).slice(0, 3),
//     hints: [
//       "Think about efficiency first.",
//       "Consider using appropriate data structures.",
//       "Break down the problem into smaller parts."
//     ],
//     similar: ["Related Problem 1", "Related Problem 2", "Related Problem 3"]
//   };
// });

// interface ProblemDescriptionProps {
//   problemId?: string;
// }

// const ProblemDescription = ({ problemId = "two-sum" }: ProblemDescriptionProps) => {
//   const [problem, setProblem] = useState<any>(problemData[problemId] || problemData["two-sum"]);

//   useEffect(() => {
//     // Update problem data when problemId changes
//     setProblem(problemData[problemId] || {
//       title: `Problem ${problemId}`,
//       difficulty: "Medium",
//       description: "Problem description not available.",
//       examples: [],
//       constraints: [],
//       topics: [],
//       companies: [],
//       hints: [],
//       similar: []
//     });
//   }, [problemId]);

//   const difficultyColor = {
//     Easy: "bg-green-500",
//     Medium: "bg-orange-500",
//     Hard: "bg-red-500"
//   };

//   return (
//     <ScrollArea className="h-full">
//       <div className="p-6 space-y-6">
//         <div>
//           <div className="flex items-center justify-between mb-3">
//             <h1 className="text-xl font-bold">{problem.title}</h1>
//             <Badge className={`${difficultyColor[problem.difficulty as keyof typeof difficultyColor]} text-white`}>{problem.difficulty}</Badge>
//           </div>
          
//           <div className="flex flex-wrap gap-2 mb-6">
//             {problem.topics?.map((topic: string) => (
//               <Badge key={topic} variant="outline">{topic}</Badge>
//             ))}
//           </div>
          
//           <div className="text-muted-foreground mb-6">{problem.description}</div>
//         </div>
        
//         <div className="space-y-4">
//           <h2 className="text-lg font-semibold">Examples</h2>
//           {problem.examples?.map((example: any, index: number) => (
//             <div key={index} className="border rounded-lg p-4 space-y-3">
//               <div>
//                 <span className="font-medium">Input: </span>
//                 <code className="bg-muted p-1 rounded">{example.input}</code>
//               </div>
//               <div>
//                 <span className="font-medium">Output: </span>
//                 <code className="bg-muted p-1 rounded">{example.output}</code>
//               </div>
//               {example.explanation && (
//                 <div>
//                   <span className="font-medium">Explanation: </span>
//                   <span>{example.explanation}</span>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
        
//         <div>
//           <h2 className="text-lg font-semibold mb-3">Constraints</h2>
//           <ul className="list-disc list-inside space-y-1 text-muted-foreground">
//             {problem.constraints?.map((constraint: string, index: number) => (
//               <li key={index}>{constraint}</li>
//             ))}
//           </ul>
//         </div>
        
//         <Accordion type="single" collapsible className="w-full">
//           <AccordionItem value="companies">
//             <AccordionTrigger className="text-lg font-semibold">
//               <div className="flex items-center gap-2">
//                 <Building className="h-5 w-5" />
//                 Companies
//               </div>
//             </AccordionTrigger>
//             <AccordionContent>
//               <div className="flex flex-wrap gap-2 pt-2">
//                 {problem.companies?.map((company: string) => (
//                   <Badge key={company} variant="secondary">{company}</Badge>
//                 ))}
//               </div>
//             </AccordionContent>
//           </AccordionItem>
          
//           <AccordionItem value="hints">
//             <AccordionTrigger className="text-lg font-semibold">
//               <div className="flex items-center gap-2">
//                 <Lightbulb className="h-5 w-5" />
//                 Hints
//               </div>
//             </AccordionTrigger>
//             <AccordionContent>
//               <div className="space-y-3 pt-2">
//                 {problem.hints?.map((hint: string, index: number) => (
//                   <div key={index} className="border rounded-lg p-3">
//                     <div className="flex items-center gap-2 font-medium mb-1">
//                       <span>Hint {index + 1}</span>
//                     </div>
//                     <p className="text-muted-foreground">{hint}</p>
//                   </div>
//                 ))}
//               </div>
//             </AccordionContent>
//           </AccordionItem>
          
//           <AccordionItem value="similar">
//             <AccordionTrigger className="text-lg font-semibold">
//               <div className="flex items-center gap-2">
//                 <FileQuestion className="h-5 w-5" />
//                 Similar Questions
//               </div>
//             </AccordionTrigger>
//             <AccordionContent>
//               <div className="flex flex-wrap gap-2 pt-2">
//                 {problem.similar?.map((question: string) => (
//                   <Badge key={question} variant="outline" className="cursor-pointer hover:bg-primary/10">
//                     {question}
//                   </Badge>
//                 ))}
//               </div>
//             </AccordionContent>
//           </AccordionItem>
//         </Accordion>
//       </div>
//     </ScrollArea>
//   );
// };

// export default ProblemDescription;


import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Building, Users, Lightbulb, FileQuestion } from "lucide-react";

// Define problem data keyed by problemId
const problemData: Record<string, any> = {
  "two-sum": {
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]. The sum of 2 and 7 is 9."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]. The sum of 2 and 4 is 6."
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]. The sum of 3 and 3 is 6."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    topics: ["Array", "Hash Table"],
    companies: ["Amazon", "Google", "Apple", "Microsoft"],
    hints: [
      "A naive approach would be to use a nested loop to check every pair of numbers.",
      "Can we optimize this using a hash map to store the numbers we've seen so far?",
      "For each number, check if target - number is in the hash map."
    ],
    similar: ["Three Sum", "Two Sum II", "Two Sum IV"]
  },
  "add-two-numbers": {
    title: "Add Two Numbers",
    difficulty: "Medium",
    description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list. You may assume the two numbers do not contain any leading zero, except the number 0 itself.",
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "The numbers represented by the linked lists are 342 + 465 = 807, which is represented as [7,0,8] in the result linked list."
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]",
        explanation: "The numbers represented are 0 + 0 = 0, which is represented as [0] in the result."
      },
      {
        input: "l1 = [9,9,9,9], l2 = [9,9,9]",
        output: "[8,9,9,0,1]",
        explanation: "The numbers represented are 9999 + 999 = 10998, which is [8,9,9,0,1] in the result."
      }
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros."
    ],
    topics: ["Linked List", "Math", "Recursion"],
    companies: ["Microsoft", "Amazon", "Apple"],
    hints: [
      "Remember to handle carry properly.",
      "What happens when one list is longer than the other?",
      "What if there's a carry after processing both lists?"
    ],
    similar: ["Multiply Strings", "Add Binary", "Sum of Two Integers"]
  },
  "longest-substring": {
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    examples: [
      {
        input: "s = \"abcabcbb\"",
        output: "3",
        explanation: "The answer is \"abc\", with the length of 3. The substring starts at index 0 and ends at index 2."
      },
      {
        input: "s = \"bbbbb\"",
        output: "1",
        explanation: "The answer is \"b\", with the length of 1. Since all characters are the same, the longest substring is just one character."
      },
      {
        input: "s = \"pwwkew\"",
        output: "3",
        explanation: "The answer is \"wke\", with the length of 3. The substring starts at index 2 and ends at index 4."
      }
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    topics: ["Hash Table", "String", "Sliding Window"],
    companies: ["Amazon", "Bloomberg", "Facebook"],
    hints: [
      "Consider using a sliding window approach.",
      "Use a set to track characters in the current window.",
      "When you find a duplicate, move the window's left boundary."
    ],
    similar: ["Longest Substring with At Most Two Distinct Characters", "Longest Substring with At Most K Distinct Characters"]
  }
};

// Generate detailed problem data for problem-X format
Array(20).fill(null).forEach((_, i) => {
  const index = i + 1;
  const problemType = ['Two Sum', 'Merge Intervals', 'LRU Cache', 'Validate BST', 'Max Path Sum'][i % 5];
  const number = Math.floor(i/5) + 1;
  const title = `Problem ${index}: ${problemType} ${number}`;
  const difficulties = ["Easy", "Medium", "Hard"];
  const difficulty = difficulties[Math.floor(Math.random() * 3)];
  
  let description, examples, constraints;
  
  switch (i % 5) {
    case 0: // Two Sum variant
      description = `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. This is variation ${number} of the classic Two Sum problem.`;
      examples = [
        {
          input: `nums = [${1 + number},${3 + number},${5 + number},${7 + number}], target = ${4 + 2*number}`,
          output: "[0,1]",
          explanation: `Because nums[0] + nums[1] == ${4 + 2*number}, we return [0, 1]. The sum of ${1 + number} and ${3 + number} is ${4 + 2*number}.`
        },
        {
          input: `nums = [${2 + number},${4 + number},${6 + number}], target = ${10 + number}`,
          output: "[1,2]",
          explanation: `Because nums[1] + nums[2] == ${10 + number}, we return [1, 2]. The sum of ${4 + number} and ${6 + number} is ${10 + number}.`
        }
      ];
      constraints = [
        "2 <= nums.length <= 10^4",
        `-10^${number} <= nums[i] <= 10^${number}`,
        `-10^${number} <= target <= 10^${number}`,
        "Only one valid answer exists."
      ];
      break;
      
    case 1: // Merge Intervals variant
      description = `Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input. This is variation ${number} of the Merge Intervals problem.`;
      examples = [
        {
          input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
          output: "[[1,6],[8,10],[15,18]]",
          explanation: "The intervals [1,3] and [2,6] overlap, so they are merged into [1,6]. The result is [[1,6],[8,10],[15,18]]."
        },
        {
          input: "intervals = [[1,4],[4,5]]",
          output: "[[1,5]]",
          explanation: "The intervals [1,4] and [4,5] are considered overlapping since they share an endpoint, so they're merged into [1,5]."
        }
      ];
      constraints = [
        "1 <= intervals.length <= 10^4",
        "intervals[i].length == 2",
        "0 <= starti <= endi <= 10^4"
      ];
      break;
      
    case 2: // LRU Cache variant
      description = `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class with get and put operations. This is variation ${number} of the LRU Cache problem.`;
      examples = [
        {
          input: "cache = new LRUCache(2); cache.put(1, 1); cache.put(2, 2); cache.get(1); cache.put(3, 3); cache.get(2); cache.put(4, 4); cache.get(1); cache.get(3); cache.get(4);",
          output: "[1,-1,3,4]",
          explanation: "The cache has capacity 2. We put 1 and 2 in the cache. When we get(1), it returns 1. When we put 3, it evicts 2. When we get(2), it returns -1 (not found). When we put 4, it evicts 1. The final gets return -1, 3, and 4."
        }
      ];
      constraints = [
        "1 <= capacity <= 3000",
        "0 <= key <= 10^4",
        "0 <= value <= 10^5",
        "At most 2 * 10^5 calls will be made to get and put."
      ];
      break;
      
    case 3: // Validate BST variant
      description = `Given the root of a binary tree, determine if it is a valid binary search tree (BST). This is variation ${number} of the Validate BST problem.`;
      examples = [
        {
          input: "root = [2,1,3]",
          output: "true",
          explanation: "The tree [2,1,3] is a valid BST because all values in the left subtree (just 1) are less than 2, and all values in the right subtree (just 3) are greater than 2."
        },
        {
          input: "root = [5,1,4,null,null,3,6]",
          output: "false",
          explanation: "The tree is not a valid BST because the value 4 in the right subtree has a child with value 3, which is less than the root value 5."
        }
      ];
      constraints = [
        "The number of nodes in the tree is in the range [1, 10^4].",
        "-2^31 <= Node.val <= 2^31 - 1"
      ];
      break;
      
    case 4: // Max Path Sum variant
      description = `Given the root of a binary tree, return the maximum path sum of any non-empty path. This is variation ${number} of the Maximum Path Sum problem.`;
      examples = [
        {
          input: "root = [1,2,3]",
          output: "6",
          explanation: "The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6."
        },
        {
          input: "root = [-10,9,20,null,null,15,7]",
          output: "42",
          explanation: "The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42."
        }
      ];
      constraints = [
        "The number of nodes in the tree is in the range [1, 3 * 10^4].",
        "-1000 <= Node.val <= 1000"
      ];
      break;
  }
  
  problemData[`problem-${index}`] = {
    title: title,
    difficulty: difficulty,
    description: description,
    examples: examples,
    constraints: constraints,
    topics: ["Array", "Hash Table", "Dynamic Programming"].sort(() => 0.5 - Math.random()).slice(0, 2),
    companies: ["Google", "Amazon", "Microsoft", "Facebook"].sort(() => 0.5 - Math.random()).slice(0, 3),
    hints: [
      "Think about efficiency first.",
      "Consider using appropriate data structures.",
      "Break down the problem into smaller parts."
    ],
    similar: ["Related Problem 1", "Related Problem 2", "Related Problem 3"]
  };
});

interface ProblemDescriptionProps {
  problemId?: string;
}

const ProblemDescription = ({ problemId = "two-sum" }: ProblemDescriptionProps) => {
  const [problem, setProblem] = useState<any>(problemData[problemId] || problemData["two-sum"]);

  useEffect(() => {
    // Update problem data when problemId changes
    setProblem(problemData[problemId] || {
      title: `Problem ${problemId}`,
      difficulty: "Medium",
      description: "Problem description not available.",
      examples: [],
      constraints: [],
      topics: [],
      companies: [],
      hints: [],
      similar: []
    });
  }, [problemId]);

  const difficultyColor = {
    Easy: "bg-green-500",
    Medium: "bg-orange-500",
    Hard: "bg-red-500"
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold">{problem.title}</h1>
            <Badge className={`${difficultyColor[problem.difficulty as keyof typeof difficultyColor]} text-white`}>{problem.difficulty}</Badge>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {problem.topics?.map((topic: string) => (
              <Badge key={topic} variant="outline">{topic}</Badge>
            ))}
          </div>
          
          <div className="text-muted-foreground mb-6">{problem.description}</div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Examples</h2>
          {problem.examples?.map((example: any, index: number) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div>
                <span className="font-medium">Input: </span>
                <code className="bg-muted p-1 rounded">{example.input}</code>
              </div>
              <div>
                <span className="font-medium">Output: </span>
                <code className="bg-muted p-1 rounded">{example.output}</code>
              </div>
              {example.explanation && (
                <div>
                  <span className="font-medium">Explanation: </span>
                  <span>{example.explanation}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div>
          <h2 className="text-lg font-semibold mb-3">Constraints</h2>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            {problem.constraints?.map((constraint: string, index: number) => (
              <li key={index}>{constraint}</li>
            ))}
          </ul>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="companies">
            <AccordionTrigger className="text-lg font-semibold">
              <div className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Companies
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2 pt-2">
                {problem.companies?.map((company: string) => (
                  <Badge key={company} variant="secondary">{company}</Badge>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="hints">
            <AccordionTrigger className="text-lg font-semibold">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Hints
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {problem.hints?.map((hint: string, index: number) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center gap-2 font-medium mb-1">
                      <span>Hint {index + 1}</span>
                    </div>
                    <p className="text-muted-foreground">{hint}</p>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="similar">
            <AccordionTrigger className="text-lg font-semibold">
              <div className="flex items-center gap-2">
                <FileQuestion className="h-5 w-5" />
                Similar Questions
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2 pt-2">
                {problem.similar?.map((question: string) => (
                  <Badge key={question} variant="outline" className="cursor-pointer hover:bg-primary/10">
                    {question}
                  </Badge>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </ScrollArea>
  );
};

export default ProblemDescription;