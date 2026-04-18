<?php

namespace App\Http\Controllers;

use App\Models\Curriculo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CurriculoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        // 1. REGRAS DE VALIDAÇÃO
        // Troque as chaves pelos nomes dos campos do seu formulário/frontend
        $request->validate([
            'curriculo_form' => 'required|file|mimes:pdf,doc,docx|max:5120', // Máx 5MB
        ]);

        try {
            $path = null;

            // 2. LÓGICA DE UPLOAD
            if ($request->hasFile('curriculo_form')) {
                // 'pasta_destino' é onde o arquivo vai ficar no storage/app/public
                $path = $request->file('curriculo_form')->store('curriculo', 'public');
            }

            // 3. PERSISTÊNCIA (SALVAR NO BANCO)
            // Mapeie: 'coluna_no_banco' => $dadosValidados['campo_do_form']
            $dadosCurriculo = Curriculo::create([
                'curriculo_url' => $path,
            ]);

            return response()->json([
                'message' => 'Criado com sucesso!',
                'data'    => $dadosCurriculo
            ], 201);
        } catch (\Exception $e) {
            // 4. CLEANUP (LIMPEZA)
            // Se subiu o arquivo mas deu erro no banco, apaga o arquivo
            if ($path) {
                Storage::disk('public')->delete($path);
            }

            return response()->json([
                'error'   => 'Erro interno no servidor.',
                'details' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Curriculo $curriculo)
    {
        return response()->json($curriculo, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Curriculo $curriculo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Curriculo $curriculo)
    {
        $request->validate([
            'curriculo_form' => 'required|file|mimes:pdf,doc,docx|max:5120', // Máx 5MB
        ]);

        if ($request->hasFile('curriculo_form')) {
            // Usa o nome real da coluna: 'coluna_arquivo'
            Storage::disk('public')->delete($curriculo->getRawOriginal('curriculo_url'));
            $path = $request->file('curriculo_form')->store('curriculo', 'public');

            // Mapeia para os nomes do banco antes de atualizar
            $curriculo->curriculo_url = $path;
        }

        $curriculo->save();

        return response()->json(['message' => 'Atualizado!', 'data' => $curriculo], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Curriculo $curriculo)
    {
        //
    }
}
