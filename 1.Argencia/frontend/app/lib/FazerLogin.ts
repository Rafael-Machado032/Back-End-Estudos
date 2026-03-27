'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'; // Importe do local correto

export async function FazerLogin(formData: FormData) {
    let loginSucesso = false;

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
            loginSucesso = true; // Marca que deu certo
        }
    } catch (error) {
        console.error("Erro no fetch:", error);
        return { success: false };
    }

    // O REDIRECIONAMENTO DEVE FICAR FORA DO TRY/CATCH
    if (loginSucesso) {
        redirect("/admin");
    }

    return { success: false };
}
