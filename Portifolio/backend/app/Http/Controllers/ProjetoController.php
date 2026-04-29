<?php

namespace App\Http\Controllers;

use App\Models\Projeto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Cloudinary\Api\Upload\UploadApi;

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
            'tecnologias_form' => 'required|string',
            'descricao_form' => 'required|string',
            'demonstracao_form' => 'required|string',
            'github_form' => 'required|string',
        ]);

        try {
            // 1. Configuração do Print Automático
            $cloudName = "dxmrolrys"; // Seu Cloud Name
            $nomeCapa = 'capa_' . time() . '.jpg';
            $pathCapa = 'projetos/' . $nomeCapa;

            // URL de Fetch do Cloudinary (abre o site e gera o print 1200x800)
            $urlFetch = "https://cloudinary.com{$cloudName}/image/fetch/w_1200,h_800,c_fill,f_jpg/" . $validated['demonstracao_form'];

            // 2. Baixa o print para a sua pasta local storage/app/public/projetos
            $conteudoPrint = file_get_contents($urlFetch);
            Storage::disk('public')->put($pathCapa, $conteudoPrint);

            // 3. Salvando no Banco (Mapeando os campos)
            $dadosProjeto = Projeto::create([
                'titulo' => $validated['titulo_form'],
                'tecnologia' => $validated['tecnologia_form'],
                'descricao' => $validated['descricao_form'],
                'demonstracao_url' => $validated['demonstracao_form'],
                'github_url' => $validated['github_form'],
                'layout_url' => $pathCapa, // Aqui salva o caminho do PDF: "certificados/xyz.pdf"
            ]);

            return response()->json([
                'debug'   => $request->all(), // Retorna o q chegou no next
                'message' => 'Projeto cadastrado com sucesso!',
                'data' => $dadosProjeto
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'debug'   => $request->all(), // Retorna o q chegou no next
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
        ]);

        // Se a URL do projeto mudou, gera um novo print
        if ($validated['demonstracao_form'] !== $projeto->demonstracao_url) {
            // Apaga a capa antiga
            if ($projeto->layout_url) {
                Storage::disk('public')->delete($projeto->layout_url);
            }

            $cloudName = "dxmrolrys";
            $nomeCapa = 'capa_' . time() . '.jpg';
            $pathCapa = 'projetos/' . $nomeCapa;
            $urlFetch = "https://cloudinary.com{$cloudName}/image/fetch/w_1200,h_800,c_fill,f_jpg/" . $validated['demonstracao_form'];

            Storage::disk('public')->put($pathCapa, file_get_contents($urlFetch));
            $projeto->layout_url = $pathCapa;
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
        if ($projeto->layout_url) {
            Storage::disk('public')->delete($projeto->layout_url);
        }
        $projeto->delete();
        return response()->json(['message' => 'Removido com sucesso'], 200);
    }
}
