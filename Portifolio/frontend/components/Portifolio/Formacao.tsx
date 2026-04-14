import Cont_Formacao from "../Container/Cont_Formacao"

export default function Formacao() {
    return (
        <section className='flex justify-center px-6 py-10 text-[#e1e1e6] bg-[#111111c5] bg-radial bg-[radial-gradient(circle_at_center,rgba(113,89,193,0.1)_0%,transparent_70%)]'>
            <div className='max-w-7xl w-full'>
                <h2 className='text-4xl font-bold after:content-[""] after:block after:w-12 after:h-1 after:bg-[#00f2fe] after:mt-2'>Formação</h2>
                <div className="flex gap-4 mt-10 justify-between">
                    <Cont_Formacao />
                    <Cont_Formacao />
                    <Cont_Formacao />
                </div>
            </div>
        </section>
    )
}
