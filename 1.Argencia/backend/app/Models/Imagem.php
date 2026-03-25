<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Imagem extends Model
{

     // Informa ao Laravel que o nome da tabela no banco é "imagens"
    protected $table = 'imagens';

    // Permite preencher esses campos via código
    protected $fillable = ['titulo', 'caminho', 'tipo'];

    public $timestamps = true; //Autoriza registrar a data de criação

}
