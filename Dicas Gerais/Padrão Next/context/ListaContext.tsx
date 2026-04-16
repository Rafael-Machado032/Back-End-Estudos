'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';

interface Lista {
    id: number;
    nome: string;
}

// 1. Remova a função de adicionar do contrato
interface ListaContextoTipo {
    listaDados: Lista[];
    setListaDados: (novaLista: Lista[]) => void; // Mantemos para a sincronização interna
}

const ListaContexto = createContext<ListaContextoTipo | undefined>(undefined);

export function ListaProvedor({ children, listaInicial }: { children: ReactNode, listaInicial?: Lista[] }) {

    const [listaDados, setListaDados] = useState<Lista[]>(() => {
        if (typeof window === 'undefined') return listaInicial || [];
        try {
            const salvo = localStorage.getItem('@Nome_App:chave_lista');
            return salvo ? JSON.parse(salvo) : (listaInicial || []);
        } catch { return listaInicial || []; }
    });

    // Sincronização: Se o dado no Laravel mudar, o site atualiza
    const [prevListaInicial, setPrevListaInicial] = useState(listaInicial);

    if (listaInicial !== prevListaInicial) {
        setPrevListaInicial(listaInicial);
        if (JSON.stringify(listaInicial) !== JSON.stringify(listaDados)) {
            setListaDados(listaInicial || []);
        }
    }

    useEffect(() => {
        localStorage.setItem('@Nome_App:chave_lista', JSON.stringify(listaDados));
    }, [listaDados]);

    // 2. O useMemo agora só passa a lista e a função de atualizar
    const listaContextoValor = useMemo(() => ({
        listaDados,
        setListaDados
    }), [listaDados]);

    return <ListaContexto.Provider value={listaContextoValor}>{children}</ListaContexto.Provider>;
}

export const useLista = () => {
    const context = useContext(ListaContexto);
    if (!context) throw new Error("useLista deve ser usado dentro de um Provedor");
    return context;
};
