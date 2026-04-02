'use client'; // 1. Sempre 'use client' pois o contexto usa estado (useState)

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface MensagemEstado {
    nome: string;
    email: string;
    mensagem: string;
}

interface MensagemContextoTipo { //Contrato do que o contexto vai usar
    mensagemDados: MensagemEstado;
    setMensagemDados: (novosDados: MensagemEstado) => void //O setDados é uma função para receber dados e guardar no usuario o void não retorna nada
}

interface MensagemVindoDoBanco {
    id: number;
    nome: string;
    email: string;
    mensagem: string;
}

interface MensagemProvedorProps {
    children: ReactNode;
    mensagensIniciais?: MensagemVindoDoBanco | null; // Aqui substituímos o 'any'
}

//Conexao que vai usar o nosso contrato ou vazio
const MensagemContexto = createContext<MensagemContextoTipo | undefined>(undefined);

//Provedor e a função que vai abraçar
export function MensagemProvedor({ children, mensagensIniciais }: MensagemProvedorProps) {
    const [mounted, setMounted] = useState(false);
    // 1. Inicializa o estado com uma função para evitar acessar localStorage no servidor
    const [mensagemDados, setMensagemDados] = useState<MensagemEstado>(() => {
        // 1. Prioridade Máxima: O que o servidor (Next) acabou de buscar no Laravel
        if (mensagensIniciais?.mensagem) {
            return { nome: mensagensIniciais.nome, email: mensagensIniciais.email, mensagem: mensagensIniciais.mensagem };
        }
        // Prioridade 2: LocalStorage (Fallback/Cache local)
        if (typeof window !== 'undefined') {// Verifica se estamos no cliente
            const salvo = localStorage.getItem('mensagem_data');
            return salvo ? JSON.parse(salvo) : { nome: "", email: "", mensagem: "" };
        }
        return { nome: "", email: "", mensagem: "" };
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
            localStorage.setItem('mensagem_data', JSON.stringify(mensagemDados));
        }
    }, [mensagemDados, mounted]);
    // Evita o erro de Hydration: não renderiza o conteúdo real até que o cliente esteja pronto

    useEffect(() => {
        // Escuta mudanças no localStorage vindas de outras abas/layouts
        const sincronizar = (e: StorageEvent) => {
            if (e.key === 'mensagem_data' && e.newValue) {
                setMensagemDados(JSON.parse(e.newValue));
            }
        };
        window.addEventListener('storage', sincronizar);
        return () => window.removeEventListener('storage', sincronizar);
    }, []);


    if (!mounted) {
        return null; // Ou um esqueleto/loading
    }
    // Adicione isso dentro do useEffect de montagem no seu LayoutContext.tsx

    console.log("Mensagens QUE CHEGARAM NO CONTEXTO:", mensagensIniciais);


    return (
        // Enviamos o valor para quem estiver lá dentro
        <MensagemContexto.Provider value={{ mensagemDados, setMensagemDados }}>
            {children}
        </MensagemContexto.Provider>
    );
}

// Avisa se o contexto esta dentro do provedor se estiver fora da erro
export const useMensagem = () => {
    const context = useContext(MensagemContexto);
    if (!context) {
        throw new Error("useMensagem deve ser usado dentro de um MensagemProvedor");
    }
    return context;
};
