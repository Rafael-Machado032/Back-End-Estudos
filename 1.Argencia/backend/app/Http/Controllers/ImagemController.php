<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Imagem; // O seu "Gerente" do banco
use Illuminate\Support\Facades\Storage; // A ferramenta que mexe no HD

class ImagemController extends Controller
{
    public function store(Request $request)
    {
        // 1. VALIDAÇÃO: O segurança da entrada
        // Verifica se é imagem, se tem título e se o tamanho é aceitável (2MB)
        $request->validate([
            'foto' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'titulo' => 'required|string',
            'tipo' => 'required|string' // 'perfil', 'projeto', etc.
        ]);

        // 2. SALVAR NO HD: A logística
        // O Laravel pega o arquivo e joga na pasta que você quiser
        if ($request->hasFile('foto')) {
            // Salva na pasta baseada no "tipo" (ex: storage/app/public/perfil)
            $caminhoArquivo = $request->file('foto')->store($request->tipo, 'public');

            // 3. SALVAR NO BANCO: O registro
            // O Model (Image) cria a linha na tabela "imagens"
            $registro = Imagem::create([
                'titulo' => $request->titulo,
                'caminho' => $caminhoArquivo,
                'tipo' => $request->tipo,
            ]);

            // 4. RESPOSTA: O feedback para o Next.js
            return response()->json([
                'status' => 'sucesso',
                'url' => asset('storage/' . $caminhoArquivo), // Link pronto para o <img />
                'dados' => $registro
            ], 201);
        }

        return response()->json(['erro' => 'Arquivo não enviado'], 400);
    }
}
