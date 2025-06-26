import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, Clock, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { toast } from '@/hooks/use-toast';

interface Course {
  id: number;
  matiere: string;
  enseignant: string;
  classe: string;
  jour: string;
  heureDebut: string;
  heureFin: string;
  salle: string;
}

const initialCourses: Course[] = [
  {
    id: 1,
    matiere: 'Mathématiques',
    enseignant: 'Dr. Martin Dubois',
    classe: 'L1 Informatique',
    jour: 'Lundi',
    heureDebut: '08:00',
    heureFin: '10:00',
    salle: 'A101'
  },
  {
    id: 2,
    matiere: 'Programmation',
    enseignant: 'Dr. Sarah Johnson',
    classe: 'L1 Informatique',
    jour: 'Lundi',
    heureDebut: '10:15',
    heureFin: '12:15',
    salle: 'B202'
  },
  {
    id: 3,
    matiere: 'Physique',
    enseignant: 'Dr. Pierre Leroy',
    classe: 'L1 Informatique',
    jour: 'Mardi',
    heureDebut: '08:00',
    heureFin: '10:00',
    salle: 'C105'
  },
  {
    id: 4,
    matiere: 'Base de Données',
    enseignant: 'Dr. Ahmed Bensalem',
    classe: 'L2 Informatique',
    jour: 'Mercredi',
    heureDebut: '14:00',
    heureFin: '16:00',
    salle: 'B203'
  },
  {
    id: 5,
    matiere: 'Algorithmes Avancés',
    enseignant: 'Dr. Claire Martin',
    classe: 'L3 Informatique',
    jour: 'Jeudi',
    heureDebut: '09:00',
    heureFin: '11:00',
    salle: 'A205'
  },
  {
    id: 6,
    matiere: 'Intelligence Artificielle',
    enseignant: 'Dr. Jean Dupont',
    classe: 'M1 Informatique',
    jour: 'Vendredi',
    heureDebut: '10:00',
    heureFin: '12:00',
    salle: 'C301'
  },
  {
    id: 7,
    matiere: 'Machine Learning',
    enseignant: 'Dr. Marie Laurent',
    classe: 'M2 Informatique',
    jour: 'Lundi',
    heureDebut: '14:00',
    heureFin: '16:00',
    salle: 'D401'
  }
];

// Configuration des filières et niveaux
const filieres = {
  'Informatique': ['L1', 'L2', 'L3', 'M1', 'M2'],
  'Mathématiques': ['L1', 'L2', 'L3', 'M1', 'M2'],
  'Physique': ['L1', 'L2', 'L3', 'M1', 'M2'],
  'Chimie': ['L1', 'L2', 'L3', 'M1', 'M2'],
  'Biologie': ['L1', 'L2', 'L3', 'M1', 'M2'],
  'Économie': ['L1', 'L2', 'L3', 'M1', 'M2'],
  'Droit': ['L1', 'L2', 'L3', 'M1', 'M2'],
  'Lettres': ['L1', 'L2', 'L3', 'M1', 'M2']
};

const Schedule = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [selectedFiliere, setSelectedFiliere] = useState('Informatique');
  const [selectedNiveau, setSelectedNiveau] = useState('L1');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState({
    matiere: '',
    enseignant: '',
    classe: '',
    jour: '',
    heureDebut: '',
    heureFin: '',
    salle: ''
  });

  // Générer la classe complète à partir de la filière et du niveau
  const getClasseComplete = (filiere: string, niveau: string) => {
    return `${niveau} ${filiere}`;
  };

  // Obtenir la filière et le niveau à partir de la classe complète
  const getFiliereAndNiveau = (classe: string) => {
    const parts = classe.split(' ');
    if (parts.length >= 2) {
      return {
        niveau: parts[0],
        filiere: parts.slice(1).join(' ')
      };
    }
    return { niveau: 'L1', filiere: 'Informatique' };
  };

  const handleAddCourse = () => {
    if (!newCourse.matiere || !newCourse.enseignant || !newCourse.classe || !newCourse.jour || !newCourse.heureDebut || !newCourse.heureFin || !newCourse.salle) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive"
      });
      return;
    }

    const course: Course = {
      id: Date.now(),
      ...newCourse
    };

    setCourses([...courses, course]);
    setNewCourse({
      matiere: '',
      enseignant: '',
      classe: '',
      jour: '',
      heureDebut: '',
      heureFin: '',
      salle: ''
    });

    toast({
      title: "Succès",
      description: "Cours ajouté avec succès !",
    });
  };

  const handleEditCourse = (course: Course) => {
    setEditingId(course.id);
    setEditingCourse({ ...course });
  };

  const handleSaveEdit = () => {
    if (!editingCourse) return;

    if (!editingCourse.matiere || !editingCourse.enseignant || !editingCourse.classe || !editingCourse.jour || !editingCourse.heureDebut || !editingCourse.heureFin || !editingCourse.salle) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive"
      });
      return;
    }

    setCourses(courses.map(course => 
      course.id === editingId ? editingCourse : course
    ));
    
    setEditingId(null);
    setEditingCourse(null);
    
    toast({
      title: "Succès",
      description: "Cours modifié avec succès !",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingCourse(null);
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
    toast({
      title: "Succès",
      description: "Cours supprimé avec succès !",
    });
  };

  // Filtrer les cours par filière et niveau sélectionnés
  const selectedClasse = getClasseComplete(selectedFiliere, selectedNiveau);
  const filteredCourses = courses.filter(course => 
    course.classe === selectedClasse
  );

  const groupedByDay = filteredCourses.reduce((acc, course) => {
    if (!acc[course.jour]) {
      acc[course.jour] = [];
    }
    acc[course.jour].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  const daysOrder = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestion des Emplois du Temps</h1>
            <p className="text-gray-600 mt-2">Planifiez et gérez les cours de votre établissement</p>
          </div>

          <Tabs defaultValue="view" className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="view">Voir l'Emploi du Temps</TabsTrigger>
              <TabsTrigger value="add">Ajouter un Cours</TabsTrigger>
            </TabsList>

            <TabsContent value="view" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Emploi du Temps
                  </CardTitle>
                  <CardDescription>Visualisez l'emploi du temps par filière et niveau</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="filiere-select">Sélectionner une filière</Label>
                        <select
                          id="filiere-select"
                          value={selectedFiliere}
                          onChange={(e) => {
                            setSelectedFiliere(e.target.value);
                            setSelectedNiveau('L1'); // Reset au premier niveau
                          }}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                        >
                          {Object.keys(filieres).map(filiere => (
                            <option key={filiere} value={filiere}>{filiere}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <Label htmlFor="niveau-select">Sélectionner un niveau</Label>
                        <select
                          id="niveau-select"
                          value={selectedNiveau}
                          onChange={(e) => setSelectedNiveau(e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                        >
                          {filieres[selectedFiliere as keyof typeof filieres].map(niveau => (
                            <option key={niveau} value={niveau}>{niveau}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-medium text-blue-900">
                        Emploi du temps affiché : <span className="font-bold">{selectedClasse}</span>
                      </p>
                      <p className="text-xs text-blue-700 mt-1">
                        {filteredCourses.length} cours programmés
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {daysOrder.map(day => (
                      <Card key={day} className="border-l-4 border-l-blue-500">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base sm:text-lg">{day}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {groupedByDay[day] ? (
                            <div className="space-y-2 sm:space-y-3">
                              {groupedByDay[day]
                                .sort((a, b) => a.heureDebut.localeCompare(b.heureDebut))
                                .map(course => (
                                <div key={course.id} className="p-2 sm:p-3 bg-blue-50 rounded-lg border">
                                  {editingId === course.id ? (
                                    // Mode édition
                                    <div className="space-y-2">
                                      <Input
                                        value={editingCourse?.matiere || ''}
                                        onChange={(e) => setEditingCourse(prev => prev ? {...prev, matiere: e.target.value} : null)}
                                        placeholder="Matière"
                                        className="text-sm"
                                      />
                                      <Input
                                        value={editingCourse?.enseignant || ''}
                                        onChange={(e) => setEditingCourse(prev => prev ? {...prev, enseignant: e.target.value} : null)}
                                        placeholder="Enseignant"
                                        className="text-sm"
                                      />
                                      <div className="grid grid-cols-2 gap-1">
                                        <select
                                          value={getFiliereAndNiveau(editingCourse?.classe || '').filiere}
                                          onChange={(e) => {
                                            const { niveau } = getFiliereAndNiveau(editingCourse?.classe || '');
                                            setEditingCourse(prev => prev ? {...prev, classe: `${niveau} ${e.target.value}`} : null);
                                          }}
                                          className="w-full rounded-md border border-gray-300 px-2 py-1 bg-white text-sm"
                                        >
                                          {Object.keys(filieres).map(filiere => (
                                            <option key={filiere} value={filiere}>{filiere}</option>
                                          ))}
                                        </select>
                                        <select
                                          value={getFiliereAndNiveau(editingCourse?.classe || '').niveau}
                                          onChange={(e) => {
                                            const { filiere } = getFiliereAndNiveau(editingCourse?.classe || '');
                                            setEditingCourse(prev => prev ? {...prev, classe: `${e.target.value} ${filiere}`} : null);
                                          }}
                                          className="w-full rounded-md border border-gray-300 px-2 py-1 bg-white text-sm"
                                        >
                                          {filieres[getFiliereAndNiveau(editingCourse?.classe || '').filiere as keyof typeof filieres]?.map(niveau => (
                                            <option key={niveau} value={niveau}>{niveau}</option>
                                          ))}
                                        </select>
                                      </div>
                                      <div className="grid grid-cols-2 gap-1">
                                        <Input
                                          type="time"
                                          value={editingCourse?.heureDebut || ''}
                                          onChange={(e) => setEditingCourse(prev => prev ? {...prev, heureDebut: e.target.value} : null)}
                                          className="text-sm"
                                        />
                                        <Input
                                          type="time"
                                          value={editingCourse?.heureFin || ''}
                                          onChange={(e) => setEditingCourse(prev => prev ? {...prev, heureFin: e.target.value} : null)}
                                          className="text-sm"
                                        />
                                      </div>
                                      <Input
                                        value={editingCourse?.salle || ''}
                                        onChange={(e) => setEditingCourse(prev => prev ? {...prev, salle: e.target.value} : null)}
                                        placeholder="Salle"
                                        className="text-sm"
                                      />
                                      <div className="flex gap-1">
                                        <Button variant="ghost" size="sm" onClick={handleSaveEdit} className="flex-1">
                                          <Save className="h-3 w-3 mr-1" />
                                          Sauvegarder
                                        </Button>
                                        <Button variant="ghost" size="sm" onClick={handleCancelEdit} className="flex-1">
                                          <X className="h-3 w-3 mr-1" />
                                          Annuler
                                        </Button>
                                      </div>
                                    </div>
                                  ) : (
                                    // Mode affichage
                                    <>
                                      <div className="flex justify-between items-start mb-1 sm:mb-2">
                                        <h4 className="font-semibold text-blue-900 text-sm sm:text-base truncate">{course.matiere}</h4>
                                        <div className="flex gap-1 flex-shrink-0">
                                          <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="h-6 w-6 p-0"
                                            onClick={() => handleEditCourse(course)}
                                          >
                                            <Edit className="h-3 w-3" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDeleteCourse(course.id)}
                                            className="h-6 w-6 p-0"
                                          >
                                            <Trash2 className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      </div>
                                      <p className="text-xs sm:text-sm text-gray-700 mb-1 truncate">{course.enseignant}</p>
                                      <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                                        <Clock className="h-3 w-3 flex-shrink-0" />
                                        <span className="truncate">{course.heureDebut} - {course.heureFin}</span>
                                      </div>
                                      <p className="text-xs sm:text-sm text-gray-600 truncate">Salle: {course.salle}</p>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-gray-500 text-xs sm:text-sm">Aucun cours planifié</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Ajouter un Nouveau Cours
                  </CardTitle>
                  <CardDescription>Planifiez un nouveau cours dans l'emploi du temps</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="matiere">Matière</Label>
                      <Input
                        id="matiere"
                        value={newCourse.matiere}
                        onChange={(e) => setNewCourse({ ...newCourse, matiere: e.target.value })}
                        placeholder="Ex: Mathématiques"
                      />
                    </div>

                    <div>
                      <Label htmlFor="enseignant">Enseignant</Label>
                      <Input
                        id="enseignant"
                        value={newCourse.enseignant}
                        onChange={(e) => setNewCourse({ ...newCourse, enseignant: e.target.value })}
                        placeholder="Ex: M koffi"
                      />
                    </div>

                    <div>
                      <Label htmlFor="filiere-add">Filière</Label>
                      <select
                        id="filiere-add"
                        value={getFiliereAndNiveau(newCourse.classe).filiere}
                        onChange={(e) => {
                          const { niveau } = getFiliereAndNiveau(newCourse.classe);
                          setNewCourse({ ...newCourse, classe: `${niveau} ${e.target.value}` });
                        }}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                      >
                        <option value="">Sélectionner une filière</option>
                        {Object.keys(filieres).map(filiere => (
                          <option key={filiere} value={filiere}>{filiere}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="niveau-add">Niveau</Label>
                      <select
                        id="niveau-add"
                        value={getFiliereAndNiveau(newCourse.classe).niveau}
                        onChange={(e) => {
                          const { filiere } = getFiliereAndNiveau(newCourse.classe);
                          setNewCourse({ ...newCourse, classe: `${e.target.value} ${filiere}` });
                        }}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                      >
                        <option value="">Sélectionner un niveau</option>
                        {filieres[getFiliereAndNiveau(newCourse.classe).filiere as keyof typeof filieres]?.map(niveau => (
                          <option key={niveau} value={niveau}>{niveau}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="jour">Jour</Label>
                      <select
                        id="jour"
                        value={newCourse.jour}
                        onChange={(e) => setNewCourse({ ...newCourse, jour: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                      >
                        <option value="">Sélectionner un jour</option>
                        <option value="Lundi">Lundi</option>
                        <option value="Mardi">Mardi</option>
                        <option value="Mercredi">Mercredi</option>
                        <option value="Jeudi">Jeudi</option>
                        <option value="Vendredi">Vendredi</option>
                        <option value="Samedi">Samedi</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="heureDebut">Heure de début</Label>
                      <Input
                        id="heureDebut"
                        type="time"
                        value={newCourse.heureDebut}
                        onChange={(e) => setNewCourse({ ...newCourse, heureDebut: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="heureFin">Heure de fin</Label>
                      <Input
                        id="heureFin"
                        type="time"
                        value={newCourse.heureFin}
                        onChange={(e) => setNewCourse({ ...newCourse, heureFin: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="salle">Salle</Label>
                      <Input
                        id="salle"
                        value={newCourse.salle}
                        onChange={(e) => setNewCourse({ ...newCourse, salle: e.target.value })}
                        // placeholder="Ex: A101"
                      />
                    </div>
                  </div>

                  <Button onClick={handleAddCourse} className="mt-6">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter le Cours
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Schedule;
