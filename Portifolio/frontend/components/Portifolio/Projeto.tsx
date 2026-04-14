import Cont_Projeto from "../Container/Cont_Projeto"

export default function Projeto() {
    return (
        <section className='flex justify-center px-6 py-10 text-[#e1e1e6] '>
            <div className='max-w-7xl w-full'>
                <h2 className='text-4xl font-bold after:content-[""] after:block after:w-12 after:h-1 after:bg-[#00f2fe] after:mt-2'>Projetos em Destaque</h2>
                <div className="flex gap-4 mt-10 justify-between">
                    <Cont_Projeto />
                    <Cont_Projeto />
                    <Cont_Projeto />
                </div>
            </div>
        </section>
    )
}
