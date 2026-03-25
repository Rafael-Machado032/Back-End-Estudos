<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/teste', function () { // Rota de teste
    return response()->json(['mensagem' => 'Servidor Laravel rodando com sucesso!']);
});