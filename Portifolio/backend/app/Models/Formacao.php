<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Formacao extends Model
{
    // 1. Nomes devem ser iguais aos que você usou no Formacao::create do Controller
    protected $fillable = [
        'titulo',
        'descricao',
        'credencial',
        'certificado_url',
        'capa_url',
        'curso_url',
    ];

    // 2. ESSENCIAL: transforma a lista de array para JSON e vice-versa
    protected $casts = [
        'tecnologia' => 'array',
    ];

}
