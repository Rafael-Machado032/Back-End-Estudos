<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class UsuarioController extends Controller
{
    public function atualizar(Request $request)
    {
        Log::info('Dados recebidos atualizar do Next.js:', $request->all());
        // 1. Validação (Segurança)
        $request->validate([
            'nome' => 'required|string|max:255',
            'foto-usuario' => 'nullable|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        // 2. Busca o usuário logado (pelo Token que o Next enviou)
        $usuario = $request->user(); 

        // 3. Salva o Nome
        $usuario->nome = $request->input('nome');

        // 4. Salva a Foto (se o Next enviou uma)
        if ($request->hasFile('foto-usuario')) {
            // O Laravel gera um nome único e salva em storage/app/public/perfil
            $caminho = $request->file('foto-usuario')->store('perfil', 'public');
            $usuario->foto = $caminho;
        }

        $usuario->save();

        return response()->json([
            'success' => true,
            'message' => 'Perfil atualizado!',
            'foto_nome' => $usuario->foto 
        ]);
    }
}

