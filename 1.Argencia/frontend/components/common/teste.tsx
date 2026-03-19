"use client";
import { useEffect, useState } from "react";

// 1. IDs corrigidos para serem únicos
const depoimentos = [
    { id: 1, foto: "DEPOIMENTO1.png", nome: "Miriam Souza", texto: "..." },
    { id: 2, foto: "DEPOIMENTO1.png", nome: "Bruno Souza", texto: "..." },
    { id: 3, foto: "DEPOIMENTO1.png", nome: "Carla Lima", texto: "..." },
    { id: 4, foto: "DEPOIMENTO1.png", nome: "Ana Silva", texto: "..." },
    { id: 5, foto: "DEPOIMENTO1.png", nome: "Bruno 2", texto: "..." },
    { id: 6, foto: "DEPOIMENTO1.png", nome: "Carla 2", texto: "..." },
];

export default function Depoimentos() {
    const depoPagina = 3;
    const nPaginasReais = depoimentos.length / depoPagina;
    
    // ESTADOS PARA O INFINITO
    const [pagina, setPagina] = useState(1); // Começamos na 1 (a 0 será o clone)
    const [comTransicao, setComTransicao] = useState(true);

    // 2. CRIANDO A FITA COM CLONES (Página Final no início e Inicial no fim)
    // Se temos Página 0 e Página 1, a fita fica: [Pág 1 Clone] [Pág 0] [Pág 1] [Pág 0 Clone]
    const nPaginasComClones = nPaginasReais + 2;

    const proximo = () => {
        setPagina((prev) => prev + 1);
    };

    useEffect(() => {
        // LÓGICA DO TELETRANSPORTE INVISÍVEL
        if (pagina === nPaginasReais + 1) { // Chegou no clone do final
            setTimeout(() => {
                setComTransicao(false); // Desliga a animação
                setPagina(1);           // Pula para a página 1 real
            }, 700); // Mesmo tempo da duration-700
        }

        if (pagina === 0) { // Chegou no clone do início
            setTimeout(() => {
                setComTransicao(false);
                setPagina(nPaginasReais); // Pula para a última real
            }, 700);
        }

        // Religa a transição para o próximo clique
        if (!comTransicao) {
            setTimeout(() => setComTransicao(true), 50);
        }

        const contador = setInterval(proximo, 5000);
        return () => clearInterval(contador);
    }, [pagina, comTransicao]);

    return (
        <section className='flex flex-col gap-9 w-full max-w-6xl mx-auto text-center p-4'>
            <h2 className="font-bold text-5xl">Depoimentos</h2>
            
            <div className='overflow-hidden'>
                <div 
                    className={`flex shrink-0 ${comTransicao ? 'transition-transform duration-700 ease-in-out' : 'transition-none'}`} 
                    style={{ transform: `translateX(-${pagina * 100}%)` }}
                >
                    {/* MAP DAS PÁGINAS (Agora usando nPaginasComClones) */}
                    {Array.from({ length: nPaginasComClones }).map((_, i_fita) => {
                        // Lógica para saber qual conteúdo mostrar em cada posição da fita
                        let paginaConteudo;
                        if (i_fita === 0) paginaConteudo = nPaginasReais - 1; // Última página
                        else if (i_fita === nPaginasReais + 1) paginaConteudo = 0; // Primeira página
                        else paginaConteudo = i_fita - 1; // Páginas normais

                        return (
                            <div key={i_fita} className='flex w-full gap-8 min-w-full justify-center items-center'>
                                {depoimentos
                                    .slice(paginaConteudo * depoPagina, (paginaConteudo + 1) * depoPagina)
                                    .map((item) => (
                                        <figure key={item.id} className='flex flex-col justify-center items-center gap-4 w-1/3'>
                                            <figcaption className='flex flex-col justify-center items-center'>
                                                <img src={`/images/${item.foto}`} alt="" />
                                                <cite className='text-2xl font-bold'>{item.nome}</cite>
                                            </figcaption>
                                            <blockquote className="text-[#7E92AC] text-sm italic">"{item.texto}"</blockquote>
                                            <img src="/images/RATE.svg" alt="rate.svg" />
                                        </figure>
                                    ))}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* DOTS (Eles ignoram os clones, mostram só as páginas reais) */}
            <div className="flex gap-4 justify-center items-center">
                {Array.from({ length: nPaginasReais }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPagina(i + 1)} // +1 porque a página 0 é clone
                        className={`h-3 rounded-full transition-all duration-300 ${
                            // Lógica para o dot brilhar na página certa mesmo com clones
                            (pagina === i + 1 || (pagina === 0 && i === nPaginasReais - 1) || (pagina === nPaginasReais + 1 && i === 0))
                            ? "w-8 bg-blue-600" : "w-3 bg-gray-300"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
