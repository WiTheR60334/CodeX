
import React from 'react';
import { BrainCircuit, Trophy, Code, ListChecks } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => (
  <div 
    className={`p-6 rounded-2xl glass-dark flex flex-col items-start animate-fade-in`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="p-2 rounded-xl bg-primary/10 text-primary mb-5">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const FeatureSection = () => {
  const features = [
    {
      icon: <BrainCircuit className="h-6 w-6" />,
      title: 'AI-Powered Debugging',
      description: 'Get instant feedback on your code with AI that identifies bugs, suggests optimizations, and explains solutions.',
      delay: 100
    },
    {
      icon: <ListChecks className="h-6 w-6" />,
      title: 'Personalized Challenges',
      description: 'Receive coding challenges tailored to your skill level and learning goals, with adaptive difficulty progression.',
      delay: 200
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: 'Live Coding Contests',
      description: 'Participate in real-time competitions against other developers to solve problems under time pressure.',
      delay: 300
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: 'Leaderboard System',
      description: 'Track your progress, earn badges, and compete with peers on global and personalized leaderboards.',
      delay: 400
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      {/* Background accent */}
      <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-background to-transparent z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold animate-fade-in">
            Platform Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 animate-fade-in [animation-delay:200ms]">
            Everything You Need to Excel
          </h2>
          <p className="text-muted-foreground animate-fade-in [animation-delay:300ms]">
            Our platform combines cutting-edge AI technology with proven learning methodologies to 
            accelerate your coding mastery and development skills.
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
        
        {/* Feature showcase */}
        <div className="mt-20 rounded-2xl glass-dark p-4 sm:p-8 animate-fade-in [animation-delay:500ms] mb-[-5rem] sm:mb-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Real-time AI Feedback</h3>
              <p className="text-muted-foreground">
                Our AI doesn't just identify errors—it teaches you how to think better. 
                Get contextual suggestions that explain not just what's wrong, but why, and how to improve.
              </p>
              
              <ul className="space-y-3">
                {[
                  'Detects logical errors and edge cases',
                  'Suggests performance optimizations',
                  'Explains solutions with detailed breakdowns',
                  'Adapts to your coding style and skill level'
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative h-[300px] aspect-video w-full rounded-xl overflow-hidden glass p-1">
              <div className="relative w-full h-full bg-card rounded-lg border-2 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-10 flex items-center gap-2 px-4 border-b border-border">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-xs ml-2 text-muted-foreground">debugSession.js</div>
                </div>
                
                <div className="p-4 pt-12 h-full font-mono text-xs relative">
                  <pre className="text-left">
                    <code>{`function mergeArrays(arr1, arr2) {
  // AI FEEDBACK: This could cause unexpected
  // behavior if inputs are not arrays
  return [...arr1, ...arr2].sort();
}

// AI SUGGESTION:
function improvedMergeArrays(arr1, arr2) {
  // Validate inputs are arrays
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    throw new TypeError("Both arguments must be arrays");
  }
  
  // More efficient to concatenate then sort once
  return [...arr1, ...arr2].sort((a, b) => {
    // Handle different data types consistently
    return String(a).localeCompare(String(b));
  });
}

// AI PERFORMANCE HINT:
// For very large arrays, consider:
// 1. Using a more efficient sorting algorithm
// 2. Potentially using a Set to remove duplicates`}</code>
                  </pre>
                  
                  {/* AI analysis popup */}
                  <div className="hidden sm:block absolute bottom-4 right-4 glass-dark px-3 py-2 rounded-lg text-xs max-w-[220px] backdrop-blur-md border-2 border-border animate-float">
                    <div className="flex items-center gap-2 mb-2">
                      <BrainCircuit className="h-3.5 w-3.5 text-primary" />
                      <span className="font-semibold">AI Analysis</span>
                    </div>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      Your function needs input validation and could have better sorting logic for mixed data types.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
