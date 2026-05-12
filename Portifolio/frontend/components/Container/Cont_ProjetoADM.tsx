'use client'
import { useState, useRef, useEffect } from "react"
import NextImage from "next/image"
import GithubADM from "../button/GithubADM"
import DemoADM from "../button/DemoADM"
import Editar from "../button/Editar"
import Deletar from "../button/Deletar"
import { Projeto } from "@/context/ProjetoContext"

export default function Cont_ProjetoADM({ projetoDados }: { projetoDados: Projeto }) {

    const [expandido, setExpandido] = useState(false);
    const [mostrarBotao, setMostrarBotao] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        // Usamos requestAnimationFrame para garantir que o navegador já desenhou o layout
        const checkHeight = () => {
            if (textRef.current) {
                const height = textRef.current.scrollHeight; //Altura do conteudo total
                const lineHeight = 20; //Altura da linha
                // Se a altura real for maior que 2 linhas, mostramos o botão
                if (height > lineHeight * 3) {//testa se 3 linhas e manor que o total do conteudo
                    setMostrarBotao(true);
                } else {
                    setMostrarBotao(false);
                }
            }
        };

        requestAnimationFrame(checkHeight);
    }, [projetoDados.descricao]);

    return (
        <div className="w-60 flex flex-col rounded-2xl bg-[#222222] border-[#00f1fe00] border relative min-h-86.5">
            <div className="flex justify-end gap-2 p-4 w-full absolute  z-10">
                <Editar id={projetoDados.id} tipo="projeto" />
                <Deletar id={projetoDados.id} tipo="projeto" />
            </div>
            <div className="relative w-full aspect-video">
                <NextImage className="rounded-t-2xl" src={projetoDados.layout_url} alt="Next.js Dashboard" fill unoptimized priority />
            </div>
            <div className="flex flex-col justify-between h-full items-start gap-2 p-4">
                <div>
                    <span className="text-[#00f2ff] bg-[#00424572] px-4 rounded-4xl">{projetoDados.tecnologia.split(',').map(t => t.trim()).join(' + ')}</span>
                    <h3 className="text-lg font-semibold">{projetoDados?.titulo}</h3>
                    <p ref={textRef} className={`text-[#aaaaaa] text-sm overflow-hidden transition-all duration-500 ease-in-out ${!expandido ? 'line-clamp-3' : 'line-clamp-none'}`}>
                        {projetoDados?.descricao}
                    </p>
                    {mostrarBotao && (
                        <button
                            onClick={() => setExpandido(!expandido)}
                            className="text-xs text-blue-400 mt-1 hover:underline font-medium"
                        >
                            {expandido ? "Ver menos" : "Ver mais..."}
                        </button>
                    )}
                </div>
                <div className=" w-full flex justify-center items-center gap-1 mt-6">
                    <DemoADM href={projetoDados?.demonstracao_url} />
                    {projetoDados.github_url &&
                        <GithubADM href={projetoDados?.github_url} />
                    }
                </div>
            </div>
        </div>
    )
}
