<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curriculo extends Model
{
    protected $fillable = ['curriculo_url'];

    // Remove o $appends e o método antigo, e usa este:

    public function getCurriculoUrlAttribute($value)
    {
        // O $value é o que está salvo no banco (ex: "foto.jpg")
        return $value ? asset('storage/' . $value) : null;
    }
}