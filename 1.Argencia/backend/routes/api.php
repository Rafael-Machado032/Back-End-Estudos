<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;




Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Token deletado']);
});

// Só quem tem o Token (está logado) consegue entrar aqui
Route::middleware('auth:sanctum')->post('/usuario/atualizar', [UsuarioController::class, 'atualizar']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/teste', function () { // Rota de teste
    return response()->json(['mensagem' => 'Servidor Laravel rodando com sucesso!']);
});



