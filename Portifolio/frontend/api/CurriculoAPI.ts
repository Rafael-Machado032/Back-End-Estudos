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
export async function BuscarCurriculoAction() {
    try {
        const res = await fetch(`${urlBase}/curriculo`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            cache: 'no-store' // Garante dado fresco do Laravel
        });

        if (!res.ok) return [];
        return await res.json();
    } catch {
        return [];
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

        revalidatePath('/admin/curriculo');
        return { success: true, data: await res.json() };
    } catch {
        return { success: false };
    }
}

// 3. EDITAR (COM AUTENTICAÇÃO - Privado)
export async function EditarCurriculoAction(id: string | number, formData: FormData) {
    try {
        const headers = await getAuthHeaders();
        formData.append('_method', 'PUT');

        const res = await fetch(`${urlBase}/curriculo/${id}`, {
            method: 'POST',
            body: formData,
            headers: headers
        });

        if (!res.ok) return { success: false };

        revalidatePath('/admin/curriculo');
        return { success: true };
    } catch {
        return { success: false };
    }
}

// 4. DELETAR (COM AUTENTICAÇÃO - Privado)
export async function DeletarCurriculoAction(id: string | number) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${urlBase}/curriculo/${id}`, {
            method: 'DELETE',
            headers: headers
        });

        if (res.ok) {
            revalidatePath('/admin/item');
            return { success: true };
        }
        return { success: false };
    } catch {
        return { success: false };
    }
}
