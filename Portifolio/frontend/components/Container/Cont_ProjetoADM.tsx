import NextImage from "next/image"
import Github from "../button/Github"
import Demo from "../button/Demo"

export default function Cont_ProjetoADM() {
    return (
        <div className="max-w-70 rounded-2xl bg-[#222222] border-[#00f1fe00] border">
            <div>
                <NextImage src={""} alt="Next.js Dashboard" width={100} height={150} />
            </div>
            <div className="flex flex-col items-start gap-2 p-4">
                <span className="text-[#00f2ff] bg-[#00424572] px-4 rounded-4xl">Next.js + Tailwind</span>
                <h3 className="text-lg">SaaS Platform UI</h3>
                <p className="text-[#aaaaaa] text-sm">Dashboard administrativo com gráficos dinâmicos e sistema de gestão de usuários integrado.</p>
                <div className=" w-full flex justify-center items-center gap-1 mt-6">
                    <Demo href={"https://github.com"} />
                    <Github href={"https://github.com"} />
                </div>
            </div>
        </div>
    )
}
