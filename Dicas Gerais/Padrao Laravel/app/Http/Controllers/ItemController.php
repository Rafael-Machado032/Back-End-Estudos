<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ItemController extends Controller
{
    // Lista todos os itens (Ex: Para mostrar no Portfólio)
    public function index()
    {
        return response()->json(Item::all(), 200);
    }

    // Salva um novo item (com validação e upload)
    public function store(Request $request)
    {
        // 1. REGRAS DE VALIDAÇÃO
        // Troque as chaves pelos nomes dos campos do seu formulário/frontend
        $dadosValidados = $request->validate([
            'campo_texto'   => 'required|string|max:255',
            'campo_lista'   => 'required|array',
            'campo_arquivo' => 'required|file|mimes:pdf,jpg,png|max:5120', // 5MB
        ]);

        try {
            $caminhoArquivo = null;

            // 2. LÓGICA DE UPLOAD
            if ($request->hasFile('campo_arquivo')) {
                // 'pasta_destino' é onde o arquivo vai ficar no storage/app/public
                $caminhoArquivo = $request->file('campo_arquivo')->store('pasta_destino', 'public');
            }

            // 3. PERSISTÊNCIA (SALVAR NO BANCO)
            // Mapeie: 'coluna_no_banco' => $dadosValidados['campo_do_form']
            $registro = Item::create([
                'coluna_titulo'  => $dadosValidados['campo_texto'],
                'coluna_json'    => $dadosValidados['campo_lista'],
                'coluna_arquivo' => $caminhoArquivo,
            ]);

            return response()->json([
                'message' => 'Criado com sucesso!',
                'data'    => $registro
            ], 201);
        } catch (\Exception $e) {
            // 4. CLEANUP (LIMPEZA)
            // Se subiu o arquivo mas deu erro no banco, apaga o arquivo
            if ($caminhoArquivo) {
                Storage::disk('public')->delete($caminhoArquivo);
            }

            return response()->json([
                'error'   => 'Erro interno no servidor.',
                'details' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }


    // Mostra um item específico
    public function show(Item $item)
    {
        return response()->json($item, 200);
    }

    // Atualiza um item
    public function update(Request $request, Item $item)
    {
        $validated = $request->validate([
            'campo_texto'   => 'string|max:255',
            'campo_lista'   => 'array',
            'campo_arquivo' => 'nullable|file|max:5120',
        ]);

        if ($request->hasFile('campo_arquivo')) {
            // Usa o nome real da coluna: 'coluna_arquivo'
            Storage::disk('public')->delete($item->getRawOriginal('coluna_arquivo'));
            $caminho = $request->file('campo_arquivo')->store('pasta_destino', 'public');

            // Mapeia para os nomes do banco antes de atualizar
            $item->coluna_arquivo = $caminho;
        }

        $item->coluna_titulo = $validated['campo_texto'] ?? $item->coluna_titulo;
        $item->coluna_json = $validated['campo_lista'] ?? $item->coluna_json;
        $item->save();

        return response()->json(['message' => 'Atualizado!', 'data' => $item], 200);
    }


    // Remove o item
    public function destroy(Item $item)
    {
        // Ajustado para 'coluna_arquivo'
        if ($item->getRawOriginal('coluna_arquivo')) {
            Storage::disk('public')->delete($item->getRawOriginal('coluna_arquivo'));
        }

        $item->delete();
        return response()->json(['message' => 'Removido com sucesso'], 200);
    }
}
