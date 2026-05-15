<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController; // O exemplo do seu CRUD

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
Route::get('/itens', [ItemController::class, 'index']);
Route::get('/itens/{item}', [ItemController::class, 'show']);

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
    Route::post('/itens', [ItemController::class, 'store']);

    // Atualizar (Usamos POST aqui para o upload de arquivos funcionar 100%)
    // No Front-end, você envia como FormData e adiciona o campo _method = 'PUT' se quiser,
    // mas chamando essa rota POST o Laravel receberá os arquivos corretamente.
    Route::post('/itens/{item}', [ItemController::class, 'update']); //Variavel {item} é o ID do item que você quer atualizar e tem que ser o mesmo nome do parâmetro do método update no controller

    // Excluir (DELETE)
    Route::delete('/itens/{item}', [ItemController::class, 'destroy']);
});
