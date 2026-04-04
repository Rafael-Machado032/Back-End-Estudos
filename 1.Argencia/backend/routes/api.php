<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LayoutController;
use App\Http\Controllers\DepoimentoController;
use App\Http\Controllers\MensagemController;

Route::post('/login', [AuthController::class, 'login']);
// Adicione isso no seu api.php para o Laravel não "caçar" a rota de login
Route::get('/login', function () {
    return response()->json(['message' => 'Não autorizado'], 401);
})->name('login');


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
    //Route::post('/usuario', [UsuarioController::class, 'update']);
    //Route::post('/layout/{id}', [LayoutController::class, 'update']);
    //Route::post('/depoimento', [DepoimentoController::class, 'update']);
    Route::match(['post', 'put'], '/layout/{id}', [LayoutController::class, 'update']);
    Route::match(['post', 'put'], '/usuario', [UsuarioController::class, 'update']);
    Route::post('/depoimento', [DepoimentoController::class, 'store']);
    Route::post('/depoimento/{id}', [DepoimentoController::class, 'update']); // Tem que ter o {id}
    Route::delete('/depoimento/{id}', [DepoimentoController::class, 'destroy']); // Tem que ter o {id}
    
    Route::get('/mensagens', [MensagemController::class, 'index']); // Listar mensagens (só para admin)
    Route::delete('/mensagens/{id}', [MensagemController::class, 'destroy']);
    Route::patch('/mensagens/{id}/lida', [MensagemController::class, 'marcarComoLida']);
});

// Rotas públicas (sem autenticação)

Route::get('/layout/{id}', [LayoutController::class, 'show']);
Route::get('/depoimentos', [DepoimentoController::class, 'show']);
// Pública (qualquer um manda mensagem)
Route::post('/contato', [MensagemController::class, 'store']);

Route::get('/teste', function () { // Rota de teste
    return response()->json(['mensagem' => 'Servidor Laravel rodando com sucesso!']);
});



