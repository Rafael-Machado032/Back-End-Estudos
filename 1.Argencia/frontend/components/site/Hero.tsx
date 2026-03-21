// components/Hero.tsx


export default function Hero() {
    return (
        <section className="bg-[url(/images/bg.svg)] bg-cover bg-no-repeat bg-center max-h-235  text-white">

            <div className='mx-auto w-full max-w-6xl pt-36 flex justify-center '>
                <div className='flex flex-col aspect-4/3 gap-6 p-4 text-center'>
                    <h1 className=" text-5xl">Promova experiências aos seus clientes</h1>
                    <p>E veja resultados expressivos dia após dia</p>
                    <div className='bg-[url(/images/mockup.svg)] bg-contain bg-no-repeat w-full h-full pt-[4%] pl-[9.5%] p-[9%] pb-[18.5%] sm:pb-[19.5%]'>
                        <div className='w-full h-full rounded-xl bg-[url(/images/projeto2.png)] bg-cover bg-blue-950'></div>
                    </div>
                </div>
            </div>

        </section>

    )
}
