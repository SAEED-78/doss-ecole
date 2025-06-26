<?php

namespace Database\Seeders;

use App\Models\Exam;
use App\Models\Student;
use App\Models\ExamResult;
use App\Models\User;
use Illuminate\Database\Seeder;

class ExamSeeder extends Seeder
{
    public function run(): void
    {
        // Créer des utilisateurs
        $teacher = User::create([
            'name' => 'Prof. Martin',
            'email' => 'martin@example.com',
            'password' => bcrypt('password'),
            'role' => 'teacher'
        ]);

        // Créer des étudiants
        $students = [
            ['matricule' => 'STU001', 'nom' => 'Dupont', 'prenom' => 'Jean', 'email' => 'jean@example.com', 'classe' => 'L1 Info', 'annee_scolaire' => '2024-2025'],
            ['matricule' => 'STU002', 'nom' => 'Martin', 'prenom' => 'Sophie', 'email' => 'sophie@example.com', 'classe' => 'L1 Info', 'annee_scolaire' => '2024-2025'],
            ['matricule' => 'STU003', 'nom' => 'Bernard', 'prenom' => 'Pierre', 'email' => 'pierre@example.com', 'classe' => 'L2 Info', 'annee_scolaire' => '2024-2025'],
        ];

        foreach ($students as $studentData) {
            Student::create($studentData);
        }

        // Créer des examens
        $exams = [
            [
                'matiere' => 'Mathématiques',
                'date' => '2024-02-15',
                'heure_debut' => '09:00',
                'heure_fin' => '11:00',
                'salle' => 'A101',
                'coefficient' => 2,
                'type' => 'Examen',
                'created_by' => $teacher->id
            ],
            [
                'matiere' => 'Programmation',
                'date' => '2024-02-20',
                'heure_debut' => '14:00',
                'heure_fin' => '16:00',
                'salle' => 'B202',
                'coefficient' => 3,
                'type' => 'Examen',
                'created_by' => $teacher->id
            ],
            [
                'matiere' => 'Base de Données',
                'date' => '2024-02-25',
                'heure_debut' => '10:00',
                'heure_fin' => '12:00',
                'salle' => 'C105',
                'coefficient' => 2,
                'type' => 'Contrôle',
                'created_by' => $teacher->id
            ]
        ];

        foreach ($exams as $examData) {
            Exam::create($examData);
        }

        // Créer des résultats
        $exam = Exam::first();
        $students = Student::all();

        foreach ($students as $student) {
            ExamResult::create([
                'exam_id' => $exam->id,
                'student_id' => $student->id,
                'note' => rand(8, 18),
                'note_max' => 20,
                'statut' => rand(0, 1) ? 'Admis' : 'Refusé',
                'commentaire' => 'Commentaire automatique',
                'evaluated_by' => $teacher->id
            ]);
        }
    }
} 