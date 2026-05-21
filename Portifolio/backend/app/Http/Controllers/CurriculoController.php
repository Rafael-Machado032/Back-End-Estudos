<?php

namespace App\Http\Controllers;

use App\Models\Curriculo;
use Illuminate\Http\Request;
use Cloudinary\Api\Upload\UploadApi;
use Illuminate\Support\Facades\Log;

class CurriculoController extends Controller
{
    public function store(Request $request)
    {
        // 1. REGRAS DE VALIDAÇÃO
        // Troque as chaves pelos nomes dos campos do seu formulário/frontend

        $request->validate([
            'curriculo_form' => 'required|file|mimes:pdf|max:5120', // Máx 5MB
        ]);

        try {
            $urlPdfCloudinary = null; // Vamos guardar a URL aqui

            // 2. LÓGICA DE UPLOAD

            if ($request->hasFile('curriculo_form')) {
                $file = $request->file('curriculo_form');

                try {
                    
                    $uploadApi = new UploadApi();

                    $uploadResult = $uploadApi->upload($file->getRealPath(), [
                        'folder' => 'curriculo',
                        'public_id' => 'Curriculo-Rafael-Machado', // Nome limpo e fixo
                        'overwrite' => true, // Permite substituir o arquivo antigo lá no painel
                        'resource_type' => 'auto'
                    ]);

                    $urlPdfCloudinary = $uploadResult['secure_url'];
                    
                } catch (\Exception $e) {
                    Log::error('Erro ao fazer upload do currículo para o Cloudinary.', ['error' => $e->getMessage()]);
                }
            }

            // 3. PERSISTÊNCIA (SALVAR NO BANCO)
            // Mapeie: 'coluna_no_banco' => $dadosValidados['campo_do_form']
            // $dadosCurriculo = Curriculo::create([
            //     'id' => "1",
            //     'curriculo_url' => $path,
            // ]);

            $dadosCurriculo = Curriculo::updateOrCreate(
                ['id' => 1],          // 1º Array: Condição (Procure por este ID)
                ['curriculo_url' => $urlPdfCloudinary] // 2º Array: Dados (Atualize ou crie com este valor)
            );


            return response()->json([
                'message' => 'Criado com sucesso!',
                'data'    => $dadosCurriculo, // Retorna a linha criada, incluindo o caminho do arquivo
            ], 201);
        } catch (\Exception $e) {
            // 4. CLEANUP (LIMPEZA)
            return response()->json([
                'error'   => 'Erro interno no servidor.',
                'details' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    public function show(Curriculo $curriculo)
    {
        return response()->json($curriculo, 200);
    }

}
