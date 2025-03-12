import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Senior Developer',
    company: 'TechCorp',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote: 'The AI debugging feature is simply revolutionary. It helped me identify patterns in my code that I never noticed before, making me a much more efficient developer.',
    rating: 5
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Full Stack Engineer',
    company: 'StartupX',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: "I've tried many coding platforms, but this one stands out with its personalized challenges. It's like having a mentor who knows exactly what I need to learn next.",
    rating: 5
  },
  {
    id: 3,
    name: 'Miguel Rodriguez',
    role: 'CS Student',
    company: 'University of Tech',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    quote: "As a student, the progressive difficulty curve helped me build confidence. The leaderboard keeps me motivated to practice daily—I've improved more in 3 months than in my entire year of studies.",
    rating: 4
  },
  {
    id: 4,
    name: 'Priya Sharma',
    role: 'Engineering Lead',
    company: 'GlobalSoft',
    avatar: 'https://randomuser.me/api/portraits/women/63.jpg',
    quote: "We've implemented this platform across our entire engineering team, and the results are remarkable. Our code quality has improved significantly, and onboarding new developers is much faster.",
    rating: 5
  }
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    
    // Reset isAnimating after animation completes
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handlePrevious = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrevious();
    }
    
    setTouchStart(null);
  };

  // Auto-advance testimonials
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      handleNext();
    }, 5000);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeIndex, isAnimating]);

  return (
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground">
            Discover how developers around the world are transforming their coding skills with our platform.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-lg border border-border bg-card p-8 md:p-10">
            <div className="relative z-10">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ease-in-out absolute inset-0 ${
                    index === activeIndex 
                      ? 'opacity-100 translate-x-0' 
                      : 'opacity-0 translate-x-full'
                  }`}
                  style={{ display: index === activeIndex ? 'block' : 'none' }}
                >
                  <div className="md:flex items-start gap-8">
                    <div className="mb-6 md:mb-0">
                      <div className="rounded-lg overflow-hidden h-20 w-20 md:h-24 md:w-24 border border-border">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-lg mb-6">
                        "{testimonial.quote}"
                      </p>
                      
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (isAnimating) return;
                    setIsAnimating(true);
                    setActiveIndex(index);
                    setTimeout(() => setIsAnimating(false), 600);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex 
                      ? 'bg-primary w-4' 
                      : 'bg-primary/30'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 hidden md:flex"
            onClick={handlePrevious}
            disabled={isAnimating}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 hidden md:flex"
            onClick={handleNext}
            disabled={isAnimating}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
