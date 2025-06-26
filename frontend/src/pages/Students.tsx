import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Search, Edit, Trash2, Save, X, GraduationCap, Users, Filter, Eye, EyeOff } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { toast } from '@/hooks/use-toast';

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

const initialStudents: Student[] = [
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
  },
  {
    id: 6,
    nom: 'Moreau',
    prenom: 'Alice',
    email: 'alice.moreau@example.com',
    niveau: 'doctorat',
    classe: 'D1 Chimie',
    telephone: '0667890123',
    statut: 'Inscrit'
  }
];

const Students = () => {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState({
    nom: '',
    prenom: '',
    email: '',
    niveau: '',
    classe: '',
    telephone: '',
    statut: 'Inscrit' as 'Inscrit' | 'Diplômé' | 'Suspendu'
  });

  // États pour les filtres
  const [filterNiveau, setFilterNiveau] = useState('all');
  const [filterClasse, setFilterClasse] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'grouped'>('table');

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

  const handleAddStudent = () => {
    if (!newStudent.nom || !newStudent.prenom || !newStudent.email || !newStudent.niveau || !newStudent.classe || !newStudent.telephone) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const student: Student = {
      id: Date.now(),
      ...newStudent
    };

    const updatedStudents = [...students, student];
    setStudents(updatedStudents);
    
    // Sauvegarder dans localStorage pour partager avec le Dashboard étudiant
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    
    setNewStudent({
      nom: '',
      prenom: '',
      email: '',
      niveau: '',
      classe: '',
      telephone: '',
      statut: 'Inscrit'
    });

    toast({
      title: "Succès",
      description: "Étudiant ajouté avec succès !",
    });
  };

  const handleEditStudent = (student: Student) => {
    setEditingId(student.id);
    setEditingStudent({ ...student });
  };

  const handleSaveEdit = () => {
    if (!editingStudent) return;

    if (!editingStudent.nom || !editingStudent.prenom || !editingStudent.email || !editingStudent.niveau || !editingStudent.classe || !editingStudent.telephone) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const updatedStudents = students.map(student => 
      student.id === editingId ? editingStudent : student
    );
    
    setStudents(updatedStudents);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    
    setEditingId(null);
    setEditingStudent(null);
    
    toast({
      title: "Succès",
      description: "Étudiant modifié avec succès !",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id: number) => {
    const updatedStudents = students.filter(student => student.id !== id);
    setStudents(updatedStudents);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    
    toast({
      title: "Succès",
      description: "Étudiant supprimé avec succès !",
    });
  };

  const resetForm = () => {
    setNewStudent({
      nom: '',
      prenom: '',
      email: '',
      niveau: '',
      classe: '',
      telephone: '',
      statut: 'Inscrit'
    });
  };

  const resetFilters = () => {
    setFilterNiveau('all');
    setFilterClasse('all');
    setSearchTerm('');
  };

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

  // Statistiques
  const stats = {
    total: students.length,
    parNiveau: Object.entries(students.reduce((acc, student) => {
      const niveau = niveaux.find(n => n.id === student.niveau)?.name || student.niveau;
      acc[niveau] = (acc[niveau] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)),
    parClasse: Object.entries(students.reduce((acc, student) => {
      acc[student.classe] = (acc[student.classe] || 0) + 1;
      return acc;
    }, {} as Record<string, number>))
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Étudiants</h1>
            <p className="text-gray-600 mt-2">Gérez les étudiants de votre établissement</p>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Étudiants</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                  </div>
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            
            {stats.parNiveau.slice(0, 3).map(([niveau, count]) => (
              <Card key={niveau}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{niveau}</p>
                      <p className="text-2xl font-bold text-gray-900">{count}</p>
                    </div>
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="list" className="space-y-6">
            <TabsList>
              <TabsTrigger value="list">Liste des Étudiants</TabsTrigger>
              <TabsTrigger value="add">Ajouter un Étudiant</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Liste des Étudiants</h2>
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

              {/* Filtres */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filtres
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                        <X className="h-4 w-4 mr-2" />
                        Réinitialiser
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Affichage groupé */}
              {viewMode === 'grouped' ? (
                <div className="space-y-6">
                  {Object.entries(groupedStudents).map(([niveau, classes]) => (
                    <Card key={niveau}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-lg px-3 py-1">
                            {niveau}
                          </Badge>
                          <span className="text-gray-600">
                            ({Object.values(classes).flat().length} étudiants)
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {Object.entries(classes).map(([classe, studentsInClass]) => (
                            <div key={classe} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-medium text-lg">{classe}</h4>
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
                                    <div className="flex items-center gap-2 mt-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleEditStudent(student)}
                                      >
                                        <Edit className="h-3 w-3" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleDeleteStudent(student.id)}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                /* Affichage tableau classique */
                <Card>
                  <CardContent>
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
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>
                              {editingId === student.id ? (
                                <Input
                                  value={editingStudent?.nom || ''}
                                  onChange={(e) => setEditingStudent(prev => prev ? {...prev, nom: e.target.value} : null)}
                                />
                              ) : (
                                student.nom
                              )}
                            </TableCell>
                            <TableCell>
                              {editingId === student.id ? (
                                <Input
                                  value={editingStudent?.prenom || ''}
                                  onChange={(e) => setEditingStudent(prev => prev ? {...prev, prenom: e.target.value} : null)}
                                />
                              ) : (
                                student.prenom
                              )}
                            </TableCell>
                            <TableCell>
                              {editingId === student.id ? (
                                <Input
                                  value={editingStudent?.email || ''}
                                  onChange={(e) => setEditingStudent(prev => prev ? {...prev, email: e.target.value} : null)}
                                />
                              ) : (
                                student.email
                              )}
                            </TableCell>
                            <TableCell>
                              {editingId === student.id ? (
                                <Select 
                                  value={editingStudent?.niveau || ''} 
                                  onValueChange={(value) => setEditingStudent(prev => prev ? {...prev, niveau: value, classe: ''} : null)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {niveaux.map((niveau) => (
                                      <SelectItem key={niveau.id} value={niveau.id}>
                                        {niveau.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Badge variant="secondary">
                                  {niveaux.find(n => n.id === student.niveau)?.name || student.niveau}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {editingId === student.id ? (
                                <Select 
                                  value={editingStudent?.classe || ''} 
                                  onValueChange={(value) => setEditingStudent(prev => prev ? {...prev, classe: value} : null)}
                                  disabled={!editingStudent?.niveau}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {editingStudent?.niveau && niveaux.find(n => n.id === editingStudent.niveau)?.classes.map((classe) => {
                                      const classesForNiveau = classesParNiveau[classe as keyof typeof classesParNiveau];
                                      return classesForNiveau?.map((classeName) => (
                                        <SelectItem key={classeName} value={classeName}>
                                          {classeName}
                                        </SelectItem>
                                      ));
                                    })}
                                  </SelectContent>
                                </Select>
                              ) : (
                                student.classe
                              )}
                            </TableCell>
                            <TableCell>
                              {editingId === student.id ? (
                                <Input
                                  value={editingStudent?.telephone || ''}
                                  onChange={(e) => setEditingStudent(prev => prev ? {...prev, telephone: e.target.value} : null)}
                                />
                              ) : (
                                student.telephone
                              )}
                            </TableCell>
                            <TableCell>
                              {editingId === student.id ? (
                                <Select 
                                  value={editingStudent?.statut || 'Inscrit'} 
                                  onValueChange={(value) => setEditingStudent(prev => prev ? {...prev, statut: value as 'Inscrit' | 'Diplômé' | 'Suspendu'} : null)}
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Inscrit">Inscrit</SelectItem>
                                    <SelectItem value="Diplômé">Diplômé</SelectItem>
                                    <SelectItem value="Suspendu">Suspendu</SelectItem>
                                  </SelectContent>
                                </Select>
                              ) : (
                                <Badge variant={
                                  student.statut === 'Inscrit' ? 'default' :
                                  student.statut === 'Diplômé' ? 'secondary' :
                                  'destructive'
                                }>
                                  {student.statut}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {editingId === student.id ? (
                                <div className="flex items-center gap-2">
                                  <Button size="sm" onClick={handleSaveEdit}>
                                    <Save className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <Button size="sm" variant="outline" onClick={() => handleEditStudent(student)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => handleDeleteStudent(student.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              )}

              {filteredStudents.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <GraduationCap className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Aucun étudiant trouvé avec les filtres actuels</p>
                  <Button variant="outline" onClick={resetFilters} className="mt-2">
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="add" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Ajouter un Nouvel Étudiant
                  </CardTitle>
                  <CardDescription>
                    Remplissez les informations pour ajouter un nouvel étudiant
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nom">Nom *</Label>
                      <Input
                        id="nom"
                        value={newStudent.nom}
                        onChange={(e) => setNewStudent({ ...newStudent, nom: e.target.value })}
                        placeholder="Ex: Dupont"
                      />
                    </div>

                    <div>
                      <Label htmlFor="prenom">Prénom *</Label>
                      <Input
                        id="prenom"
                        value={newStudent.prenom}
                        onChange={(e) => setNewStudent({ ...newStudent, prenom: e.target.value })}
                        placeholder="Ex: Jean"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newStudent.email}
                        onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                        placeholder="Ex: jean.dupont@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="telephone">Téléphone *</Label>
                      <Input
                        id="telephone"
                        type="tel"
                        value={newStudent.telephone}
                        onChange={(e) => setNewStudent({ ...newStudent, telephone: e.target.value })}
                        placeholder="Ex: 0612345678"
                      />
                    </div>

                    <div>
                      <Label htmlFor="niveau">Niveau *</Label>
                      <Select value={newStudent.niveau} onValueChange={(value) => {
                        setNewStudent({ ...newStudent, niveau: value, classe: '' });
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un niveau" />
                        </SelectTrigger>
                        <SelectContent>
                          {niveaux.map((niveau) => (
                            <SelectItem key={niveau.id} value={niveau.id}>
                              {niveau.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="classe">Classe *</Label>
                      <Select 
                        value={newStudent.classe} 
                        onValueChange={(value) => setNewStudent({ ...newStudent, classe: value })}
                        disabled={!newStudent.niveau}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une classe" />
                        </SelectTrigger>
                        <SelectContent>
                          {newStudent.niveau && niveaux.find(n => n.id === newStudent.niveau)?.classes.map((classe) => {
                            const classesForNiveau = classesParNiveau[classe as keyof typeof classesParNiveau];
                            return classesForNiveau?.map((classeName) => (
                              <SelectItem key={classeName} value={classeName}>
                                {classeName}
                              </SelectItem>
                            ));
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="statut">Statut</Label>
                      <Select 
                        value={newStudent.statut} 
                        onValueChange={(value) => setNewStudent({ ...newStudent, statut: value as 'Inscrit' | 'Diplômé' | 'Suspendu' })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Inscrit">Inscrit</SelectItem>
                          <SelectItem value="Diplômé">Diplômé</SelectItem>
                          <SelectItem value="Suspendu">Suspendu</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={resetForm}>
                      <X className="h-4 w-4 mr-2" />
                      Réinitialiser
                    </Button>
                    <Button onClick={handleAddStudent}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Ajouter l'Étudiant
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Students;
