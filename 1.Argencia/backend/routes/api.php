<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LayoutController;
use App\Http\Controllers\DepoimentoController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    // Só quem tem o Token (está logado) consegue entrar aqui
    // Defina explicitamente o POST para o update antes do resource
    Route::post('/logout', function (Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Token deletado']);
    });

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/layout/{id}', [LayoutController::class, 'update']);
    Route::post('/usuario', [UsuarioController::class, 'update']);
    Route::post('/depoimento', [DepoimentoController::class, 'update']);
    
});

// Rotas públicas (sem autenticação)

Route::get('/layout/{id}', [LayoutController::class, 'show']);
Route::get('/depoimentos', [DepoimentoController::class, 'show']);

Route::get('/teste', function () { // Rota de teste
    return response()->json(['mensagem' => 'Servidor Laravel rodando com sucesso!']);
});



