'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

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

export function ProjetoProvedor({ children, projetoInicial = [] }: { children: ReactNode, projetoInicial?: Projeto[] }) {
    // 1. Estado nasce com a lista do Laravel ou um array vazio (evita quebra no .map)
    const [projetoDados, setProjetoDados] = useState<Projeto[]>(projetoInicial);

    // 2. SINCRONIZAÇÃO PROFISSIONAL
    // Se o banco mudar (ex: busca com filtro ou nova página), o estado reflete isso
    const [prevProjetoInicial, setPrevProjetoInicial] = useState(projetoInicial);

    if (projetoInicial !== prevProjetoInicial) {
        setPrevProjetoInicial(projetoInicial);
        // Só atualiza se houver mudança real para evitar re-renders infinitos
        if (JSON.stringify(projetoInicial) !== JSON.stringify(projetoDados)) {
            setProjetoDados(projetoInicial);
        }
    }

    // 3. Memorização para performance
    const projetoContextoValor = useMemo(() => ({
        projetoDados,
        setProjetoDados
    }), [projetoDados]);

    return (
        <ProjetoContexto.Provider value={projetoContextoValor}>
            {children}
        </ProjetoContexto.Provider>
    );
}

export const useProjeto = () => {
    const context = useContext(ProjetoContexto);
    if (!context) throw new Error("useProjeto deve ser usado dentro de um Provedor");
    return context;
};
