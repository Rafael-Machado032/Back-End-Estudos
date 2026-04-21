'use client'
import BaixarCVADM from "../button/BaixarCVADM"
import Cont_FormacaoADM from "../Container/Cont_FormacaoADM"
import Cont_ProjetoADM from "../Container/Cont_ProjetoADM"
import { useCurriculo } from "@/context/CurriculoContext"



export default function Principal() {
    const { curriculoDados } = useCurriculo();
    return (
        <div className='w-full md:w-2/3 px-8 ml-6 flex flex-col gap-4 mt-42'>
            
            <div >
                <h2 className='text-[#6366f1] text-lg font-bold border-b border-[#334155] pb-1 mb-4'>Currículo Disponível</h2>
                {curriculoDados?.curriculo_url_servidor != null ? (
                    <div className='flex justify-between items-center p-4 rounded-xl border border-[#22c55e] bg-[#22c55e1a]'>
                        <span>{curriculoDados?.curriculo_url_servidor}</span>
                        <BaixarCVADM />
                    </div>
                ): null}
            </div>
            <div>
                <h2 className='text-[#6366f1] text-lg font-bold border-b border-[#334155] pb-1 mb-4'>Diploma / Certificado</h2>
                <Cont_FormacaoADM />
            </div>
            <div>
                <h2 className='text-[#6366f1] text-lg font-bold border-b border-[#334155] pb-1 mb-4'>Projetos</h2>
                <Cont_ProjetoADM />
            </div>
        </div>
    )
}
