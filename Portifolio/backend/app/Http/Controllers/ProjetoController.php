<?php

namespace App\Http\Controllers;

use App\Models\Projeto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjetoController extends Controller
{
    public function index()
    /*(Leitura Geral)*/
    {
        return response()->json(Projeto::all(), 200);
    }

    public function store(Request $request)
    {
        // 1. Validação (Garante que o certificado é um PDF)
        $validated = $request->validate([
            'titulo_form' => 'required|string',
            'tecnologia_form' => 'required|string',
            'descricao_form' => 'required|string',
            'demonstracao_form' => 'required|string',
            'github_form' => 'required|string',
        ]);

        try {
            $path = null;

            // 3. Salvando no Banco (Mapeando os campos)
            $dadosProjeto = Projeto::create([
                'titulo' => $validated['titulo_form'],
                'tecnologia' => $validated['tecnologia_form'],
                'descricao' => $validated['descricao_form'],
                'demonstracao_url' => $validated['demonstracao_form'],
                'github_url' => $validated['github_form'],
                'layout_url' => $path, // Aqui salva o caminho do PDF: "certificados/xyz.pdf"
            ]);

            return response()->json([
                'message' => 'Formação cadastrada com sucesso!',
                'data' => $dadosProjeto
            ], 201);
        } catch (\Exception $e) {
            // Se der erro no banco, apaga o PDF que subiu para não sobrar lixo
            if ($path) {
                Storage::disk('public')->delete($path);
            }

            return response()->json([
                'error' => 'Erro ao salvar projeto.',
                'details' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     *  Exibe os detalhes de um projeto específico.
     */
    public function show(Projeto $projeto)
    /*(Leitura Única)*/
    {
        return response()->json($projeto, 200);
    }

    public function update(Request $request, Projeto $projeto)
    /*(Atualização)*/
    {
        $validated = $request->validate([
            'titulo_form' => 'required|string',
            'tecnologia_form' => 'required|string',
            'descricao_form' => 'required|string',
            'demonstracao_form' => 'required|string',
            'github_form' => 'required|string',
            'layout_form' => 'required|file|image|mimes:jpeg,jpg,png,webp,svg|max:5120', // Máx 5MB
        ]);

        if ($request->hasFile('layout_form')) {
            // Usa o nome real da coluna: 'coluna_arquivo'
            Storage::disk('public')->delete($projeto->getRawOriginal('layout_form'));
            $path = $request->file('layout_form')->store('projetos', 'public');

            // Mapeia para os nomes do banco antes de atualizar
            $projeto->layout_url = $path;
        }

        $projeto->titulo = $validated['titulo_form'] ?? $projeto->titulo;
        $projeto->tecnologia = $validated['tecnologia_form'] ?? $projeto->tecnologia;
        $projeto->descricao = $validated['descricao_form'] ?? $projeto->descricao;
        $projeto->demonstracao_url = $validated['demonstracao_form'] ?? $projeto->demonstracao_url;
        $projeto->github_url = $validated['github_form'] ?? $projeto->github_url;
        $projeto->save();


        return response()->json([
            'message' => 'Atualizado!',
            'data' => $projeto
        ], 200);
    }

    public function destroy(Projeto $projeto)
    /*(Exclusão)*/
    {
        // Ajustado para 'coluna_arquivo'
        if ($projeto->getRawOriginal('layout_url')) {
            Storage::disk('public')->delete($projeto->getRawOriginal('layout_url'));
        }

        $projeto->delete();
        return response()->json([
            'message' => 'Removido com sucesso'
        ], 200);
    }
}
