import NextImage from "next/image"

export default function Cont_Formacao() {
    return (
        <div className="max-w-sm rounded-2xl bg-[#222222]  border-[#00f1fe00] hover:border-[#00f2fe] border hover:shadow-[0_0_20px_rgba(0,119,181,0.5)] hover:scale-105 transition-all duration-300">
            <div>
                
                <NextImage src={""} alt="Next.js Dashboard" width={500} height={300} />
            </div>
            <div className="p-6">
                
                <h3 className="text-xl">Analise e Desenvolvimento de Sistema</h3>
                <p className="text-[#aaaaaa]">Dashboard administrativo com gráficos dinâmicos e sistema de gestão de usuários integrado.</p>
            </div>
        </div>
    )
}
