import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function GET(req: NextRequest, { params }: { params: Promise<{ nome: string }> }) {
    // 1. Pega o nome que veio na URL (ex: foto123.jpg)
    const { nome } = await params;

    // 2. Monta o caminho subindo um nível (..) para achar a pasta 'backend'
    const caminhoArquivo = path.join(process.cwd(), "..", "backend", "uploads", nome);

    try {
        // 3. Lê os "bits" da imagem no HD
        const arquivo = await fs.readFile(caminhoArquivo);
        
        // 4. Entrega para o navegador dizendo que é uma imagem
        return new NextResponse(arquivo, { 
            headers: { 'Content-Type': 'image/jpeg' } // Ajuste conforme o tipo (png, etc)
        });
    } catch (error) {
        // Se a foto não existir no HD, avisa o navegador
        return new NextResponse("Foto não encontrada", { status: 404 });
    }
}
