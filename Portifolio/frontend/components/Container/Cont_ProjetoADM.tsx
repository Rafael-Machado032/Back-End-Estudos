// import NextImage from "next/image"
import Github from "../button/Github"
import Demo from "../button/Demo"
import Editar from "../button/Editar"
import Deletar from "../button/Deletar"
import { Projeto } from "@/context/ProjetoContext"

export default function Cont_ProjetoADM({ projetoDados }: { projetoDados: Projeto }) {
    return (
        <div className="max-w-70 rounded-2xl bg-[#222222] border-[#00f1fe00] border">
            <div className="flex justify-end gap-2 p-4 w-full ">
                <Editar dados={projetoDados}/>
                <Deletar id={projetoDados.id} />
            </div>
            <div>
                {/* <NextImage src={""} alt="Next.js Dashboard" width={100} height={150} /> */}
            </div>
            <div className="flex flex-col items-start gap-2 p-4">
                <span className="text-[#00f2ff] bg-[#00424572] px-4 rounded-4xl">Next.js + Tailwind</span>
                <h3 className="text-lg">{projetoDados?.titulo}</h3>
                <p className="text-[#aaaaaa] text-sm">{projetoDados?.descricao}</p>
                <div className=" w-full flex justify-center items-center gap-1 mt-6">
                    <Demo href={projetoDados?.projeto_url_demo} />
                    <Github href={projetoDados?.projeto_url_github} />
                </div>
            </div>
        </div>
    )
}
