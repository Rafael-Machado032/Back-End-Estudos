<?php

namespace App\Http\Controllers;

use App\Models\Curriculo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CurriculoController extends Controller
{
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
                $file = $request->file('curriculo_form');
                $nomeOriginal = $file->getClientOriginalName();
                // storeAs garante que use o nome que você passou
                $path = $file->storeAs('curriculo', $nomeOriginal, 'public');
            }

            // 3. PERSISTÊNCIA (SALVAR NO BANCO)
            // Mapeie: 'coluna_no_banco' => $dadosValidados['campo_do_form']
            $dadosCurriculo = Curriculo::create([
                'id' => "1",
                'curriculo_url' => $path,
            ]);

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

    public function update(Request $request, Curriculo $curriculo){

        $request->validate([
            'curriculo_form' => 'required|file|mimes:pdf,doc,docx|max:5120', // Máx 5MB
        ]);

        if ($request->hasFile('curriculo_form')) {
            Storage::disk('public')->delete($curriculo->getRawOriginal('curriculo_url'));
            $file = $request->file('curriculo_form');
            $nomeOriginal = $file->getClientOriginalName();
            // storeAs garante que use o nome que você passou
            $path = $file->storeAs('curriculo', $nomeOriginal, 'public');
            $curriculo->curriculo_url = $path;
        }

        $curriculo->save();

        return response()->json([
            'debug_request' => $request->all(),
            'message' => 'Atualizado!',
            'data' => $curriculo
        ], 200);
    }

    public function show(Curriculo $curriculo)
    {
        return response()->json($curriculo, 200);
    }

}
