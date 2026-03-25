<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('imagens', function (Blueprint $table) {
            $table->id();
            $table->string('nome'); // Nome ou legenda da foto
            $table->string('caminho');  // O caminho do arquivo (ex: uploads/foto.jpg)
              $table->string('tipo');    // Se é 'perfil', 'projeto', etc.
            $table->timestamps();    // Cria created_at e updated_at automaticamente
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
