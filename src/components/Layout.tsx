
import { ReactNode } from 'react';
import ParticlesBackground from './ParticlesBackground';
import { Link } from 'react-router-dom';
import { Terminal, Menu } from 'lucide-react';
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
      
      <header className="enhanced-glassmorphism sticky top-0 z-10 border-b border-neon-green/30">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-neon-green/20 p-2 rounded-lg border border-neon-green/30 neon-border">
              <Terminal className="h-6 w-6 text-neon-green" />
            </div>
            <span className="text-2xl font-bold text-neon-green text-glow tracking-tight">
              HackOps Streaming
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm hover:text-neon-green transition-colors">Home</Link>
            
            <Button 
              variant="outline" 
              className="border-neon-green/30 hover:border-neon-green/60 hover:bg-neon-green/10 neon-border"
              asChild
            >
              <a href="https://hackops.tech" target="_blank" rel="noopener noreferrer">
                HackOps BootCamp 2025
              </a>
            </Button>
            
            {showAdminLink && (
              <Button 
                variant="outline" 
                className="border-neon-green/30 hover:border-neon-green/60 hover:bg-neon-green/10 neon-border"
                asChild
              >
                <Link to="/admin">
                  <Terminal className="mr-2 h-4 w-4" />
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
            <SheetContent className="enhanced-glassmorphism border-l border-neon-green/30">
              <div className="flex flex-col gap-6 mt-8">
                <Link to="/" className="flex items-center gap-2 text-neon-green hover:text-neon-green/80 transition-colors">Home</Link>
                
                <Button 
                  variant="outline" 
                  className="border-neon-green/30 hover:border-neon-green/60 hover:bg-neon-green/10 neon-border w-full justify-start"
                  asChild
                >
                  <a href="https://hackops.tech" target="_blank" rel="noopener noreferrer">
                    HackOps BootCamp 2025
                  </a>
                </Button>
                
                {showAdminLink && (
                  <Button 
                    variant="outline" 
                    className="border-neon-green/30 hover:border-neon-green/60 hover:bg-neon-green/10 neon-border w-full justify-start"
                    asChild
                  >
                    <Link to="/admin">
                      <Terminal className="mr-2 h-4 w-4" />
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
      
      <footer className="enhanced-glassmorphism border-t border-neon-green/30 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            
            <div className="flex justify-end items-center">
              <Button 
                variant="outline" 
                className="border-neon-green/30 hover:border-neon-green/60 hover:bg-neon-green/10 neon-border"
                asChild
              >
                <a href="https://hackops.tech" target="_blank" rel="noopener noreferrer">
                  HackOps BootCamp 2025
                </a>
              </Button>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-neon-green/20 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} HackOps Streaming. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
