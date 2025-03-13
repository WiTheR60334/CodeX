export default interface Problem {
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
    examples: { input: string; output: string; explanation?: string }[];
    constraints: string[];
    testCases: { input: string; expectedOutput: string }[];
  }
  
  export const problems: Problem[] = [
    {
      id: 'problem-1',
      title: 'Two Sum',
      description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
      difficulty: 'easy',
      topics: ['Array', 'Hash Table'],
      popularity: 950,
      successRate: 45,
      attemptCount: 5000,
      isNew: true,
      createdAt: new Date(),
      examples: [
        {
          input: 'nums = [2,7,11,15], target = 9',
          output: '[0,1]',
          explanation: 'Because nums[0] + nums[1] = 2 + 7 = 9, return [0, 1].'
        }
      ],
      constraints: [
        '2 <= nums.length <= 10^4',
        '-10^9 <= nums[i] <= 10^9',
        '-10^9 <= target <= 10^9'
      ],
      testCases: [
        { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0,1]' },
        { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1,2]' }
      ]
    },
    {
      id: 'problem-2',
      title: 'Merge Intervals',
      description: 'Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals.',
      difficulty: 'medium',
      topics: ['Array', 'Sorting'],
      popularity: 890,
      successRate: 50,
      attemptCount: 4200,
      isNew: false,
      createdAt: new Date(),
      examples: [
        {
          input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
          output: '[[1,6],[8,10],[15,18]]',
          explanation: 'Intervals [1,3] and [2,6] overlap and are merged into [1,6].'
        }
      ],
      constraints: [
        '1 <= intervals.length <= 10^4',
        'intervals[i].length == 2',
        '0 <= start <= end <= 10^4'
      ],
      testCases: [
        { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', expectedOutput: '[[1,6],[8,10],[15,18]]' },
        { input: 'intervals = [[1,4],[4,5]]', expectedOutput: '[[1,5]]' }
      ]
    },
    // Add remaining 18 problems following the same structure...
  ];
  