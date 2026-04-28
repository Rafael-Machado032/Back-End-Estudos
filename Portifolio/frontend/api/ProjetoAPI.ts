'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const urlBase = process.env.API_URL;

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
export async function BuscarProjetosAction() {
    try {
        const res = await fetch(`${urlBase}/projeto`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            cache: 'no-store' // Garante dado fresco do Laravel
        });

        if (!res.ok) return { success: false };

        const dadosDoBanco = await res.json();

        return {
            success: true,
            dados: dadosDoBanco.dados
        };
    } catch {
        return { success: false };
    }
}

// 2. CRIAR (COM AUTENTICAÇÃO - Privado)
export async function CriarProjetoAction(formData: FormData) {
    try {
        const headers = await getAuthHeaders(); // Pega o token
        const res = await fetch(`${urlBase}/projeto`, {
            method: 'POST',
            body: formData,
            headers: headers
        });

        if (!res.ok) return { success: false };

        const dadosDoBanco = await res.json();

        revalidatePath('/admin/projeto');
        return { 
            success: true, 
            dados: dadosDoBanco.dados 
        };
    } catch {
        return { success: false };
    }
}

// 3. EDITAR (COM AUTENTICAÇÃO - Privado)
export async function EditarProjetoAction(id: string | number, formData: FormData) {
    try {
        const headers = await getAuthHeaders();
        formData.append('_method', 'PUT');

        const res = await fetch(`${urlBase}/projeto/${id}`, {
            method: 'POST',
            body: formData,
            headers: headers
        });

        if (!res.ok) return { success: false };

        const dadosDoBanco = await res.json();

        revalidatePath('/admin/projeto');
        return { 
            success: true, 
            dados: dadosDoBanco.dados 
        };
    } catch {
        return { success: false };
    }
}

// 4. DELETAR (COM AUTENTICAÇÃO - Privado)
export async function DeletarProjetoAction(id: string | number) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${urlBase}/projeto/${id}`, {
            method: 'DELETE',
            headers: headers
        });

        if (res.ok) {
            revalidatePath('/admin/projeto');
            return { success: true };
        }
        return { success: false };
    } catch {
        return { success: false };
    }
}
