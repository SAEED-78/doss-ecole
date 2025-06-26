<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->string('matiere');
            $table->date('date');
            $table->time('heure_debut');
            $table->time('heure_fin');
            $table->string('salle');
            $table->integer('coefficient')->default(1);
            $table->enum('type', ['Contrôle', 'Examen', 'Rattrapage'])->default('Examen');
            $table->enum('statut', ['Programmé', 'En cours', 'Terminé'])->default('Programmé');
            $table->text('description')->nullable();
            $table->foreignId('created_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            
            $table->index(['date', 'salle']);
            $table->index('matiere');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exams');
    }
}; 