'use server'
import { cookies } from 'next/headers'; // IMPORTANTE: Para pegar o token

export async function buscarMensagens() {
    try {
        const urlBase = process.env.API_URL;

        // 1. Pegar o token dos cookies
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;

        // 2. Fazer a requisição enviando o Authorization Header
        const res = await fetch(`${urlBase}/mensagens`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Accept': 'application/json', // Avisa o Laravel que é uma API
                'Authorization': `Bearer ${token}` // Envia a "chave" de acesso
            }
        });

        if (!res.ok) {
            // Se der 401 ou 500, o status aparecerá aqui no terminal do VS Code
            console.error("Erro no Fetch das Mensagens. Status:", res.status);
            return [];
        }

        const dados = await res.json();
        return dados;

    } catch (error) {
        console.error("Erro na requisição de mensagens:", error);
        return [];
    }
}
