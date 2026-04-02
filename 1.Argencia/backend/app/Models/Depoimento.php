<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Depoimento extends Model
{

    protected $fillable = ['nome', 'mensagem', 'foto_url'];

    // 2. IMPORTANTE: Faz o Laravel incluir a URL no JSON que vai pro Next
    protected $appends = ['foto_url_completa']; 

    // 3. Ajuste no Accessor: use um nome diferente da coluna original 
    // para não dar conflito na hora de salvar no banco.
    public function getFotoUrlCompletaAttribute()
    {
        return $this->foto_url ? asset('storage/' . $this->foto_url) : null;
    }
}
