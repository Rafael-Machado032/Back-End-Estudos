'use server'; // Isso diz ao Next: "Rode isso APENAS no servidor"
import { cookies } from 'next/headers'; // Se você salvar o token em cookies

// Função auxiliar para pegar o token e a URL base (Evita repetição de código)
async function getHeaders() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    return {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}
// Puxa a URL do arquivo .env (Lembre-se de prefixar com NEXT_PUBLIC_ para expor ao cliente, mas aqui é server, então pode ser sem prefixo)
const urlBase = process.env.API_URL;

export async function SalvarDepoimentoNoServidor(formData: FormData) {
    // CORREÇÃO: Adicione o await aqui para garantir que pegamos os headers antes de fazer a requisição
    try {
        const headers = await getHeaders();
        // O Next.js envia o pacote completo (nome + arquivo) para o Laravel
        const resposta = await fetch(`${urlBase}/depoimento`, {
            method: 'POST',
            body: formData, // so use o formaData se for carregar imagem
            headers: headers
        });

        if (!resposta.ok) {
            const erroTexto = await resposta.text(); // Pega o erro (pode ser validação ou erro de servidor)
            console.log("ERRO VINDO DO LARAVEL:", erroTexto);
            return { success: false };
        } else {
            const dados = await resposta.json();
            return { success: true, ...dados }; // Retorna os dados para o front
        }
        
    } catch (error) {
        console.error("Erro no Backend:", error);
        return { success: false };
    }
}

// 2. EDITAR DEPOIMENTO
export async function EditarDepoimentoNoServidor(id: number, formData: FormData) {
    try {
        const headers = await getHeaders();

        // IMPORTANTE: Laravel precisa disso para processar arquivos em PUT
        formData.append('_method', 'PUT');

        const resposta = await fetch(`${urlBase}/depoimento/${id}`, {
            method: 'POST', // Enviamos como POST + _method PUT
            body: formData,
            headers: headers
        });

        if (!resposta.ok) return { success: false };
        const dados = await resposta.json();
        return { success: true, ...dados };
    } catch (error) {
        console.error("Erro no Backend:", error);
        return { success: false };
    }
}

// 3. DELETAR DEPOIMENTO
export async function DeletarDepoimentoNoServidor(id: number) {
    try {
        const headers = await getHeaders();
        const resposta = await fetch(`${urlBase}/depoimento/${id}`, {
            method: 'DELETE',
            headers: headers
        });

        return resposta.ok; // Retorna true ou false
    } catch (error) {
        console.error("Erro no Backend:", error);
        return false;
    }
}
