<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CurriculoController;
use App\Http\Controllers\FormacaoController;
use App\Http\Controllers\ProjetoController;

/*
|--------------------------------------------------------------------------
| Rotas Públicas (Site / Visitante)
|--------------------------------------------------------------------------
*/

Route::post('/login', [AuthController::class, 'login']);

// Fallback para erro de autenticação em APIs
Route::get('/login', function () {
    return response()->json(['message' => 'Não autorizado'], 401);
})->name('login');

// Rotas de visualização do site
Route::get('/formacoes', [FormacaoController::class, 'index']);
Route::get('/projetos', [ProjetoController::class, 'index']);
Route::get('/curriculos/{curriculo}', [CurriculoController::class, 'show']);

/*

|--------------------------------------------------------------------------
| Rotas Protegidas (Painel Administrativo)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // Logout
    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Desconectado com sucesso']);
    });

    // Dados do usuário logado
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    /* --- CRUD DO ITEM --- */

    // Cadastrar (POST)
    Route::post('/curriculo', [CurriculoController::class, 'store']); //No caso cria ou edita configurado no controler
    Route::post('/formacao', [FormacaoController::class, 'store']);
    Route::post('/projeto', [ProjetoController::class, 'store']);

    // Atualizar (Usamos POST aqui para o upload de arquivos funcionar 100%)
    // No Front-end, você envia como FormData e adiciona o campo _method = 'PUT' se quiser,
    // mas chamando essa rota POST o Laravel receberá os arquivos corretamente.
    Route::post('/formacao/{formacao}', [FormacaoController::class, 'update']);
    Route::post('/projeto/{projeto}', [ProjetoController::class, 'update']);

    // Excluir (DELETE)
    Route::delete('/formacao/{formacao}', [FormacaoController::class, 'destroy']);
    Route::delete('/projeto/{projeto}', [ProjetoController::class, 'destroy']);
});
