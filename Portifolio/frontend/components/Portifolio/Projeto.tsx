'use client';
import { motion } from "motion/react";
import Cont_Projeto from "../Container/Cont_Projeto";
import { useProjeto } from "@/context/ProjetoContext"

export default function Projeto() {
    const { projetoDados } = useProjeto();
    return (
        <section className='flex justify-center px-6 py-10 text-[#e1e1e6] overflow-hidden scroll-mt-16' id="projetos" >
            <div className='max-w-7xl w-full'>
                <h2 className='text-4xl font-bold after:content-[""] after:block after:w-12 after:h-1 after:bg-[#00f2fe] after:mt-2 mb-10'>
                    Projetos em Destaque
                </h2>

                {/* Container do Slider */}
                <motion.div
                    className="flex justify-center gap-6 cursor-grab active:cursor-grabbing"
                    drag="x" // Permite arrastar no eixo X
                    whileTap={{ cursor: "grabbing" }}
                >
                    {projetoDados.map(item => (
                        <Cont_Projeto key={item.id} projetoDados={item} />
                    ))}
                </motion.div>

                {/* Dica visual para o usuário */}
                <p className="text-sm text-[#a8a8b3] mt-6 animate-pulse">
                    ← Arraste para explorar →
                </p>
            </div>
        </section>
    );
}
