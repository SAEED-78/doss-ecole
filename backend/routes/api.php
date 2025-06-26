<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\ExamResultController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\AuthController;

// Routes d'authentification
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Routes protégées
Route::middleware('auth:sanctum')->group(function () {
    // Routes des examens
    Route::apiResource('exams', ExamController::class);
    Route::get('exams/statistics', [ExamController::class, 'getStatistics']);
    
    // Routes des résultats
    Route::apiResource('results', ExamResultController::class);
    Route::post('results/bulk', [ExamResultController::class, 'bulkStore']);
    Route::get('students/{student}/results', [ExamResultController::class, 'getStudentResults']);
    
    // Routes des étudiants
    Route::apiResource('students', StudentController::class);
    
    // Route utilisateur connecté
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    
    // Déconnexion
    Route::post('/logout', [AuthController::class, 'logout']);
}); 