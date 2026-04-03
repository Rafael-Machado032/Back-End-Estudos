'use server'; // Isso diz ao Next: "Rode isso APENAS no servidor"
import { cookies } from 'next/headers'; // Se você salvar o token em cookies

export async function SalvarLayoutNoServidor(formData: FormData) {
    // CORREÇÃO: Adicione o await aqui
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    formData.append('_method', 'PUT');
    try {
        // Puxa a URL do arquivo .env
        const urlBase = process.env.API_URL;
        // O Next.js envia o pacote completo (nome + arquivo) para o Laravel
        const resposta = await fetch(`${urlBase}/layout/1`, {
            method: 'POST',
            body: formData, // so use o formaData se for carregar imagem
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
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