'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';

interface Projeto {
    id: string;
    titulo: string;
    tecnologia: string;
    descricao: string;
    projeto_url_demo: string;
    projeto_url_github: string;
    layout_url_servidor: string;
}

// 1. Remova a função de adicionar do contrato
interface ProjetoContextoTipo {
    projetoDados: Projeto[];
    setProjetoDados: (novaLista: Projeto[]) => void; // Mantemos para a sincronização interna
}

const ProjetoContexto = createContext<ProjetoContextoTipo | undefined>(undefined);

export function ProjetoProvedor({ children, projetoInicial }: { children: ReactNode, projetoInicial?: Projeto[] }) {

    const [projetoDados, setProjetoDados] = useState<Projeto[]>(() => {
        if (typeof window === 'undefined') return projetoInicial || [];
        try {
            const salvo = localStorage.getItem('@Portifolio:Projeto');
            return salvo ? JSON.parse(salvo) : (projetoInicial || []);
        } catch { return projetoInicial || []; }
    });

    // Sincronização: Se o dado no Laravel mudar, o site atualiza
    const [prevProjetoInicial, setPrevProjetoInicial] = useState(projetoInicial);

    if (projetoInicial !== prevProjetoInicial) {
        setPrevProjetoInicial(projetoInicial);
        if (JSON.stringify(projetoInicial) !== JSON.stringify(projetoDados)) {
            setProjetoDados(projetoInicial || []);
        }
    }

    useEffect(() => {
        localStorage.setItem('@Portifolio:Projeto', JSON.stringify(projetoDados));
    }, [projetoDados]);

    // 2. O useMemo agora só passa a lista e a função de atualizar
    const contextoValor = useMemo(() => ({
        projetoDados,
        setProjetoDados
    }), [projetoDados]);

    return <ProjetoContexto.Provider value={contextoValor}>{children}</ProjetoContexto.Provider>;
}

export const useProjeto = () => {
    const context = useContext(ProjetoContexto);
    if (!context) throw new Error("useProjeto deve ser usado dentro de um Provedor");
    return context;
};
