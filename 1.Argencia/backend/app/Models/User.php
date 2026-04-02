<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    
    use HasFactory, Notifiable, HasApiTokens;
    //HasFactory: Permite criar "Fábricas" para gerar usuários falsos (útil para testes).
    //Notifiable: Permite enviar notificações para o usuário (e-mail, SMS, etc).
    //HasApiTokens: Permite que o seu usuário gere "Tokens" (senhas digitais temporárias).

    protected $fillable = [
        'name',
        'email',
        'password',
        'foto'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Isso faz o Laravel incluir o 'foto_url' no JSON automaticamente
    protected $appends = ['foto_url_completa']; 
    
    // No arquivo App\Models\User.php
    public function getFotoUrlCompletaAttribute() {
        return $this->foto ? asset('storage/' . $this->foto) : null;
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
