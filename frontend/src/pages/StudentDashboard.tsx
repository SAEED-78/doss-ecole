import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CalendarIcon, Clock, BookOpen, GraduationCap, TrendingUp, Award, FileText, CheckCircle, XCircle, Download, Search, Users, Eye, EyeOff } from 'lucide-react';
import StudentNavbar from '@/components/StudentNavbar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

interface Student {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  niveau: string;
  classe: string;
  telephone: string;
  statut: 'Inscrit' | 'Diplômé' | 'Suspendu';
}

interface Course {
  id: number;
  matiere: string;
  enseignant: string;
  jour: string;
  heureDebut: string;
  heureFin: string;
  salle: string;
}

interface Grade {
  id: number;
  matiere: string;
  typeEvaluation: string;
  note: number;
  noteMax: number;
  date: string;
  coefficient: number;
}

interface Exam {
  id: number;
  matiere: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  salle: string;
  coefficient: number;
  type: 'Contrôle' | 'Examen' | 'Rattrapage';
  statut: 'Programmé' | 'En cours' | 'Terminé';
}

interface ExamResult {
  id: number;
  examId: number;
  examMatiere: string;
  examDate: string;
  studentId: number;
  studentName: string;
  note: number;
  noteMax: number;
  statut: 'Admis' | 'Refusé' | 'En attente';
  commentaire?: string;
}

interface PedagogicalDocument {
  id: number;
  titre: string;
  description: string;
  matiere: string;
  type: 'Cours' | 'TP' | 'Devoir' | 'Corrigé' | 'Support' | 'Autre';
  fichier: string;
  dateCreation: string;
  taille: string;
  statut: 'Public' | 'Privé';
}

const studentCourses: Course[] = [
  {
    id: 1,
    matiere: 'Mathématiques',
    enseignant: 'Dr. Martin Dubois',
    jour: 'Lundi',
    heureDebut: '08:00',
    heureFin: '10:00',
    salle: 'A101'
  },
  {
    id: 2,
    matiere: 'Programmation',
    enseignant: 'Dr. Sarah Johnson',
    jour: 'Lundi',
    heureDebut: '10:15',
    heureFin: '12:15',
    salle: 'B202'
  },
  {
    id: 3,
    matiere: 'Base de Données',
    enseignant: 'Dr. Ahmed Bensalem',
    jour: 'Mardi',
    heureDebut: '08:00',
    heureFin: '10:00',
    salle: 'C105'
  },
  {
    id: 4,
    matiere: 'Algorithmes',
    enseignant: 'Dr. Claire Martin',
    jour: 'Mercredi',
    heureDebut: '14:00',
    heureFin: '16:00',
    salle: 'A203'
  },
  {
    id: 5,
    matiere: 'Anglais',
    enseignant: 'Ms. Emma Wilson',
    jour: 'Jeudi',
    heureDebut: '10:15',
    heureFin: '12:15',
    salle: 'D101'
  }
];

const studentGrades: Grade[] = [
  {
    id: 1,
    matiere: 'Mathématiques',
    typeEvaluation: 'Contrôle Continu',
    note: 15,
    noteMax: 20,
    date: '2024-01-15',
    coefficient: 2
  },
  {
    id: 2,
    matiere: 'Programmation',
    typeEvaluation: 'TP',
    note: 18,
    noteMax: 20,
    date: '2024-01-20',
    coefficient: 3
  },
  {
    id: 3,
    matiere: 'Base de Données',
    typeEvaluation: 'Examen',
    note: 14,
    noteMax: 20,
    date: '2024-01-25',
    coefficient: 4
  },
  {
    id: 4,
    matiere: 'Algorithmes',
    typeEvaluation: 'Projet',
    note: 16,
    noteMax: 20,
    date: '2024-02-01',
    coefficient: 3
  },
  {
    id: 5,
    matiere: 'Anglais',
    typeEvaluation: 'Oral',
    note: 13,
    noteMax: 20,
    date: '2024-02-05',
    coefficient: 2
  }
];

const studentExams: Exam[] = [
  {
    id: 1,
    matiere: 'Mathématiques',
    date: '2024-02-15',
    heureDebut: '09:00',
    heureFin: '11:00',
    salle: 'A101',
    coefficient: 2,
    type: 'Examen',
    statut: 'Programmé'
  },
  {
    id: 2,
    matiere: 'Programmation',
    date: '2024-02-20',
    heureDebut: '14:00',
    heureFin: '16:00',
    salle: 'B202',
    coefficient: 3,
    type: 'Examen',
    statut: 'Programmé'
  },
  {
    id: 3,
    matiere: 'Base de Données',
    date: '2024-02-25',
    heureDebut: '10:00',
    heureFin: '12:00',
    salle: 'C105',
    coefficient: 2,
    type: 'Contrôle',
    statut: 'Terminé'
  }
];

const studentExamResults: ExamResult[] = [
  {
    id: 1,
    examId: 3,
    examMatiere: 'Base de Données',
    examDate: '2024-02-25',
    studentId: 1,
    studentName: 'Jean Dupont',
    note: 15,
    noteMax: 20,
    statut: 'Admis',
    commentaire: 'Bon travail'
  }
];

const studentDocuments: PedagogicalDocument[] = [
  {
    id: 1,
    titre: 'Introduction aux Algorithmes',
    description: 'Cours complet sur les bases des algorithmes',
    matiere: 'Algorithmes',
    type: 'Cours',
    fichier: 'algo_intro.pdf',
    dateCreation: '2024-01-15',
    taille: '2.5 MB',
    statut: 'Public'
  },
  {
    id: 2,
    titre: 'TP Programmation Python',
    description: 'Travaux pratiques sur Python',
    matiere: 'Programmation',
    type: 'TP',
    fichier: 'tp_python.pdf',
    dateCreation: '2024-01-20',
    taille: '1.8 MB',
    statut: 'Public'
  },
  {
    id: 3,
    titre: 'Corrigé Devoir Mathématiques',
    description: 'Corrigé du devoir de mathématiques',
    matiere: 'Mathématiques',
    type: 'Corrigé',
    fichier: 'corrige_math.pdf',
    dateCreation: '2024-01-25',
    taille: '3.2 MB',
    statut: 'Public'
  },
  {
    id: 4,
    titre: 'Support de cours Base de Données',
    description: 'Support de cours sur les bases de données',
    matiere: 'Base de Données',
    type: 'Support',
    fichier: 'bd_support.pdf',
    dateCreation: '2024-01-30',
    taille: '4.1 MB',
    statut: 'Public'
  }
];

const StudentDashboard = () => {
  const studentName = localStorage.getItem('studentName') || 'Étudiant';
  const studentClass = localStorage.getItem('studentClass') || 'Classe';
  const [documentSearchTerm, setDocumentSearchTerm] = useState('');
  
  // États pour la liste des étudiants
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNiveau, setFilterNiveau] = useState('all');
  const [filterClasse, setFilterClasse] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grouped'>('grouped');

  // Configuration des niveaux et classes
  const niveaux = [
    { id: 'licence', name: 'Licence', classes: ['L1', 'L2', 'L3'] },
    { id: 'master', name: 'Master', classes: ['M1', 'M2'] },
    { id: 'doctorat', name: 'Doctorat', classes: ['D1', 'D2', 'D3'] }
  ];

  const classesParNiveau = {
    'L1': ['L1 Informatique', 'L1 Mathématiques', 'L1 Physique', 'L1 Chimie'],
    'L2': ['L2 Informatique', 'L2 Mathématiques', 'L2 Physique', 'L2 Chimie'],
    'L3': ['L3 Informatique', 'L3 Mathématiques', 'L3 Physique', 'L3 Chimie'],
    'M1': ['M1 Informatique', 'M1 Mathématiques', 'M1 Physique', 'M1 Chimie'],
    'M2': ['M2 Informatique', 'M2 Mathématiques', 'M2 Physique', 'M2 Chimie'],
    'D1': ['D1 Informatique', 'D1 Mathématiques', 'D1 Physique', 'D1 Chimie'],
    'D2': ['D2 Informatique', 'D2 Mathématiques', 'D2 Physique', 'D2 Chimie'],
    'D3': ['D3 Informatique', 'D3 Mathématiques', 'D3 Physique', 'D3 Chimie']
  };

  // Charger les étudiants depuis localStorage (partagés avec le Dashboard admin)
  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    } else {
      // Données par défaut si aucun étudiant n'est sauvegardé
      const defaultStudents: Student[] = [
        {
          id: 1,
          nom: 'Dupont',
          prenom: 'Jean',
          email: 'jean.dupont@example.com',
          niveau: 'licence',
          classe: 'L1 Informatique',
          telephone: '0612345678',
          statut: 'Inscrit'
        },
        {
          id: 2,
          nom: 'Martin',
          prenom: 'Sophie',
          email: 'sophie.martin@example.com',
          niveau: 'licence',
          classe: 'L2 Informatique',
          telephone: '0623456789',
          statut: 'Inscrit'
        },
        {
          id: 3,
          nom: 'Lefevre',
          prenom: 'Luc',
          email: 'luc.lefevre@example.com',
          niveau: 'licence',
          classe: 'L1 Informatique',
          telephone: '0634567890',
          statut: 'Suspendu'
        },
        {
          id: 4,
          nom: 'Dubois',
          prenom: 'Marie',
          email: 'marie.dubois@example.com',
          niveau: 'master',
          classe: 'M1 Mathématiques',
          telephone: '0645678901',
          statut: 'Inscrit'
        },
        {
          id: 5,
          nom: 'Rousseau',
          prenom: 'Pierre',
          email: 'pierre.rousseau@example.com',
          niveau: 'master',
          classe: 'M2 Physique',
          telephone: '0656789012',
          statut: 'Diplômé'
        }
      ];
      setStudents(defaultStudents);
      localStorage.setItem('students', JSON.stringify(defaultStudents));
    }
  }, []);

  // Écouter les changements dans localStorage pour les nouveaux étudiants ajoutés
  useEffect(() => {
    const handleStorageChange = () => {
      const savedStudents = localStorage.getItem('students');
      if (savedStudents) {
        setStudents(JSON.parse(savedStudents));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const groupedByDay = studentCourses.reduce((acc, course) => {
    if (!acc[course.jour]) {
      acc[course.jour] = [];
    }
    acc[course.jour].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  const daysOrder = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];

  // Calcul de la moyenne générale
  const totalPoints = studentGrades.reduce((sum, grade) => sum + (grade.note * grade.coefficient), 0);
  const totalCoefficients = studentGrades.reduce((sum, grade) => sum + grade.coefficient, 0);
  const moyenneGenerale = totalPoints / totalCoefficients;

  // Filtrage des étudiants
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.classe.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.niveau.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesNiveau = filterNiveau === 'all' || student.niveau === filterNiveau;
    const matchesClasse = filterClasse === 'all' || student.classe === filterClasse;
    
    return matchesSearch && matchesNiveau && matchesClasse;
  });

  // Grouper les étudiants par niveau et classe
  const groupedStudents = filteredStudents.reduce((acc, student) => {
    const niveau = niveaux.find(n => n.id === student.niveau)?.name || student.niveau;
    if (!acc[niveau]) acc[niveau] = {};
    if (!acc[niveau][student.classe]) acc[niveau][student.classe] = [];
    acc[niveau][student.classe].push(student);
    return acc;
  }, {} as Record<string, Record<string, Student[]>>);

  // Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setSearchTerm('');
    setFilterNiveau('all');
    setFilterClasse('all');
  };

  const getNoteColor = (note: number, noteMax: number) => {
    const percentage = (note / noteMax) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'Admis': return 'text-green-600 bg-green-100';
      case 'Refusé': return 'text-red-600 bg-red-100';
      case 'En attente': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'Admis': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'Refusé': return <XCircle className="h-4 w-4 text-red-600" />;
      case 'En attente': return <Clock className="h-4 w-4 text-yellow-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const filteredDocuments = studentDocuments.filter(doc =>
    doc.titre.toLowerCase().includes(documentSearchTerm.toLowerCase()) ||
    doc.matiere.toLowerCase().includes(documentSearchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(documentSearchTerm.toLowerCase())
  );

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case 'Cours': return 'bg-blue-100 text-blue-600';
      case 'TP': return 'bg-green-100 text-green-600';
      case 'Devoir': return 'bg-orange-100 text-orange-600';
      case 'Corrigé': return 'bg-purple-100 text-purple-600';
      case 'Support': return 'bg-indigo-100 text-indigo-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleDownloadDocument = (document: PedagogicalDocument) => {
    // Simulation de téléchargement
    toast({
      title: "Téléchargement",
      description: `Téléchargement de "${document.titre}" en cours...`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Bonjour {studentName}</h1>
            <p className="text-gray-600 mt-2">Voici votre tableau de bord - {studentClass}</p>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Cours cette semaine</p>
                    <p className="text-2xl font-bold text-gray-900">{studentCourses.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Moyenne Générale</p>
                    <p className={`text-2xl font-bold ${getNoteColor(moyenneGenerale, 20)}`}>
                      {moyenneGenerale.toFixed(2)}/20
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Étudiants</p>
                    <p className="text-2xl font-bold text-gray-900">{students.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Award className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Meilleure Note</p>
                    <p className="text-2xl font-bold text-green-600">
                      {Math.max(...studentGrades.map(g => g.note))}/20
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="schedule" className="space-y-6">
            <TabsList>
              <TabsTrigger value="schedule">Emploi du Temps</TabsTrigger>
              <TabsTrigger value="grades">Mes Notes</TabsTrigger>
              <TabsTrigger value="exams">Mes Examens</TabsTrigger>
              <TabsTrigger value="results">Mes Résultats</TabsTrigger>
              <TabsTrigger value="students">Liste des Étudiants</TabsTrigger>
              <TabsTrigger value="documents">Documents Pédagogiques</TabsTrigger>
            </TabsList>

            <TabsContent value="schedule" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Emploi du Temps - {studentClass}
                  </CardTitle>
                  <CardDescription>Votre planning de cours de la semaine</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {daysOrder.map(day => (
                      <Card key={day} className="border-l-4 border-l-purple-500">
                        <CardHeader>
                          <CardTitle className="text-lg">{day}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {groupedByDay[day] ? (
                            <div className="space-y-3">
                              {groupedByDay[day]
                                .sort((a, b) => a.heureDebut.localeCompare(b.heureDebut))
                                .map(course => (
                                <div key={course.id} className="p-3 bg-purple-50 rounded-lg border">
                                  <h4 className="font-semibold text-purple-900">{course.matiere}</h4>
                                  <p className="text-sm text-gray-700 mb-1">{course.enseignant}</p>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="h-3 w-3" />
                                    <span>{course.heureDebut} - {course.heureFin}</span>
                                  </div>
                                  <p className="text-sm text-gray-600">Salle: {course.salle}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 text-sm">Aucun cours planifié</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="grades">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Mes Résultats
                  </CardTitle>
                  <CardDescription>
                    Vos notes et évaluations - Moyenne générale: {moyenneGenerale.toFixed(2)}/20
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Matière</TableHead>
                        <TableHead>Type d'évaluation</TableHead>
                        <TableHead>Note</TableHead>
                        <TableHead>Coefficient</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentGrades.map((grade) => (
                        <TableRow key={grade.id}>
                          <TableCell className="font-medium">{grade.matiere}</TableCell>
                          <TableCell>{grade.typeEvaluation}</TableCell>
                          <TableCell>
                            <span className={`font-semibold ${getNoteColor(grade.note, grade.noteMax)}`}>
                              {grade.note}/{grade.noteMax}
                            </span>
                          </TableCell>
                          <TableCell>{grade.coefficient}</TableCell>
                          <TableCell>{new Date(grade.date).toLocaleDateString('fr-FR')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="exams">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Mes Examens Programmes
                  </CardTitle>
                  <CardDescription>
                    Calendrier de vos examens à venir
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Matière</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Heure</TableHead>
                        <TableHead>Salle</TableHead>
                        <TableHead>Coefficient</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Statut</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentExams.map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell className="font-medium">{exam.matiere}</TableCell>
                          <TableCell>{new Date(exam.date).toLocaleDateString('fr-FR')}</TableCell>
                          <TableCell>{exam.heureDebut} - {exam.heureFin}</TableCell>
                          <TableCell>{exam.salle}</TableCell>
                          <TableCell>{exam.coefficient}</TableCell>
                          <TableCell>{exam.type}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exam.statut)}`}>
                              {exam.statut}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Mes Résultats d'Examens
                  </CardTitle>
                  <CardDescription>
                    Consultez vos résultats d'examens
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {studentExamResults.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Examen</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Note</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead>Commentaire</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {studentExamResults.map((result) => (
                          <TableRow key={result.id}>
                            <TableCell className="font-medium">{result.examMatiere}</TableCell>
                            <TableCell>{new Date(result.examDate).toLocaleDateString('fr-FR')}</TableCell>
                            <TableCell>
                              <span className={`font-semibold ${getNoteColor(result.note, result.noteMax)}`}>
                                {result.note}/{result.noteMax}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(result.statut)}
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.statut)}`}>
                                  {result.statut}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{result.commentaire}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Aucun résultat d'examen disponible pour le moment.</p>
                      <p className="text-sm text-gray-400 mt-2">Vos résultats apparaîtront ici une fois les examens corrigés.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Liste des Étudiants
                      </CardTitle>
                      <CardDescription>Consultez la liste de tous les étudiants par niveau et classe</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={viewMode === 'table' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('table')}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Tableau
                      </Button>
                      <Button
                        variant={viewMode === 'grouped' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('grouped')}
                      >
                        <EyeOff className="h-4 w-4 mr-2" />
                        Groupé
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Filtres */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <Label>Recherche</Label>
                      <Input
                        type="text"
                        placeholder="Rechercher un étudiant..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label>Niveau</Label>
                      <Select value={filterNiveau} onValueChange={setFilterNiveau}>
                        <SelectTrigger>
                          <SelectValue placeholder="Tous les niveaux" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les niveaux</SelectItem>
                          {niveaux.map((niveau) => (
                            <SelectItem key={niveau.id} value={niveau.id}>
                              {niveau.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Classe</Label>
                      <Select value={filterClasse} onValueChange={setFilterClasse}>
                        <SelectTrigger>
                          <SelectValue placeholder="Toutes les classes" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Toutes les classes</SelectItem>
                          {Object.values(classesParNiveau).flat().map((classe) => (
                            <SelectItem key={classe} value={classe}>
                              {classe}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-end">
                      <Button variant="outline" onClick={resetFilters} className="w-full">
                        Réinitialiser
                      </Button>
                    </div>
                  </div>

                  {/* Affichage groupé */}
                  {viewMode === 'grouped' ? (
                    <div className="space-y-6">
                      {Object.entries(groupedStudents).map(([niveau, classes]) => (
                        <div key={niveau} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                              <Badge variant="secondary" className="text-base px-3 py-1">
                                {niveau}
                              </Badge>
                              <span className="text-gray-600">
                                ({Object.values(classes).flat().length} étudiants)
                              </span>
                            </h3>
                          </div>
                          
                          <div className="space-y-4">
                            {Object.entries(classes).map(([classe, studentsInClass]) => (
                              <div key={classe} className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-medium text-md">{classe}</h4>
                                  <Badge variant="outline">{studentsInClass.length} étudiants</Badge>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {studentsInClass.map((student) => (
                                    <div key={student.id} className="bg-white rounded-lg p-3 border">
                                      <div className="flex items-center justify-between mb-2">
                                        <h5 className="font-medium text-sm">
                                          {student.prenom} {student.nom}
                                        </h5>
                                        <Badge variant={
                                          student.statut === 'Inscrit' ? 'default' :
                                          student.statut === 'Diplômé' ? 'secondary' :
                                          'destructive'
                                        } className="text-xs">
                                          {student.statut}
                                        </Badge>
                                      </div>
                                      <p className="text-xs text-gray-600 mb-1">{student.email}</p>
                                      <p className="text-xs text-gray-500">{student.telephone}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Affichage tableau classique */
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nom</TableHead>
                          <TableHead>Prénom</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Niveau</TableHead>
                          <TableHead>Classe</TableHead>
                          <TableHead>Téléphone</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>{student.nom}</TableCell>
                            <TableCell>{student.prenom}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                {niveaux.find(n => n.id === student.niveau)?.name || student.niveau}
                              </Badge>
                            </TableCell>
                            <TableCell>{student.classe}</TableCell>
                            <TableCell>{student.telephone}</TableCell>
                            <TableCell>
                              <Badge variant={
                                student.statut === 'Inscrit' ? 'default' :
                                student.statut === 'Diplômé' ? 'secondary' :
                                'destructive'
                              }>
                                {student.statut}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}

                  {filteredStudents.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Aucun étudiant trouvé avec les filtres actuels</p>
                      <Button variant="outline" onClick={resetFilters} className="mt-2">
                        Réinitialiser les filtres
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documents Pédagogiques
                  </CardTitle>
                  <CardDescription>
                    Accédez aux ressources pédagogiques partagées par vos enseignants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Input
                        type="text"
                        placeholder="Rechercher un document..."
                        value={documentSearchTerm}
                        onChange={(e) => setDocumentSearchTerm(e.target.value)}
                        className="w-64"
                      />
                      <Search className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Tous les types
                      </Button>
                      <Button variant="outline" size="sm">
                        Cours
                      </Button>
                      <Button variant="outline" size="sm">
                        TP
                      </Button>
                      <Button variant="outline" size="sm">
                        Corrigés
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDocuments.map((document) => (
                      <Card key={document.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDocumentTypeColor(document.type)}`}>
                              {document.type}
                            </span>
                            <span className="text-xs text-gray-500">{document.taille}</span>
                          </div>
                          <CardTitle className="text-lg">{document.titre}</CardTitle>
                          <CardDescription className="text-sm">
                            {document.matiere} • {new Date(document.dateCreation).toLocaleDateString('fr-FR')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                            {document.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">{document.fichier}</span>
                            </div>
                            <Button 
                              size="sm" 
                              onClick={() => handleDownloadDocument(document)}
                              className="flex items-center space-x-1"
                            >
                              <Download className="h-4 w-4" />
                              <span>Télécharger</span>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {filteredDocuments.length === 0 && (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">Aucun document trouvé.</p>
                      <p className="text-sm text-gray-400 mt-2">
                        {documentSearchTerm ? 'Essayez de modifier vos critères de recherche.' : 'Vos enseignants partageront bientôt des documents ici.'}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
