
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EditorProps {
  code: string;
  setCode: (code: string) => void;
  onDebug?: (suggestions: string[]) => void;
}

const Editor = ({ code, setCode, onDebug }: EditorProps) => {
  const [lineNumbers, setLineNumbers] = useState<number[]>([1]);
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    const lines = code.split("\n").length;
    setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1));

    // Enhanced syntax error detection
    const checkSyntax = () => {
      const suggestions: string[] = [];
      
      try {
        // Check for basic syntax errors
        new Function(code);
      } catch (error: any) {
        const errorMessage = error.toString();
        suggestions.push(`Syntax Error: ${errorMessage}`);
        
        // Add AI suggestions based on common errors
        if (errorMessage.includes("unexpected token")) {
          suggestions.push("Tip: Check for missing brackets, parentheses, or semicolons");
          
          // Suggest specific fixes based on the code
          if (code.includes('{') && !code.includes('}')) {
            suggestions.push("Fix: You may be missing a closing curly brace '}'");
          }
          if (code.includes('(') && !code.includes(')')) {
            suggestions.push("Fix: You may be missing a closing parenthesis ')'");
          }
        }
        if (errorMessage.includes("is not defined")) {
          const match = errorMessage.match(/'([^']+)' is not defined/);
          if (match && match[1]) {
            suggestions.push(`Fix: Define variable '${match[1]}' before using it, or check for typos`);
          }
        }
      }

      // Check for common coding patterns and optimizations
      if (code.includes("console.log")) {
        suggestions.push("Note: Remember to remove debugging console.log statements before submission");
      }
      
      // For Two Sum problem specific suggestions
      if (code.includes("for") && code.includes("for") && code.match(/for.*for/s)) {
        suggestions.push("Optimization: Consider using a HashMap to avoid nested loops and achieve O(n) time complexity");
      }
      
      if (code.includes("return") && !code.includes("return [")) {
        suggestions.push("Hint: For the Two Sum problem, remember to return an array of indices");
      }

      onDebug?.(suggestions);
    };

    const debounceTimeout = setTimeout(checkSyntax, 500);
    return () => clearTimeout(debounceTimeout);
  }, [code, onDebug]);

  return (
    <div className="h-full relative bg-background flex flex-col">
      <div className="border-b p-2 flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <span className="text-sm font-medium">Code</span>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-xs rounded border border-input bg-transparent px-2 py-1"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button className="text-xs px-2 py-1 rounded border border-input bg-transparent">Auto</button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex">
          <div className="p-4 bg-muted text-muted-foreground text-right select-none w-12 font-mono text-sm">
            {lineNumbers.map((num) => (
              <div key={num}>{num}</div>
            ))}
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-4 font-mono text-sm bg-transparent outline-none resize-none min-h-full"
            placeholder="Write your code here..."
            spellCheck={false}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default Editor;
