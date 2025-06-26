<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\ExamResult;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ExamResultController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = ExamResult::with(['exam', 'student', 'evaluator']);

        // Filtrage par examen
        if ($request->has('exam_id')) {
            $query->where('exam_id', $request->exam_id);
        }

        // Filtrage par étudiant
        if ($request->has('student_id')) {
            $query->where('student_id', $request->student_id);
        }

        // Filtrage par statut
        if ($request->has('statut')) {
            $query->where('statut', $request->statut);
        }

        $results = $query->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $results,
            'message' => 'Résultats récupérés avec succès'
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'exam_id' => 'required|exists:exams,id',
            'student_id' => 'required|exists:students,id',
            'note' => 'required|numeric|min:0',
            'note_max' => 'required|integer|min:1',
            'statut' => 'required|in:Admis,Refusé,En attente',
            'commentaire' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        // Vérifier si le résultat existe déjà
        $existingResult = ExamResult::where('exam_id', $request->exam_id)
            ->where('student_id', $request->student_id)
            ->first();

        if ($existingResult) {
            return response()->json([
                'success' => false,
                'message' => 'Un résultat existe déjà pour cet étudiant et cet examen'
            ], 409);
        }

        $result = ExamResult::create([
            ...$request->validated(),
            'evaluated_by' => Auth::id()
        ]);

        return response()->json([
            'success' => true,
            'data' => $result->load(['exam', 'student']),
            'message' => 'Résultat ajouté avec succès'
        ], 201);
    }

    public function update(Request $request, ExamResult $result): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'note' => 'sometimes|required|numeric|min:0',
            'note_max' => 'sometimes|required|integer|min:1',
            'statut' => 'sometimes|required|in:Admis,Refusé,En attente',
            'commentaire' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        $result->update([
            ...$request->validated(),
            'evaluated_by' => Auth::id()
        ]);

        return response()->json([
            'success' => true,
            'data' => $result->load(['exam', 'student']),
            'message' => 'Résultat mis à jour avec succès'
        ]);
    }

    public function destroy(ExamResult $result): JsonResponse
    {
        $result->delete();

        return response()->json([
            'success' => true,
            'message' => 'Résultat supprimé avec succès'
        ]);
    }

    public function bulkStore(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'exam_id' => 'required|exists:exams,id',
            'results' => 'required|array|min:1',
            'results.*.student_id' => 'required|exists:students,id',
            'results.*.note' => 'required|numeric|min:0',
            'results.*.note_max' => 'required|integer|min:1',
            'results.*.statut' => 'required|in:Admis,Refusé,En attente',
            'results.*.commentaire' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $validator->errors()
            ], 422);
        }

        $results = [];
        foreach ($request->results as $resultData) {
            $result = ExamResult::create([
                'exam_id' => $request->exam_id,
                ...$resultData,
                'evaluated_by' => Auth::id()
            ]);
            $results[] = $result->load(['student']);
        }

        return response()->json([
            'success' => true,
            'data' => $results,
            'message' => count($results) . ' résultats ajoutés avec succès'
        ], 201);
    }

    public function getStudentResults($studentId): JsonResponse
    {
        $results = ExamResult::where('student_id', $studentId)
            ->with(['exam'])
            ->orderBy('created_at', 'desc')
            ->get();

        $student = Student::findOrFail($studentId);

        return response()->json([
            'success' => true,
            'data' => [
                'student' => $student,
                'results' => $results,
                'average' => $student->average
            ],
            'message' => 'Résultats de l\'étudiant récupérés avec succès'
        ]);
    }
} 