'use client';
import { useRef, useEffect } from 'react';
import { motion, useMotionValue } from "motion/react";
import Cont_Projeto from "../Container/Cont_Projeto";
import { useProjeto } from "@/context/ProjetoContext"

export default function Projeto() {
    const { projetoDados } = useProjeto();
    const divRef = useRef<HTMLInputElement>(null);
    const x = useMotionValue(-120);

    const projetoDublicado = [...projetoDados, ...projetoDados]


    useEffect(() => {
        if (!divRef.current) return;

        // Pega a largura de um bloco inteiro de cards originais
        const tamTotal = divRef.current.scrollWidth / 2;
        
        const desativarEspiao = x.on("change", (posAtual) => {

            console.log("Posição Atual: ", posAtual);
            console.log("Tamanho Total: ", tamTotal);

            // Se arrastar para a esquerda além do bloco original
            if (posAtual <= -tamTotal) {
                x.set(posAtual + tamTotal);
            }

            // Se arrastar para a direita além do início
            if (posAtual >= 0) {
                x.set(posAtual - tamTotal);
            }
        })
        return () => desativarEspiao();
    }, [x])

    return (
        <section className='flex justify-center px-6 py-10 text-[#e1e1e6] overflow-hidden scroll-mt-16' id="projetos" >
            <div className='w-full'>
                <h2 className=' max-w-7xl mx-auto text-4xl font-bold after:content-[""] after:block after:w-12 after:h-1 after:bg-[#00f2fe] after:mt-2 mb-10'>
                    Projetos em Destaque
                </h2>

                {/* Container do Slider */}
                <motion.div
                    ref={divRef}
                    style={{ x }}
                    className="flex shrink-0 gap-6 cursor-grab active:cursor-grabbing"
                    drag="x" // Permite arrastar no eixo X
                    whileTap={{ cursor: "grabbing" }}


                >
                    {projetoDublicado.map((item, index) => (
                        <Cont_Projeto key={`${item.id}-${index}`} projetoDados={item} />
                    ))}
                </motion.div>

                {/* Dica visual para o usuário */}
                <p className="text-sm text-[#a8a8b3] mt-6 animate-pulse max-w-7xl mx-auto">
                    ← Arraste para explorar →
                </p>
            </div>
        </section>
    );
}
