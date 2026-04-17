<?php

namespace App\Http\Controllers;

use App\Models\Projeto;
use Illuminate\Http\Request;

class ProjetoController extends Controller
{
    /**
     *  Lista todos os registros.
     */
    public function index()
    /*(Leitura Geral)*/
    {
        //
    }

    /**
     * Retorna a página HTML com o formulário para criar um projeto.
     */
    public function create()
    /*(Página de Formulário - Não se usa em API)*/
    {
        //
    }

    /**
     * Recebe os dados do formulário (nome, imagem, link) e salva no banco de dados.
     */
    public function store(Request $request)
    /*(Criação)*/
    {
        try {
            $request->validate([
                'titulo_form' => 'required|string',
                'tecnologia_form' => 'required|string',
                'descricao_form' => 'required|string',
                'demonstracao_form' => 'required|string',
                'github_form' => 'required|string',
                'layout_form' => 'required|string',

            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Isso vai imprimir no seu terminal EXATAMENTE o que deu errado
            error_log(print_r($e->errors(), true));
            throw $e; // Reança o erro para manter o comportamento padrão
        }
    }

    /**
     *  Exibe os detalhes de um projeto específico.
     */
    public function show(Projeto $projeto)
    /*(Leitura Única)*/
    {
        //
    }

    /**
     * Retorna a página HTML com o formulário de edição preenchido.
     */
    public function edit(Projeto $projeto)
    /*(Página de Edição - Não se usa em API)*/
    {
        //
    }

    /**
     *  Recebe os novos dados de um projeto que já existe e atualiza no banco.
     */
    public function update(Request $request, Projeto $projeto)
    /*(Atualização)*/
    {
        //
    }

    /**
     * Deleta o registro do banco de dados.
     */
    public function destroy(Projeto $projeto)
    /*(Exclusão)*/
    {
        //
    }
}
