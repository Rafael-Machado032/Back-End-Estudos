'use client'; // 1. Sempre 'use client' pois o contexto usa estado (useState)

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Depoimento { //Interface do usuario
    nome: string; // Parametros da interface
    mensagem: string; // URL completa que vem do Laravel (asset)
}


interface DepoimentoContextoTipo { //Contrato do que o contexto vai usar
    depoimentoDados: Depoimento; // O parametro dados é tipo usuario criado ali em cima
    setDepoimentoDados: (novosDados: Depoimento) => void //O setDados é uma função para receber dados e guardar no usuario o void não retorna nada
}

interface DepoimentoVindoDoBanco {
    id: number;
    nome: string;
    mensagem: string;
    // adicione outros campos se existirem no seu banco
}

interface DepoimentoProvedorProps {
    children: ReactNode;
    // Se quiser receber dados iniciais do servidor, adicione aqui
    dadosIniciais?: DepoimentoVindoDoBanco | null; // Aqui substituímos o 'any'
}


//Conexao que vai usar o nosso contrato ou vazio
const DepoimentoContexto = createContext<DepoimentoContextoTipo | undefined>(undefined);

//Provedor e a função que vai abraçar
export function DepoimentoProvedor({ children, dadosIniciais }:  DepoimentoProvedorProps ) {
    const [mounted, setMounted] = useState(false);
    const [depoimentoDados, setDepoimentoDados] = useState<Depoimento>(() => {
        // 1. Prioridade Máxima: O que o servidor (Next) acabou de buscar no Laravel
        if (dadosIniciais?.nome && dadosIniciais.mensagem) {
            return { nome: dadosIniciais.nome, mensagem: dadosIniciais.mensagem };
        }
        // Prioridade 2: LocalStorage (Fallback/Cache local)
        if (typeof window !== 'undefined') {// Verifica se estamos no cliente
            const salvo = localStorage.getItem('depoimento_data');
            return salvo ? JSON.parse(salvo) : { nome: "", mensagem: "" };
        }
        return { nome: "", mensagem: "" };
    });


    // 2. useEffect apenas para dizer que o componente montou (evita erro de Hydration)
    useEffect(() => {
        // O setTimeout com 0 tira o setState do fluxo crítico de renderização
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer); // Limpeza básica
    }, []);

    // 2. Salva sempre que 'dados' mudar (mas pula a primeira vez se não estiver montado)
    useEffect(() => {
        if (mounted) {
            localStorage.setItem('depoimento_data', JSON.stringify(depoimentoDados));
        }
    }, [depoimentoDados, mounted]);
    // Evita o erro de Hydration: não renderiza o conteúdo real até que o cliente esteja pronto

    useEffect(() => {
        // Escuta mudanças no localStorage vindas de outras abas/layouts
        const sincronizar = (e: StorageEvent) => {
            if (e.key === 'depoimento_dados' && e.newValue) {
                setDepoimentoDados(JSON.parse(e.newValue));
            }
        };
        window.addEventListener('storage', sincronizar);
        return () => window.removeEventListener('storage', sincronizar);
    }, []);


    if (!mounted) {
        return null; // Ou um esqueleto/loading
    }
    // Adicione isso dentro do useEffect de montagem no seu LayoutContext.tsx

    console.log("DADOS QUE CHEGARAM NO CONTEXTO:", dadosIniciais);

    return (
        // Enviamos o valor para quem estiver lá dentro
        <DepoimentoContexto.Provider value={{ depoimentoDados: depoimentoDados, setDepoimentoDados: setDepoimentoDados }}>
            {children}
        </DepoimentoContexto.Provider>
    );
}

// Avisa se o contexto esta dentro do provedor se estiver fora da erro
export const useDepoimento = () => {
    const context = useContext(DepoimentoContexto);
    if (!context) {
        throw new Error("useDepoimento deve ser usado dentro de um DepoimentoProvedor");
    }
    return context;
};
