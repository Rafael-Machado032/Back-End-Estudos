<?php

namespace App\Http\Controllers;

use App\Models\Formacao;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Spatie\PdfToImage\Pdf;

class FormacaoController extends Controller
{
    public function index()
    {
        return response()->json(Formacao::all(), 200);
    }

    public function store(Request $request)
    {
        // 1. Validação (Garante que o certificado é um PDF)
        $validated = $request->validate([
            'titulo_form' => 'required|string',
            'tecnologia_form' => 'required|array',
            'descricao_form' => 'required|string',
            'certificado_form' => 'required|file|mimes:pdf|max:5120', // Máx 5MB
        ]);

        try {
            $pathPDF = null;
            $pathImagem = null;
            $capaPDF = null;

            // 2. Upload do PDF para a pasta 'certificados' dentro de 'public'
            if ($request->hasFile('certificado_form')) {
                $pathPDF = $request->file('certificado_form')->store('certificados', 'public');

                // 2. Define o caminho da imagem (corrigindo o nome da função)
                $pathImagem = str_replace('.pdf', '.jpg', $pathPDF);

                // Gerar a imagem JPG a partir do PDF usando Spatie\PdfToImage
                $capaPDF = new Pdf(storage_path('app/public/' . $pathPDF)); // Usa o caminho completo do PDF para carregar na biblioteca
                $capaPDF->saveImage(storage_path('app/public/' . $pathImagem));
            }

            // 3. Salvando no Banco (Mapeando os campos)
            $dadosFormacao = Formacao::create([
                'titulo'      => $validated['titulo_form'],
                'tecnologia' => $validated['tecnologia_form'],
                'descricao'   => $validated['descricao_form'],
                'certificado_url' => $pathPDF, // Aqui salva o caminho do PDF: "certificados/xyz.pdf"
                'capa_url' => $pathImagem // Salva o caminho da imagem gerada: "certificados/xyz.jpg"
                ]);

            return response()->json([
                'message' => 'Formação cadastrada com sucesso!',
                'data'    => $dadosFormacao
            ], 201);

        } catch (\Exception $e) {
            // Se der erro no banco, apaga o PDF que subiu para não sobrar lixo
            if ($pathPDF && $pathImagem){
                Storage::disk('public')->delete($pathPDF);
                Storage::disk('public')->delete($pathImagem);
            }

            return response()->json([
                'error'   => 'Erro ao salvar formação.',
                'details' => config('app.debug') ? $e->getMessage() : null
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
            'tecnologia_form' => 'required|array',
            'descricao_form' => 'required|string',
            'certificado_form' => 'nullable|file|mimes:pdf|max:5120', // mimes:pdf e nullable caso não queira mudar o arquivo
        ]);

        try {
            if ($request->hasFile('certificado_form')) {
                // 1. APAGAR ARQUIVOS ANTIGOS (PDF e Capa)
                if ($formacao->certificado_url) {
                    Storage::disk('public')->delete($formacao->certificado_url);
                }
                if ($formacao->capa_url) {
                    Storage::disk('public')->delete($formacao->capa_url);
                }

                // 2. SALVAR NOVO PDF
                $pathPDF = $request->file('certificado_form')->store('certificados', 'public');

                // 3. GERAR NOVA CAPA (Igual ao store)
                $pathImagem = str_replace('.pdf', '.jpg', $pathPDF);
                $capaPDF = new Pdf(storage_path('app/public/' . $pathPDF));
                $capaPDF->saveImage(storage_path('app/public/' . $pathImagem));

                // Atualiza os caminhos no objeto
                $formacao->certificado_url = $pathPDF;
                $formacao->capa_url = $pathImagem;
            }

            // 4. ATUALIZAR DEMAIS CAMPOS
            $formacao->titulo = $validated['titulo_form'];
            $formacao->tecnologia = $validated['tecnologia_form'];
            $formacao->descricao = $validated['descricao_form'];

            $formacao->save();

            return response()->json(['message' => 'Atualizado com sucesso!', 'data' => $formacao], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao atualizar.',
                'details' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Formacao $formacao)
    {
        // 1. Apaga o PDF original
        if ($formacao->certificado_url) {
            Storage::disk('public')->delete($formacao->certificado_url);
        }
        // 2. Apaga a imagem da capa (IMPORTANTE)
        if ($formacao->capa_url) {
            Storage::disk('public')->delete($formacao->capa_url);
        }
        // 3. Remove o registro do banco de dados
        $formacao->delete();

        return response()->json(['message' => 'Removido com sucesso'], 200);
    }
}
