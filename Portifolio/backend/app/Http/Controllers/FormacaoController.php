<?php

namespace App\Http\Controllers;

use App\Models\Formacao;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Cloudinary\Api\Upload\UploadApi;
use Cloudinary\Cloudinary;

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
        // 1. Validação (Garante que o certificado é um PDF)
        $validated = $request->validate([
            'titulo_form' => 'required|string',
            'tecnologias_form' => 'required|string',
            'descricao_form' => 'required|string',
            'certificado_form' => 'required|file|mimes:pdf|max:5120', // Máx 5MB
        ]);

        try {
            $pathPDF = null;
            $pathCapa = null;

            // 2. Upload do PDF para a pasta 'certificados' dentro de 'public'
            if ($request->hasFile('certificado_form')) {
                $pathPDF = $request->file('certificado_form')->store('certificados', 'public');

                // B. Instancia o Cloudinary no seu padrão
                $cld = new Cloudinary(env('CLOUDINARY_URL'));

                // C. Sobe o PDF para o Cloudinary para ele poder "enxergar" o arquivo
                // Usamos o caminho absoluto do arquivo que acabamos de salvar
                $upload = (new UploadApi())->upload(storage_path('app/public/' . $pathPDF), [
                    'resource_type' => 'auto'
                ]);

                $urlCapa = $cld->image($upload['public_id'])
                    ->addTransformation('pg_1') // Extrai a página 1
                    ->format('jpg')
                    ->addTransformation('w_500,h_700,c_fill,g_north')
                    ->toUrl();

                // E. Baixa a capa para o seu servidor (Igual você fez no projeto)
                $nomeCapa = 'capa_' . time() . '.jpg';
                $pathCapa = 'certificados/' . $nomeCapa;

                // Dica: se der erro de SSL aqui, use o stream_context que te mostrei antes
                Storage::disk('public')->put($pathCapa, file_get_contents($urlCapa));

                // F. Opcional: Deleta do Cloudinary para não gastar sua cota
                (new UploadApi())->destroy($upload['public_id']);
            }

            // 3. Salvando no Banco (Mapeando os campos)
            $dadosFormacao = Formacao::create([
                'titulo'      => $validated['titulo_form'],
                'tecnologia' => $validated['tecnologias_form'],
                'descricao'   => $validated['descricao_form'],
                'certificado_url' => $pathPDF, // Aqui salva o caminho do PDF: "certificados/xyz.pdf"
                'capa_url' => $pathCapa,// Salva o caminho da imagem gerada: "certificados/xyz.jpg"
            ]);

            return response()->json([
                'message' => 'Formação cadastrada com sucesso!',
                'data'    => $dadosFormacao
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao criar a formação.',
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
            'tecnologias_form' => 'required|array',
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

                // 3. GERAR NOVA CAPA VIA CLOUDINARY
                $upload = (new UploadApi())->upload(storage_path('app/public/' . $pathPDF), [
                    'resource_type' => 'auto'
                ]);

                $urlCapaCloudinary = str_replace('.pdf', '.jpg', $upload['secure_url']);

                // 3. GERAR NOVA CAPA (Igual ao store)
                $pathImagem = str_replace('.pdf', '.jpg', $pathPDF);

                // 4. BAIXA A NOVA IMAGEM PARA O STORAGE LOCAL
                $imagemConteudo = file_get_contents($urlCapaCloudinary);
                Storage::disk('public')->put($pathImagem, $imagemConteudo);

                // Garante que só atualizamos o caminho se um novo arquivo foi processado
                if (isset($pathPDF)) {
                    $formacao->certificado_url = $pathPDF;
                    $formacao->capa_url = $pathImagem;
                }
            }

            // 4. ATUALIZAR DEMAIS CAMPOS
            $formacao->titulo = $validated['titulo_form'];
            $formacao->tecnologia = $validated['tecnologias_form'];
            $formacao->descricao = $validated['descricao_form'];

            $formacao->save();

            return response()->json(['message' => 'Atualizado com sucesso!', 'data' => $formacao], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao editar a formação.',
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
        try{
            return response()->json(['message' => 'Removido com sucesso'], 200);
    
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao deletar a formação.',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
