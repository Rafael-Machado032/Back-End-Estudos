<?php

namespace App\Http\Controllers;

use App\Models\Formacao;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FormacaoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Formacao::all(), 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // 1. Validação (Garante que o certificado é um PDF)
        $validado = $request->validate([
            'titulo_form' => 'required|string',
            'tecnologia_form' => 'required|array',
            'descricao_form' => 'required|string',
            'certificado_form' => 'required|file|mimes:pdf|max:5120', // Máx 5MB
        ]);

        try {
            $path = null;

            // 2. Upload do PDF para a pasta 'certificados' dentro de 'public'
            if ($request->hasFile('certificado_form')) {
                $path = $request->file('certificado_form')->store('certificados', 'public');
            }

            // 3. Salvando no Banco (Mapeando os campos)
            $dadosFormacao = Formacao::create([
                'titulo'      => $validado['titulo_form'],
                'tecnologia' => $validado['tecnologia_form'],
                'descricao'   => $validado['descricao_form'],
                'certificado' => $path, // Aqui salva o caminho do PDF: "certificados/xyz.pdf"
            ]);

            return response()->json([
                'message' => 'Formação cadastrada com sucesso!',
                'data'    => $dadosFormacao
            ], 201);

        } catch (\Exception $e) {
            // Se der erro no banco, apaga o PDF que subiu para não sobrar lixo
            if ($path) {
                Storage::disk('public')->delete($path);
            }

            return response()->json([
                'error'   => 'Erro ao salvar formação.',
                'details' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Formacao $formacao)
    {
        return response()->json($formacao, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Formacao $formacao)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Formacao $formacao)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Formacao $formacao)
    {
        //
    }
}
