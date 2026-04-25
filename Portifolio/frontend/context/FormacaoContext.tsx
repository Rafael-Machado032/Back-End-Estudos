'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface Formacao {
    id: string;
    titulo: string;
    tecnologia: string;
    descricao: string;
    certificado_url_servidor: string;
}

// 1. Remova a função de adicionar do contrato
interface FormacaoContextoTipo {
    formacaoDados: Formacao[];
    setFormacaoDados: (novaLista: Formacao[]) => void; // Mantemos para a sincronização interna
}

const FormacaoContexto = createContext<FormacaoContextoTipo | undefined>(undefined);

export function FormacaoProvedor({ children, formacaoInicial = [] }: { children: ReactNode, formacaoInicial?: Formacao[] }) {
    // 1. Estado nasce com a lista do Laravel ou um array vazio (evita quebra no .map)
    const [formacaoDados, setFormacaoDados] = useState<Formacao[]>(formacaoInicial);

    const [editId, setEditId] = useState<number | null>(null);

    // 2. SINCRONIZAÇÃO PROFISSIONAL
    // Se o banco mudar (ex: busca com filtro ou nova página), o estado reflete isso
    const [prevFormacaoInicial, setPrevFormacaoInicial] = useState(formacaoInicial);

    if (formacaoInicial !== prevFormacaoInicial) {
        setPrevFormacaoInicial(formacaoInicial);
        // Só atualiza se houver mudança real para evitar re-renders infinitos
        if (JSON.stringify(formacaoInicial) !== JSON.stringify(formacaoDados)) {
            setFormacaoDados(formacaoInicial);
        }
    }

    // 3. Memorização para performance
    const FormacaoContextoValor = useMemo(() => ({
        formacaoDados,
        setFormacaoDados,
        editId,
        setEditId
    }), [formacaoDados, editId]);

    return (
        <FormacaoContexto.Provider value={FormacaoContextoValor}>
            {children}
        </FormacaoContexto.Provider>
    );
}

export const useFormacao = () => {
    const context = useContext(FormacaoContexto);
    if (!context) throw new Error("useFormacao deve ser usado dentro de um Provedor");
    return context;
};
