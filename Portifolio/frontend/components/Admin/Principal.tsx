'use client'

import BaixarCVADM from "../button/BaixarCVADM"
import Cont_FormacaoADM from "../Container/Cont_FormacaoADM"
import Cont_ProjetoADM from "../Container/Cont_ProjetoADM"
import { useCurriculo } from "@/context/CurriculoContext"
import { useFormacao } from "@/context/FormacaoContext"
import { useProjeto } from "@/context/ProjetoContext"
import { useItem } from "@/context/IdEditar"


export default function Principal() {
    const { curriculoDados } = useCurriculo();
    const { formacaoDados } = useFormacao();
    const { projetoDados } = useProjeto();
    const { itemDados } = useItem();
    
    console.log("Resposta do Cotext Curriculo", curriculoDados);


    return (
        <div className='w-full md:w-2/3 px-8 ml-6 flex flex-col gap-4 mt-42'>
            {itemDados?.tipo == "projeto" ? (
                <div>
                    <h2 className='text-[#6366f1] text-lg font-bold border-b border-[#334155] pb-1 mb-4'>Projetos</h2>
                    <div className="flex gap-4 flex-wrap w-full">
                        {projetoDados.map(item => (
                            <Cont_ProjetoADM key={item.id} projetoDados={item} />
                        ))}
                    </div>
                </div>
            ) : itemDados?.tipo == "formacao" ? (
                <div>
                    <h2 className=' text-[#6366f1] text-lg font-bold border-b border-[#334155] pb-1 mb-4'>Diploma / Certificado</h2>
                    <div className="flex gap-4 flex-wrap w-full">
                        {formacaoDados.map(item => (
                            <Cont_FormacaoADM key={item.id} formacaoDados={item} />
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className='text-[#6366f1] text-lg font-bold border-b border-[#334155] pb-1 mb-4'>Currículo Disponível</h2>
                    {
                        curriculoDados?.curriculo_url_servidor != null ? (
                            <div className='flex justify-between items-center p-4 rounded-xl border border-[#22c55e] bg-[#22c55e1a]'>
                                <span>{curriculoDados?.curriculo_url_servidor.split('/').pop()}</span>
                                <BaixarCVADM />
                            </div>
                        ) : null
                    }
                </div >

            )}
            {itemDados?.carregando && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-white"></div>
                <span className="ml-3 text-white">Processando...</span>
            </div>}
        </div>
    )
}
