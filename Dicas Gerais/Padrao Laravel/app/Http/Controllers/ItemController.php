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
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'lista' => 'required|array', // A lista que você queria
            'arquivo' => 'required|image|mimes:jpg,png,jpeg|max:2048', // Foto/Arquivo
        ]);

        // Faz o upload do arquivo e pega o caminho
        if ($request->hasFile('arquivo')) {
            $path = $request->file('arquivo')->store('itens', 'public');
            $validated['arquivo'] = $path;
        }

        $item = Item::create($validated);

        return response()->json([
            'message' => 'Criado com sucesso!',
            'data' => $item
        ], 201);
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
            'nome' => 'string|max:255',
            'lista' => 'array',
            'arquivo' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('arquivo')) {
            // Deleta o arquivo antigo antes de salvar o novo
            Storage::disk('public')->delete($item->getRawOriginal('arquivo'));
            $validated['arquivo'] = $request->file('arquivo')->store('itens', 'public');
        }

        $item->update($validated);

        return response()->json(['message' => 'Atualizado!', 'data' => $item], 200);
    }

    // Remove o item
    public function destroy(Item $item)
    {
        // Deleta o arquivo físico do storage
        Storage::disk('public')->delete($item->getRawOriginal('arquivo'));
        $item->delete();

        return response()->json(['message' => 'Removido com sucesso'], 200);
    }
}
