import NextImage from "next/image"
import GithubADM from "../button/GithubADM"
import DemoADM from "../button/DemoADM"
import Editar from "../button/Editar"
import Deletar from "../button/Deletar"
import { Projeto } from "@/context/ProjetoContext"

export default function Cont_ProjetoADM({ projetoDados }: { projetoDados: Projeto }) {
    return (
        <div className="max-w-70 rounded-2xl bg-[#222222] border-[#00f1fe00] border relative">
            <div className="flex justify-end gap-2 p-4 w-full absolute  z-50">
                <Editar id={projetoDados.id} tipo="projeto"/>
                <Deletar id={projetoDados.id}  tipo="projeto"/>
            </div>
            <div className="relative w-full aspect-video ">
                <NextImage className="rounded-t-2xl" src={projetoDados.layout_url} alt="Next.js Dashboard" fill unoptimized priority />
            </div>
            <div className="flex flex-col items-start gap-2 p-4">
                <span className="text-[#00f2ff] bg-[#00424572] px-4 rounded-4xl">{projetoDados.tecnologia.split(',').map(t => t.trim()).join(' + ')}</span>
                <h3 className="text-lg">{projetoDados?.titulo}</h3>
                <p className="text-[#aaaaaa] text-sm">{projetoDados?.descricao}</p>
                <div className=" w-full flex justify-center items-center gap-1 mt-6">
                    <DemoADM href={projetoDados?.demonstracao_url} />
                    <GithubADM href={projetoDados?.github_url} />
                </div>
            </div>
        </div>
    )
}
