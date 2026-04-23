'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface Curriculo {
    curriculo_url_servidor?: string;
}

interface CurriculoContextoTipo {
    curriculoDados: Curriculo | null;
    setCurriculoDados: (novosDados: Curriculo | null) => void;
}

const CurriculoContexto = createContext<CurriculoContextoTipo | undefined>(undefined);

export function CurriculoProvedor({ children, curriculoInicial }: { children: ReactNode, curriculoInicial?: Curriculo | null }) {
    // 1. Criamos o estado inicial
    const [curriculoDados, setCurriculoDados] = useState<Curriculo | null>(curriculoInicial || null);

    // 2. SINCRONIZAÇÃO PROFISSIONAL: 
    // Se o curriculoInicial mudar (vindo do servidor), 
    // o React detecta e atualiza o estado durante a renderização, sem precisar de Effect.
    const [prevInicial, setPrevInicial] = useState(curriculoInicial);

    if (curriculoInicial !== prevInicial) {
        setPrevInicial(curriculoInicial);
        setCurriculoDados(curriculoInicial || null);
    }

    const curriculoContextoValor = useMemo(() => ({
        curriculoDados,
        setCurriculoDados
    }), [curriculoDados]);

    return (
        <CurriculoContexto.Provider value={curriculoContextoValor}>
            {children}
        </CurriculoContexto.Provider>
    );
}

export const useCurriculo = () => {
    const context = useContext(CurriculoContexto);
    if (!context) throw new Error("useCurriculo deve ser usado dentro de um Provedor");
    return context;
};
