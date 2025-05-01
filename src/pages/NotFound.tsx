
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "../components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <h1 className="text-8xl font-bold text-neon-green text-glow">404</h1>
        <h2 className="text-2xl font-medium mt-6 mb-4">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="bg-neon-green hover:bg-neon-green/90 text-black">
            Return to Home
          </Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
