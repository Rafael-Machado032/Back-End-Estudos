import { cookies } from 'next/headers';

export async function buscarUsuarioLogado() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return null; // Se não tem token, não tem usuário logado

    try {
        const urlBase = process.env.API_URL;
        const res = await fetch(`${urlBase}/user`, { // Rota /user do Laravel
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            },
            cache: 'no-store'
        });

        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Erro na requisição:", error); // Log do erro para o terminal
        return null;
    }
}
