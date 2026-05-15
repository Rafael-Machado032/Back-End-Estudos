'use client';
import { useState } from "react";
import Login from "@/components/button/Login";
import { ActionLogin } from "@/api/LoginLogout";
import { useItem } from "@/context/IdEditar"; //Estado de item
import { flushSync } from "react-dom"; // Ignora a regra do async


export default function Home() {
    const { itemDados, setItemDados } = useItem();
    const [respostaUsuario, setRespostaUsuario] = useState<string>("")
    const [erro, setErro] = useState<boolean>(false)

    const login = async (formData: FormData) => {
        flushSync(() => { // Solução para poder usar o carregamento
            setItemDados({ carregando: true })
        });
        const senhaInput = formData.get("senha_form") as string
        setErro(false) // Reseta o estado de erro a cada tentativa de login

        if (senhaInput && senhaInput.trim() != "") {
            try {
                const resultado = await ActionLogin(formData) // Chama a Server Action que faz o fetch para o Laravel (POST /api/login)
                if (!resultado?.success) {
                    setRespostaUsuario("Senha Incorreta")
                    setErro(true)
                }
            } catch (error) {
                // 3. SEGREDO: Se a Action disparar um redirect, o código cai AQUI
                // Nós desligamos o loading IMEDIATAMENTE antes do navegador mudar de página
                setItemDados({ carregando: false });
                // Repassa o erro adiante para o Next.js poder executar o redirecionamento
                throw error;
            }
        } else {
            setRespostaUsuario("Por favor, insira uma senha válida.")
            setErro(true)
        }
        setItemDados({ carregando: false })
    }
    return (
        <main className="bg-[#0b0f1a] h-screen flex items-center justify-center">
            <div className="w-full max-w-100 h-65 bg-[#161b2c] p-8 rounded-2xl text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">Acesso Restrito</h2>
                    <p className="text-[#9ca3af] text-sm">Digite a senha para gerenciar</p>
                    <form action={login} className="flex flex-col gap-3">
                        <input className="border border-[#374151] bg-[#1f2937] rounded-lg py-2 px-4" name="senha_form" type="password" placeholder="Senha" />
                        <Login />
                        {erro ? <p className="text-[#ef4444]">{respostaUsuario}</p> : null}
                    </form>
                </div>
            </div>
            {itemDados?.carregando && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-white"></div>
                <span className="ml-3 text-white">Processando...</span>
            </div>}
        </main>
    );
}