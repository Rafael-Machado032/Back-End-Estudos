import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[]) {
    // Cria um estado interno para saber qual seção está ativa
    const [activeSection, setActiveSection] = useState<string>('inicio');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Se a seção estiver ocupando mais de 50% da tela
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        const id = entry.target.id;

                        setActiveSection(id); // 1. Atualiza o estado do React
                        window.history.replaceState(null, '', `#${id}`); // 2. Atualiza a URL
                    }
                });
            },
            { threshold: 0.5 } // 50% da seção visível
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sectionIds]);

    // OBRIGATÓRIO: Retorna a string com o ID ativo para o seu Header usar
    return activeSection;
}
