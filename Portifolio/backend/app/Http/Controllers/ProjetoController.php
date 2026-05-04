<?php

namespace App\Http\Controllers;

use App\Models\Projeto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Cloudinary\Cloudinary;



class ProjetoController extends Controller
{
    public function index()
    /*(Leitura Geral)*/
    {
        try{

            return response()->json(Projeto::all(), 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao mostrar todos projeto.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        // 1. Validação (Garante que o certificado é um PDF)
        $validated = $request->validate([
            'titulo_form' => 'required|string',
            'tecnologias_form' => 'required|string',
            'descricao_form' => 'required|string',
            'demonstracao_form' => 'required|string',
            'github_form' => 'required|string',
        ]);

        try {
            $nomeCapa = 'capa_' . time() . '.jpg';
            $pathCapa = 'projetos/' . $nomeCapa;

            $cld = new Cloudinary(env('CLOUDINARY_URL'));

            // 2. Gera a URL ASSINADA
            $url = $cld->image($validated['demonstracao_form'])
                ->deliveryType('url2png')
                ->signUrl()
                ->addTransformation('ar_16:9,c_auto,g_north,w_500')
                ->toUrl();

            Log::info("URL do Print: " . $url);

            Storage::disk('public')->put($pathCapa, file_get_contents($url));

            // CORREÇÃO: Mapeando os nomes exatos da validação
            $dadosProjeto = Projeto::create([
                'titulo'          => $validated['titulo_form'],
                'tecnologia'      => $validated['tecnologias_form'], // Ajustado para bater com o validate
                'descricao'       => $validated['descricao_form'],
                'demonstracao_url' => $validated['demonstracao_form'],
                'github_url'      => $validated['github_form'],
                'layout_url'      => $pathCapa,
            ]);

            return response()->json([
                'message' => 'Projeto cadastrado com sucesso!',
                'data' => $dadosProjeto
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao salvar projeto.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    /**
     *  Exibe os detalhes de um projeto específico.
     */
    public function show(Projeto $projeto)
    /*(Leitura Única)*/
    {
        try {

            return response()->json($projeto, 200);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao mostrar o projeto.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, Projeto $projeto)
    /*(Atualização)*/
    {
        $validated = $request->validate([
            'titulo_form' => 'required|string',
            'tecnologias_form' => 'required|string',
            'descricao_form' => 'required|string',
            'demonstracao_form' => 'required|string',
            'github_form' => 'required|string',
        ]);

        try {

            $projeto->titulo = $validated['titulo_form'] ?? $projeto->titulo;
            $projeto->tecnologia = $validated['tecnologias_form'] ?? $projeto->tecnologia;
            $projeto->descricao = $validated['descricao_form'] ?? $projeto->descricao;
            $projeto->demonstracao_url = $validated['demonstracao_form'] ?? $projeto->demonstracao_url;
            $projeto->github_url = $validated['github_form'] ?? $projeto->github_url;
            $projeto->save();


            return response()->json([
                'message' => 'Atualizado!',
                'data' => $projeto
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao editar o projeto.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Projeto $projeto)
    /*(Exclusão)*/
    {
        try {
            // Pega "projetos/capa_..." direto do banco, ignorando a URL completa
            $pathOriginal = $projeto->getRawOriginal('layout_url');

            if ($pathOriginal && Storage::disk('public')->exists($pathOriginal)) {
                Storage::disk('public')->delete($pathOriginal);
            }

            $projeto->delete();
            return response()->json(['message' => 'Removido com sucesso'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao deletar o projeto.',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
