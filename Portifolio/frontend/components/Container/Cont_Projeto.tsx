import { useState, useRef, useEffect } from "react"
import NextImage from "next/image"
import { Projeto } from "@/context/ProjetoContext"
import GithubProjeto from "../button/GithubProjeto"
import Demo from "../button/Demo"

export default function Cont_Projeto({ projetoDados }: { projetoDados: Projeto }) {

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
        <div className="flex flex-col max-w-sm rounded-2xl bg-[#222222] border-[#00f1fe00] hover:border-[#00f2fe] border hover:shadow-[0_0_20px_rgba(0,119,181,0.5)] hover:scale-105 transition-all duration-300">
            <div className="relative w-full aspect-video">
                <NextImage className="rounded-t-2xl" src={projetoDados.layout_url} alt="Capa" fill unoptimized priority />
            </div>
            <div className="flex flex-col justify-between w-80 gap-2 p-4 h-full">
                <div>
                    <span className="text-[#00f2ff] bg-[#00424572] px-4 rounded-4xl">{projetoDados.tecnologia.split(',').map(t => t.trim()).join(' + ')}</span>
                    <h3 className="text-xl">{projetoDados?.titulo}</h3>
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
                <div className="w-full flex justify-center items-center gap-1 mt-6">
                    <Demo href={projetoDados?.demonstracao_url} />
                    {projetoDados.github_url &&
                        <GithubProjeto href={projetoDados?.github_url} />
                    }
                </div>
            </div>
        </div>
    )
}
