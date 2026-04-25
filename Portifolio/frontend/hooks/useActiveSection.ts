import { useEffect } from 'react';

export function useActiveSection(sectionIds: string[]) {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Se a seção estiver ocupando mais de 50% da tela
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        const id = entry.target.id;
                        // Atualiza a URL sem "sujar" o histórico (substitui o # anterior)
                        window.history.replaceState(null, '', `#${id}`);
                    }
                });
            },
            { threshold: 0.5 } // 0.5 significa 50% da seção visível
        );

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [sectionIds]);
}
