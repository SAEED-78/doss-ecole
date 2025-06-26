import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { LogOut, User, Settings, BookOpen } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const StudentNavbar = () => {
  const navigate = useNavigate();
  const studentName = localStorage.getItem('studentName') || 'Étudiant';
  const studentClass = localStorage.getItem('studentClass') || 'Classe';
  const studentId = localStorage.getItem('studentId') || 'ID';

  const handleLogout = () => {
    localStorage.removeItem('isStudentAuthenticated');
    localStorage.removeItem('studentRole');
    localStorage.removeItem('studentName');
    localStorage.removeItem('studentClass');
    localStorage.removeItem('studentId');
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt !",
    });
    navigate('/student-login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-purple-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Espace Étudiant</h1>
              <p className="text-sm text-gray-600">{studentClass} - {studentId}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    {studentName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">{studentName}</p>
                  <p className="text-xs text-muted-foreground">{studentClass}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Paramètres</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
