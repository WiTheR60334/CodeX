
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Play, Bug, Save, RotateCcw, ChevronRight, ChevronLeft, ArrowLeft } from "lucide-react";
import Editor from "@/components/Editor";
import TestCases from "@/components/TestCases";
import ProblemDescription from "@/components/ProblemDescription";
import { CodeDebugger } from "@/components/CodeDebugger";

// Define a simple problem lookup object to simulate fetching problem details
const problemTitles: Record<string, string> = {
  "two-sum": "Two Sum",
  "add-two-numbers": "Add Two Numbers",
  "longest-substring": "Longest Substring Without Repeating Characters"
};

// Add titles for the problem-X format
Array(20).fill(null).forEach((_, i) => {
  const index = i + 1;
  const problemType = ['Two Sum', 'Merge Intervals', 'LRU Cache', 'Validate BST', 'Max Path Sum'][i % 5];
  const number = Math.floor(i/5) + 1;
  problemTitles[`problem-${index}`] = `Problem ${index}: ${problemType} ${number}`;
});

const CodeEditor = () => {
  const { problemId } = useParams();
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [showProblem, setShowProblem] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [problemTitle, setProblemTitle] = useState("");

  // Set the problem title based on the problemId
  useEffect(() => {
    if (problemId) {
      setProblemTitle(problemTitles[problemId] || `Problem ${problemId}`);
    }
  }, [problemId]);

  const handleRunCode = async () => {
    setIsRunning(true);
    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOutput("Code executed successfully!\nExecution time: 0.05s\nMemory used: 5.2MB");
      toast({
        title: "Code executed successfully",
        description: "Your code passed all test cases!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to execute code",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <header className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/problems">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">{problemTitle}</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowProblem(!showProblem)}
          >
            {showProblem ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {/* <ThemeToggle /> */}
          <Button
            variant="outline"
            onClick={() => setCode("")}
            className="gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: "Code saved",
                description: "Your progress has been saved",
              });
            }}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            Save
          </Button>
          <Button
            variant="outline"
            className="gap-2"
          >
            <Bug className="h-4 w-4" />
            Debug
          </Button>
          <Button
            variant="default"
            onClick={handleRunCode}
            disabled={isRunning}
            className="gap-2"
          >
            <Play className="h-4 w-4" />
            Run Code
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          {showProblem && (
            <>
              <ResizablePanel defaultSize={30} minSize={20}>
                <ProblemDescription problemId={problemId} />
              </ResizablePanel>
              <ResizableHandle withHandle />
            </>
          )}
          <ResizablePanel defaultSize={showProblem ? 70 : 100}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={60} minSize={30}>
                <div className="h-full relative">
                  <Editor code={code} setCode={setCode} onDebug={setDebugInfo} />
                  <CodeDebugger suggestions={debugInfo} />
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={40} minSize={20}>
                <div className="h-full grid grid-cols-2 divide-x">
                  <ScrollArea className="h-full">
                    <div className="p-4 space-y-4">
                      <h2 className="font-semibold">Test Cases</h2>
                      <TestCases problemId={problemId} />
                    </div>
                  </ScrollArea>
                  <ScrollArea className="h-full">
                    <div className="p-4 space-y-4">
                      <h2 className="font-semibold">Output</h2>
                      <pre className="font-mono text-sm p-4 rounded-lg bg-muted whitespace-pre-wrap">
                        {output || "Run your code to see the output..."}
                      </pre>
                    </div>
                  </ScrollArea>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default CodeEditor;