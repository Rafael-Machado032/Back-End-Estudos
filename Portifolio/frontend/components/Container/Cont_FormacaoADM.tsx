'use client'
import Editar from "../button/Editar"
import Deletar from "../button/Deletar"
import { Formacao } from "@/context/FormacaoContext" // Importa o tipo Formacao para tipar as props


// import NextImage from "next/image"

export default function Cont_FormacaoADM({ formacaoDados }: { formacaoDados: Formacao }) {

    return (
        <div className="max-w-70 rounded-2xl bg-[#222222] border-[#00f1fe00] border">
            <div className="flex justify-end gap-2 p-4 w-full ">
                <Editar dados={formacaoDados} />
                <Deletar id={formacaoDados.id} />
            </div>
            <div>
                {/* <NextImage src={""} alt="Next.js Dashboard" width={100} height={150} /> */}
            </div>
            <div className="p-4">
                <h3 className="text-lg">{formacaoDados?.titulo}</h3>
                <p className="text-[#aaaaaa] text-sm">{formacaoDados?.descricao}</p>
            </div>
        </div>
    )
}
