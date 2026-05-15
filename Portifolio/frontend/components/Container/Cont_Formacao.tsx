import { useState, useRef, useEffect } from "react"
import { Formacao } from "@/context/FormacaoContext"
import NextImage from "next/image"
import { Copy, Check } from "lucide-react"

export default function Cont_Formacao({ formacaoDados }: { formacaoDados: Formacao }) {

    const [copiado, setCopiado] = useState(false);
    const [expandido, setExpandido] = useState(false);
    const [mostrarBotao, setMostrarBotao] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    const copiarCredencial = async () => {
        try {
            await navigator.clipboard.writeText(formacaoDados.credencial);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 2000);
        } catch (err) { console.error(err); }
    };


    // Verifica se o texto ultrapassa 2 linhas para mostrar o botão "Ver mais"
    useEffect(() => {
        // Usamos requestAnimationFrame para garantir que o navegador já desenhou o layout
        const checkHeight = () => {
            if (textRef.current) {
                const height = textRef.current.scrollHeight;
                const lineHeight = 20;
                // Se a altura real for maior que 2 linhas, mostramos o botão
                if (height > lineHeight * 2) {
                    setMostrarBotao(true);
                } else {
                    setMostrarBotao(false);
                }
            }
        };

        requestAnimationFrame(checkHeight);
    }, [formacaoDados.descricao]);

    return (
        <div className="flex flex-col max-w-75 rounded-2xl bg-[#222222]  border-[#00f1fe00] hover:border-[#00f2fe] border hover:shadow-[0_0_20px_rgba(0,119,181,0.5)] hover:scale-105 transition-all duration-300">
            
            <a href={formacaoDados.certificado_url} target="_blank" className="relative w-full aspect-video">
                <NextImage className="rounded-t-2xl" src={formacaoDados.capa_url} alt="Capa" fill unoptimized priority />
            </a>

            <div className="flex flex-col justify-between h-full items-start gap-2 p-4">

                <h3 className="text-xl">{formacaoDados?.titulo}</h3>
                <div className="w-full">
                    <p ref={textRef} className={`text-[#aaaaaa] text-sm overflow-hidden transition-all duration-500 ease-in-out ${!expandido ? 'line-clamp-2' : 'line-clamp-none'}`}>
                        {formacaoDados?.descricao}
                    </p>

                    {/* Só mostra o botão se o texto for grande o suficiente */}
                    {mostrarBotao && (
                        <button
                            onClick={() => setExpandido(!expandido)}
                            className="text-xs text-blue-400 mt-1 hover:underline font-medium"
                        >
                            {expandido ? "Ver menos" : "Ver mais..."}
                        </button>
                    )}
                </div>
                <div
                    onClick={copiarCredencial}
                    className="group relative w-full cursor-pointer hover:bg-[#333333] p-1 rounded transition-colors mt-2"
                >
                    <p className="text-[#aaaaaa] text-[10px] break-all">
                        Crendencial: <span className="text-white">{formacaoDados.credencial}</span>
                    </p>
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {copiado ? <Check size={12} className="text-green-400" /> : <Copy size={12} className="text-blue-400" />}
                    </div>
                </div>

                <a href={formacaoDados.curso_url} target="_blank" className="decoration-0 text-blue-400 w-full text-center mt-2 border border-blue-400/20 rounded py-1 hover:bg-blue-400/10 transition-colors">
                    Validar!
                </a>

            </div>
        </div>
    )
}
