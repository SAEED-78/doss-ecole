
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface StudentProtectedRouteProps {
  children: ReactNode;
}

const StudentProtectedRoute = ({ children }: StudentProtectedRouteProps) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isStudentAuthenticated') === 'true';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/student-login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default StudentProtectedRoute;
