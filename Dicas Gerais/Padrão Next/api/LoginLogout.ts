'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = process.env.API_URL;

// --- LOGIN ---
export async function ActionLogin(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
        });

        const dados = await res.json();

        if (res.ok && dados.token) {
            const cookieStore = await cookies();

            // Salva o Token de forma segura
            cookieStore.set('token', dados.token, {
                path: '/',
                httpOnly: true, // Segurança contra XSS
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7, // 7 dias
                sameSite: 'lax',
            });

            // Opcional: Salvar dados básicos do user em um cookie não-httpOnly 
            // para o Front-end ler o nome/foto sem precisar do context no início
            cookieStore.set('user_name', dados.user.name, { path: '/', maxAge: 60 * 60 * 24 * 7 });

        } else {
            return { success: false, message: dados.message || 'Credenciais inválidas' };
        }
    } catch {
        return { success: false, message: 'Erro de conexão com o servidor' };
    }

    // Redireciona após o sucesso (fora do try/catch é a recomendação do Next)
    redirect('/admin');
}

// --- LOGOUT ---
export async function ActionLogout() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (token) {
        try {
            // Avisa o Laravel para invalidar o Token no Banco (Sanctum)
            await fetch(`${API_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch {
            // Se o servidor falhar, ignoramos para permitir que o usuário saia localmente
        }
    }

    // Limpa todos os cookies de autenticação
    cookieStore.delete('token');
    cookieStore.delete('user_name');

    redirect('/login');
}
