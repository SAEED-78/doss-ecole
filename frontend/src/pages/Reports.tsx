import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, PieChart, TrendingUp, Users, GraduationCap, BookOpen, Download, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { toast } from '@/hooks/use-toast';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isExporting, setIsExporting] = useState(false);

  const stats = [
    {
      title: 'Taux de Réussite Global',
      value: '87%',
      change: '+2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600',
    },
    {
      title: 'Taux de Présence',
      value: '94%',
      change: '+1%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Cours Terminés',
      value: '156',
      change: '+12',
      trend: 'up',
      icon: BookOpen,
      color: 'text-purple-600',
    },
    {
      title: 'Examens Planifiés',
      value: '23',
      change: '+3',
      trend: 'up',
      icon: Calendar,
      color: 'text-orange-600',
    },
  ];

  const topPerformers = [
    { rank: 1, name: 'Marie Dupont', class: 'L3 Informatique', average: 18.5, subjects: 8 },
    { rank: 2, name: 'Jean Martin', class: 'L2 Informatique', average: 17.8, subjects: 7 },
    { rank: 3, name: 'Sophie Bernard', class: 'L1 Informatique', average: 17.2, subjects: 6 },
    { rank: 4, name: 'Pierre Durand', class: 'M1 Informatique', average: 16.9, subjects: 9 },
    { rank: 5, name: 'Emma Leroy', class: 'L3 Informatique', average: 16.5, subjects: 8 },
  ];

  const subjectStats = [
    { subject: 'Mathématiques', average: 14.2, passRate: 78, students: 45 },
    { subject: 'Informatique', average: 15.8, passRate: 85, students: 52 },
    { subject: 'Physique', average: 13.9, passRate: 72, students: 38 },
    { subject: 'Anglais', average: 16.1, passRate: 89, students: 48 },
    { subject: 'Économie', average: 14.7, passRate: 81, students: 42 },
  ];

  const attendanceData = [
    { month: 'Janvier', rate: 92 },
    { month: 'Février', rate: 94 },
    { month: 'Mars', rate: 91 },
    { month: 'Avril', rate: 95 },
    { month: 'Mai', rate: 93 },
    { month: 'Juin', rate: 96 },
  ];

  // Fonction pour exporter en PDF
  const handleExportPDF = async () => {
    setIsExporting(true);
    
    try {
      // Simuler un délai d'export
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Créer le contenu du PDF
      const pdfContent = generatePDFContent();
      
      // Générer et télécharger le PDF
      downloadPDF(pdfContent);
      
      toast({
        title: "Succès",
        description: "Rapport exporté en PDF avec succès !",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'export du PDF.",
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Fonction pour générer le contenu du PDF
  const generatePDFContent = () => {
    const currentDate = new Date().toLocaleDateString('fr-FR');
    const periodText = {
      week: 'Cette semaine',
      month: 'Ce mois',
      semester: 'Ce semestre',
      year: 'Cette année'
    }[selectedPeriod];

    return `
      <html>
        <head>
          <title>Rapport Académique - ${periodText}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
            .stat-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
            .stat-value { font-size: 24px; font-weight: bold; color: #2563eb; }
            .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            .table th, .table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .table th { background-color: #f3f4f6; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #1f2937; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Rapport Académique</h1>
            <p>Période : ${periodText}</p>
            <p>Généré le : ${currentDate}</p>
          </div>

          <div class="section">
            <div class="section-title">Statistiques Principales</div>
            <div class="stats-grid">
              ${stats.map(stat => `
                <div class="stat-card">
                  <div class="stat-value">${stat.value}</div>
                  <div>${stat.title}</div>
                  <small>${stat.change} vs période précédente</small>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="section">
            <div class="section-title">Meilleurs Performeurs</div>
            <table class="table">
              <thead>
                <tr>
                  <th>Rang</th>
                  <th>Étudiant</th>
                  <th>Classe</th>
                  <th>Moyenne</th>
                  <th>Matières</th>
                </tr>
              </thead>
              <tbody>
                ${topPerformers.map(student => `
                  <tr>
                    <td>#${student.rank}</td>
                    <td>${student.name}</td>
                    <td>${student.class}</td>
                    <td>${student.average}/20</td>
                    <td>${student.subjects}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="section">
            <div class="section-title">Performance par Matière</div>
            <table class="table">
              <thead>
                <tr>
                  <th>Matière</th>
                  <th>Moyenne</th>
                  <th>Taux de Réussite</th>
                  <th>Étudiants</th>
                </tr>
              </thead>
              <tbody>
                ${subjectStats.map(subject => `
                  <tr>
                    <td>${subject.subject}</td>
                    <td>${subject.average}/20</td>
                    <td>${subject.passRate}%</td>
                    <td>${subject.students}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="section">
            <div class="section-title">Évolution des Performances</div>
            <table class="table">
              <thead>
                <tr>
                  <th>Mois</th>
                  <th>Taux de Réussite</th>
                </tr>
              </thead>
              <tbody>
                ${attendanceData.map(data => `
                  <tr>
                    <td>${data.month}</td>
                    <td>${data.rate}%</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `;
  };

  // Fonction pour télécharger le PDF
  const downloadPDF = (content: string) => {
    // Créer un blob avec le contenu HTML
    const blob = new Blob([content], { type: 'text/html' });
    
    // Créer un lien de téléchargement
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // Nommer le fichier
    const periodText = {
      week: 'semaine',
      month: 'mois',
      semester: 'semestre',
      year: 'annee'
    }[selectedPeriod];
    
    const currentDate = new Date().toISOString().split('T')[0];
    link.download = `rapport-academique-${periodText}-${currentDate}.html`;
    
    // Déclencher le téléchargement
    document.body.appendChild(link);
    link.click();
    
    // Nettoyer
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Rapports & Statistiques</h1>
                <p className="text-gray-600 mt-2">Analyse détaillée des performances académiques</p>
              </div>
              <div className="flex gap-2">
                <select 
                  value={selectedPeriod} 
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white"
                >
                  <option value="week">Cette semaine</option>
                  <option value="month">Ce mois</option>
                  <option value="semester">Ce semestre</option>
                  <option value="year">Cette année</option>
                </select>
                <Button 
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  {isExporting ? 'Export en cours...' : 'Exporter PDF'}
                </Button>
              </div>
            </div>
          </div>

          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="transition-all duration-200 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-xs text-green-600 mt-1">{stat.change} vs période précédente</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="attendance">Présence</TabsTrigger>
              <TabsTrigger value="subjects">Matières</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Meilleurs Performeurs</CardTitle>
                    <CardDescription>Top 5 des étudiants avec les meilleures moyennes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Rang</TableHead>
                          <TableHead>Étudiant</TableHead>
                          <TableHead>Classe</TableHead>
                          <TableHead>Moyenne</TableHead>
                          <TableHead>Matières</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {topPerformers.map((student) => (
                          <TableRow key={student.rank}>
                            <TableCell className="font-medium">#{student.rank}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.class}</TableCell>
                            <TableCell className="font-bold text-green-600">{student.average}/20</TableCell>
                            <TableCell>{student.subjects}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Évolution des Performances</CardTitle>
                    <CardDescription>Taux de réussite par mois</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {attendanceData.map((data, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{data.month}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${data.rate}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-8">{data.rate}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analyse des Performances par Classe</CardTitle>
                  <CardDescription>Statistiques détaillées par niveau</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-900">Licence</h3>
                      <p className="text-2xl font-bold text-blue-600">89%</p>
                      <p className="text-sm text-blue-700">Taux de réussite</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-900">Master</h3>
                      <p className="text-2xl font-bold text-green-600">92%</p>
                      <p className="text-sm text-green-700">Taux de réussite</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <h3 className="font-semibold text-purple-900">Global</h3>
                      <p className="text-2xl font-bold text-purple-600">87%</p>
                      <p className="text-sm text-purple-700">Taux de réussite</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques de Présence</CardTitle>
                  <CardDescription>Suivi de la présence des étudiants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Présence moyenne</span>
                      <span className="font-bold text-green-600">94%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Absences justifiées</span>
                      <span className="font-bold text-orange-600">3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Absences non justifiées</span>
                      <span className="font-bold text-red-600">3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subjects" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance par Matière</CardTitle>
                  <CardDescription>Analyse détaillée par discipline</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Matière</TableHead>
                        <TableHead>Moyenne</TableHead>
                        <TableHead>Taux de Réussite</TableHead>
                        <TableHead>Étudiants</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subjectStats.map((subject) => (
                        <TableRow key={subject.subject}>
                          <TableCell className="font-medium">{subject.subject}</TableCell>
                          <TableCell>{subject.average}/20</TableCell>
                          <TableCell className="text-green-600 font-medium">{subject.passRate}%</TableCell>
                          <TableCell>{subject.students}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Reports; 