
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BrainCircuit, Code, Home, MessageSquare, Settings, User } from 'lucide-react';
import Dashboard from '@/components/dashboard/Dashboard';

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-card border-r border-border fixed top-0 left-0 h-screen z-30 transition-all duration-300">
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-primary font-bold text-xl mb-8 justify-center md:justify-start"
          >
            <Code className="h-6 w-6" />
            <span className="hidden md:inline">CodeNinja</span>
          </Link>
          
          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {[
              { name: 'Home', icon: Home, active: true },
              { name: 'Challenges', icon: BrainCircuit },
              { name: 'Community', icon: MessageSquare },
              { name: 'Profile', icon: User },
              { name: 'Settings', icon: Settings },
            ].map((item) => (
              <Button
                key={item.name}
                variant={item.active ? 'default' : 'ghost'}
                className={`w-full justify-start mb-1 ${
                  item.active 
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-primary/10 hover:text-primary'
                } ${
                  !item.active && 'text-muted-foreground'
                }`}
              >
                <item.icon className={`h-5 w-5 ${!item.active && 'text-muted-foreground'} mr-0 md:mr-2`} />
                <span className="hidden md:inline">{item.name}</span>
              </Button>
            ))}
          </nav>
          
          {/* User section */}
          <div className="mt-auto pt-6 border-t border-border">
            <div className="flex items-center justify-center md:justify-start gap-3 p-2 rounded-lg">
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                A
              </div>
              <div className="hidden md:block flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Alex Johnson</p>
                <p className="text-xs text-muted-foreground">Pro Member</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 ml-20 md:ml-64 p-6">
        <Dashboard />
      </main>
    </div>
  );
};

export default DashboardPage;
