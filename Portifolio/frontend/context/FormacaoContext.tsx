'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useMemo } from 'react';

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

export function FormacaoProvedor({ children, formacaoInicial }: { children: ReactNode, formacaoInicial?: Formacao[] }) {

    const [formacaoDados, setFormacaoDados] = useState<Formacao[]>(() => {
        if (typeof window === 'undefined') return formacaoInicial || [];
        try {
            const salvo = localStorage.getItem('@Portifolio:Formacao');
            return salvo ? JSON.parse(salvo) : (formacaoInicial || []);
        } catch { return formacaoInicial || []; }
    });

    // Sincronização: Se o dado no Laravel mudar, o site atualiza
    const [prevFormacaoInicial, setPrevFormacaoInicial] = useState(formacaoInicial);

    if (formacaoInicial !== prevFormacaoInicial) {
        setPrevFormacaoInicial(formacaoInicial);
        if (JSON.stringify(formacaoInicial) !== JSON.stringify(formacaoDados)) {
            setFormacaoDados(formacaoInicial || []);
        }
    }

    useEffect(() => {
        localStorage.setItem('@Portifolio:Formacao', JSON.stringify(formacaoDados));
    }, [formacaoDados]);

    // 2. O useMemo agora só passa a lista e a função de atualizar
    const formacaoContextoValor = useMemo(() => ({
        formacaoDados,
        setFormacaoDados
    }), [formacaoDados]);

    return <FormacaoContexto.Provider value={formacaoContextoValor}>{children}</FormacaoContexto.Provider>;
}

export const useFormacao = () => {
    const context = useContext(FormacaoContexto);
    if (!context) throw new Error("useFormacao deve ser usado dentro de um Provedor");
    return context;
};
