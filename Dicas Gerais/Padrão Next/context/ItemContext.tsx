'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';

interface Item {
    id: number;
    nome: string;
}

interface ItemContextoTipo {
    itemDados: Item | null;
    setItemDados: (novosDados: Item | null) => void;
}

const ItemContexto = createContext<ItemContextoTipo | undefined>(undefined);

export function ItemProvedor({ children, itemIniciais }: { children: ReactNode, itemIniciais?: Item | null }) {

    const [itemDados, setItemDados] = useState<Item | null>(() => {
        if (typeof window === 'undefined') return itemIniciais || null;
        try {
            const salvo = localStorage.getItem('@Nome_App:chave_item'); // Chave específica
            return salvo ? JSON.parse(salvo) : (itemIniciais || null);
        } catch { return itemIniciais || null; }
    });

    // 🚀 SINCRONIZAÇÃO: Garante que se o Laravel mudar, o site atualiza na hora
    const [prevItemIniciais, setPrevItemIniciais] = useState(itemIniciais);

    if (itemIniciais !== prevItemIniciais) {
        setPrevItemIniciais(itemIniciais);
        // Compara se o que veio do servidor é diferente do que está no estado
        if (JSON.stringify(itemIniciais) !== JSON.stringify(itemDados)) {
            setItemDados(itemIniciais || null);
        }
    }

    useEffect(() => {
        if (itemDados) {
            localStorage.setItem('@Nome_App:chave_item', JSON.stringify(itemDados));
        } else {
            localStorage.removeItem('@Nome_App:chave_item');
        }
    }, [itemDados]);

    const itemContextoValor = useMemo(() => ({ itemDados, setItemDados }), [itemDados]);

    return <ItemContexto.Provider value={itemContextoValor}>{children}</ItemContexto.Provider>;
}

export const useItem = () => {
    const context = useContext(ItemContexto);
    if (!context) throw new Error("useItem deve ser usado dentro de um Provedor");
    return context;
};
