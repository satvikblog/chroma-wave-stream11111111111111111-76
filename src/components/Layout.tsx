
import { ReactNode } from 'react';
import ParticlesBackground from './ParticlesBackground';
import { Link } from 'react-router-dom';
import { Command, Terminal, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface LayoutProps {
  children: ReactNode;
  showAdminLink?: boolean;
}

const Layout = ({ children, showAdminLink = true }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <ParticlesBackground />
      
      <header className="glassmorphism sticky top-0 z-10 border-b border-neon-green/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-neon-green/20 p-2 rounded-lg border border-neon-green/30">
              <Terminal className="h-6 w-6 text-neon-green" />
            </div>
            <span className="text-2xl font-bold text-neon-green text-glow tracking-tight">
              HackOps Streaming
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm hover:text-neon-green transition-colors">Home</Link>
            <Link to="/#featured" className="text-sm hover:text-neon-green transition-colors">Featured</Link>
            <Link to="/#about" className="text-sm hover:text-neon-green transition-colors">About</Link>
            
            {showAdminLink && (
              <Button 
                variant="outline" 
                className="border-neon-green/30 hover:border-neon-green/60 hover:bg-neon-green/10"
                asChild
              >
                <Link to="/admin">
                  <Command className="mr-2 h-4 w-4" />
                  Admin Panel
                </Link>
              </Button>
            )}
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="glassmorphism border-l border-neon-green/20">
              <div className="flex flex-col gap-6 mt-8">
                <Link to="/" className="flex items-center gap-2 text-neon-green hover:text-neon-green/80 transition-colors">Home</Link>
                <Link to="/#featured" className="flex items-center gap-2 text-neon-green hover:text-neon-green/80 transition-colors">Featured</Link>
                <Link to="/#about" className="flex items-center gap-2 text-neon-green hover:text-neon-green/80 transition-colors">About</Link>
                
                {showAdminLink && (
                  <Button 
                    variant="outline" 
                    className="border-neon-green/30 hover:border-neon-green/60 hover:bg-neon-green/10 w-full justify-start"
                    asChild
                  >
                    <Link to="/admin">
                      <Command className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="glassmorphism border-t border-neon-green/20 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-neon-green font-bold mb-4 flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                HackOps Streaming
              </h3>
              <p className="text-sm text-muted-foreground">
                The ultimate platform for cybersecurity tutorials and hacking courses.
                Learn from the best in the industry.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <div className="grid grid-cols-2 gap-2">
                <Link to="/" className="text-sm text-muted-foreground hover:text-neon-green transition-colors">Home</Link>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-neon-green transition-colors">About</Link>
                <Link to="/courses" className="text-sm text-muted-foreground hover:text-neon-green transition-colors">All Courses</Link>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-neon-green transition-colors">Contact</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground hover:text-neon-green transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-neon-green transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-muted-foreground hover:text-neon-green transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-neon-green/10 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HackOps Streaming. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
