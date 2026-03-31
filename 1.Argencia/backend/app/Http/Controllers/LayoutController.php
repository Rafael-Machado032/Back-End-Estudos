<?php

namespace App\Http\Controllers;

use App\Models\Layout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LayoutController extends Controller
{
  
    public function update(Request $request, $id)
    {

       error_log("Nome do arquivo: " . $request->file('foto-pc')->getClientOriginalName());
        // 1. Validação (Sempre importante!)
        try{
            $dadosValidos=$request->validate([
            'foto-pc' => 'required|image|max:5000', // 'foto-pc' é o name do seu input no Next
            ]);
        }catch (\Illuminate\Validation\ValidationException $e) {
            // Isso vai imprimir no seu terminal EXATAMENTE o que deu errado
            error_log(print_r($e->errors(), true));
            throw $e; // Reança o erro para manter o comportamento padrão
        }
        error_log("Caminho temporário: " . $request->file('foto-pc')->getPathname());

        // 2. Busca o Layout pelo ID (no seu caso, passamos o ID 1)
        // Se não existir, o findOrFail já retorna um erro 404 sozinho
        $layout = Layout::findOrFail($id);

        // 3. Se enviou um arquivo novo...
        if ($request->hasFile('foto-pc')) {
            
            // Deleta a foto anterior do HD se ela existir
            if ($layout->foto_pc) {
                Storage::disk('public')->delete($layout->foto_pc);
            }

            // Salva a nova na pasta 'layouts' dentro do storage
            $caminho = $request->file('foto-pc')->store('layouts', 'public');
            
            // Atualiza o caminho no objeto
            $layout->foto_pc = $caminho;
        }

        // 4. Grava no Banco de Dados
        $layout->save();

        return response()->json([
            'success' => true,
            'message' => 'Layout atualizado com sucesso!',
            'layout' => $layout // Aqui o Next.js já recebe o 'foto_pc_url'
        ]);
    }
    public function show($id)
    {
        
        $layout = Layout::findOrFail($id);
        return response()->json([
            'layout' => $layout
        ]);
    }
}