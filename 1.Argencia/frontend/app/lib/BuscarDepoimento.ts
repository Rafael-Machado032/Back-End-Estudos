'use server'
export async function buscarDepoimentos() {
    try {
        const urlBase = process.env.API_URL;
        // Removi o "/api" daqui, pois ele já está no urlBase
        const res = await fetch(`${urlBase}/depoimentos`, { cache: 'no-store' });

        if (!res.ok) {
            console.error("Erro no Fetch:", res.status); // Adicione esse log para ver no terminal
            return []; // Retorna um array vazio em caso de erro
        }

        const dados = await res.json();
        return dados;
    } catch (error) {
        console.error("Erro na requisição:", error); // Log do erro para o terminal
        return []; // Retorna um array vazio em caso de erro
    }
}
