<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Item extends Model
{
    protected $fillable = ['coluna_titulo', 'coluna_json', 'coluna_arquivo'];

    // Cast para transformar o JSON do banco em Array PHP automaticamente
    protected $casts = [ //Funçaõ para array
        'coluna_json' => 'array',
    ];

    // Accessor Moderno (Laravel 9+) para retornar a URL completa
    protected function colunaArquivo(): Attribute //Funcão para arquivos
    {
        return Attribute::make(
            get: fn($value) => $value ? asset('storage/' . $value) : null,
        );
    }
}
