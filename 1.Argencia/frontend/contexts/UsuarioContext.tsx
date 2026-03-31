'use client'; // 1. Sempre 'use client' pois o contexto usa estado (useState)

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface usuario { //Interface do usuario
    nome: string; // Parametros da interface
    foto_url?: string; // URL completa que vem do Laravel (asset)
}


interface UsuarioContextoTipo { //Contrato do que o contexto vai usar
    usuarioDados: usuario; // O parametro dados é tipo usuario criado ali em cima
    setUsuarioDados: (novosDados: usuario) => void //O setDados é uma função para receber dados e guardar no usuario o void não retorna nada
}

//Conexao que vai usar o nosso contrato ou vazio
const UsuarioContexto = createContext<UsuarioContextoTipo | undefined>(undefined);

//Provedor e a função que vai abraçar
export function UsuarioProvedor({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false);
    const [usuarioDados, setUsuarioDados] = useState<usuario>(() => {
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

    return (
        // Enviamos o valor para quem estiver lá dentro
        <UsuarioContexto.Provider value={{ usuarioDados: usuarioDados, setUsuarioDados }}>
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
