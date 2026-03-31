<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Layout extends Model
{
    // 1. Permite preencher a coluna no banco
    protected $fillable = ['foto_pc'];

    // 2. Faz o 'foto_pc_url' aparecer no JSON do Next.js
    protected $appends = ['foto_pc_url'];

    // 3. A lógica para criar o link completo da imagem
    public function getFotoPcUrlAttribute()
    {
        return $this->foto_pc ? url('storage/' . $this->foto_pc) : null;
    }
}
