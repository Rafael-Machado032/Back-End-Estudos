'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

export interface Projeto { //exporto para usar em outros arquivos, resolver o tipo do projetoDados
    id: string;
    titulo: string;
    tecnologia: string;
    descricao: string;
    demonstracao_url: string;
    github_url: string;
    layout_url: string;
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
