'use server'; // Garante que este código rode APENAS no servidor do Next.js
import { cookies } from 'next/headers'; // Ferramenta para ler/gravar cookies no navegador

export async function FazerLogin(formData: FormData) {

    try {
        // 1. Envia os dados para o Laravel (POST /api/login)
        const res = await fetch(`${process.env.API_URL}/login`, {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ // Converte o FormData em um JSON que o Laravel entende
                email: formData.get("email"),
                password: formData.get("senha") // Pega do input 'senha' e batiza como 'password'
            }),
        });
        
        const dados = await res.json(); // 2. Transforma a resposta do Laravel em um objeto Javascript
        
        if (res.ok && dados.token) { // 3. Verifica se o Laravel respondeu 200 (OK) e se enviou um Token
            const cookieStore = await cookies(); // Abre a "caixa" de cookies do navegador
            // 4. Salva o Token nos Cookies
            // httpOnly: true impede que Hackers roubem o token via JavaScript (XSS)
            cookieStore.set('token', dados.token, { 
                path: '/',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Só usa HTTPS em produção
                maxAge: 60 * 60 * 24 // Expira em 1 dia
            });
            // Retorna sucesso e os dados do usuário (nome, foto) para a LoginPage
            return { success: true, user: dados.user }
        }
    } catch (error) {
        // Se o servidor Laravel estiver desligado ou a rede cair
        console.error("Erro no fetch:", error);
        return { success: false };
    }
    // Se o login falhou (senha errada, etc), retorna falso
    return { success: false };
}
