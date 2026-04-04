'use server'
import { cookies } from 'next/headers';

async function getHeaders() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    return {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

// DELETAR MENSAGEM
export async function DeletarMensagemNoServidor(id: number) {
    try {
        const headers = await getHeaders();
        const res = await fetch(`${process.env.API_URL}/mensagens/${id}`, {
            method: 'DELETE',
            headers: headers
        });
        return res.ok;
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        return false;
    }
}

// MARCAR COMO LIDA (Opcional: se quiser salvar no banco que você já viu)
export async function MarcarMensagemLida(id: number) {
    try {
        const headers = await getHeaders();
        const res = await fetch(`${process.env.API_URL}/mensagens/${id}/lida`, {
            method: 'PATCH',
            headers: headers
        });
        return res.ok;
    } catch (error) {
        console.error("Erro ao atualizar status:", error);
        return false;
    }
}


