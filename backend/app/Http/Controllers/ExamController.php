<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ExamController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Exam::with(['teacher', 'results.student']);

        // Recherche
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('matiere', 'like', "%{$search}%")
                  ->orWhere('salle', 'like', "%{$search}%")
                  ->orWhere('type', 'like', "%{$search}%");
            });
        }

        // Filtrage par statut
        if ($request->has('statut')) {
            $query->where('statut', $request->statut);
        }

        // Filtrage par type
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Tri
        $sortBy = $request->get('sort_by', 'date');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $exams = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $exams,
            'message' => 'Examens récupérés avec succès'
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'matiere' => 'required|string|max:255',
            'date' => 'required|date|after_or_equal:today',
            'heure_debut' => 'required|date_format:H:i',
            'heure_fin' => 'required|date_format:H:i|after:heure_debut',
            'salle' => 'required|string|max:50',
            'coefficient' => 'required|integer|min:1|max:10',
            'type' => 'required|in:Contrôle,Examen,Rattrapage',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        // Vérifier la disponibilité de la salle
        $conflictingExam = Exam::where('date', $request->date)
            ->where('salle', $request->salle)
            ->where(function($q) use ($request) {
                $q->whereBetween('heure_debut', [$request->heure_debut, $request->heure_fin])
                  ->orWhereBetween('heure_fin', [$request->heure_debut, $request->heure_fin])
                  ->orWhere(function($q2) use ($request) {
                      $q2->where('heure_debut', '<=', $request->heure_debut)
                         ->where('heure_fin', '>=', $request->heure_fin);
                  });
            })
            ->first();

        if ($conflictingExam) {
            return response()->json([
                'success' => false,
                'message' => 'La salle est déjà réservée pour cette période'
            ], 409);
        }

        $exam = Exam::create([
            ...$request->validated(),
            'created_by' => Auth::id(),
            'statut' => 'Programmé'
        ]);

        return response()->json([
            'success' => true,
            'data' => $exam->load('teacher'),
            'message' => 'Examen créé avec succès'
        ], 201);
    }

    public function show(Exam $exam): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $exam->load(['teacher', 'results.student']),
            'message' => 'Examen récupéré avec succès'
        ]);
    }

    public function update(Request $request, Exam $exam): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'matiere' => 'sometimes|required|string|max:255',
            'date' => 'sometimes|required|date',
            'heure_debut' => 'sometimes|required|date_format:H:i',
            'heure_fin' => 'sometimes|required|date_format:H:i|after:heure_debut',
            'salle' => 'sometimes|required|string|max:50',
            'coefficient' => 'sometimes|required|integer|min:1|max:10',
            'type' => 'sometimes|required|in:Contrôle,Examen,Rattrapage',
            'statut' => 'sometimes|required|in:Programmé,En cours,Terminé',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        $exam->update($request->validated());

        return response()->json([
            'success' => true,
            'data' => $exam->load('teacher'),
            'message' => 'Examen mis à jour avec succès'
        ]);
    }

    public function destroy(Exam $exam): JsonResponse
    {
        $exam->delete();

        return response()->json([
            'success' => true,
            'message' => 'Examen supprimé avec succès'
        ]);
    }

    public function getStatistics(): JsonResponse
    {
        $stats = [
            'total_exams' => Exam::count(),
            'programmed_exams' => Exam::where('statut', 'Programmé')->count(),
            'ongoing_exams' => Exam::where('statut', 'En cours')->count(),
            'completed_exams' => Exam::where('statut', 'Terminé')->count(),
            'exams_by_type' => Exam::selectRaw('type, count(*) as count')
                ->groupBy('type')
                ->get(),
            'upcoming_exams' => Exam::where('date', '>=', now()->toDateString())
                ->where('statut', 'Programmé')
                ->orderBy('date')
                ->limit(5)
                ->get()
        ];

        return response()->json([
            'success' => true,
            'data' => $stats,
            'message' => 'Statistiques récupérées avec succès'
        ]);
    }
} 