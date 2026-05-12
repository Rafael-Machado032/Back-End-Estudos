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
