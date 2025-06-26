import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Search, Edit, Trash2, Save, X, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { toast } from '@/hooks/use-toast';

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

const initialExams: Exam[] = [
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
    statut: 'Programmé'
  }
];

const initialResults: ExamResult[] = [
  {
    id: 1,
    examId: 1,
    examMatiere: 'Mathématiques',
    examDate: '2024-02-15',
    studentId: 1,
    studentName: 'Jean Dupont',
    note: 15,
    noteMax: 20,
    statut: 'Admis',
    commentaire: 'Bon travail'
  },
  {
    id: 2,
    examId: 1,
    examMatiere: 'Mathématiques',
    examDate: '2024-02-15',
    studentId: 2,
    studentName: 'Sophie Martin',
    note: 8,
    noteMax: 20,
    statut: 'Refusé',
    commentaire: 'Révision nécessaire'
  }
];

const Exams = () => {
  const [exams, setExams] = useState(initialExams);
  const [results, setResults] = useState(initialResults);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingExam, setEditingExam] = useState<Exam | null>(null);
  const [newExam, setNewExam] = useState({
    matiere: '',
    date: '',
    heureDebut: '',
    heureFin: '',
    salle: '',
    coefficient: 1,
    type: 'Examen' as 'Contrôle' | 'Examen' | 'Rattrapage',
    statut: 'Programmé' as 'Programmé' | 'En cours' | 'Terminé'
  });

  const handleAddExam = () => {
    if (!newExam.matiere || !newExam.date || !newExam.heureDebut || !newExam.heureFin || !newExam.salle) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const exam: Exam = {
      id: Date.now(),
      ...newExam
    };

    setExams([...exams, exam]);
    setNewExam({
      matiere: '',
      date: '',
      heureDebut: '',
      heureFin: '',
      salle: '',
      coefficient: 1,
      type: 'Examen',
      statut: 'Programmé'
    });

    toast({
      title: "Succès",
      description: "Examen ajouté avec succès !",
    });
  };

  const handleEditExam = (exam: Exam) => {
    setEditingId(exam.id);
    setEditingExam({ ...exam });
  };

  const handleSaveEdit = () => {
    if (!editingExam) return;

    if (!editingExam.matiere || !editingExam.date || !editingExam.heureDebut || !editingExam.heureFin || !editingExam.salle) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    setExams(exams.map(exam => 
      exam.id === editingId ? editingExam : exam
    ));
    
    setEditingId(null);
    setEditingExam(null);
    
    toast({
      title: "Succès",
      description: "Examen modifié avec succès !",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingExam(null);
  };

  const handleDeleteExam = (id: number) => {
    setExams(exams.filter(exam => exam.id !== id));
    setResults(results.filter(result => result.examId !== id));
    toast({
      title: "Succès",
      description: "Examen supprimé avec succès !",
    });
  };

  const handleAddResult = (examId: number) => {
    const exam = exams.find(e => e.id === examId);
    if (!exam) return;

    const newResult: ExamResult = {
      id: Date.now(),
      examId,
      examMatiere: exam.matiere,
      examDate: exam.date,
      studentId: Math.floor(Math.random() * 1000) + 1,
      studentName: `Étudiant ${Math.floor(Math.random() * 100) + 1}`,
      note: Math.floor(Math.random() * 20) + 1,
      noteMax: 20,
      statut: Math.random() > 0.5 ? 'Admis' : 'Refusé',
      commentaire: 'Commentaire automatique'
    };

    setResults([...results, newResult]);
    toast({
      title: "Succès",
      description: "Résultat ajouté avec succès !",
    });
  };

  const filteredExams = exams.filter(exam =>
    exam.matiere.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.salle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'Admis': return 'text-green-600 bg-green-100';
      case 'Refusé': return 'text-red-600 bg-red-100';
      case 'En attente': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Examens</h1>
            <p className="text-gray-600 mt-2">Gérez les examens et les résultats de votre établissement</p>
          </div>

          <Tabs defaultValue="exams" className="space-y-6">
            <TabsList>
              <TabsTrigger value="exams">Examens Programmes</TabsTrigger>
              <TabsTrigger value="results">Résultats</TabsTrigger>
              <TabsTrigger value="add">Ajouter un Examen</TabsTrigger>
            </TabsList>

            <TabsContent value="exams" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Examens Programmes</h2>
                <div className="flex items-center space-x-4">
                  <Input
                    type="text"
                    placeholder="Rechercher un examen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
              </div>

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
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredExams.map((exam) => (
                    <TableRow key={exam.id}>
                      {editingId === exam.id ? (
                        // Mode édition
                        <>
                          <TableCell>
                            <Input
                              value={editingExam?.matiere || ''}
                              onChange={(e) => setEditingExam(prev => prev ? {...prev, matiere: e.target.value} : null)}
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="date"
                              value={editingExam?.date || ''}
                              onChange={(e) => setEditingExam(prev => prev ? {...prev, date: e.target.value} : null)}
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Input
                                type="time"
                                value={editingExam?.heureDebut || ''}
                                onChange={(e) => setEditingExam(prev => prev ? {...prev, heureDebut: e.target.value} : null)}
                                className="w-20"
                              />
                              <span className="self-center">-</span>
                              <Input
                                type="time"
                                value={editingExam?.heureFin || ''}
                                onChange={(e) => setEditingExam(prev => prev ? {...prev, heureFin: e.target.value} : null)}
                                className="w-20"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Input
                              value={editingExam?.salle || ''}
                              onChange={(e) => setEditingExam(prev => prev ? {...prev, salle: e.target.value} : null)}
                              className="w-full"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="1"
                              value={editingExam?.coefficient || 1}
                              onChange={(e) => setEditingExam(prev => prev ? {...prev, coefficient: parseInt(e.target.value)} : null)}
                              className="w-16"
                            />
                          </TableCell>
                          <TableCell>
                            <select
                              value={editingExam?.type || 'Examen'}
                              onChange={(e) => setEditingExam(prev => prev ? {...prev, type: e.target.value as 'Contrôle' | 'Examen' | 'Rattrapage'} : null)}
                              className="w-full rounded-md border border-gray-300 px-2 py-1 bg-white"
                            >
                              <option value="Contrôle">Contrôle</option>
                              <option value="Examen">Examen</option>
                              <option value="Rattrapage">Rattrapage</option>
                            </select>
                          </TableCell>
                          <TableCell>
                            <select
                              value={editingExam?.statut || 'Programmé'}
                              onChange={(e) => setEditingExam(prev => prev ? {...prev, statut: e.target.value as 'Programmé' | 'En cours' | 'Terminé'} : null)}
                              className="w-full rounded-md border border-gray-300 px-2 py-1 bg-white"
                            >
                              <option value="Programmé">Programmé</option>
                              <option value="En cours">En cours</option>
                              <option value="Terminé">Terminé</option>
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
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleEditExam(exam)} className="mr-2">
                              <Edit className="h-4 w-4 mr-2" />
                              Modifier
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteExam(exam.id)}>
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

            <TabsContent value="results" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Résultats des Examens</h2>
                <Button onClick={() => {
                  const examId = exams[0]?.id;
                  if (examId) handleAddResult(examId);
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un Résultat
                </Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Étudiant</TableHead>
                    <TableHead>Examen</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Commentaire</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-medium">{result.studentName}</TableCell>
                      <TableCell>{result.examMatiere}</TableCell>
                      <TableCell>{new Date(result.examDate).toLocaleDateString('fr-FR')}</TableCell>
                      <TableCell>{result.note}/{result.noteMax}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.statut)}`}>
                          {result.statut}
                        </span>
                      </TableCell>
                      <TableCell>{result.commentaire}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="add">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Ajouter un Nouvel Examen
                  </CardTitle>
                  <CardDescription>Programmez un nouvel examen</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="matiere">Matière</Label>
                      <Input
                        id="matiere"
                        value={newExam.matiere}
                        onChange={(e) => setNewExam({ ...newExam, matiere: e.target.value })}
                        placeholder="Ex: Mathématiques"
                      />
                    </div>

                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newExam.date}
                        onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="heureDebut">Heure de début</Label>
                      <Input
                        id="heureDebut"
                        type="time"
                        value={newExam.heureDebut}
                        onChange={(e) => setNewExam({ ...newExam, heureDebut: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="heureFin">Heure de fin</Label>
                      <Input
                        id="heureFin"
                        type="time"
                        value={newExam.heureFin}
                        onChange={(e) => setNewExam({ ...newExam, heureFin: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="salle">Salle</Label>
                      <Input
                        id="salle"
                        value={newExam.salle}
                        onChange={(e) => setNewExam({ ...newExam, salle: e.target.value })}
                        // placeholder="Ex: A101"
                      />
                    </div>

                    <div>
                      <Label htmlFor="coefficient">Coefficient</Label>
                      <Input
                        id="coefficient"
                        type="number"
                        min="1"
                        value={newExam.coefficient}
                        onChange={(e) => setNewExam({ ...newExam, coefficient: parseInt(e.target.value) })}
                        placeholder="Ex: 2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="type">Type d'examen</Label>
                      <select
                        id="type"
                        value={newExam.type}
                        onChange={(e) => setNewExam({ ...newExam, type: e.target.value as 'Contrôle' | 'Examen' | 'Rattrapage' })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                      >
                        <option value="Contrôle">Contrôle</option>
                        <option value="Examen">Examen</option>
                        <option value="Rattrapage">Rattrapage</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="statut">Statut</Label>
                      <select
                        id="statut"
                        value={newExam.statut}
                        onChange={(e) => setNewExam({ ...newExam, statut: e.target.value as 'Programmé' | 'En cours' | 'Terminé' })}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
                      >
                        <option value="Programmé">Programmé</option>
                        <option value="En cours">En cours</option>
                        <option value="Terminé">Terminé</option>
                      </select>
                    </div>
                  </div>

                  <Button onClick={handleAddExam} className="mt-6">
                    <FileText className="h-4 w-4 mr-2" />
                    Ajouter l'Examen
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

export default Exams; 