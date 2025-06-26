<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exam_results', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_id')->constrained()->onDelete('cascade');
            $table->foreignId('student_id')->constrained()->onDelete('cascade');
            $table->decimal('note', 5, 2)->nullable();
            $table->integer('note_max')->default(20);
            $table->enum('statut', ['Admis', 'Refusé', 'En attente'])->default('En attente');
            $table->text('commentaire')->nullable();
            $table->foreignId('evaluated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            
            $table->unique(['exam_id', 'student_id']);
            $table->index(['exam_id', 'statut']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exam_results');
    }
}; 