'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// 1. O Molde da Mensagem (Baseado no seu Banco/Laravel)
interface Mensagem {
    id: number;
    nome: string;
    email: string;
    mensagem: string;
    lida: boolean;
    created_at?: string;
}

// 2. O Contrato do Contexto
interface MensagemContextoTipo {
    mensagemDados: Mensagem[];
    // Altere esta linha para aceitar o "Dispatch" do React
    setMensagemDados: React.Dispatch<React.SetStateAction<Mensagem[]>>;
    mensagemAberta: Mensagem | null; // Para saber qual msg exibir no lado esquerdo
    setMensagemAberta: (msg: Mensagem | null) => void;
}

// 3. As Props do Provedor
interface MensagemProvedorProps {
    children: ReactNode;
    mensagensIniciais?: Mensagem[] | null;
}

const MensagemContexto = createContext<MensagemContextoTipo | undefined>(undefined);

export function MensagemProvedor({ children, mensagensIniciais }: MensagemProvedorProps) {
    const [mounted, setMounted] = useState(false);// Controle para saber se o componente já carregou no navegador. Isso evita o erro de "Hydration" (quando o servidor Next e o navegador tentam mostrar coisas diferentes).
    const [mensagemAberta, setMensagemAberta] = useState<Mensagem | null>(null);

    const [mensagemDados, setMensagemDados] = useState<Mensagem[]>(() => {
        if (mensagensIniciais){
            return mensagensIniciais;
        }
        if (typeof window !== 'undefined') {
            const salvo = localStorage.getItem('mensagem_data');
            return salvo ? JSON.parse(salvo) : [];
        }
        return [];
    });

    // Evita erro de Hydration
    useEffect(() => { // Assim que o componente aparece na tela, ele muda mounted para true. O setTimeout(..., 0) garante que isso aconteça logo após a primeira renderização.
        const timer = setTimeout(() => setMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    // Salva no LocalStorage para persistência/cache
    useEffect(() => { // Toda vez que a sua lista de mensagens (mensagemDados) mudar, ele salva a versão nova no navegador para você não perder os dados se der F5.
        if (mounted) {
            localStorage.setItem('mensagem_data', JSON.stringify(mensagemDados));
        }
    }, [mensagemDados, mounted]);

    // Sincroniza entre abas (Caso você abra o painel em duas telas)
    useEffect(() => { // Se você tiver duas abas do seu painel abertas e ler uma mensagem em uma, a outra aba percebe a mudança no localStorage e se atualiza sozinha.
        const sincronizar = (e: StorageEvent) => {
            if (e.key === 'mensagem_data' && e.newValue) {
                setMensagemDados(JSON.parse(e.newValue));
            }
        };
        window.addEventListener('storage', sincronizar);
        return () => window.removeEventListener('storage', sincronizar);
    }, []);

    if (!mounted) return null;

    console.log("Mensagens QUE CHEGARAM NO CONTEXTO:", mensagensIniciais);

    return (
        <MensagemContexto.Provider value={{
            mensagemDados,
            setMensagemDados,
            mensagemAberta,
            setMensagemAberta
        }}>
            {children}
        </MensagemContexto.Provider>
    );
}

export const useMensagem = () => {
    const context = useContext(MensagemContexto);
    if (!context) {
        throw new Error("useMensagem deve ser usado dentro de um MensagemProvedor");
    }
    return context;
};
