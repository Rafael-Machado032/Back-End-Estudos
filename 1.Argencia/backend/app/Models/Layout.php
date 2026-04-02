<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Layout extends Model
{
    // 1. Permite preencher a coluna no banco
    protected $fillable = ['foto_pc'];

    // 2. Faz o 'layout_url_completa' aparecer no JSON do Next.js
    protected $appends = ['layout_url_completa']; // O nome do Accessor que criamos

    // 3. A lógica para criar o link completo da imagem
    public function getLayoutUrlCompletaAttribute()
    {
        return $this->foto_pc ? asset('storage/' . $this->foto_pc) : null;
    }
}
