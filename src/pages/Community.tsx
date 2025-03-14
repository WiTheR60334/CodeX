
import { useState } from "react";
import  Navbar  from "@/components/Navbar";
import { CreateThread } from "@/components/community/CreateThread";
import { ThreadFilter } from "@/components/community/ThreadFilter";
import { DiscussionThread } from "@/components/community/DiscussionThread";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Export ThreadTag component to be used in the page
export interface ThreadTagProps {
  name: string;
  color?: "default" | "algorithm" | "debugging" | "python" | "javascript" | "java" | "best-practice";
}

export const ThreadTag = ({ name, color = "default" }: ThreadTagProps) => {
  const getColorClasses = () => {
    switch (color) {
      case "algorithm":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "debugging":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "python":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "javascript":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "java":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "best-practice":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
    }
  };
  
  return (
    <Badge variant="outline" className={`rounded-full font-normal ${getColorClasses()}`}>
      {name}
    </Badge>
  );
};

const Community = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Update the type in the mock data to match ThreadTagProps
  const threads = [
    {
      id: 1,
      user: {
        name: "Sarah Chen",
        avatar: "",
        reputation: 4250,
      },
      title: "How to optimize dynamic programming solution for Longest Common Subsequence?",
      content: "I'm trying to optimize my solution for the LCS problem. Currently, I have an O(n²) solution, but I've seen references to O(n) space complexity approaches. Has anyone implemented this more efficient version? I'd appreciate any guidance on reducing the space complexity while maintaining the same time complexity.",
      tags: [
        { name: "Dynamic Programming", color: "algorithm" as const },
        { name: "Java", color: "java" as const },
      ],
      timestamp: "2 hours ago",
      replies: 8,
      upvotes: 24,
      isBestAnswer: false,
    },
    {
      id: 2,
      user: {
        name: "Mark Johnson",
        avatar: "",
        reputation: 3120,
      },
      title: "Quicksort vs Mergesort - when to use which?",
      content: "I'm confused about when to use quicksort versus mergesort. I understand that quicksort has O(n log n) average time complexity but O(n²) worst case, while mergesort is always O(n log n). Are there specific scenarios where one clearly outperforms the other? What factors should I consider when deciding between these sorting algorithms for a given problem?",
      tags: [
        { name: "Algorithms", color: "algorithm" as const },
        { name: "Sorting", color: "default" as const },
      ],
      timestamp: "5 hours ago",
      replies: 12,
      upvotes: 36,
      isBestAnswer: true,
    },
    {
      id: 3,
      user: {
        name: "Alex Rivera",
        avatar: "",
        reputation: 1875,
      },
      title: "Debug help: JavaScript Promise.all() not working as expected",
      content: "I'm trying to use Promise.all() to handle multiple API calls, but I'm running into an issue where sometimes not all promises are being resolved before continuing execution. Here's my code snippet: [code snippet]. The issue seems to happen randomly. Any ideas on what could be causing this behavior and how to fix it?",
      tags: [
        { name: "JavaScript", color: "javascript" as const },
        { name: "Debugging", color: "debugging" as const },
      ],
      timestamp: "Yesterday",
      replies: 5,
      upvotes: 14,
      isBestAnswer: false,
    },
    {
      id: 4,
      user: {
        name: "Emily Zhang",
        avatar: "",
        reputation: 5640,
      },
      title: "Clean code approach for handling deeply nested conditional logic?",
      content: "I'm working with a legacy codebase that has lots of deeply nested if-else statements (sometimes 5+ levels deep). It's becoming really hard to reason about and maintain. What are some effective refactoring strategies or design patterns to flatten this nested conditional logic while maintaining readability and ensuring correctness?",
      tags: [
        { name: "Best Practices", color: "best-practice" as const },
        { name: "Refactoring", color: "default" as const },
      ],
      timestamp: "2 days ago",
      replies: 18,
      upvotes: 57,
      isBestAnswer: false,
    },
    {
      id: 5,
      user: {
        name: "Michael Lee",
        avatar: "",
        reputation: 2340,
      },
      title: "How to implement efficient graph traversal for social network connections?",
      content: "I'm working on a feature that needs to find all connections between two users (like LinkedIn's degrees of separation). Currently using BFS, but it's too slow for users with many connections. Are there any optimizations or alternative algorithms I should consider for this use case? The graph has millions of nodes and edges.",
      tags: [
        { name: "Algorithms", color: "algorithm" as const },
        { name: "Python", color: "python" as const },
      ],
      timestamp: "3 days ago",
      replies: 9,
      upvotes: 31,
      isBestAnswer: false,
    },
  ];
  
  // Filter threads based on category and search query
  const filteredThreads = threads.filter(thread => {
    if (selectedCategory !== "all") {
      // This is a simplified filter just for demonstration
      const tagMatch = thread.tags.some(tag => 
        tag.color.toLowerCase().includes(selectedCategory.toLowerCase())
      );
      if (!tagMatch) return false;
    }
    
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        thread.title.toLowerCase().includes(searchLower) ||
        thread.content.toLowerCase().includes(searchLower) ||
        thread.tags.some(tag => tag.name.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });
  
  return (
    <>
      <Navbar />
      <div className="container py-8 mt-[4rem]">
        <div className="md:flex md:items-start md:justify-between gap-8">
          <div className="flex-1 min-w-0">
            <CreateThread />
            
            <ThreadFilter 
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onSearch={setSearchQuery}
            />
            
            <div className="space-y-4">
              {filteredThreads.length > 0 ? (
                filteredThreads.map(thread => (
                  <DiscussionThread 
                    key={thread.id}
                    user={thread.user}
                    title={thread.title}
                    content={thread.content}
                    tags={thread.tags}
                    timestamp={thread.timestamp}
                    replies={thread.replies}
                    upvotes={thread.upvotes}
                    isBestAnswer={thread.isBestAnswer}
                  />
                ))
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <p className="text-muted-foreground mb-4">No discussions found matching your criteria.</p>
                  <Button className="gap-2 bg-black text-white hover:bg-black/90">
                    <PlusCircle className="h-4 w-4" />
                    Start a new discussion
                  </Button>
                </div>
              )}
            </div>
            
            {filteredThreads.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="mx-auto">
                  Load more discussions
                </Button>
              </div>
            )}
          </div>
          
          <div className="hidden lg:block w-72 mt-[148px]">
            <div className="border rounded-lg p-4 sticky top-24">
              <h3 className="font-medium mb-3">Top Contributors</h3>
              <div className="space-y-3">
                {[
                  { name: "Emily Zhang", reputation: 5640 },
                  { name: "Sarah Chen", reputation: 4250 },
                  { name: "Mark Johnson", reputation: 3120 },
                  { name: "Michael Lee", reputation: 2340 },
                  { name: "Alex Rivera", reputation: 1875 },
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium">
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-sm">{user.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{user.reputation}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t mt-4 pt-4">
                <h3 className="font-medium mb-3">Trending Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <ThreadTag name="JavaScript" color="javascript" />
                  <ThreadTag name="Python" color="python" />
                  <ThreadTag name="Algorithms" color="algorithm" />
                  <ThreadTag name="Best Practices" color="best-practice" />
                  <ThreadTag name="Debugging" color="debugging" />
                  <ThreadTag name="Java" color="java" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Community;
