'use client';
import { motion } from "motion/react";
import Cont_Formacao from "../Container/Cont_Formacao";
import { useFormacao } from "@/context/FormacaoContext"

export default function Formacao() {

    const { formacaoDados } = useFormacao();

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
                // ease: [0.22, 1, 0.36, 1] // Opcional: usando valores numéricos que o TS sempre aceita
            }
        }
    };


    return (
        <section className='flex justify-center px-6 py-10 text-[#e1e1e6] bg-[#111111c5] bg-radial bg-[radial-gradient(circle_at_center,rgba(113,89,193,0.1)_0%,transparent_70%)] scroll-mt-16' id="formacao">
            <div className='max-w-7xl w-full'>
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className='text-4xl font-bold after:content-[""] after:block after:w-12 after:h-1 after:bg-[#00f2fe] after:mt-2 mb-12'
                >
                    Formação
                </motion.h2>

                {/* Grid Responsivo Profissional */}
                <motion.div
                    
                    initial="hidden"
                    whileInView="visible"
                    variants={containerVariants}
                    viewport={{ amount: 0.1 }}
                    // grid-cols-1 (celular), grid-cols-2 (tablet), grid-cols-3 (desktop)
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {formacaoDados.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={cardVariants}
                            whileHover={{
                                y: -8,
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                            className="w-full"
                        >
                            <Cont_Formacao key={item.id} formacaoDados={item} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
