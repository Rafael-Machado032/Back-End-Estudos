<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;



class UsuarioController extends Controller
{
    public function atualizar(Request $request)
    {


        // 1. Validação (Segurança)
        try {
            $dadosValidos = $request->validate([
                'nome' => 'nullable|string|max:255',
                'foto-usuario' => 'nullable|image|max:2048'
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Isso vai imprimir no seu terminal EXATAMENTE o que deu errado
            error_log(print_r($e->errors(), true));
            throw $e; // Reança o erro para manter o comportamento padrão
        }

        error_log("Depois (pelo array): " . $dadosValidos['nome']);
        //required: Para informações vitais (Nome, E-mail, Senha). O usuário não pode apagar e deixar em branco.
        //nullable: Para informações opcionais (Foto, Bio, Telefone). O usuário escolhe se quer preencher ou não.

        // 2. Busca o usuário logado (pelo Token que o Next enviou)
        $usuario = $request->user();

        // 3.Testa se não veio vazio e salva o Nome
        if ($request->filled('nome')) {
            $usuario->nome = $request->nome;
        }

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
