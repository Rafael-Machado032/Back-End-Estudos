import { useRef, useEffect } from "react";
import { motion, useMotionValue, animate, PanInfo } from "framer-motion";

// 1. Definição do tipo para os itens que o slider vai receber
interface SliderItem {
    id: string | number;
    content: React.ReactNode;
}

interface InfiniteSliderProps {
    items: SliderItem[];
}

export function InfiniteSlider({ items }: InfiniteSliderProps) {
    // 2. Cria uma referência para medir a largura real da div das imagens em pixels
    const containerRef = useRef<HTMLDivElement>(null);

    // 3. Cria um valor reativo do Motion para controlar a posição X (começa em 0)
    const x = useMotionValue(0);

    // 4. Clona a lista. Se você passar 3 itens, vira uma lista com 6 itens idênticos
    const duplicatedItems = [...items, ...items];

    // 10. Função disparada assim que o usuário solta o clique do mouse/dedo
    const handleDragEnd = (_: any, info: PanInfo) => {
        const currentX = x.get();

        // 11. Calcula onde o slider pararia baseado na força/velocidade do arrasto físico
        const simulatedTarget = currentX + info.velocity.x * 0.2;

        // 12. Executa a animação de desaceleração (inércia) a partir do ponto solto
        animate(x, simulatedTarget, {
            type: "inertia",
            bounce: 0,
            // 13. Repete a mesma checagem de limites durante o deslizamento automático
            onUpdate: (latest: number) => {
                if (!containerRef.current) return;
                const halfWidth = containerRef.current.scrollWidth / 2;
                if (latest <= -halfWidth) x.set(latest + halfWidth);
                else if (latest > 0) x.set(latest - halfWidth);
            }
        });
    };

    useEffect(() => {
        // 5. Cria um ouvinte (listener) que roda a cada único pixel que o X se move
        const unsubscribe = x.on("change", (latest: number) => {
            if (!containerRef.current) return;

            // 6. Calcula a largura da lista original (metade do tamanho total do container)
            const halfWidth = containerRef.current.scrollWidth / 2;

            // 7. LÓGICA DE IR PARA A ESQUERDA (AVANÇAR)
            if (latest <= -halfWidth) {
                x.set(latest + halfWidth);
            }
            // 8. LÓGICA DE IR PARA A DIREITA (VOLTAR)
            else if (latest > 0) {
                x.set(latest - halfWidth);
            }
        });

        // 9. Remove o ouvinte quando o componente sai da tela para evitar vazamento de memória
        return () => unsubscribe();
    }, [x]);

    
   

    return (
        // 14. Container visível da tela. Esconde o que passa dos lados e muda o cursor
        <div className="w-full overflow-hidden cursor-grab">
            {/* 15. Elemento do Motion que de fato se move e aceita o arrasto */}
            <motion.div
                ref={containerRef}
                drag="x"
                style={{ x }} // O Motion exige que useMotionValue seja passado no atributo style
                className="flex"
                onDragEnd={handleDragEnd}
                whileTap={{ cursor: "grabbing" }}
            >
                {/* 16. Renderização dos cards duplicados lado a lado */}
                {duplicatedItems.map((item, index) => (
                    <div
                        key={`${item.id}-${index}`}
                        className="w-[300px] shrink-0 p-5"
                    >
                        {item.content}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
'use client';
import { useRef } from 'react';
import { motion, useMotionValue } from "motion/react";
import Cont_Projeto from "../Container/Cont_Projeto";
import { useProjeto } from "@/context/ProjetoContext";

export default function Projeto() {
    const { projetoDados } = useProjeto();
    // 1. Mudamos a tipagem do Ref para HTMLDivElement (já que é uma div)
    const divRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);

    return (
        <section className='flex justify-center px-6 py-10 text-[#e1e1e6] overflow-hidden scroll-mt-16' id="projetos" >
            <div className='max-w-7xl w-full overflow-hidden'>
                <h2 className='text-4xl font-bold after:content-[""] after:block after:w-12 after:h-1 after:bg-[#00f2fe] after:mt-2 mb-10'>
                    Projetos em Destaque
                </h2>

                {/* Container do Slider */}
                <motion.div
                    ref={divRef}
                    style={{ x }}
                    // CORREÇÃO: Mudamos 'justify-center' para 'justify-start' 
                    // e adicionamos 'w-max' para a esteira ter o tamanho real dos cards somados
                    className="flex justify-start gap-6 cursor-grab active:cursor-grabbing w-max"
                    drag="x"
                    whileTap={{ cursor: "grabbing" }}
                    onDrag={() => {
                        if (!divRef.current) return;

                        // Pega a largura de um bloco inteiro de cards originais
                        const tamTotal = divRef.current.scrollWidth / 2;
                        const posAtual = x.get();

                        // Se arrastar para a esquerda além do bloco original
                        if (posAtual <= -tamTotal) {
                            x.set(posAtual + tamTotal);
                        }

                        // Se arrastar para a direita além do início
                        if (posAtual >= 0) {
                            x.set(posAtual - tamTotal);
                        }
                    }}
                    onDragEnd={() => {
                        if (!divRef.current) return;
                        const tamTotal = divRef.current.scrollWidth / 2;
                        const posAtual = x.get();

                        if (posAtual <= -tamTotal) x.set(posAtual + tamTotal);
                        if (posAtual >= 0) x.set(posAtual - tamTotal);
                    }}
                >
                    {[...projetoDados, ...projetoDados].map((item, index) => (
                        // CORREÇÃO VISUAL: Envolvemos o card em uma div com 'flex-shrink-0'
                        // para garantir que o Next.js não esmague o tamanho dos cards na tela
                        <div key={`${item.id}-${index}`} className="flex-shrink-0">
                            <Cont_Projeto projetoDados={item} />
                        </div>
                    ))}
                </motion.div>

                <p className="text-sm text-[#a8a8b3] mt-6 animate-pulse text-center">
                    ← Arraste para explorar →
                </p>
            </div>
        </section>
    );
}
