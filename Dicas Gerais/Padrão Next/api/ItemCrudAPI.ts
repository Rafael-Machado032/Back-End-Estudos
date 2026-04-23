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
export async function BuscarItensAction() {
    try {
        const res = await fetch(`${urlBase}/item/`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            cache: 'no-store' // Garante dado fresco do Laravel
        });

        if (!res.ok) return null;

        const dadosDoBanco = await res.json();

        return {
            dadosContexto: dadosDoBanco, //data pode mudar para a variavel que tem no contexto
        };
    } catch {
        return null;
    }
}

// 1. BUSCAR (SEM AUTENTICAÇÃO - Público)
export async function BuscarUmItenEspecificoAction(id: string | number) {
    try {
        const res = await fetch(`${urlBase}/item/${id}`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            cache: 'no-store' // Garante dado fresco do Laravel
        });

        if (!res.ok) return [];

        const dadosDoBanco = await res.json();

        return {
            id: dadosDoBanco.id,
            dadosContexto: dadosDoBanco, //data pode mudar para a variavel que tem no contexto
        };
    } catch {
        return [];
    }
}

// 1. Adicione um parâmetro (ex: 'termo' ou 'pagina')
export async function BuscarItemPorFiltroAction(termo = '', pagina = 1) { // A pagina = 1 é padrão se não for passado ele retorna sempre primeira pagina
    try {
        // 2. Monte a URL com os filtros. Ex: /item?nome=joao&page=1
        const urlComFiltro = `${urlBase}/item?nome=${termo}&page=${pagina}`;

        const res = await fetch(urlComFiltro, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            cache: 'no-store'
        });

        if (!res.ok) return null;

        const dadosDoBanco = await res.json();

        return {
            // Com paginate(), seus itens estarão em dadosDoBanco.data
            dadosContexto: dadosDoBanco,
        };
    } catch {
        return null;
    }
}


// 2. CRIAR (COM AUTENTICAÇÃO - Privado)
export async function CriarItemAction(formData: FormData) {
    try {
        const headers = await getAuthHeaders(); // Pega o token
        const res = await fetch(`${urlBase}/item`, {
            method: 'POST',
            body: formData,
            headers: headers
        });

        if (!res.ok) return { success: false };

        const dadosDoBanco = await res.json();

        revalidatePath('/', 'layout'); //Serve para atualizar a página após a criação do item, garantindo que o novo item apareça na listagem.
        return { success: true, dadosContexto: dadosDoBanco };
    } catch {
        return { success: false };
    }
}

// 3. EDITAR (COM AUTENTICAÇÃO - Privado)
export async function EditarItemAction(id: string | number, formData: FormData) {
    try {
        const headers = await getAuthHeaders();
        formData.append('_method', 'PUT');

        const res = await fetch(`${urlBase}/item/${id}`, {
            method: 'POST',
            body: formData,
            headers: headers
        });

        if (!res.ok) return { success: false };

        revalidatePath('/', 'layout');
        return { success: true };
    } catch {
        return { success: false };
    }
}

// 4. DELETAR (COM AUTENTICAÇÃO - Privado)
export async function DeletarItemAction(id: string | number) {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${urlBase}/item/${id}`, {
            method: 'DELETE',
            headers: headers
        });

        if (res.ok) {
            revalidatePath('/', 'layout');
            return { success: true };
        }
        return { success: false };
    } catch {
        return { success: false };
    }
}
