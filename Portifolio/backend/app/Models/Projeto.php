<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Projeto extends Model
{
    protected $fillable = [
        'titulo',
        'tecnologia',
        'descricao',
        'demonstracao_url',
        'github_url',
        'layout_url'
    ];

    public function getLayoutUrlAttribute($value)
    {
        // O $value é o que está salvo no banco (ex: "foto.jpg")
        return $value ? asset('storage/' . $value) : null;
    }
}
