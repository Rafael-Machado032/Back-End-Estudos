'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface Lista {
    id: number;
    nome: string;
}

interface ListaContextoTipo {
    listaDados: Lista[];
    setListaDados: (novaLista: Lista[]) => void;
}

const ListaContexto = createContext<ListaContextoTipo | undefined>(undefined);

export function ListaProvedor({ children, listaInicial = [] }: { children: ReactNode, listaInicial?: Lista[] }) {
    // 1. Estado nasce com a lista do Laravel ou um array vazio (evita quebra no .map)
    const [listaDados, setListaDados] = useState<Lista[]>(listaInicial);

    // 2. SINCRONIZAÇÃO PROFISSIONAL
    // Se o banco mudar (ex: busca com filtro ou nova página), o estado reflete isso
    const [prevListaInicial, setPrevListaInicial] = useState(listaInicial);

    if (listaInicial !== prevListaInicial) {
        setPrevListaInicial(listaInicial);
        // Só atualiza se houver mudança real para evitar re-renders infinitos
        if (JSON.stringify(listaInicial) !== JSON.stringify(listaDados)) {
            setListaDados(listaInicial);
        }
    }

    // 3. Memorização para performance
    const listaContextoValor = useMemo(() => ({
        listaDados,
        setListaDados
    }), [listaDados]);

    return (
        <ListaContexto.Provider value={listaContextoValor}>
            {children}
        </ListaContexto.Provider>
    );
}

export const useLista = () => {
    const context = useContext(ListaContexto);
    if (!context) {
        throw new Error("useLista deve ser usado dentro de um ListaProvedor");
    }
    return context;
};
