
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const CreateThread = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <Card className="mb-6 animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Community Forum</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground">
          Discuss coding problems, share your solutions, and learn from other developers.
        </p>
      </CardContent>
      <CardFooter>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full gap-2 bg-primary text-primary-foreground">
              <PlusCircle className="h-4 w-4" />
              <span>Create New Discussion</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Create a new discussion</DialogTitle>
              <DialogDescription>
                Share your thoughts, questions, or solutions with the community.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="E.g., How to optimize this algorithm?" className="w-full" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <select 
                  id="category" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="question">Question</option>
                  <option value="discussion">Discussion</option>
                  <option value="solution">Solution</option>
                  <option value="best-practice">Best Practice</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (separated by commas)</Label>
                <Input id="tags" placeholder="E.g., python, algorithms, dynamic-programming" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  placeholder="Write your discussion here..." 
                  className="min-h-32"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="bg-primary text-primary-foreground"
                onClick={() => {
                  // Implementation for submitting the form would go here
                  setOpen(false);
                }}
              >
                Post Discussion
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
