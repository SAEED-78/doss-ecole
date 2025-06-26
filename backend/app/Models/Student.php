<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'matricule',
        'nom',
        'prenom',
        'email',
        'date_naissance',
        'classe',
        'annee_scolaire',
        'telephone',
        'adresse'
    ];

    protected $casts = [
        'date_naissance' => 'date',
    ];

    public function results(): HasMany
    {
        return $this->hasMany(ExamResult::class);
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->prenom} {$this->nom}";
    }

    public function getAverageAttribute(): float
    {
        $results = $this->results()->whereNotNull('note')->get();
        
        if ($results->isEmpty()) {
            return 0;
        }

        $totalWeightedScore = 0;
        $totalCoefficient = 0;

        foreach ($results as $result) {
            $coefficient = $result->exam->coefficient;
            $totalWeightedScore += ($result->note / $result->note_max) * 20 * $coefficient;
            $totalCoefficient += $coefficient;
        }

        return $totalCoefficient > 0 ? $totalWeightedScore / $totalCoefficient : 0;
    }
} 