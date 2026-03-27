"use client";
import { useDados } from "@/contexts/Usuario"; // Importa seu contexto
import { FazerLogin } from "../lib/FazerLogin";
import { useRouter } from "next/navigation"; // 1. Importe o router

export default function LoginPage() {
    const { setDados } = useDados(); // Pega a função de salvar do contexto
    const router = useRouter(); // 2. Inicialize o router

    const login = async (formData: FormData) => {
        const emailInput = formData.get("email") as string
        const senhaInput = formData.get("senha") as string

        if (emailInput && emailInput.trim() != "" && senhaInput && senhaInput.trim() != "") {
            const resultado = await FazerLogin(formData)
            if (!resultado?.success) {
                alert("Usuario ou Senha Incorreto")
            }else{
                setDados({
                nome: resultado.user.name,
                foto: resultado.user.foto
            });
            router.push("/admin");
            }
        }

    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
                <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Entrar na Conta</h1>

                <form action={login} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 outline-none"
                            placeholder="seu@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Senha</label>
                        <input
                            type="password"
                            name="senha"
                            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 transition-colors font-semibold"
                    >
                        Acessar Sistema
                    </button>
                </form>
            </div>
        </main>
    );
}
