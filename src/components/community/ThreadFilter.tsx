
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  SlidersHorizontal, 
  ArrowDownUp,
  BadgeCheck,
  FileQuestion,
  Code,
  Sparkles
} from "lucide-react";
import { Input } from "@/components/ui/input";

const CategoryButton = ({ 
  icon, 
  label, 
  isActive = false, 
  onClick 
}: { 
  icon: React.ReactNode; 
  label: string; 
  isActive?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      size="sm"
      className={`h-9 gap-1.5 rounded-full ${
        isActive ? "bg-primary text-primary-foreground" : "invert-bg-primary invert-text-primary-foreground"
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
};

interface ThreadFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSearch: (query: string) => void;
}

export const ThreadFilter = ({ 
  selectedCategory, 
  onSelectCategory,
  onSearch
}: ThreadFilterProps) => {
  return (
    <Card className="mb-6 border">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search discussions..." 
              className="pl-9 pr-4 py-2 h-10"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-2">
              <CategoryButton 
                icon={<Sparkles className="h-4 w-4" />} 
                label="All" 
                isActive={selectedCategory === "all"}
                onClick={() => onSelectCategory("all")}
              />
              <CategoryButton 
                icon={<Code className="h-4 w-4" />} 
                label="Algorithms" 
                isActive={selectedCategory === "algorithms"}
                onClick={() => onSelectCategory("algorithms")}
              />
              <CategoryButton 
                icon={<FileQuestion className="h-4 w-4" />} 
                label="Questions" 
                isActive={selectedCategory === "questions"}
                onClick={() => onSelectCategory("questions")}
              />
              <CategoryButton 
                icon={<BadgeCheck className="h-4 w-4" />} 
                label="Solutions" 
                isActive={selectedCategory === "solutions"}
                onClick={() => onSelectCategory("solutions")}
              />
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-9 gap-1.5">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
              <Button variant="outline" size="sm" className="h-9 gap-1.5">
                <ArrowDownUp className="h-4 w-4" />
                <span className="hidden sm:inline">Sort</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
