
import React from 'react';
import { ArrowRight, CpuIcon, Clock, Users, Flame } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export interface ChallengeProps {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  participants: number;
  tags: string[];
  popularity: number;
  imageUrl?: string;
}

const difficultyColor = {
  easy: 'bg-green-500/10 text-green-500',
  medium: 'bg-orange-500/10 text-orange-500',
  hard: 'bg-red-500/10 text-red-500',
};

const ChallengeCard: React.FC<ChallengeProps> = ({
  id,
  title,
  description,
  difficulty,
  estimatedTime,
  participants,
  tags,
  popularity,
  imageUrl,
}) => {
  return (
    <Card className="rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20 animate-fade-in relative group">
      {/* Difficulty indicator */}
      <div className={`absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-xs font-medium ${difficultyColor[difficulty]}`}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </div>
      
      {/* Optional image */}
      {imageUrl && (
        <div className="h-40 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        </div>
      )}
      
      <CardHeader className={`${imageUrl ? 'pt-4 pb-3' : 'pt-6 pb-3'}`}>
        <div className="space-y-1.5">
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs rounded-full px-2">
                {tag}
              </Badge>
            ))}
          </div>
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between pt-0 pb-4">
        <div className="flex gap-3 text-xs text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1" />
            {estimatedTime}
          </div>
          <div className="flex items-center">
            <Users className="h-3.5 w-3.5 mr-1" />
            {participants}
          </div>
          <div className="flex items-center">
            <Flame className="h-3.5 w-3.5 mr-1" />
            <span>{popularity}</span>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" className="p-0 h-8 w-8 rounded-full">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
