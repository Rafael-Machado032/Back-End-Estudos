'use client'; // Necessário para animações
import { motion } from "framer-motion"; // Ajustado para o padrão estável se necessário
import { Variants } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { useProjeto } from "@/context/ProjetoContext";

export default function Trajetoria() {
    const areaMaxRef = useRef<HTMLDivElement>(null);
    const areaMinRef = useRef<HTMLDivElement>(null);
    const [contMax, setContMax] = useState({ largura: 0, altura: 0 });
    const [contMin, setContMin] = useState({ largura: 0, altura: 0 });

    const { projetoDados } = useProjeto();
    const stack = [...new Set(projetoDados.flatMap((item) => item.tecnologia.split(",")).map((tech) => tech.trim()))];

    const gerarPosicao = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
    };

    // 🟢 1. NOVA VARIANTE DO PAI: Gerencia o tempo e o gatilho dos filhos
    const paiBadgeVariants = {
        Espalhado: { opacity: 1 },
        Montado: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08, // Atraso em cascata entre as badges
                delayChildren: 0.3     // Espera o card da direita terminar de aparecer
            }
        }
    };

    const stackVariante = {
        Espalhado: () => {
            const posX = gerarPosicao(-contMax.largura / 2 + 100, contMin.largura / 2 - 300);
            const posY = gerarPosicao(-contMax.altura / 2 + 100, contMin.altura / 2 - 300);

            return {
                opacity: 0,
                x: posX,
                y: posY,
            };
        },
        Montado: {
            opacity: [0, 1, 1, 1, 1, 1],
            x: [null, null, null, 0, 0, 0],
            y: [null, null, null, 0, 0, 0],
            scale: [0.9, 1, 1, 1, 1, 1],

            // ✨ Efeito de Brilho em Linha do Tempo:
            // Nasce apagado -> Chega no card apagado -> Acende no final -> Suaviza para o estado normal
            boxShadow: [
                "0px 0px 0px rgba(0, 242, 254, 0)",
                "0px 0px 0px rgba(0, 242, 254, 0)",
                "0px 0px 0px rgba(0, 242, 254, 0)",
                "0px 0px 0px rgba(0, 242, 254, 0)",
                "0px 0px 20px rgba(0, 242, 242, 0.8)", // 🌟 Pico do brilho neon
                "0px 0px 0px rgba(0, 242, 254, 0)"     // Suaviza e desliga
            ],
            borderColor: [
                "rgba(255, 255, 255, 0.1)",
                "rgba(255, 255, 255, 0.1)",
                "rgba(255, 255, 255, 0.1)",
                "rgba(255, 255, 255, 0.1)",
                "rgba(0, 242, 242, 1)",                // Borda ciana acesa
                "rgba(255, 255, 255, 0.1)"             // Volta à borda padrão
            ],
            backgroundColor: [
                "rgba(255, 255, 255, 0.05)",
                "rgba(255, 255, 255, 0.05)",
                "rgba(255, 255, 255, 0.05)",
                "rgba(255, 255, 255, 0.05)",
                "rgba(0, 242, 242, 0.2)",              // Fundo ciano levemente aceso
                "rgba(255, 255, 255, 0.05)"            // Volta ao fundo padrão
            ],
            color: [
                "rgba(255, 255, 255, 1)",
                "rgba(255, 255, 255, 1)",
                "rgba(255, 255, 255, 1)",
                "rgba(255, 255, 255, 1)",
                "rgba(0, 242, 242, 1)",
                "rgba(255, 255, 255, 1)",
            ],

            transition: {
                duration: 6, // Aumentado levemente para dar tempo de ver o brilho

                // Sincronização dos tempos: o brilho acontece entre 85% e 95% da animação
                times: [0, 0.10, 0.30, 0.35, 0.65, 1],

                ease: ["easeIn", "easeIn", "easeIn", "easeIn", "easeIn"],
            }
        },
    } as Variants;


    useEffect(() => {
        if (areaMaxRef.current && areaMinRef.current) {
            const max = areaMaxRef.current.getBoundingClientRect();
            const min = areaMinRef.current.getBoundingClientRect();
            setContMax({ largura: max.width, altura: max.height });
            setContMin({ largura: min.width, altura: min.height });
        }
    }, []);

    return (
        <section ref={areaMaxRef} className='flex justify-center items-center px-6 py-43 text-[#e1e1e6] overflow-hidden scroll-mt-16' id="trajetoria">
            <div className='flex justify-center items-center max-w-7xl flex-col md:flex-row gap-10'>

                {/* Lado Esquerdo */}
                <motion.div
                    initial={{ opacity: 0, x: -200 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className='w-full md:w-1/2 flex flex-col gap-6'
                >
                    <h2 className='text-4xl font-bold after:content-[""] after:block after:w-12 after:h-1 after:bg-[#00f2fe] after:mt-2 font-montserrat'>
                        Minha Trajetória
                    </h2>
                    <p>Minha jornada começou no curso <b className="font-semibold text-cyan-400">Técnico em Informática Industrial</b>, onde aprendi como software e hardware se integram. Trabalhando na área técnica, dominei desde <b className="font-semibold text-cyan-400">infraestrutura até redes lógicas complexas</b>, sempre me destacando pela capacidade de <b className="font-semibold text-white">resolver problemas reais</b>.</p>
                    <p>Movido pela paixão por desenvolvimento, graduei-me em <b className="font-semibold text-cyan-400">Análise e Desenvolvimento de Sistemas</b>. Hoje, uno toda essa bagagem técnica e de infraestrutura com especializações modernas <b className="font-semibold text-cyan-400">para construir aplicações web robustas, escaláveis e intuitivas</b>.</p>
                </motion.div>

                {/* Lado Direito */}
                <motion.div
                    ref={areaMinRef}
                    initial={{ opacity: 0, x: 200 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className='w-full md:w-1/2 flex flex-col gap-6 bg-[#16161a] p-8 rounded-2xl border border-[#ffffff0d] shadow-2xl'
                >
                    <h3 className='font-bold text-xl'>Stack Técnica</h3>

                    {/* 🟢 2. TRAVA DE SEGURANÇA: Só renderiza as badges se já soubermos o tamanho da tela */}
                    {contMax.largura > 0 ? (
                        <motion.div
                            className='flex flex-wrap gap-3'
                            variants={paiBadgeVariants} // Conectando a variante do pai
                            initial="Espalhado"
                            whileInView="Montado"
                        >
                            {stack.map((tech, index) => (
                                <motion.span
                                    className='bg-[#ffffff0d] px-4 py-1 rounded-md text-sm border border-[#ffffff1a] transition-all duration-200 ease-in-out hover:border-[#00f2fe] hover:text-[#00f2fe]'
                                    key={index}
                                    variants={stackVariante} // Filhos herdam os gatilhos automaticamente do pai
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </motion.div>
                    ) : (
                        // Renderiza uma div vazia ou esqueleto com a mesma estrutura até o useEffect medir as caixas
                        <div className="flex flex-wrap gap-3 h-8" />
                    )}

                    <p className='text-[#a8a8b3] italic'>
                        &quot;Não apenas escrevo código; busco entender o problema do cliente e entregar a solução mais legível e escalável possível.&quot;
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
