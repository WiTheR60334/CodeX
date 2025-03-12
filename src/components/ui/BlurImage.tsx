
import React, { useState, useEffect } from 'react';

interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
}

const BlurImage: React.FC<BlurImageProps> = ({ src, alt, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setError(false);
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      setError(true);
      setIsLoaded(true); // We still want to remove the blur effect even if there's an error
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <div className={`overflow-hidden relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-card animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
      />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <span className="text-sm text-muted-foreground">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default BlurImage;
