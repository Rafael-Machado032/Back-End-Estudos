'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

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
    // 1. Estado inicial nasce estritamente do que vem do servidor (Laravel)
    // Isso garante que o primeiro render seja idêntico no servidor e no cliente
    const [itemDados, setItemDados] = useState<Item | null>(itemIniciais || null);

    // 2. SINCRONIZAÇÃO DE RENDERIZAÇÃO
    // Se a prop 'itemIniciais' mudar (ex: após um router.refresh()), 
    // o React atualiza o estado durante o ciclo de render, sem precisar de useEffect.
    const [prevItemIniciais, setPrevItemIniciais] = useState(itemIniciais);

    if (itemIniciais !== prevItemIniciais) {
        setPrevItemIniciais(itemIniciais);
        // Atualiza o estado apenas se o valor for realmente diferente
        if (JSON.stringify(itemIniciais) !== JSON.stringify(itemDados)) {
            setItemDados(itemIniciais || null);
        }
    }

    // 3. Memorização do valor do contexto para performance
    const itemContextoValor = useMemo(() => ({ 
        itemDados, 
        setItemDados 
    }), [itemDados]);

    return (
        <ItemContexto.Provider value={itemContextoValor}>
            {children}
        </ItemContexto.Provider>
    );
}

export const useItem = () => {
    const context = useContext(ItemContexto);
    if (!context) {
        throw new Error("useItem deve ser usado dentro de um ItemProvedor");
    }
    return context;
};
