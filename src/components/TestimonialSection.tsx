
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
    <section id="testimonials" className="py-20 relative">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/5 rounded-full filter blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold animate-fade-in">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 animate-fade-in [animation-delay:200ms]">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground animate-fade-in [animation-delay:300ms]">
            Discover how developers around the world are transforming their coding skills with our platform.
          </p>
        </div>
        
        <div 
          className="relative max-w-4xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Testimonial carousel */}
          <div className="relative overflow-hidden rounded-2xl glass-dark p-6 md:p-10">
            <Quote className="absolute top-6 left-6 h-10 w-10 text-primary/20" />
            
            <div className="relative z-10">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`transition-all duration-500 ease-in-out absolute top-0 left-0 w-full ${
                    index === activeIndex 
                      ? 'opacity-100 translate-x-0' 
                      : index < activeIndex || (activeIndex === 0 && index === testimonials.length - 1)
                        ? 'opacity-0 -translate-x-full' 
                        : 'opacity-0 translate-x-full'
                  }`}
                  style={{ display: index === activeIndex ? 'block' : 'none' }}
                >
                  <div className="md:flex items-start gap-6 md:gap-10">
                    <div className="mb-6 md:mb-0 flex-shrink-0">
                      <div className="rounded-xl overflow-hidden h-24 w-24 md:h-28 md:w-28 border-2 border-primary/20">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-lg md:text-xl mb-6 text-balance">
                        "{testimonial.quote}"
                      </p>
                      
                      <div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-5 w-5 ${i < testimonial.rating ? 'text-primary' : 'text-muted'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation dots */}
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
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === activeIndex 
                      ? 'bg-primary w-6' 
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Navigation arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full glass hidden md:flex"
            onClick={handlePrevious}
            disabled={isAnimating}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full glass hidden md:flex"
            onClick={handleNext}
            disabled={isAnimating}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
