'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';

interface Curriculo {
    curriculo_url_servidor?: string;
}

interface CurriculoContextoTipo {
    curriculoDados: Curriculo | null;
    setCurriculoDados: (novosDados: Curriculo | null) => void;
}

const CurriculoContexto = createContext<CurriculoContextoTipo | undefined>(undefined);

export function CurriculoProvedor({ children, curriculoIniciais }: { children: ReactNode, curriculoIniciais?: Curriculo | null }) {

    const [curriculoDados, setCurriculoDados] = useState<Curriculo | null>(() => {
        if (typeof window === 'undefined') return curriculoIniciais || null;
        try {
            const salvo = localStorage.getItem('@Nome_App:chave_lista'); // Chave específica
            return salvo ? JSON.parse(salvo) : (curriculoIniciais || null);
        } catch { return curriculoIniciais || null; }
    });

    // 🚀 SINCRONIZAÇÃO: Garante que se o Laravel mudar, o site atualiza na hora
    const [prevCurriculoIniciais, setPrevCurriculoIniciais] = useState(curriculoIniciais);

    if (curriculoIniciais !== prevCurriculoIniciais) {
        setPrevCurriculoIniciais(curriculoIniciais);
        // Compara se o que veio do servidor é diferente do que está no estado
        if (JSON.stringify(curriculoIniciais) !== JSON.stringify(curriculoDados)) {
            setCurriculoDados(curriculoIniciais || null);
        }
    }

    useEffect(() => {
        if (curriculoDados) {
            localStorage.setItem('@Nome_App:chave_lista', JSON.stringify(curriculoDados));
        } else {
            localStorage.removeItem('@Nome_App:chave_lista');
        }
    }, [curriculoDados]);

    const curriculoContextoValor = useMemo(() => ({ curriculoDados, setCurriculoDados }), [curriculoDados]);

    return <CurriculoContexto.Provider value={curriculoContextoValor}>{children}</CurriculoContexto.Provider>;
}

export const useCurriculo = () => {
    const context = useContext(CurriculoContexto);
    if (!context) throw new Error("useCurriculo deve ser usado dentro de um Provedor");
    return context;
};
