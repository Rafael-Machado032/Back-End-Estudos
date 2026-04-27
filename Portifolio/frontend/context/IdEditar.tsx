'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface Item {
    id: string;
    editar: boolean;
    tipo?: string;
}

interface ItemContextoTipo {
    itemDados: Item | null;
    setItemDados: (novosDados: Item | null) => void;
}

const ItemContexto = createContext<ItemContextoTipo | undefined>(undefined);

export function ItemProvedor({ children }: { children: ReactNode }) {
    // Agora o estado é puramente local. 
    // Começa vazio (null) e só muda quando você clica em algum botão.
    const [itemDados, setItemDados] = useState<Item | null>(null);

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
