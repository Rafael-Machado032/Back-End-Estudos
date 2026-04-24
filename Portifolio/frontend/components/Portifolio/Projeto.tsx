'use client';
import { motion } from "motion/react";
import Cont_Projeto from "../Container/Cont_Projeto";
import { useRef, useEffect, useState } from "react";

export default function Projeto() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        // Calcula o limite do arrasto (largura total interna - largura visível)
        if (carouselRef.current) {
            setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
        }
    }, []);

    return (
        <section className='flex justify-center px-6 py-10 text-[#e1e1e6] overflow-hidden'>
            <div className='max-w-7xl w-full'>
                <h2 className='text-4xl font-bold after:content-[""] after:block after:w-12 after:h-1 after:bg-[#00f2fe] after:mt-2 mb-10'>
                    Projetos em Destaque
                </h2>

                {/* Área visível do Carrossel */}
                <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing overflow-hidden">
                    <motion.div
                        className="flex gap-6"
                        drag="x"
                        // O 'left' dinâmico garante que o slide pare exatamente no último card
                        dragConstraints={{ right: 0, left: -width }}
                        whileTap={{ cursor: "grabbing" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        {/* 
                           Para aparecerem 3: 
                           md:basis-1/3 (ocupa um terço no desktop)
                           min-w-[calc(33.333%-1rem)] (ajuste fino com o gap)
                        */}
                        {[1, 2, 3, 4, 5].map((item) => (
                            <div key={item} className="min-w-full md:min-w-[calc(33.333%-1rem)] shrink-0">
                                <Cont_Projeto />
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                <p className="text-sm text-[#a8a8b3] mt-6 animate-pulse text-center">
                    ← Arraste para explorar os projetos →
                </p>
            </div>
        </section>
    );
}
