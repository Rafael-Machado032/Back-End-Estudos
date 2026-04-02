'use client'; // 1. Sempre 'use client' pois o contexto usa estado (useState)

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface LayoutEstado {
    id: number;
    layout_url: string;
    layout_url_completa: string; // O Accessor do Laravel
}

interface LayoutContextoTipo { //Contrato do que o contexto vai usar
    layoutDados: LayoutEstado;
    setLayoutDados: (novosDados: LayoutEstado) => void //O setDados é uma função para receber dados e guardar no usuario o void não retorna nada
}

interface LayoutProvedorProps {
    children: ReactNode;
    layoutInicial?: LayoutEstado | null; // Aqui substituímos o 'any'
}

//Conexao que vai usar o nosso contrato ou vazio
const LayoutContexto = createContext<LayoutContextoTipo | undefined>(undefined);

//Provedor e a função que vai abraçar
export function LayoutProvedor({ children, layoutInicial }: LayoutProvedorProps) {
    const [mounted, setMounted] = useState(false);
    // 1. Inicializa o estado com uma função para evitar acessar localStorage no servidor
    const [layoutDados, setLayoutDados] = useState<LayoutEstado>(() => {
        // 1. Prioridade Máxima: O que o servidor (Next) acabou de buscar no Laravel
        if (layoutInicial) {
            return {
                layout_url_completa: layoutInicial.layout_url_completa
            };
        }
        // Prioridade 2: LocalStorage (Fallback/Cache local)
        if (typeof window !== 'undefined') {// Verifica se estamos no cliente
            const salvo = localStorage.getItem('layout_url_data');
            return salvo ? JSON.parse(salvo) : { layout_url: "" };
        }
        return {
            id: 0,
            layout_url: "",
            layout_url_completa: ""
        };
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
            localStorage.setItem('layout_url_data', JSON.stringify(layoutDados));
        }
    }, [layoutDados, mounted]);
    // Evita o erro de Hydration: não renderiza o conteúdo real até que o cliente esteja pronto

    useEffect(() => {
        // Escuta mudanças no localStorage vindas de outras abas/layouts
        const sincronizar = (e: StorageEvent) => {
            if (e.key === 'layout_url_data' && e.newValue) {
                setLayoutDados(JSON.parse(e.newValue));
            }
        };
        window.addEventListener('storage', sincronizar);
        return () => window.removeEventListener('storage', sincronizar);
    }, []);


    if (!mounted) {
        return null; // Ou um esqueleto/loading
    }
    // Adicione isso dentro do useEffect de montagem no seu LayoutContext.tsx

    console.log("Layouts QUE CHEGARAM NO CONTEXTO:", layoutInicial);


    return (
        // Enviamos o valor para quem estiver lá dentro
        <LayoutContexto.Provider value={{ layoutDados, setLayoutDados }}>
            {children}
        </LayoutContexto.Provider>
    );
}

// Avisa se o contexto esta dentro do provedor se estiver fora da erro
export const useLayout = () => {
    const context = useContext(LayoutContexto);
    if (!context) {
        throw new Error("useLayout deve ser usado dentro de um LayoutProvedor");
    }
    return context;
};
