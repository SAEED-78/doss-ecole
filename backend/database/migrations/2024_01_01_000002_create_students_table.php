<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('matricule')->unique();
            $table->string('nom');
            $table->string('prenom');
            $table->string('email')->unique();
            $table->date('date_naissance');
            $table->string('classe');
            $table->string('annee_scolaire');
            $table->string('telephone')->nullable();
            $table->text('adresse')->nullable();
            $table->timestamps();
            
            $table->index(['nom', 'prenom']);
            $table->index('classe');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('students');
    }
}; 