
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface TeacherProtectedRouteProps {
  children: ReactNode;
}

const TeacherProtectedRoute = ({ children }: TeacherProtectedRouteProps) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isTeacherAuthenticated') === 'true';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/teacher-login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default TeacherProtectedRoute;
