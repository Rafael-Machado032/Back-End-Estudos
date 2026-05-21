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
}
