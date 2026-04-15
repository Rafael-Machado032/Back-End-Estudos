import NextImage from "next/image"

export default function Cont_FormacaoADM() {
    return (
        <div className="max-w-70 rounded-2xl bg-[#222222] border-[#00f1fe00] border">
            <div>
                <NextImage src={""} alt="Next.js Dashboard" width={100} height={150} />
            </div>
            <div className="p-4">
                <h3 className="text-lg">Analise e Desenvolvimento de Sistema</h3>
                <p className="text-[#aaaaaa] text-sm">Dashboard administrativo com gráficos dinâmicos e sistema de gestão de usuários integrado.</p>
            </div>
        </div>
    )
}
