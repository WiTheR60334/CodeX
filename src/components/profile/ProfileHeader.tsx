
import { Button } from "@/components/ui/button";
import { User, Settings, Award } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProfileHeaderProps {
  username: string;
  bio: string;
  level: string;
  profileImage?: string;
}

export const ProfileHeader = ({ username, bio, level, profileImage }: ProfileHeaderProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mb-8 animate-fade-in">
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* This first row will be visible on mobile only - contains image + name/level */}
          <div className="flex items-center gap-4 w-full sm:hidden">
            <div className="relative h-20 w-20 rounded-full bg-secondary flex items-center justify-center overflow-hidden flex-shrink-0">
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt={username} 
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <img 
                  src="data:image/jpeg;base64,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" 
                  alt={username} 
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                // <User className="h-10 w-10 text-muted-foreground" />
              )}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            <div className="flex-col items-start gap-2">
              <h1 className="text-2xl font-bold tracking-tight">{username}</h1>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-3 py-1 text-xs font-medium mt-2">
                <Award className="h-3 w-3" />
                {level}
              </div>
            </div>
          </div>
          
          {/* This is for desktop layout - the image */}
          <div className="relative h-20 w-20 rounded-full bg-secondary flex-shrink-0 hidden sm:flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt={username} 
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <img 
                  src="data:image/jpeg;base64,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" 
                  alt={username} 
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                // <User className="h-10 w-10 text-muted-foreground" />
            )}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              {/* This is for desktop layout - name and level */}
              <div className="hidden sm:block">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold tracking-tight">{username}</h1>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground ml-2 px-3 py-1 text-xs font-medium">
                    <Award className="h-3 w-3" />
                    {level}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{bio}</p>
              </div>
              
              {/* This is mobile only - bio appears below name/level */}
              <div className="sm:hidden">
                <p className="text-sm text-muted-foreground mt-1">{bio}</p>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="sm:self-start rounded-full gap-2"
              >
                <Settings className="h-4 w-4" />
                <span>{isMobile ? "Settings" : "Account Settings"}</span>
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex gap-1 items-center">
                <div className="font-medium">32</div>
                <div className="text-sm text-muted-foreground">Following</div>
              </div>
              <div className="flex gap-1 items-center">
                <div className="font-medium">218</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </div>
              <div className="flex gap-1 items-center">
                <div className="font-medium">164</div>
                <div className="text-sm text-muted-foreground">Solutions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};