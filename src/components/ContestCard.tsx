
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContestCardProps {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  participants: number;
  isUpcoming?: boolean;
}

const ContestCard = ({
  id,
  title,
  description,
  startDate,
  endDate,
  difficulty,
  participants,
  isUpcoming = false,
}: ContestCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getDifficultyClass = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    switch (difficulty) {
      case 'Easy':
        return 'tag-easy';
      case 'Medium':
        return 'tag-medium';
      case 'Hard':
        return 'tag-hard';
      default:
        return '';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getContestStatus = () => {
    const now = new Date();
    
    if (startDate > now) {
      const diffTime = Math.abs(startDate.getTime() - now.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      if (diffDays > 0) {
        return `Starts in ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
      } else {
        return `Starts in ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
      }
    } else if (endDate > now) {
      return 'In progress';
    } else {
      return 'Ended';
    }
  };

  return (
    <motion.div 
      className="rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/20 animate-fade-in border border-[hsl(var(--border))]"
      whileHover={{ y: -4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/contests/${id}`} className="block p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className={`tag ${getDifficultyClass(difficulty)}`}>{difficulty}</span>
            {isUpcoming && (
              <span className="tag ml-8 rounded-full px-4 py-1 font-medium bg-secondary border border-transparent text-sm">Upcoming</span>
            )}
          </div>
          <motion.div
            animate={{ rotate: isHovered ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight className="h-5 w-5 text-gray-400" />
          </motion.div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground  mb-4 line-clamp-2">{description}</p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground ">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {formatDate(startDate)}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground ">
            <Clock className="h-4 w-4 mr-2" />
            <span>{getContestStatus()}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground ">
            <Users className="h-4 w-4 mr-2" />
            <span>{participants} participant{participants !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ContestCard;