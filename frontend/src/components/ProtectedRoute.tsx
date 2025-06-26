import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      <div className="flex">
        {/* <Sidebar /> */}
        <main className="flex-1 p-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProtectedRoute;
