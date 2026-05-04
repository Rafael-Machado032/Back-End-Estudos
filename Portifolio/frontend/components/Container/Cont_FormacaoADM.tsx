'use client'
import Editar from "../button/Editar"
import Deletar from "../button/Deletar"
import { Formacao } from "@/context/FormacaoContext" // Importa o tipo Formacao para tipar as props
import NextImage from "next/image"

export default function Cont_FormacaoADM({ formacaoDados }: { formacaoDados: Formacao }) {

    return (
        <div className="w-60 flex flex-col rounded-2xl bg-[#222222] border-[#00f1fe00] border relative">
            <div className="flex justify-end gap-2 p-4 w-full absolute  z-10 ">
                <Editar id={formacaoDados.id} tipo="formacao" />
                <Deletar id={formacaoDados.id} tipo="formacao" />
            </div>
            <div className="relative w-full aspect-video">
                <NextImage className="rounded-t-2xl" src={formacaoDados.capa_url} alt="Next.js Dashboard" fill unoptimized priority />
            </div>
            <div className="flex flex-col justify-between h-full items-start gap-2 p-4">
                <h3 className="text-lg">{formacaoDados?.titulo}</h3>
                <p className="text-[#aaaaaa] text-sm">{formacaoDados?.descricao}</p>
            </div>
        </div>
    )
}
