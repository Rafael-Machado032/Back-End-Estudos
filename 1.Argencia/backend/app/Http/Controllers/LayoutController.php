<?php

namespace App\Http\Controllers;

use App\Models\Layout;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LayoutController extends Controller
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Layout $layout)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Layout $layout)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // 1. Validação (Sempre importante!)
        $request->validate([
            'foto-pc' => 'required|image|max:5000', // 'foto-pc' é o name do seu input no Next
        ]);

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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Layout $layout)
    {
        //
    }
}
