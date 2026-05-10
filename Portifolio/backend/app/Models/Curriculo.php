<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curriculo extends Model
{
    protected $fillable = ['id','curriculo_url'];// adicionado o id para inserir manual

    // Remove o $appends e o método antigo, e usa este:

    public function getCurriculoUrlAttribute($value)
    {
        // O $value é o que está salvo no banco (ex: "foto.jpg")
        return $value ? asset('storage/' . $value) : null;
    }
}