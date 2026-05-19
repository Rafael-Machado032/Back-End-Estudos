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
export async function BuscarProjetosAction() {
    try {
        const res = await fetch(`${urlBase}/projetos`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            cache: 'no-store' // Garante dado fresco do Laravel
        });

        if (!res.ok) return { success: false };

        const dadosDoBanco = await res.json();
        // console.log("Resposta do servidor", dadosDoBanco);

        return {
            success: true,
            dados: dadosDoBanco
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

        const dadosDoBanco = await res.json();
        console.log("Resposta do servidor", dadosDoBanco);
        
        revalidatePath('/admin');

        if (!res.ok) return { success: false };
        return {
            success: true,
            dados: dadosDoBanco.data
        };
    } catch (err) {
        console.error("Erro na Action:", err);
        return { success: false };
    }
}

// 3. EDITAR (COM AUTENTICAÇÃO - Privado)
export async function EditarProjetoAction(id: string | number, formData: FormData) {
    try {
        const headers = await getAuthHeaders();


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
            dados: dadosDoBanco.data
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

        //const dadosDoBanco = await res.json();
        //console.log("Resposta do servidor", dadosDoBanco);

        if (!res.ok) return { success: false };

        revalidatePath('/admin/projeto');



        return { success: true };
    } catch (e) {
        console.log("Resposta do servidor", e);
        return { success: false };
    }
}
