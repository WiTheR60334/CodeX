
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { StatisticsOverview } from "@/components/profile/StatisticsOverview";
import { ProgressChart } from "@/components/profile/ProgressChart";
import { AchievementBadges } from "@/components/profile/AchievementBadges";
import { LanguageProficiency } from "@/components/profile/LanguageProficiency";
import Navbar from "@/components/Navbar";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="container py-8 mt-[5rem]">
        <ProfileHeader 
          username="Romir"
          bio="Software Engineer | Algorithm Enthusiast | Open Source Contributor"
          level="Expert Coder"
        />
        
        <Tabs defaultValue="progress" className="mb-8">
          <TabsList className="w-full max-w-md grid grid-cols-4 h-11 p-1 mb-8">
            <TabsTrigger value="progress" className="text-sm">Progress</TabsTrigger>
            <TabsTrigger value="solutions" className="text-sm">Solutions</TabsTrigger>
            <TabsTrigger value="favorites" className="text-sm">Favorites</TabsTrigger>
            <TabsTrigger value="activity" className="text-sm">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress" className="mt-0 space-y-4">
            <StatisticsOverview />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ProgressChart />
              <LanguageProficiency />
            </div>
            
            <AchievementBadges />
            
            <div className="py-6 text-center">
              <h3 className="text-lg font-medium mb-2">Your Coding Rank</h3>
              <div className="inline-flex items-center justify-center gap-2 bg-secondary rounded-full px-4 py-2">
                <span className="text-sm">You are in the</span>
                <span className="text-2xl font-bold">Top 5%</span>
                <span className="text-sm">of all coders</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="solutions">
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Your solutions will appear here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="favorites">
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Your favorite problems will appear here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="activity">
            <div className="py-12 text-center">
              <p className="text-muted-foreground">Your recent activity will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
