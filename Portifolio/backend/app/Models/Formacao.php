<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Formacao extends Model
{
    protected $fillable = ['titulo', 'tecnologia', 'descricao', 'certificado_url'];

    public function getCertificadoUrlAttribute($value)
    {
        // O $value é o que está salvo no banco (ex: "foto.jpg")
        return $value ? asset('storage/' . $value) : null;
    }
}

