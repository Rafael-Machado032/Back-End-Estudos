'use client';
import { useState } from "react";
import Login from "@/components/button/Login";
import { ActionLogin } from "@/api/LoginLogout";

export default function Home() {
    const [respostaUsuario, setRespostaUsuario] = useState<string>("")
    const [erro, setErro] = useState<boolean>(false)

    const login = async (formData: FormData) => {
        const senhaInput = formData.get("senha_form") as string
        setErro(false) // Reseta o estado de erro a cada tentativa de login

        if (senhaInput && senhaInput.trim() != ""){
            const resultado = await ActionLogin(formData) // Chama a Server Action que faz o fetch para o Laravel (POST /api/login)

            console.log(resultado.message)
            
            if(!resultado?.success) {
                setRespostaUsuario("Senha Incorreta")
                setErro(true)
            }
        } else {
            setRespostaUsuario("Por favor, insira uma senha válida.")
            setErro(true)
        }
    }
    return (
        <main className="bg-[#0b0f1a] h-screen flex items-center justify-center">
            <div className="w-full max-w-100 h-65 bg-[#161b2c] p-8 rounded-2xl text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">Acesso Restrito</h2>
                    <p className="text-[#9ca3af] text-sm">Digite a senha para gerenciar</p>
                    <form action={login} className="flex flex-col gap-3">
                        <input className="border border-[#374151] bg-[#1f2937] rounded-lg py-2 px-4" name="senha_form" type="password" placeholder="Senha" />
                        <Login/>
                        {erro ? <p className="text-[#ef4444]">{respostaUsuario}</p>:null}
                    </form>
                </div>
            </div>
        </main>
    );
}