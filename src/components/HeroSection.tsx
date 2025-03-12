
import React from 'react';
import { ArrowRight, BrainCircuit, Code, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-24 flex items-center justify-center overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-80 w-[500px] h-[500px] bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-80 w-[500px] h-[500px] bg-primary/20 rounded-full filter blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
      </div>
      
      <div className="container relative z-10 px-6 py-16 md:py-24 mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Hero content */}
        <div className="flex-1 text-center lg:text-left space-y-6 max-w-xl mx-auto lg:mx-0">
          <span className="inline-block text-sm font-semibold px-4 py-1 rounded-full bg-primary/10 text-primary animate-fade-in">
            Powered by AI
          </span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight animate-fade-in [animation-delay:200ms] text-balance">
            Level Up Your Coding Skills With <span className="text-primary">AI-Powered</span> Insights
          </h1>
          
          <p className="text-lg text-muted-foreground animate-fade-in [animation-delay:400ms] text-balance">
            Master programming through personalized challenges, real-time AI feedback, and competitive leaderboards. Join the community of developers enhancing their skills every day.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 animate-fade-in [animation-delay:600ms]">
            <Link to="/dashboard">
              <Button size="lg" className="rounded-full px-6 h-12 text-base font-medium group">
                Start Coding Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/#features">
              <Button variant="outline" size="lg" className="rounded-full px-6 h-12 text-base font-medium">
                Explore Features
              </Button>
            </Link>
          </div>
          
          {/* Stats - Displayed in a subtle horizontal line */}
          <div className="hidden md:flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-border mt-8 animate-fade-in [animation-delay:800ms]">
            {[
              { label: 'Active Users', value: '50K+' },
              { label: 'Challenges', value: '2,500+' },
              { label: 'Skills Improved', value: '92%' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Hero image/illustration */}
        <div className="flex-1 w-full max-w-lg animate-fade-in [animation-delay:500ms]">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden glass-dark p-1">
            <div className="absolute top-0 left-0 w-full h-12 z-10 flex items-center px-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="w-full h-full bg-card rounded-xl overflow-hidden">
              <pre className="text-xs sm:text-sm text-left p-4 pt-14 font-mono overflow-hidden h-full">
                <code className="language-javascript">
{`// AI-powered debugging suggestion
function calculateTotalPrice(items) {
  let total = 0;
  
  // AI hint: Use reduce for cleaner code
  items.forEach(item => {
    total += item.price * item.quantity;
  });
  
  /* Alternative using reduce:
  const total = items.reduce((sum, item) => 
    sum + (item.price * item.quantity), 0);
  */
  
  // Apply discount if applicable
  if (total > 100) {
    total = total * 0.9; // 10% discount
  }
  
  return total.toFixed(2);
}

// AI suggests handling edge cases
function validateUserInput(code) {
  /* AI detected potential issues:
   * - Missing null check
   * - Security vulnerability in eval() 
   * - Performance optimization possible
   */
  
  // Let me help you fix these issues...
  
  // Suggestion: Add proper validation
  if (!code || typeof code !== 'string') {
    return { isValid: false, error: 'Invalid input' };
  }
  
  return { isValid: true, optimizedCode: '...' };
}`}
                </code>
              </pre>
            </div>
            {/* AI assistant floating element */}
            <div className="absolute bottom-4 right-4 glass px-4 py-3 rounded-full text-sm font-medium flex items-center gap-2 animate-float">
              <BrainCircuit className="h-4 w-4 text-primary" />
              <span>AI Assistant Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
