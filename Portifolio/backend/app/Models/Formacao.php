<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Formacao extends Model
{
    // 1. Nomes devem ser iguais aos que você usou no Formacao::create do Controller
    protected $fillable = [
        'titulo',
        'tecnologia',
        'descricao',
        'certificado_url',
        'capa_url',
    ];

    // 2. ESSENCIAL: transforma a lista de array para JSON e vice-versa
    protected $casts = [
        'tecnologia' => 'array',
    ];

    // 3. Accessor para o campo 'certificado'
    protected function certificado(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? asset('storage/' . $value) : null,
        );
    }

    // 4. Accessor para o campo 'capa'
    protected function capa(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? asset('storage/' . $value) : null,
        );
    }
}
