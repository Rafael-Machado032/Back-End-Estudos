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
export async function BuscarFormacaoAction() {
    try {
        const res = await fetch(`${urlBase}/formacoes`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            cache: 'no-store' // Garante dado fresco do Laravel
        });

        if (!res.ok) return { success: false };

        const dadosDoBanco = await res.json();

        return {
            success: true,
            dados: dadosDoBanco
        };
    } catch {
        return { success: false };
    }
}

// 2. CRIAR (COM AUTENTICAÇÃO - Privado)
export async function CriarFormacaoAction(formData: FormData) {
    try {
        const headers = await getAuthHeaders(); // Pega o token
        const res = await fetch(`${urlBase}/formacao`, {
            method: 'POST',
            body: formData,
            headers: headers
        });

        const dadosDoBanco = await res.json();
        // console.log("Resposta do servidor", dadosDoBanco);

        if (!res.ok) return { success: false };
        
        revalidatePath('/admin/item'); // Revalida a rota para atualizar os dados no frontend
        return {
            success: true,
            dados: dadosDoBanco.data // Retorna os dados do banco para atualizar o estado};
        };
    } catch {
        return { success: false };
    }
}

// 3. EDITAR (COM AUTENTICAÇÃO - Privado)
export async function EditarFormacaoAction(id: string | number, formData: FormData) {
    try {
        const headers = await getAuthHeaders();

        const res = await fetch(`${urlBase}/formacao/${id}`, {
            method: 'POST',
            body: formData,
            headers: headers
        });

        if (!res.ok) return { success: false };

        const dadosDoBanco = await res.json();
        
        revalidatePath('/admin/item'); // Revalida a rota para atualizar os dados no frontend
        return {
            success: true,
            dados: dadosDoBanco.data
        };
    } catch {
        return { success: false };
    }
}

// 4. DELETAR (COM AUTENTICAÇÃO - Privado)
export async function DeletarFormacaoAction(id: string | number) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${urlBase}/formacao/${id}`, {
            method: 'DELETE',
            headers: headers
        });

        if (res.ok) {
            revalidatePath('/admin/item'); // Revalida a rota para atualizar os dados no frontend
            return { success: true };
        }
        return { success: false };
    } catch {
        return { success: false };
    }
}
