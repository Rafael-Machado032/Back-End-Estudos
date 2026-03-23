'use server'; // Isso diz ao Next: "Rode isso APENAS no servidor"

import fs from 'node:fs/promises';
import path from 'node:path';

export async function SalvarNoServidor(formData: FormData) {
    const arquivo = formData.get("foto-usuario") as File
    if (!arquivo || arquivo.size === 0) return null;

    const nomeArquivo = `${Date.now()}-${arquivo.name}`;
    const caminho = path.join(process.cwd(),"..", "backend", "uploads", nomeArquivo);

    // Garante que a pasta existe antes de salvar
    await fs.mkdir(path.dirname(caminho), { recursive: true });

    const buffer = Buffer.from(await arquivo.arrayBuffer());
    await fs.writeFile(caminho, buffer);

    return nomeArquivo;
}
