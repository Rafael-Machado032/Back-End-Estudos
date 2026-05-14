'use client'; // Necessário para animações
import { motion } from "motion/react";
import { useProjeto } from "@/context/ProjetoContext"

export default function Trajetoria() {

    const { projetoDados } = useProjeto()

    const stack = [...new Set(projetoDados.flatMap((item) => item.tecnologia.split(",")).map((tech) => tech.trim()))];


    console.log("Retorno do stak", stack);


    return (
        <section className='flex justify-center items-center px-6 py-40 text-[#e1e1e6] overflow-hidden scroll-mt-16 h-screen' id="trajetoria">
            <div className='flex justify-center items-center max-w-7xl flex-col md:flex-row gap-10'>

                {/* Lado Esquerdo - Vem da esquerda */}
                <motion.div
                    initial={{ opacity: 0, x: -200 }} // Começa invisível e 50px à esquerda
                    whileInView={{ opacity: 1, x: 0 }} // Quando entra no scroll, aparece
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className='w-full md:w-1/2 flex flex-col gap-6'
                >
                    <h2 className='text-4xl font-bold after:content-[""] after:block after:w-12 after:h-1 after:bg-[#00f2fe] after:mt-2 font-montserrat'>
                        Minha Trajetória
                    </h2>
                    <p>Comecei na informática industrial, onde aprendi que software e hardware precisam falar a mesma língua. De criar sistemas de pesagem em C++ até configurar redes MikroTik do zero, minha base é resolver problemas reais.</p>
                    <p>Hoje, aplico essa bagagem técnica para construir aplicações web modernas. Sou formado em Análise e Desenvolvimento de Sistemas e apaixonado pela agilidade do <b>Next.js</b> integrada à robustez do <b>Laravel</b>.</p>
                </motion.div>

                {/* Lado Direito - Vem da direita */}
                <motion.div
                    initial={{ opacity: 0, x: 200 }} // Começa 50px à direita
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} // Delay de 0.2s para ficar elegante
                    className='w-full md:w-1/2 flex flex-col gap-6 bg-[#16161a] p-8 rounded-2xl border border-[#ffffff0d] shadow-2xl'
                >
                    <h3 className='font-bold text-xl'>Stack Técnica</h3>
                    
                    <div className='flex flex-wrap gap-3'>
                        {/* Exemplo de animação individual nas badges (opcional) */}
                        {stack.map((tech, index) => (
                            <span key={index} className='bg-[#ffffff0d] px-4 py-1 rounded-md text-sm border transition-all duration-200 ease-in-out border-[#ffffff1a] hover:border-[#00f2fe] hover:text-[#00f2fe]'>
                                {tech}
                            </span>
                        ))}
                    </div>
                    <p className='text-[#a8a8b3] italic'>
                        &quot;Não apenas escrevo código; busco entender o problema do cliente e entregar a solução mais legível e escalável possível.&quot;
                    </p>
                </motion.div>

            </div>
        </section>
    );
}

