'use client'; // 1. Sempre 'use client' pois o contexto usa estado (useState)

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface usuario { //Pacote usuario
    nome: string;
    foto: string;
}


interface DadosContextoTipo { //Contrato do que o contexto vai usar
    dados: usuario;
    setDados: (novosDados: usuario) => void
}

//Conexao que vai usar o nosso contrato ou vazio
const DadosContexto = createContext<DadosContextoTipo | undefined>(undefined);

//Provedor e a função que vai abraçar
export function DadosProvedor({ children }: { children: ReactNode }) {
    const [dados, setDados] = useState<usuario>({
        nome: "Usuario",
        foto: ""
    }); // Estado global

    // Dentro do seu Provider
    useEffect(() => {
        // 1. Tenta buscar o que ficou "esquecido" no navegador
        const salvo = localStorage.getItem('usuario_dados');
        if (salvo) {
            setDados(JSON.parse(salvo));
        }
    }, []);

    useEffect(() => {
        // 2. Toda vez que o 'dados' mudar, a gente "tatuia" no navegador
        localStorage.setItem('usuario_dados', JSON.stringify(dados));
    }, [dados]);


    return (
        // Enviamos o valor para quem estiver lá dentro
        <DadosContexto.Provider value={{ dados, setDados }}>
            {children}
        </DadosContexto.Provider>
    );
}

// Avisa se o contexto esta dentro do provedor se estiver fora da erro
export const useDados = () => {
    const context = useContext(DadosContexto);
    if (!context) {
        throw new Error("useDados deve ser usado dentro de um DadosProvedor");
    }
    return context;
};
