import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ThumbsUp, ThumbsDown, Share, Flag, CheckCheck } from "lucide-react";
import { useState } from "react";
import { ThreadTagProps } from "@/pages/Community";

const ThreadTag = ({ name, color = "default" }: ThreadTagProps) => {
  const getColorClasses = () => {
    switch (color) {
      case "algorithm":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "debugging":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case "python":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "javascript":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "java":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200";
      case "best-practice":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-secondary text-secondary-foreground hover:bg-secondary/80";
    }
  };
  
  return (
    <Badge variant="outline" className={`rounded-full font-normal ${getColorClasses()}`}>
      {name}
    </Badge>
  );
};

interface DiscussionThreadProps {
  user: {
    name: string;
    avatar?: string;
    reputation: number;
  };
  title: string;
  content: string;
  tags: ThreadTagProps[];
  timestamp: string;
  replies: number;
  upvotes: number;
  isBestAnswer?: boolean;
}

export const DiscussionThread = ({
  user,
  title,
  content,
  tags,
  timestamp,
  replies,
  upvotes,
  isBestAnswer = false,
}: DiscussionThreadProps) => {
  const [votes, setVotes] = useState(upvotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  
  const handleVote = (type: 'up' | 'down') => {
    if (userVote === type) {
      setUserVote(null);
      setVotes(type === 'up' ? votes - 1 : votes + 1);
    } else {
      if (userVote === 'up' && type === 'down') {
        setVotes(votes - 2);
      } else if (userVote === 'down' && type === 'up') {
        setVotes(votes + 2);
      } else {
        setVotes(type === 'up' ? votes + 1 : votes - 1);
      }
      setUserVote(type);
    }
  };
  
  return (
    <Card className={`mb-4 transition-all hover:shadow-md overflow-hidden animate-fade-in-up ${isBestAnswer ? 'border-green-500 border-2' : ''}`}>
      {isBestAnswer && (
        <div className="w-full bg-green-500 text-white text-xs font-medium py-1 px-4 flex items-center gap-1">
          <CheckCheck className="h-3 w-3" />
          Best Answer
        </div>
      )}
      <CardHeader className="py-4 space-y-0 flex flex-row justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <span>Rep: {user.reputation}</span>
              <span className="text-muted-foreground">•</span>
              <span>{timestamp}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          {tags.map((tag, index) => (
            <ThreadTag key={index} name={tag.name} color={tag.color} />
          ))}
        </div>
      </CardHeader>
      <CardContent className="py-0">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3">{content}</p>
      </CardContent>
      <CardFooter className="py-3 flex justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${userVote === 'up' ? 'text-green-500' : ''}`}
              onClick={() => handleVote('up')}
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{votes}</span>
            <Button
              variant="ghost"
              size="icon"
              className={`h-8 w-8 ${userVote === 'down' ? 'text-red-500' : ''}`}
              onClick={() => handleVote('down')}
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="gap-1.5 h-8 text-xs">
            <MessageSquare className="h-4 w-4" />
            <span>{replies} {replies === 1 ? 'Reply' : 'Replies'}</span>
          </Button>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Flag className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
