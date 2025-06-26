
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, BookOpen } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const StudentLogin = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation d'une authentification étudiant
    setTimeout(() => {
      if (studentId === 'student123' && password === 'password') {
        localStorage.setItem('isStudentAuthenticated', 'true');
        localStorage.setItem('studentRole', 'student');
        localStorage.setItem('studentName', 'Marie Dubois');
        localStorage.setItem('studentClass', 'L2 Informatique');
        localStorage.setItem('studentId', 'ETU2024001');
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans votre espace étudiant",
        });
        navigate('/student-dashboard');
      } else {
        toast({
          title: "Erreur de connexion",
          description: "Numéro étudiant ou mot de passe incorrect",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Espace Étudiant</h1>
          <p className="text-gray-600 mt-2">Accédez à vos cours et résultats</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/80 shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Connexion Étudiant</CardTitle>
            <CardDescription className="text-center">
              Connectez-vous avec votre numéro étudiant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Numéro Étudiant</Label>
                <Input
                  id="studentId"
                  type="text"
                  placeholder="student123"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700 transition-all duration-200"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Connexion...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LogIn className="w-4 h-4 mr-2" />
                    Se connecter
                  </div>
                )}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Compte de test: student123 / password
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentLogin;
