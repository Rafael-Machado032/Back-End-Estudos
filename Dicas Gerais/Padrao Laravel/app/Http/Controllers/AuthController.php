<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // 1. Validação (Essencial para não dar erro 500)
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // 2. Busca o usuário
        $user = User::where('email', $request->email)->first();

        // 3. Verifica senha
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'E-mail ou senha incorretos.'
            ], 401);
        }

        // 4. (Opcional) Deleta tokens antigos para evitar lixo no banco
        $user->tokens()->delete();

        // 5. Cria o Token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]
        ]);
    }
}
