import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, GraduationCap, BookOpen, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import React, { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

type DashboardProps = {
  children?: ReactNode;
};

const Dashboard = ({ children }: DashboardProps) => {
  const navigate = useNavigate();
  const stats = [
    {
      title: 'Total Enseignants',
      value: '48',
      description: '+2 ce mois',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Étudiants',
      value: '120',
      description: '+12 ce mois',
      icon: GraduationCap,
      color: 'bg-green-500',
    },
    {
      title: 'Cours Actifs',
      value: '156',
      description: '+5 cette semaine',
      icon: BookOpen,
      color: 'bg-purple-500',
    },
    {
      title: 'Taux de Réussite',
      value: '87%',
      description: '+2% ce semestre',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar à gauche */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* Navbar en haut */}
        <Navbar />

        {/* Contenu du dashboard */}
        <main className="flex-1 p-8">
          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="transition-all duration-200 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-xs text-green-600 mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Actions rapides et activités récentes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
                <CardDescription>Raccourcis vers les tâches fréquentes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    className="p-4 text-left bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
                    onClick={() => navigate('/dashboard/teachers')}
                  >
                    <Users className="h-6 w-6 text-blue-600 mb-2" />
                    <p className="font-medium text-gray-900">Ajouter Enseignant</p>
                  </Button>
                  <Button
                    className="p-4 text-left bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer"
                    onClick={() => navigate('/dashboard/students')}
                  >
                    <GraduationCap className="h-6 w-6 text-green-600 mb-2" />
                    <p className="font-medium text-gray-900">Ajouter Étudiant</p>
                  </Button>
                  <Button
                    className="p-4 text-left bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer"
                    onClick={() => navigate('/dashboard/schedule')}
                  >
                    <BookOpen className="h-6 w-6 text-purple-600 mb-2" />
                    <p className="font-medium text-gray-900">Créer Cours</p>
                  </Button>
                  <Button
                    className="p-4 text-left bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer"
                    onClick={() => navigate('/dashboard/reports')}
                  >
                    <TrendingUp className="h-6 w-6 text-orange-600 mb-2" />
                    <p className="font-medium text-gray-900">Voir Rapports</p>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Activités Récentes</CardTitle>
                <CardDescription>Les dernières actions dans le système</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">👨‍🎓</span>
                        <p className="text-sm font-medium">Nouvel étudiant ajouté: Jean Dupont</p>
                      </div>
                      <p className="text-xs text-gray-500">Il y a 2 heures</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">👨‍🏫</span>
                        <p className="text-sm font-medium">Nouvel enseignant ajouté: Marie Dupont</p>
                      </div>
                      <p className="text-xs text-gray-500">Il y a 1 jour</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">📚</span>
                        <p className="text-sm font-medium">Nouveau cours de Mathématiques créé</p>
                      </div>
                      <p className="text-xs text-gray-500">Il y a 2 jours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enfants éventuels */}
          {children && (
            <div className="flex justify-center items-center w-full">
              {children}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;