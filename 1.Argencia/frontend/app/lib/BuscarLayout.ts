'use server'
export async function buscarLayout() {
    const urlBase = process.env.API_URL;
    // Removi o "/api" daqui, pois ele já está no urlBase
    const res = await fetch(`${urlBase}/layout/1`, { cache: 'no-store' });
    
    if (!res.ok) {
        console.error("Erro no Fetch:", res.status); // Adicione esse log para ver no terminal
        return null;
    }
    
    const dados = await res.json();
    return dados;
}
