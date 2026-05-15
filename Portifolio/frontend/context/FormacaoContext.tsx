'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

export interface Formacao { //exporto para usar em outros arquivos, resolver o tipo do projetoDados
    id: string;
    titulo: string;
    credencial: string;
    descricao: string;
    certificado_url: string;
    capa_url: string;
    curso_url: string;
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

    // 3. Memorização para performance
    const FormacaoContextoValor = useMemo(() => ({
        formacaoDados,
        setFormacaoDados,
    }), [formacaoDados]);
    
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
