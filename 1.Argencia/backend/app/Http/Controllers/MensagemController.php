<?php

namespace App\Http\Controllers;

use App\Models\Mensagem;
use Illuminate\Http\Request;

class MensagemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            // Busca direto da classe (Estático)
            $mensagens = Mensagem::orderBy('created_at', 'desc')->get();
            return response()->json($mensagens);
        } catch (\Exception $e) {
            // Isso vai forçar o erro a aparecer no log se algo falhar no banco
            error_log("ERRO NO INDEX: " . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
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
        error_log("Dados vindo do Next: " . json_encode($request->all(), JSON_PRETTY_PRINT));
        $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email',
            'mensagem' => 'required|string',
        ]);
        error_log("Depois (pelo array): " . json_encode($request->all(), JSON_PRETTY_PRINT));

        $msg = Mensagem::create($request->all());

        return response()->json([
            'success' => true, 
            'mensagem' => $msg
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Mensagem $mensagem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Mensagem $mensagem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Mensagem $mensagem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Mensagem::destroy($id);
        return response()->json(['success' => true]);
    }
}
