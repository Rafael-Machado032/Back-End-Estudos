'use client'
import { useState } from "react" // Importe o useState para o feedback
import Editar from "../button/Editar"
import Deletar from "../button/Deletar"
import { Formacao } from "@/context/FormacaoContext"
import NextImage from "next/image"
import { Copy, Check } from "lucide-react" // Sugestão de ícones

export default function Cont_FormacaoADM({ formacaoDados }: { formacaoDados: Formacao }) {
    const [copiado, setCopiado] = useState(false);

    const copiarCredencial = async () => {
        try {
            await navigator.clipboard.writeText(formacaoDados.credencial);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 2000); // Reseta após 2 segundos
        } catch (err) {
            console.error("Erro ao copiar", err);
        }
    };

    return (
        <div className="w-60 flex flex-col rounded-2xl bg-[#222222] border-[#00f1fe00] border relative">
            <div className="flex justify-end gap-2 p-4 w-full absolute z-10 ">
                <Editar id={formacaoDados.id} tipo="formacao" />
                <Deletar id={formacaoDados.id} tipo="formacao" />
            </div>

            <a href={formacaoDados.certificado_url} target="_blank" className="relative w-full aspect-video">
                <NextImage className="rounded-t-2xl" src={formacaoDados.capa_url} alt="Capa" fill unoptimized priority />
            </a>

            <div className="flex flex-col justify-between h-full items-start gap-2 p-4">
                <h3 className="text-lg">{formacaoDados?.titulo}</h3>
                <p className="text-[#aaaaaa] text-sm">{formacaoDados?.descricao}</p>

                {/* ÁREA DE CREDENCIAL COM CÓPIA */}
                <div
                    onClick={copiarCredencial}
                    className="group relative w-full cursor-pointer hover:bg-[#333333] p-1 rounded transition-colors"
                >
                    <p className="text-[#aaaaaa] text-xs">
                        Crendencial: <span className="text-white">{formacaoDados.credencial}</span>
                    </p>

                    {/* Botão/Ícone que aparece no hover */}
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {copiado ? (
                            <Check size={14} className="text-green-400" />
                        ) : (
                            <Copy size={14} className="text-blue-400" />
                        )}
                    </div>

                    {/* Tooltip flutuante */}
                    {copiado && (
                        <span className="absolute -bottom-6 left-0 bg-blue-500 text-[10px] text-white px-1 rounded shadow-md">
                            Copiado!
                        </span>
                    )}
                </div>

                <a href={formacaoDados.curso_url} target="_blank" className="decoration-0 text-blue-400 w-full text-center mt-2">
                    Validar!
                </a>
            </div>
        </div>
    )
}

