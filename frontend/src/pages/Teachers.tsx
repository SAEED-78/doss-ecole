import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Search, Edit, Trash2, Save, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { toast } from '@/hooks/use-toast';

interface Teacher {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  matiere: string;
  telephone: string;
  statut: 'Actif' | 'Inactif';
}

const initialTeachers: Teacher[] = [
  {
    id: 1,
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'jean.dupont@example.com',
    matiere: 'Mathématiques',
    telephone: '0612345678',
    statut: 'Actif',
  },
  {
    id: 2,
    nom: 'Martin',
    prenom: 'Sophie',
    email: 'sophie.martin@example.com',
    matiere: 'Physique',
    telephone: '0698765432',
    statut: 'Actif',
  },
  {
    id: 3,
    nom: 'Lefevre',
    prenom: 'Pierre',
    email: 'pierre.lefevre@example.com',
    matiere: 'Chimie',
    telephone: '0765432198',
    statut: 'Inactif',
  },
];

const Teachers = () => {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [newTeacher, setNewTeacher] = useState({
    nom: '',
    prenom: '',
    email: '',
    matiere: '',
    telephone: '',
    statut: 'Actif' as 'Actif' | 'Inactif'
  });

  const handleAddTeacher = () => {
    if (!newTeacher.nom || !newTeacher.prenom || !newTeacher.email || !newTeacher.matiere || !newTeacher.telephone) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive"
      });
      return;
    }

    const teacher: Teacher = {
      id: Date.now(),
      ...newTeacher
    };

    setTeachers([...teachers, teacher]);
    setNewTeacher({
      nom: '',
      prenom: '',
      email: '',
      matiere: '',
      telephone: '',
      statut: 'Actif' as 'Actif' | 'Inactif'
    });

    toast({
      title: "Succès",
      description: "Enseignant ajouté avec succès !",
    });
  };

  const handleEditTeacher = (teacher: Teacher) => {
    setEditingId(teacher.id);
    setEditingTeacher({ ...teacher });
  };

  const handleSaveEdit = () => {
    if (!editingTeacher) return;

    if (!editingTeacher.nom || !editingTeacher.prenom || !editingTeacher.email || !editingTeacher.matiere || !editingTeacher.telephone) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive"
      });
      return;
    }

    setTeachers(teachers.map(teacher => 
      teacher.id === editingId ? editingTeacher : teacher
    ));
    
    setEditingId(null);
    setEditingTeacher(null);
    
    toast({
      title: "Succès",
      description: "Enseignant modifié avec succès !",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingTeacher(null);
  };

  const handleDeleteTeacher = (id: number) => {
    setTeachers(teachers.filter(teacher => teacher.id !== id));
    toast({
      title: "Succès",
      description: "Enseignant supprimé avec succès !",
    });
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.matiere.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Enseignants</h1>
            <p className="text-gray-600 mt-2">Gérez les enseignants de votre établissement</p>
          </div>

          <Tabs defaultValue="list" className="space-y-6">
            <TabsList>
              <TabsTrigger value="list">Liste des Enseignants</TabsTrigger>
              <TabsTrigger value="add">Ajouter un Enseignant</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Liste des Enseignants</h2>
                <div className="flex items-center space-x-4">
                  <Input
                    type="text"
                    placeholder="Rechercher un enseignant..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Prénom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Matière</TableHead>
                    <TableHead>Téléphone</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers.map((teacher) => (
                    <TableRow key={teacher.id}>
                      {editingId === teacher.id ? (
                        // Mode édition
                        <>
                          <TableCell>
                            <Input
                              value={editingTeacher?.nom || ''}
                              onChange={(e) => setEditingTeacher(prev => prev ? {...prev, nom: e.target.value} : null)}
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={editingTeacher?.prenom || ''}
                              onChange={(e) => setEditingTeacher(prev => prev ? {...prev, prenom: e.target.value} : null)}
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={editingTeacher?.email || ''}
                              onChange={(e) => setEditingTeacher(prev => prev ? {...prev, email: e.target.value} : null)}
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={editingTeacher?.matiere || ''}
                              onChange={(e) => setEditingTeacher(prev => prev ? {...prev, matiere: e.target.value} : null)}
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={editingTeacher?.telephone || ''}
                              onChange={(e) => setEditingTeacher(prev => prev ? {...prev, telephone: e.target.value} : null)}
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <select
                              value={editingTeacher?.statut || 'Actif'}
                              onChange={(e) => setEditingTeacher(prev => prev ? {...prev, statut: e.target.value as 'Actif' | 'Inactif'} : null)}
                              className="w-full rounded-md border border-gray-300 px-2 py-1 bg-white"
                            >
                              <option value="Actif">Actif</option>
                              <option value="Inactif">Inactif</option>
                            </select>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={handleSaveEdit} className="mr-2">
                              <Save className="h-4 w-4 mr-1" />
                              Sauvegarder
                            </Button>
                            <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                              <X className="h-4 w-4 mr-1" />
                              Annuler
                            </Button>
                          </TableCell>
                        </>
                      ) : (
                        // Mode affichage
                        <>
                          <TableCell>{teacher.nom}</TableCell>
                          <TableCell>{teacher.prenom}</TableCell>
                          <TableCell>{teacher.email}</TableCell>
                          <TableCell>{teacher.matiere}</TableCell>
                          <TableCell>{teacher.telephone}</TableCell>
                          <TableCell>{teacher.statut}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleEditTeacher(teacher)} className="mr-2">
                              <Edit className="h-4 w-4 mr-2" />
                              Modifier
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteTeacher(teacher.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Supprimer
                            </Button>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="add">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Ajouter un Nouvel Enseignant
                  </CardTitle>
                  <CardDescription>Ajoutez un nouvel enseignant à votre établissement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nom">Nom</Label>
                      <Input
                        id="nom"
                        value={newTeacher.nom}
                        onChange={(e) => setNewTeacher({ ...newTeacher, nom: e.target.value })}
                        placeholder="Ex: Dupont"
                      />
                    </div>

                    <div>
                      <Label htmlFor="prenom">Prénom</Label>
                      <Input
                        id="prenom"
                        value={newTeacher.prenom}
                        onChange={(e) => setNewTeacher({ ...newTeacher, prenom: e.target.value })}
                        placeholder="Ex: Jean"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={newTeacher.email}
                        onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                        placeholder="Ex: jean.dupont@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="matiere">Matière</Label>
                      <Input
                        id="matiere"
                        value={newTeacher.matiere}
                        onChange={(e) => setNewTeacher({ ...newTeacher, matiere: e.target.value })}
                        placeholder="Ex: Mathématiques"
                      />
                    </div>

                    <div>
                      <Label htmlFor="telephone">Téléphone</Label>
                      <Input
                        id="telephone"
                        type="tel"
                        value={newTeacher.telephone}
                        onChange={(e) => setNewTeacher({ ...newTeacher, telephone: e.target.value })}
                        placeholder="Ex: 0612345678"
                      />
                    </div>

                    <div>
                      <Label htmlFor="statut">Statut</Label>
                      <select
                        id="statut"
                        value={newTeacher.statut}
                        onChange={(e) => setNewTeacher({ ...newTeacher, statut: e.target.value as 'Actif' | 'Inactif' })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                      >
                        <option value="Actif">Actif</option>
                        <option value="Inactif">Inactif</option>
                      </select>
                    </div>
                  </div>

                  <Button onClick={handleAddTeacher} className="mt-6">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Ajouter un Enseignant
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

export default Teachers;
