import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap,
  CalendarIcon,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Enseignants',
    href: '/dashboard/teachers',
    icon: Users,
  },
  {
    title: 'Étudiants',
    href: '/dashboard/students',
    icon: GraduationCap,
  },
  {
    title: 'Emplois du Temps',
    href: '/dashboard/schedule',
    icon: CalendarIcon,
  },
  {
    title: 'Examens',
    href: '/dashboard/exams',
    icon: FileText,
  },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto flex"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-lg transition-colors duration-200",
                      isActive 
                        ? "bg-blue-100 text-blue-700 border border-blue-200" 
                        : "text-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5",
                      isCollapsed ? "mx-auto" : "mr-3"
                    )} />
                    {!isCollapsed && (
                      <span className="font-medium">{item.title}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
