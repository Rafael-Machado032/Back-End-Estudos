'use client'; // Necessário para animações
import { useMemo } from "react";
import { motion } from "motion/react";
import { useProjeto } from "@/context/ProjetoContext";

export default function Trajetoria() {
    const { projetoDados } = useProjeto();

    // 1. Cria a lista única de tecnologias
    const stack = useMemo(() => {
        return [...new Set(projetoDados.flatMap((item) => item.tecnologia.split(",")).map((tech) => tech.trim()))];
    }, [projetoDados]);

    // 2. Calcula as posições puras sabendo que este arquivo SÓ vai rodar no Cliente
    const posicoesEstaveis = useMemo(() => {
        const larguraTela = window.innerWidth;
        const alturaTela = window.innerHeight;

        return stack.map((_, index) => {
            const pseudoRandomX = Math.sin(index * 12.9898) * 0.5;
            const pseudoRandomY = Math.cos(index * 78.233) * 0.5;
            const pseudoRandomRotate = Math.sin(index * 45.123) * 0.5;

            const x = pseudoRandomX * (larguraTela * 0.8);
            const y = pseudoRandomY * (alturaTela * 0.8);
            const rotate = pseudoRandomRotate * 720;

            return { x, y, rotate };
        });
    }, [stack]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.04
            }
        }
    };
    


    return (
        <section className='flex justify-center items-center px-6 py-40 text-[#e1e1e6] overflow-hidden scroll-mt-16 min-h-screen md:h-screen relative' id="trajetoria">
            <div className='flex justify-center items-center max-w-7xl flex-col md:flex-row gap-10 w-full z-10'>

                {/* Lado Esquerdo */}
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className='w-full md:w-1/2 flex flex-col gap-6'
                >
                    <h2 className='text-4xl font-bold after:content-[""] after:block after:w-12 after:h-1 after:bg-[#00f2fe] after:mt-2 font-montserrat'>
                        Minha Trajetória
                    </h2>
                    <p>Comecei na informática industrial, onde aprendi que software e hardware precisam falar a mesma língua. De criar sistemas de pesagem em C++ até configurar redes MikroTik do zero, minha base é resolver problemas reais.</p>
                    <p>Hoje, aplico essa bagagem técnica para construir aplicações web modernas. Sou formado em Análise e Desenvolvimento de Sistemas e apaixonado pela agilidade do <b>Next.js</b> integrada à robustez do <b>Laravel</b>.</p>
                </motion.div>












                {/* Lado Direito */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className='w-full md:w-1/2 flex flex-col gap-6 bg-[#16161a] p-8 rounded-2xl border border-[#ffffff0d] shadow-2xl'
                >
                    <h3 className='font-bold text-xl'>Stack Técnica</h3>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className='flex flex-wrap gap-3'
                    >
                        {stack.map((tech, index) => {
                            const pos = posicoesEstaveis[index] || { x: 0, y: 0, rotate: 0 };
                            const cardVariantes = {
                                hidden: {
                                    opacity: 0,
                                    x: pos.x,
                                    y: pos.y,
                                    rotate: pos.rotate,
                                    scale: 0.2
                                },
                                visible: {
                                    opacity: 1,
                                    x: 0,
                                    y: 0,
                                    rotate: 0,
                                    scale: 1,
                                    transition: {
                                        
                                        stiffness: 85,
                                        damping: 14
                                    }
                                }
                            }

                            return (
                                <motion.span
                                    key={index}
                                    variants={cardVariantes}
                                    initial="hidden"
                                    whileInView="visible"
                                    className='bg-[#ffffff0d] px-4 py-1 rounded-md text-sm border transition-all duration-200 ease-in-out border-[#ffffff1a] hover:border-[#00f2fe] hover:text-[#00f2fe] cursor-default whitespace-nowrap'
                                >
                                    {tech}
                                </motion.span>
                            );
                        })}
                    </motion.div>

                    <p className='text-[#a8a8b3] italic'>
                        &quot;Não apenas escrevo código; busco entender o problema do cliente e entregar a solução mais legível e escalável possível.&quot;
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
