'use server';

export async function EnviarMensagemContato(formData: FormData) {
    const urlBase = process.env.API_URL;

    try {
        const resposta = await fetch(`${urlBase}/contato`, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
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
        console.error("Erro na requisição:", error); // Log do erro para o terminal
        return { success: false };
    }
}
