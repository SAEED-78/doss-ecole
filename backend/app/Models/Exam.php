<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Exam extends Model
{
    use HasFactory;

    protected $fillable = [
        'matiere',
        'date',
        'heure_debut',
        'heure_fin',
        'salle',
        'coefficient',
        'type',
        'statut',
        'description',
        'created_by'
    ];

    protected $casts = [
        'date' => 'date',
        'heure_debut' => 'datetime',
        'heure_fin' => 'datetime',
        'coefficient' => 'integer',
    ];

    public function results(): HasMany
    {
        return $this->hasMany(ExamResult::class);
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getStatusColorAttribute(): string
    {
        return match($this->statut) {
            'Programmé' => 'text-blue-600 bg-blue-100',
            'En cours' => 'text-yellow-600 bg-yellow-100',
            'Terminé' => 'text-green-600 bg-green-100',
            default => 'text-gray-600 bg-gray-100',
        };
    }
} 