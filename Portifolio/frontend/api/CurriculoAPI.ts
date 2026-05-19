'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const urlBase = process.env.NEXT_PUBLIC_API_URL;

// Função privada: Só usada internamente aqui para as funções que precisam de Token
async function getAuthHeaders() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    return {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
}

// 1. BUSCAR (SEM AUTENTICAÇÃO - Público)
export async function BuscarCurriculoAction() {
    try {
        const res = await fetch(`${urlBase}/curriculos/1`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            cache: 'no-store' // Garante dado fresco do Laravel
        });

        if (!res.ok) return null;
        const dadosDoBanco = await res.json();
        return {
            dados: dadosDoBanco
        };
    } catch {
        return null;
    }
}

// 2. CRIAR (COM AUTENTICAÇÃO - Privado)
export async function CriarCurriculoAction(formData: FormData) {
    try {
        const headers = await getAuthHeaders(); // Pega o token
        const res = await fetch(`${urlBase}/curriculo`, {
            method: 'POST',
            body: formData,
            headers: headers
        });

        if (!res.ok) return { success: false };

        const dadosDoBanco = await res.json();

        revalidatePath('/', 'layout');

        return {
            success: true,
            dados: dadosDoBanco.data,
        };

    } catch {
        return { success: false };
    }
}

