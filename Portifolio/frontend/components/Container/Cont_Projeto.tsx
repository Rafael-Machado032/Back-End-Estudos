// import NextImage from "next/image"
import Github from "../button/Github"
import Demo from "../button/Demo"

export default function Cont_Projeto() {
    return (
        <div className="max-w-sm rounded-2xl bg-[#222222] border-[#00f1fe00] hover:border-[#00f2fe] border hover:shadow-[0_0_20px_rgba(0,119,181,0.5)] hover:scale-105 transition-all duration-300">
            <div>
                {/* <NextImage src={""} alt="Next.js Dashboard" width={500} height={300} /> */}
            </div>
            <div className="flex flex-col items-start gap-2 p-6">
                <span className="text-[#00f2ff] bg-[#00424572] px-4 rounded-4xl">Next.js + Tailwind</span>
                <h3 className="text-xl">SaaS Platform UI</h3>
                <p className="text-[#aaaaaa]">Dashboard administrativo com gráficos dinâmicos e sistema de gestão de usuários integrado.</p>
                <div className=" w-full flex justify-center items-center gap-4 mt-6">
                    <Demo href={"https://github.com"} />
                    <Github href={"https://github.com"} />
                </div>


            </div>
        </div>
    )
}
