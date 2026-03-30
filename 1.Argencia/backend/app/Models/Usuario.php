<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    // 1. APONTA PARA A TABELA 'users'
    // Como o nome da classe é 'Usuario', o Laravel procuraria 'usuarios'. 
    // Precisamos forçar para 'users'.
    protected $table = 'users';

    // 2. CAMPOS PERMITIDOS
    // Adicionei 'email' e 'password' pois a tabela 'users' exige isso para funcionar.
    protected $fillable = ['name', 'foto', 'email', 'password'];
}