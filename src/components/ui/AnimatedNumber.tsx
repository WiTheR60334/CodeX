
import React, { useState, useEffect } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  formatter?: (value: number) => string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1000,
  className = '',
  formatter = (num) => Math.round(num).toString(),
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    let startTime: number | null = null;
    const startValue = displayValue;
    const endValue = value;
    const change = endValue - startValue;
    
    const animateValue = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Use easeOutQuart for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      const currentValue = startValue + change * easeOutQuart;
      
      setDisplayValue(currentValue);
      
      if (progress < duration) {
        window.requestAnimationFrame(animateValue);
      } else {
        setDisplayValue(endValue);
      }
    };
    
    window.requestAnimationFrame(animateValue);
    
    return () => {
      startTime = null;
    };
  }, [value, duration]);
  
  return <span className={className}>{formatter(displayValue)}</span>;
};

export default AnimatedNumber;
