
import { ReactNode } from 'react';
import ParticlesBackground from './ParticlesBackground';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
  showAdminLink?: boolean;
}

const Layout = ({ children, showAdminLink = true }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <ParticlesBackground />
      
      <header className="glassmorphism sticky top-0 z-10 border-b border-neon-green/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-neon-green text-glow tracking-tight">
              ChromaStream
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            {showAdminLink && (
              <Link 
                to="/admin" 
                className="text-sm px-4 py-2 rounded-lg border border-neon-green/20 hover:border-neon-green/50 transition-all hover:bg-neon-green/10"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="glassmorphism border-t border-neon-green/10 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} ChromaStream. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
