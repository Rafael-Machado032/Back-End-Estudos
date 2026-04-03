<?php

namespace App\Http\Controllers;

use App\Models\Depoimento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DepoimentoController extends Controller
{

    public function update(Request $request)
    {
        error_log("Dados vindo do Next: " . json_encode($request->all(), JSON_PRETTY_PRINT));
        try {
            $request->validate([
                'nome'     => 'required|string|max:255',
                'depoimento' => 'required|string',
                'foto-usuario'     => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // Validação da imagem
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Isso vai imprimir no seu terminal EXATAMENTE o que deu errado
            error_log(print_r($e->errors(), true));
            throw $e; // Reança o erro para manter o comportamento padrão
        }
        error_log("Depois (pelo array): " . json_encode($request->all(), JSON_PRETTY_PRINT));

        // Se passar ID, atualiza. Se não, cria um novo.
        $depoimento = Depoimento::findOrNew($request->id);

        $depoimento->nome = $request->input('nome');
        $depoimento->mensagem = $request->input('depoimento');

        // Lógica de Upload da Foto
        if ($request->hasFile('foto-usuario')) {
            // Deleta a foto antiga se existir
            if ($depoimento->foto_depoimento) {
                Storage::disk('public')->delete($depoimento->foto_depoimento);
            }

            // Salva a nova foto na pasta 'depoimentos' dentro de 'storage/app/public'
            $caminho = $request->file('foto-usuario')->store('depoimentos', 'public');
            $depoimento->foto_depoimento = $caminho;
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
