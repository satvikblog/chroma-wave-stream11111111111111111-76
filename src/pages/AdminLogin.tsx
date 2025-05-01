
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { adminCredentials } from '../lib/adminAuth';
import { useToast } from '@/hooks/use-toast';
import Layout from '../components/Layout';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple timeout to simulate network request
    setTimeout(() => {
      if (email === adminCredentials.email && password === adminCredentials.password) {
        localStorage.setItem('adminAuthenticated', 'true');
        navigate('/admin/dashboard');
        toast({
          title: 'Login successful',
          description: 'Welcome to the admin dashboard',
        });
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid email or password',
          variant: 'destructive',
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Layout showAdminLink={false}>
      <div className="flex justify-center items-center min-h-[70vh]">
        <Card className="w-full max-w-md glassmorphism">
          <CardHeader>
            <CardTitle className="text-2xl font-bold tracking-tight">Admin Login</CardTitle>
            <CardDescription>
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-dark-300/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-dark-300/50"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-neon-green hover:bg-neon-green/90 text-black" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-dark-100/30 border-t-dark-100 rounded-full animate-spin" />
                    Logging in...
                  </div>
                ) : 'Login'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminLogin;
