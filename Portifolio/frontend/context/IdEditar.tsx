'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface Item {
    id: string;
    editar: boolean;
    tipo: string;
    carregando: boolean;
}

interface ItemContextoTipo {
    itemDados: Item;
    setItemDados: (dados: Partial<Item>) => void;
}

const ItemContexto = createContext<ItemContextoTipo | undefined>(undefined);

export function ItemProvedor({ children }: { children: ReactNode }) {
    // Agora o estado é puramente local. 
    // Começa vazio (null) e só muda quando você clica em algum botão.
    const [itemDados, _setItemDados] = useState<Item>({
        id: "",
        editar: false,
        tipo: "projeto", // Define que o painel começa mostrando Projetos
        carregando: false
    });
    // O seu set padrão que faz o merge
    const setItemDados = (novosDados: Partial<Item>) => {
        _setItemDados((prev) => ({
            ...prev,    // Mantém o que já existia
            ...novosDados // Sobrescreve apenas o que você enviou
        }) as Item); // O "as Item" resolve o erro do TypeScript
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
