'use client'; // 1. Sempre 'use client' pois o contexto usa estado (useState)

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface usuario { //Interface do usuario
    nome: string; // O que o seu Next vai usar internamente
    foto_url?: string; // URL completa que vem do Laravel (asset)
    foto_url_completa?: string; // URL completa que vem do Laravel (asset) - Accessor
}


interface UsuarioContextoTipo { //Contrato do que o contexto vai usar
    usuarioDados: usuario; // Onde os dados ficam guardados
    setUsuarioDados: (novosDados: usuario) => void //O setDados é uma função para receber dados e guardar no usuario o void não retorna nada
}

interface UsuarioProvedorProps {
    children: ReactNode;
    // IMPORTANTE: Aqui tem que ser um objeto do tipo usuario ou null, porque o contexto espera um objeto de usuario ou nada, e não um array ou string
    usuarioInicial?: usuario | null; // Nome do Prop O que o Next pode passar para o contexto (pode ser null se o Next não tiver dados)
}

//Conexao que vai usar o nosso contrato ou vazio
const UsuarioContexto = createContext<UsuarioContextoTipo | undefined>(undefined);

//Provedor e a função que vai abraçar
export function UsuarioProvedor({ children, usuarioInicial }: UsuarioProvedorProps) {
    const [mounted, setMounted] = useState(false);
    const [usuarioDados, setUsuarioDados] = useState<usuario>(() => {
        // 1. Prioridade Máxima: O que o servidor (Next) acabou de buscar no Laravel
        if (usuarioInicial) {
            return {
                nome: usuarioInicial.nome,
                foto_url: usuarioInicial.foto_url_completa 
            };
        }
        // 2. Prioridade 2: LocalStorage (Fallback/Cache local)
        if (typeof window !== 'undefined') {
            const salvo = localStorage.getItem('usuario_data');
            return salvo ? JSON.parse(salvo) : { nome: "Carregando...", foto_url: "" };
        }
        return { nome: "Carregando...", foto_url: "" };
    });


    // 2. useEffect apenas para dizer que o componente montou (evita erro de Hydration)
    useEffect(() => {
        // O setTimeout com 0 tira o setState do fluxo crítico de renderização
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);

        return () => clearTimeout(timer); // Limpeza básica
    }, []);
    // 2. Salva sempre que 'dados' mudar (mas pula a primeira vez se não estiver montado)
    useEffect(() => {
        if (mounted) {
            localStorage.setItem('usuario_data', JSON.stringify(usuarioDados));
        }
    }, [usuarioDados, mounted]);
    
    
    // Evita o erro de Hydration: não renderiza o conteúdo real até que o cliente esteja pronto
    if (!mounted) {
        return null; // Ou um esqueleto/loading
    }
    console.log("Usuarios QUE CHEGARAM NO CONTEXTO:", usuarioInicial);

    return (
        // Enviamos o valor para quem estiver lá dentro
        <UsuarioContexto.Provider value={{ usuarioDados, setUsuarioDados }}>
            {children}
        </UsuarioContexto.Provider>
    );
}

// Avisa se o contexto esta dentro do provedor se estiver fora da erro
export const useUsuario = () => {
    const context = useContext(UsuarioContexto);
    if (!context) {
        throw new Error("useUsuario deve ser usado dentro de um UsuarioProvedor");
    }
    return context;
};
