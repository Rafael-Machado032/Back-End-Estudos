import BaixarCV from "../button/BaixarCV"
import Contato from "../button/Contato"

export default function Hero() {
    return (
        <header className='flex flex-col justify-center items-center gap-3 h-screen text-center px-4 bg-radial bg-[radial-gradient(circle_at_center,rgba(113,89,193,0.1)_0%,transparent_70%)]'>
            <div className="font-fira text-[#00f2fe] mb-3.75 text-[1.1rem]" data-aos="fade-down">console.log(&quot;Olá, Mundo!&quot;);</div>
            <h1 className='font-montserrat text-7xl font-black mb-2.5 '>Rafael <span className='bg-linear-to-r from-[#00f2fe] to-[#7159c1] bg-clip-text text-transparent'>Machado</span></h1>
            <p className="text-[19px] text-[#a8a8b3] max-w-175 mb-7.5" data-aos="fade-up" data-aos-delay="200">
                Desenvolvedor Fullstack focado em soluções robustas com <b>Next.js</b> e <b>Laravel</b>.
                Transformando problemas complexos em interfaces limpas e eficientes.
            </p>
            <div className="flex gap-4">
                <BaixarCV />
                <Contato />
            </div>
        </header>
    )
}
