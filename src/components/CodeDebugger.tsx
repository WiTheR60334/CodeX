
import { useEffect, useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Lightbulb, AlertTriangle, Info, AlertCircle } from 'lucide-react';

interface CodeDebuggerProps {
  suggestions: string[];
}

export const CodeDebugger = ({ suggestions }: CodeDebuggerProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(suggestions.length > 0);
  }, [suggestions]);

  if (!isVisible) return null;

  const getIcon = (suggestion: string) => {
    if (suggestion.startsWith('Syntax Error:')) {
      return <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />;
    } else if (suggestion.startsWith('Fix:')) {
      return <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />;
    } else if (suggestion.startsWith('Tip:') || suggestion.startsWith('Hint:')) {
      return <Lightbulb className="h-4 w-4 text-yellow-400 flex-shrink-0" />;
    } else if (suggestion.startsWith('Optimization:')) {
      return <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />;
    } else {
      return <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />;
    }
  };

  return (
    <div className="absolute bottom-4 right-4 w-80 bg-background border rounded-lg shadow-lg overflow-hidden">
      <div className="p-2 border-b flex items-center justify-between">
        <h3 className="font-semibold text-sm flex items-center gap-1">
          <Lightbulb className="h-4 w-4 text-yellow-400" />
          AI Suggestions
        </h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="h-6 w-6 rounded-full inline-flex items-center justify-center text-muted-foreground hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <ScrollArea className="max-h-[300px]">
        <div className="p-3 space-y-2">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex gap-2 p-2 text-sm rounded-md border bg-background/80">
              {getIcon(suggestion)}
              <span>{suggestion}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
