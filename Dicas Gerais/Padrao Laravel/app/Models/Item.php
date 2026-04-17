<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Item extends Model
{
    protected $fillable = ['nome', 'lista', 'arquivo'];

    // Cast para transformar o JSON do banco em Array PHP automaticamente
    protected $casts = [
        'lista' => 'array',
    ];

    // Accessor Moderno (Laravel 9+) para retornar a URL completa
    protected function arquivo(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $value ? asset('storage/' . $value) : null,
        );
    }
}
