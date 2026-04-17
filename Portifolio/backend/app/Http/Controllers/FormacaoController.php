<?php

namespace App\Http\Controllers;

use App\Models\Formacao;
use Illuminate\Http\Request;

class FormacaoController extends Controller
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
        try {
            $request->validate([
                'titulo_form' => 'required|string',
                'tecnologia_form' => 'required|string',
                'descricao_form' => 'required|string',
                'certificado_form' => 'required|string',
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Isso vai imprimir no seu terminal EXATAMENTE o que deu errado
            error_log(print_r($e->errors(), true));
            throw $e; // Reança o erro para manter o comportamento padrão
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Formacao $formacao)
    {
        //
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
