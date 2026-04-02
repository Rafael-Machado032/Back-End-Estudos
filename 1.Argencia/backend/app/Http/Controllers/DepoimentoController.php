<?php

namespace App\Http\Controllers;

use App\Models\Depoimento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DepoimentoController extends Controller
{

    public function update(Request $request)
    {
        try {
            $request->validate([
                'id'       => 'nullable|exists:depoimentos,id',
                'nome'     => 'required|string|max:255',
                'mensagem' => 'required|string',
                'foto'     => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // Validação da imagem
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Isso vai imprimir no seu terminal EXATAMENTE o que deu errado
            error_log(print_r($e->errors(), true));
            throw $e; // Reança o erro para manter o comportamento padrão
        }

        // Se passar ID, atualiza. Se não, cria um novo.
        $depoimento = Depoimento::findOrNew($request->id);

        $depoimento->nome = $request->nome;
        $depoimento->mensagem = $request->mensagem;

        // Lógica de Upload da Foto
        if ($request->hasFile('foto')) {
            // Deleta a foto antiga se existir
            if ($depoimento->foto_url) {
                Storage::disk('public')->delete($depoimento->foto_url);
            }

            // Salva a nova foto na pasta 'depoimentos' dentro de 'storage/app/public'
            $caminho = $request->file('foto')->store('depoimentos', 'public');
            $depoimento->foto_url = $caminho;
        }

        $depoimento->save();

        return response()->json([
            'success' => true,
            'message' => 'Depoimento salvo com sucesso!',
            'depoimento' => $depoimento
        ]);
    }

    public function show()
    {
        return response()->json(Depoimento::all());
    }
}
