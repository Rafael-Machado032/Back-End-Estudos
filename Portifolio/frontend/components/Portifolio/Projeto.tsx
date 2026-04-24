'use client';
import { motion } from "motion/react";
import Cont_Projeto from "../Container/Cont_Projeto";

export default function Projeto() {
    return (
        <section className='flex justify-center px-6 py-10 text-[#e1e1e6] overflow-hidden'>
            <div className='max-w-7xl w-full'>
                <h2 className='text-4xl font-bold after:content-[""] after:block after:w-12 after:h-1 after:bg-[#00f2fe] after:mt-2 mb-10'>
                    Projetos em Destaque
                </h2>

                {/* Container do Slider */}
                <motion.div
                    className="flex gap-6 cursor-grab active:cursor-grabbing"
                    drag="x" // Permite arrastar no eixo X
                    dragConstraints={{ right: 0, left: -600 }} // Ajuste o 'left' conforme o número de cards
                    whileTap={{ cursor: "grabbing" }}
                >
                    {/* Aqui você pode usar um .map se tiver uma lista, ou repetir o componente */}
                    <div className="min-w-87.5"> <Cont_Projeto /> </div>
                    <div className="min-w-87.5"> <Cont_Projeto /> </div>
                    <div className="min-w-87.5"> <Cont_Projeto /> </div>
                    <div className="min-w-87.5"> <Cont_Projeto /> </div>
                    <div className="min-w-87.5"> <Cont_Projeto /> </div>
                </motion.div>

                {/* Dica visual para o usuário */}
                <p className="text-sm text-[#a8a8b3] mt-6 animate-pulse">
                    ← Arraste para explorar →
                </p>
            </div>
        </section>
    );
}
