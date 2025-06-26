<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExamResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_id',
        'student_id',
        'note',
        'note_max',
        'statut',
        'commentaire',
        'evaluated_by'
    ];

    protected $casts = [
        'note' => 'decimal:2',
        'note_max' => 'integer',
    ];

    public function exam(): BelongsTo
    {
        return $this->belongsTo(Exam::class);
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function evaluator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'evaluated_by');
    }

    public function getStatusColorAttribute(): string
    {
        return match($this->statut) {
            'Admis' => 'text-green-600 bg-green-100',
            'Refusé' => 'text-red-600 bg-red-100',
            'En attente' => 'text-yellow-600 bg-yellow-100',
            default => 'text-gray-600 bg-gray-100',
        };
    }

    public function getPercentageAttribute(): float
    {
        return ($this->note / $this->note_max) * 100;
    }
} 