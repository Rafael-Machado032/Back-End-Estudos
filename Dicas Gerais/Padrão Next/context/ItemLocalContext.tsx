'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface Item {
    id: string;
    editar: boolean;
    carregando: boolean;
}

interface ItemContextoTipo {
    itemDados: Item;
    setItemDados: (dados: Partial<Item>) => void; //Permite setar um item ou mais
}

const ItemContexto = createContext<ItemContextoTipo | undefined>(undefined);

export function ItemProvedor({ children }: { children: ReactNode }) {
    const [itemDados, _setItemDados] = useState<Item>({ //Ja começa com valores
        id: "",
        editar: false,
        carregando: false
    });

    const setItemDados = (novosDados: Partial<Item>) => { // Função que permite setar um item ou mais
        _setItemDados((prev) => ({
            ...prev,
            ...novosDados
        }) as Item);
    };

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
