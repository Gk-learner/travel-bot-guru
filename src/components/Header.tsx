
import React from 'react';
import { PlaneLanding } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 w-full border-b border-border/40 bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <PlaneLanding className="h-6 w-6 text-primary" />
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-medium text-xl tracking-tight">TravelAI</span>
            <span className="text-xs text-muted-foreground sm:ml-2">Powered by Gemini 1.5 Flash</span>
          </div>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium">
            Home
          </a>
          <a href="#" className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium">
            Destinations
          </a>
          <a href="#" className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium">
            About
          </a>
          <a href="#" className="text-foreground/80 hover:text-primary transition-colors text-sm font-medium">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
