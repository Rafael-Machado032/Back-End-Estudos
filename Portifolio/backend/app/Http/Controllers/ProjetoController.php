<?php

namespace App\Http\Controllers;

use App\Models\Projeto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Cloudinary\Cloudinary;



class ProjetoController extends Controller
{
    public function index()
    /*(Leitura Geral)*/
    {
        try {

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
            'github_form' => 'nullable|string',
        ]);

        try {
            $cld = new Cloudinary(env('CLOUDINARY_URL'));

            // 2. Gera a URL ASSINADA
            $url = $cld->image($validated['demonstracao_form']) //Gera a url provisoria de 30 dias
                ->deliveryType('url2png')
                ->signUrl()
                ->addTransformation('ar_16:9,c_auto,g_north,w_500')
                ->toUrl();

            $projetoUrl = $cld->uploadApi()->upload($url, [ // Envia a URL assinada para o Cloudinary, que irá gerar uma URL definitiva
                'resource_type' => 'image',
                'asset_folder' => 'projetos',
            ]);

            Log::info(" ");
            Log::info("URL provisorio do Print Gerada: " . $url);
            Log::info("URL da imagem Gerada: " . $projetoUrl['secure_url'] );
            Log::info(" ");
            Log::info("#####################################################################################################################################################################################");

            // CORREÇÃO: Mapeando os nomes exatos da validação
            $dadosProjeto = Projeto::create([
                'titulo'           => $validated['titulo_form'],
                'tecnologia'       => $validated['tecnologias_form'], // Ajustado para bater com o validate
                'descricao'        => $validated['descricao_form'],
                'demonstracao_url' => $validated['demonstracao_form'],
                'github_url'       => $validated['github_form'] ?? null, // Opcional
                'layout_url'       => $projetoUrl['secure_url'],
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
            'github_form' => 'nullable|string',
        ]);

        try {

            $projeto->titulo = $validated['titulo_form'] ?? $projeto->titulo;
            $projeto->tecnologia = $validated['tecnologias_form'] ?? $projeto->tecnologia;
            $projeto->descricao = $validated['descricao_form'] ?? $projeto->descricao;
            $projeto->demonstracao_url = $validated['demonstracao_form'] ?? $projeto->demonstracao_url;
            $projeto->github_url = $validated['github_form'];
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

            $getPublicId = function ($url) {
                if (!$url) return null;

                // Remove a extensão (.pdf, .jpg, etc)
                $pathWithoutExtension = preg_replace('/\.[^.]+$/', '', $url);

                // Pega tudo o que vem depois da pasta /upload/v123456789/
                if (preg_match('/\/upload\/(?:v\d+\/)?(.+)$/', $pathWithoutExtension, $matches)) {
                    return $matches[1];
                }
                return null;
            };


            // Pega "projetos/capa_..." direto do banco, ignorando a URL completa
            $pathOriginal = $projeto->getRawOriginal('layout_url');
            $publicId = $getPublicId($pathOriginal);

            if ($publicId) {
                $cld = new Cloudinary(env('CLOUDINARY_URL'));
                $cld->uploadApi()->destroy($publicId, ['resource_type' => 'image']);
                Log::info("Imagem do projeto deletada do Cloudinary ID: " . $publicId);
            } else {
                Log::warning("Não foi possível extrair o public_id da imagem para: " . $pathOriginal);
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
