'use server';
import { cookies } from 'next/headers';

export async function FazerLogin(formData: FormData) {

    try {
        const res = await fetch(`${process.env.API_URL}/login`, {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({
                email: formData.get("email"),
                password: formData.get("senha") // Pega do input 'senha' e batiza como 'password'
            }),
        });

        const dados = await res.json();

        if (res.ok && dados.token) {
            const cookieStore = await cookies();
            cookieStore.set('token', dados.token, { path: '/', httpOnly: true });
            return { success: true, user: dados.user }
        }
    } catch (error) {
        console.error("Erro no fetch:", error);
        return { success: false };
    }

    
    return { success: false };
}
