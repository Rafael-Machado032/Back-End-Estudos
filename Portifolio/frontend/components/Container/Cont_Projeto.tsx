import { useState, useRef, useEffect } from "react"
import { Projeto } from "@/context/ProjetoContext"
import GithubProjeto from "../button/GithubADM"
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
                    <GithubProjeto href={"https://github.com"} />
                </div>


            </div>
        </div>
    )
}
