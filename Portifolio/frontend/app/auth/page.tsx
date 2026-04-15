import Login from "@/components/button/Login";

export default function Home() {
    return (
        <main className="bg-[#0b0f1a] h-screen flex items-center justify-center">
            <div className="w-full max-w-100 h-65 bg-[#161b2c] p-8 rounded-2xl text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold">Acesso Restrito</h2>
                    <p className="text-[#9ca3af] text-sm">Digite a senha para gerenciar</p>
                    <div className="flex flex-col gap-3">
                        <input className="border border-[#374151] bg-[#1f2937] rounded-lg py-2 px-4" type="password" placeholder="Senha" />
                        <Login/>
                        <p className="text-[#ef4444] hidden">Senha incorreta!</p>
                    </div>
                </div>
            </div>
        </main>
    );
}