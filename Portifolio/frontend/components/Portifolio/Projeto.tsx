'use client';
import { motion } from "motion/react";
import Cont_Projeto from "../Container/Cont_Projeto";
import { useProjeto } from "@/context/ProjetoContext";
export default function Projeto() {

    const { projetoDados } = useProjeto();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 } // Cada card aparece 0.15s após o anterior
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.5,
            }
        }
    };


    return (
        <section className='flex justify-center px-6 py-10 text-[#e1e1e6] bg-[#111111c5] bg-radial bg-[radial-gradient(circle_at_center,rgba(113,89,193,0.1)_0%,transparent_70%)] scroll-mt-16' id="projetos">
            <div className='max-w-7xl w-full'>
                <motion.h2
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                        type: "tween",             // Desativa a física de mola
                        ease: [0.68, -0.75, 0.27, 1.75], // Curva que força o elemento a passar do ponto e voltar
                        duration: 0.5             // Tempo em segundos para completar o movimento
                    }}
                    className='text-4xl font-bold after:content-[""] after:block after:w-12 after:h-1 after:bg-[#00f2fe] after:mt-2 mb-12'
                >
                    Projetos em Destaque
                </motion.h2>

                {/* Grid Responsivo Profissional */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={containerVariants}
                    viewport={{ amount: 0.1 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projetoDados.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                            className="w-full flex justify-center"
                        >
                            <Cont_Projeto key={item.id} projetoDados={item} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
