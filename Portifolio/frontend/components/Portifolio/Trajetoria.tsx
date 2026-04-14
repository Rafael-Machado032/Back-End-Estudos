import React from 'react'

export default function Trajetoria() {
    return (
        <section className='flex justify-center px-6 py-40 text-[#e1e1e6]'>
            <div className='flex justify-center items-center max-w-7xl'>
                <div className='w-1/2 flex flex-col gap-6 '>
                    <h2 className='text-4xl font-bold after:content-[""] after:block after:w-12 after:h-1 after:bg-[#00f2fe] after:mt-2'>Minha Trajetória</h2>
                    <p>Comecei na informática industrial, onde aprendi que software e hardware precisam falar a mesma língua. De criar sistemas de pesagem em C++ até configurar redes MikroTik do zero, minha base é resolver problemas reais.</p>
                    <p>Hoje, aplico essa bagagem técnica para construir aplicações web modernas. Sou formado em Análise e Desenvolvimento de Sistemas e apaixonado pela agilidade do <b>Next.js</b> integrada à robustez do <b>Laravel</b>.</p>
                </div>
                <div className=' w-1/2 flex flex-col gap-6 bg-[#16161a] p-6 rounded-2xl ml-10'>
                    <h3 className='font-bold text-xl'>Stack Técnica</h3>
                    <div className='flex flex-wrap gap-3'>
                        <span className='bg-[#ffffff0d] px-4 py-px rounded-md'>Next.js</span> <span className='bg-[#ffffff0d] px-4 py-px rounded-md'>React</span> <span className='bg-[#ffffff0d] px-4 py-px rounded-md'>TypeScript</span>
                        <span className='bg-[#ffffff0d] px-4 py-px rounded-md'>Laravel (PHP)</span> <span className='bg-[#ffffff0d] px-4 py-px rounded-md'>MySQL / PostgreSQL</span>
                        <span className='bg-[#ffffff0d] px-4 py-px rounded-md'>Redes & Infra</span> <span className='bg-[#ffffff0d] px-4 py-px rounded-md'>Tailwind CSS</span>
                    </div>
                    <p className='text-[#a8a8b3]'>
                        &quot;Não apenas escrevo código; busco entender o problema do cliente e entregar a solução mais legível e escalável possível.&quot;
                    </p>
                </div>
            </div>
        </section>
    )
}
