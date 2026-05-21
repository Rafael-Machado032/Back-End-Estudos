<?php

namespace App\Http\Controllers;

use App\Models\Formacao;
use Illuminate\Http\Request;
use Cloudinary\Api\Upload\UploadApi;
use Cloudinary\Cloudinary;
use Illuminate\Support\Facades\Log;

class FormacaoController extends Controller
{
    public function index()
    {
        try {

            return response()->json(Formacao::all(), 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao mostrar todos projeto.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titulo_form' => 'required|string',
            'descricao_form' => 'required|string',
            'credencial_form' => 'required|string',
            'siteCurso_form' => 'required|string',
            'certificado_form' => 'required|file|mimes:pdf|max:5120',
        ]);

        try {
            $urlPdfCloudinary = null; // Vamos guardar a URL aqui
            $urlCapa = null; // URL da capa gerada a partir do PDF

            if ($request->hasFile('certificado_form')) {
                $file = $request->file('certificado_form');
                try {
                    $cld = new Cloudinary(env('CLOUDINARY_URL'));
                    $uploadApi = new UploadApi();

                    $response = $uploadApi->upload($file->getRealPath(), [
                        'resource_type' => 'auto',
                        'folder' => 'certificados'
                    ]);

                    if (!$response) {
                        throw new \Exception("O Cloudinary retornou vazio!");
                    }

                    // AQUI ESTÁ A CHAVE: Pegamos a URL segura do PDF enviado
                    // 1. CORREÇÃO: Link de LEITURA para o PDF (Abre no navegador)
                    $urlPdfCloudinary = $response['secure_url']; // URL definitiva do PDF no Cloudinary
                    $publicId = $response['public_id']; // ID público do arquivo no Cloudinary, necessário para gerar a capa e para futuras operações (deletar, etc)

                    // $urlPdfCloudinary = $cld->image($publicId)
                    //     ->extension('pdf')
                    //     ->addTransformation('fl_inline')
                    //     ->toUrl();

                    $urlCapa = $cld->image($publicId) // Geramos a capa a partir do PDF usando o public_id
                        ->format('jpg')
                        ->addTransformation('w_1000,c_limit,pg_1')
                        ->toUrl();

                    Log::info(" ");
                    Log::info("URL do Pdf Gerada: " . $urlPdfCloudinary);
                    Log::info("ID do pdf: " . $publicId);
                    Log::info("URL da Capa Gerada: " . $urlCapa);
                    Log::info(" ");
                    Log::info("#####################################################################################################################################################################################");

                    
                    
                } catch (\Exception $e) {
                    Log::error("ERRO NO CLOUDINARY: " . $e->getMessage());
                    return response()->json(['error' => 'Falha no processamento do arquivo', 'details' => $e->getMessage()], 500);
                }
            }

            // SALVANDO NO BANCO
            $dadosFormacao = Formacao::create([
                'titulo'          => $validated['titulo_form'],
                'descricao'       => $validated['descricao_form'],
                'credencial'      => $validated['credencial_form'],
                'curso_url'       => $validated['siteCurso_form'],
                'certificado_url' => $urlPdfCloudinary,
                'capa_url'        => $urlCapa,     // URL DA CAPA NO CLOUDINARY
            ]);

            return response()->json([
                'message' => 'Formação cadastrada com sucesso!',
                'data'    => $dadosFormacao
            ], 201);
        } catch (\Exception $e) {
            Log::error("ERRO NO STORE: " . $e->getMessage());
            return response()->json([
                'error'   => 'Erro ao criar a formação.',
                'details' => $e->getMessage()
            ], 500);
        }
    }


    public function show(Formacao $formacao)
    {
        return response()->json($formacao, 200);
    }

    public function update(Request $request, Formacao $formacao)
    {
        $validated = $request->validate([
            'titulo_form' => 'required|string',
            'descricao_form' => 'required|string',
            'credencial_form' => 'required|string',
            'siteCurso_form' => 'required|string',
        ]);

        try {
            // 4. ATUALIZAR DEMAIS CAMPOS
            $formacao->titulo = $validated['titulo_form'];
            $formacao->descricao = $validated['descricao_form'];
            $formacao->credencial = $validated['credencial_form'];
            $formacao->curso_url = $validated['siteCurso_form'];

            $formacao->save();

            return response()->json([
                'message' => 'Atualizado com sucesso!',
                'data' => $formacao
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao editar a formação.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Formacao $formacao)
    {
        try {
            
            $uploadApi = new UploadApi();

            // 1. FUNÇÃO AUXILIAR: Extrai o public_id de uma URL do Cloudinary
            // Ela transforma "https://cloudinary.com" em "certificados/arquivo"
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

            // 2. DELETAR O PDF DO CLOUDINARY
            $pdfUrl = $formacao->getRawOriginal('certificado_url');
            $pdfPublicId = $getPublicId($pdfUrl);

            if ($pdfPublicId) {
                // No Cloudinary, PDFs e RAW files precisam do parâmetro 'resource_type' => 'raw' ou 'auto' para deletar
                $uploadApi->destroy($pdfPublicId, ['resource_type' => 'image']);
                Log::info("PDF deletado do Cloudinary ID: " . $pdfPublicId);
            } else {
                Log::warning("Não foi possível extrair o public_id do PDF para: " . $pdfUrl);
            }

            // 4. DELETAR DO BANCO DE DADOS (NEON)
            $formacao->delete();

            return response()->json(['message' => 'Formação e arquivos removidos com sucesso'], 200);
        } catch (\Exception $e) {
            Log::error("ERRO AO DELETAR FORMAÇÃO: " . $e->getMessage());
            return response()->json([
                'error' => 'Erro ao deletar a formação.',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
