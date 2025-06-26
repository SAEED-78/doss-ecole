
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, BookOpen, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-100 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">UTT-LOKO</span>
            </div>
       
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-500 mb-8 ">
            Système de Gestion
            {/* <span className="block  text-slate-200">Academique</span> */}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Une plateforme complète pour gérer votre établissement scolaire, 
            vos enseignants, étudiants et emplois du temps en toute simplicité.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto">
                <Users className="w-5 h-5 mr-2" />
                Accès Administrateur
              </Button>
            </Link>
            <Link to="/teacher-login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <BookOpen className="w-5 h-5 mr-2" />
                Espace Enseignant
              </Button>
            </Link>
            <Link to="/student-login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <GraduationCap className="w-5 h-5 mr-2" />
                Espace Étudiant
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>Gestion Administrateur</CardTitle>
              <CardDescription>
                Gérez les enseignants, étudiants et l'ensemble du système
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Gestion des utilisateurs</li>
                <li>• Tableau de bord complet</li>
                <li>• Rapports et statistiques</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <BookOpen className="w-12 h-12 text-green-600 mb-4" />
              <CardTitle>Espace Enseignant</CardTitle>
              <CardDescription>
                Outils dédiés pour les enseignants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Gestion des notes</li>
                <li>• Suivi des présences</li>
                <li>• Liste des étudiants</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <GraduationCap className="w-12 h-12 text-purple-600 mb-4" />
              <CardTitle>Espace Étudiant</CardTitle>
              <CardDescription>
                Accès personnalisé pour les étudiants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Emploi du temps</li>
                <li>• Consultation des notes</li>
                <li>• Résultats et moyennes</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <Calendar className="w-12 h-12 text-orange-600 mb-4" />
              <CardTitle>Emplois du Temps</CardTitle>
              <CardDescription>
                Planification et organisation des cours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Planification automatique</li>
                <li>• Gestion des salles</li>
                <li>• Vue par classe</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
