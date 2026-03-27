'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function FazerLogout() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    // 1. Avisa o Laravel ANTES de apagar o cookie local
    if (token) {
        try {
            await fetch(`${process.env.API_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}` // Envia o crachá para o Laravel saber quem deslogar
                }
            });
        } catch (error) {
            console.error("Erro ao avisar logout ao Laravel", error);
        }
    }

    // 2. Agora sim, apaga o cookie no navegador
    cookieStore.delete('token');
    
    // 3. Manda para o login
    redirect('/login');
}
