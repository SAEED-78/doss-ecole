import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserCheck, BookOpen, Edit, Trash2, Plus, FileText, Upload, Save, X } from 'lucide-react';
import TeacherNavbar from '@/components/TeacherNavbar';
import { toast } from '@/hooks/use-toast';

interface Student {
  id: number;
  nom: string;
  prenom: string;
  classe: string;
  present: boolean;
}

interface Grade {
  id: number;
  studentId: number;
  studentName: string;
  matiere: string;
  note: number;
  coefficient: number;
  date: string;
  type: string;
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

const initialStudents: Student[] = [
  { id: 1, nom: 'Dupont', prenom: 'Jean', classe: 'L1 Informatique', present: true },
  { id: 2, nom: 'Martin', prenom: 'Sophie', classe: 'L1 Informatique', present: false },
  { id: 3, nom: 'Lefevre', prenom: 'Luc', classe: 'L1 Informatique', present: true },
  { id: 4, nom: 'Bernard', prenom: 'Marie', classe: 'L1 Informatique', present: true },
];

const initialGrades: Grade[] = [
  { id: 1, studentId: 1, studentName: 'Jean Dupont', matiere: 'Mathématiques', note: 15, coefficient: 2, date: '2024-01-15', type: 'Contrôle' },
  { id: 2, studentId: 2, studentName: 'Sophie Martin', matiere: 'Mathématiques', note: 12, coefficient: 1, date: '2024-01-15', type: 'Devoir' },
  { id: 3, studentId: 3, studentName: 'Luc Lefevre', matiere: 'Mathématiques', note: 18, coefficient: 2, date: '2024-01-15', type: 'Contrôle' },
];

const initialDocuments: PedagogicalDocument[] = [
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
  }
];

const TeacherDashboard = () => {
  const [students, setStudents] = useState(initialStudents);
  const [grades, setGrades] = useState(initialGrades);
  const [documents, setDocuments] = useState(initialDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingDocument, setEditingDocument] = useState<PedagogicalDocument | null>(null);
  const [newGrade, setNewGrade] = useState({
    studentId: '',
    note: '',
    coefficient: '1',
    type: '',
    matiere: 'Mathématiques'
  });
  const [newDocument, setNewDocument] = useState({
    titre: '',
    description: '',
    matiere: '',
    type: 'Cours' as 'Cours' | 'TP' | 'Devoir' | 'Corrigé' | 'Support' | 'Autre',
    fichier: '',
    statut: 'Public' as 'Public' | 'Privé'
  });

  const handlePresenceToggle = (studentId: number) => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, present: !student.present }
        : student
    ));
    
    const student = students.find(s => s.id === studentId);
    toast({
      title: "Présence mise à jour",
      description: `${student?.prenom} ${student?.nom} marqué(e) comme ${!student?.present ? 'présent(e)' : 'absent(e)'}`,
    });
  };

  const handleAddGrade = () => {
    if (!newGrade.studentId || !newGrade.note || !newGrade.coefficient || !newGrade.type) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive"
      });
      return;
    }

    const student = students.find(s => s.id === parseInt(newGrade.studentId));
    if (!student) return;

    const grade: Grade = {
      id: Date.now(),
      studentId: parseInt(newGrade.studentId),
      studentName: `${student.prenom} ${student.nom}`,
      matiere: newGrade.matiere,
      note: parseFloat(newGrade.note),
      coefficient: parseInt(newGrade.coefficient),
      date: new Date().toISOString().split('T')[0],
      type: newGrade.type
    };

    setGrades([...grades, grade]);
    setNewGrade({
      studentId: '',
      note: '',
      coefficient: '1',
      type: '',
      matiere: 'Mathématiques'
    });

    toast({
      title: "Note ajoutée",
      description: `Note de ${student.prenom} ${student.nom} ajoutée avec succès !`,
    });
  };

  const handleDeleteGrade = (gradeId: number) => {
    setGrades(grades.filter(grade => grade.id !== gradeId));
    toast({
      title: "Note supprimée",
      description: "La note a été supprimée avec succès !",
    });
  };

  const handleAddDocument = () => {
    if (!newDocument.titre || !newDocument.description || !newDocument.matiere || !newDocument.fichier) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const document: PedagogicalDocument = {
      id: Date.now(),
      ...newDocument,
      dateCreation: new Date().toISOString().split('T')[0],
      taille: `${(Math.random() * 5 + 1).toFixed(1)} MB`
    };

    setDocuments([...documents, document]);
    setNewDocument({
      titre: '',
      description: '',
      matiere: '',
      type: 'Cours',
      fichier: '',
      statut: 'Public'
    });

    toast({
      title: "Succès",
      description: "Document ajouté avec succès !",
    });
  };

  const handleEditDocument = (document: PedagogicalDocument) => {
    setEditingId(document.id);
    setEditingDocument({ ...document });
  };

  const handleSaveEditDocument = () => {
    if (!editingDocument) return;

    if (!editingDocument.titre || !editingDocument.description || !editingDocument.matiere || !editingDocument.fichier) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    setDocuments(documents.map(doc => 
      doc.id === editingId ? editingDocument : doc
    ));
    
    setEditingId(null);
    setEditingDocument(null);
    
    toast({
      title: "Succès",
      description: "Document modifié avec succès !",
    });
  };

  const handleCancelEditDocument = () => {
    setEditingId(null);
    setEditingDocument(null);
  };

  const handleDeleteDocument = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast({
      title: "Succès",
      description: "Document supprimé avec succès !",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewDocument({ ...newDocument, fichier: file.name });
    }
  };

  const filteredDocuments = documents.filter(doc =>
    doc.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.matiere.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const presentStudents = students.filter(student => student.present);
  const absentStudents = students.filter(student => !student.present);

  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherNavbar />
      <main className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Enseignant</h1>
          <p className="text-gray-600 mt-2">Gérez les notes, présences et documents de vos étudiants</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Étudiants Présents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{presentStudents.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Étudiants Absents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{absentStudents.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Documents Pédagogiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{documents.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="attendance" className="space-y-6">
          <TabsList>
            <TabsTrigger value="attendance">Présences</TabsTrigger>
            <TabsTrigger value="grades">Gestion des Notes</TabsTrigger>
            <TabsTrigger value="documents">Documents Pédagogiques</TabsTrigger>
          </TabsList>

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Liste de Présence
                </CardTitle>
                <CardDescription>Marquez la présence ou l'absence des étudiants</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Prénom</TableHead>
                      <TableHead>Classe</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>{student.nom}</TableCell>
                        <TableCell>{student.prenom}</TableCell>
                        <TableCell>{student.classe}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            student.present ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {student.present ? 'Présent' : 'Absent'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePresenceToggle(student.id)}
                          >
                            {student.present ? 'Marquer Absent' : 'Marquer Présent'}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grades">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Ajouter une Note
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                      <Label htmlFor="student">Étudiant</Label>
                      <select
                        id="student"
                        value={newGrade.studentId}
                        onChange={(e) => setNewGrade({ ...newGrade, studentId: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                      >
                        <option value="">Sélectionner un étudiant</option>
                        {students.map((student) => (
                          <option key={student.id} value={student.id}>
                            {student.prenom} {student.nom}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="note">Note (/20)</Label>
                      <Input
                        id="note"
                        type="number"
                        min="0"
                        max="20"
                        step="0.5"
                        value={newGrade.note}
                        onChange={(e) => setNewGrade({ ...newGrade, note: e.target.value })}
                        placeholder="Ex: 15"
                      />
                    </div>

                    <div>
                      <Label htmlFor="coefficient">Coefficient</Label>
                      <Input
                        id="coefficient"
                        type="number"
                        min="1"
                        value={newGrade.coefficient}
                        onChange={(e) => setNewGrade({ ...newGrade, coefficient: e.target.value })}
                        placeholder="Ex: 2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="type">Type</Label>
                      <select
                        id="type"
                        value={newGrade.type}
                        onChange={(e) => setNewGrade({ ...newGrade, type: e.target.value })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                      >
                        <option value="">Type d'évaluation</option>
                        <option value="Devoir">Devoir</option>
                        <option value="Contrôle">Contrôle</option>
                        <option value="Examen">Examen</option>
                        <option value="Projet">Projet</option>
                      </select>
                    </div>

                    <div className="flex items-end">
                      <Button onClick={handleAddGrade} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Liste des Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Étudiant</TableHead>
                        <TableHead>Note</TableHead>
                        <TableHead>Coefficient</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {grades.map((grade) => (
                        <TableRow key={grade.id}>
                          <TableCell className="font-medium">{grade.studentName}</TableCell>
                          <TableCell>{grade.note}/20</TableCell>
                          <TableCell>{grade.coefficient}</TableCell>
                          <TableCell>{grade.type}</TableCell>
                          <TableCell>{new Date(grade.date).toLocaleDateString('fr-FR')}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteGrade(grade.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Supprimer
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Documents Pédagogiques</h2>
              <div className="flex items-center space-x-4">
                <Input
                  type="text"
                  placeholder="Rechercher un document..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FileText className="h-5 w-5 text-gray-500" />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Matière</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Fichier</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Taille</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((document) => (
                  <TableRow key={document.id}>
                    {editingId === document.id ? (
                      // Mode édition
                      <>
                        <TableCell>
                          <Input
                            value={editingDocument?.titre || ''}
                            onChange={(e) => setEditingDocument(prev => prev ? {...prev, titre: e.target.value} : null)}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editingDocument?.description || ''}
                            onChange={(e) => setEditingDocument(prev => prev ? {...prev, description: e.target.value} : null)}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editingDocument?.matiere || ''}
                            onChange={(e) => setEditingDocument(prev => prev ? {...prev, matiere: e.target.value} : null)}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>
                          <select
                            value={editingDocument?.type || 'Cours'}
                            onChange={(e) => setEditingDocument(prev => prev ? {...prev, type: e.target.value as 'Cours' | 'TP' | 'Devoir' | 'Corrigé' | 'Support' | 'Autre'} : null)}
                            className="w-full rounded-md border border-gray-300 px-2 py-1 bg-white"
                          >
                            <option value="Cours">Cours</option>
                            <option value="TP">TP</option>
                            <option value="Devoir">Devoir</option>
                            <option value="Corrigé">Corrigé</option>
                            <option value="Support">Support</option>
                            <option value="Autre">Autre</option>
                          </select>
                        </TableCell>
                        <TableCell>
                          <Input
                            value={editingDocument?.fichier || ''}
                            onChange={(e) => setEditingDocument(prev => prev ? {...prev, fichier: e.target.value} : null)}
                            className="w-full"
                          />
                        </TableCell>
                        <TableCell>{document.dateCreation}</TableCell>
                        <TableCell>{document.taille}</TableCell>
                        <TableCell>
                          <select
                            value={editingDocument?.statut || 'Public'}
                            onChange={(e) => setEditingDocument(prev => prev ? {...prev, statut: e.target.value as 'Public' | 'Privé'} : null)}
                            className="w-full rounded-md border border-gray-300 px-2 py-1 bg-white"
                          >
                            <option value="Public">Public</option>
                            <option value="Privé">Privé</option>
                          </select>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={handleSaveEditDocument} className="mr-2">
                            <Save className="h-4 w-4 mr-1" />
                            Sauvegarder
                          </Button>
                          <Button variant="ghost" size="sm" onClick={handleCancelEditDocument}>
                            <X className="h-4 w-4 mr-1" />
                            Annuler
                          </Button>
                        </TableCell>
                      </>
                    ) : (
                      // Mode affichage
                      <>
                        <TableCell className="font-medium">{document.titre}</TableCell>
                        <TableCell>{document.description}</TableCell>
                        <TableCell>{document.matiere}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            document.type === 'Cours' ? 'bg-blue-100 text-blue-600' :
                            document.type === 'TP' ? 'bg-green-100 text-green-600' :
                            document.type === 'Devoir' ? 'bg-orange-100 text-orange-600' :
                            document.type === 'Corrigé' ? 'bg-purple-100 text-purple-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {document.type}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{document.fichier}</span>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(document.dateCreation).toLocaleDateString('fr-FR')}</TableCell>
                        <TableCell>{document.taille}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            document.statut === 'Public' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {document.statut}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleEditDocument(document)} className="mr-2">
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteDocument(document.id)}>
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

            {/* Formulaire d'ajout */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Ajouter un Document Pédagogique
                </CardTitle>
                <CardDescription>Partagez des ressources pédagogiques avec vos étudiants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="titre">Titre du document</Label>
                    <Input
                      id="titre"
                      value={newDocument.titre}
                      onChange={(e) => setNewDocument({ ...newDocument, titre: e.target.value })}
                      placeholder="Ex: Introduction aux Algorithmes"
                    />
                  </div>

                  <div>
                    <Label htmlFor="matiere">Matière</Label>
                    <Input
                      id="matiere"
                      value={newDocument.matiere}
                      onChange={(e) => setNewDocument({ ...newDocument, matiere: e.target.value })}
                      placeholder="Ex: Algorithmes"
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Type de document</Label>
                    <select
                      id="type"
                      value={newDocument.type}
                      onChange={(e) => setNewDocument({ ...newDocument, type: e.target.value as 'Cours' | 'TP' | 'Devoir' | 'Corrigé' | 'Support' | 'Autre' })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                    >
                      <option value="Cours">Cours</option>
                      <option value="TP">TP</option>
                      <option value="Devoir">Devoir</option>
                      <option value="Corrigé">Corrigé</option>
                      <option value="Support">Support</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="statut">Statut</Label>
                    <select
                      id="statut"
                      value={newDocument.statut}
                      onChange={(e) => setNewDocument({ ...newDocument, statut: e.target.value as 'Public' | 'Privé' })}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                    >
                      <option value="Public">Public (visible par les étudiants)</option>
                      <option value="Privé">Privé (visible par vous seulement)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newDocument.description}
                      onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
                      placeholder="Description du document..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="fichier">Fichier</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="fichier"
                        type="file"
                        onChange={handleFileUpload}
                        className="flex-1"
                      />
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Parcourir
                      </Button>
                    </div>
                  </div>
                </div>

                <Button onClick={handleAddDocument} className="mt-6">
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter le Document
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TeacherDashboard;
