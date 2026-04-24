import WhatsApp2 from "../button/WhatsApp2"
import Linkedin from "../button/LinkedIn"
import Github from "../button/Github"

export default function Contato() {
    return (
        <footer className='flex justify-center px-6 py-30 text-[#e1e1e6] bg-[#111111c5] bg-radial bg-[radial-gradient(circle_at_center,rgba(113,89,193,0.1)_0%,transparent_70%)]'>
            <div className='flex flex-col gap-4'>
                <h2 className='text-4xl font-bold text-center'>Vamos Conversar?</h2>
                <p>Estou em busca de oportunidade na área de desenvolvimento para somar com minha experiência técnica.</p>
                <br />
                <div className="flex flex-col gap-4 justify-center items-center">
                    <div className="flex gap-4">
                        <WhatsApp2 />
                        <Linkedin href="https://www.linkedin.com/in/rafael-machado-b0a99078/" />
                        <Github href="https://github.com/Rafael-Machado032" />
                    </div>
                    <p>Telefone: (51) 98043-2207</p>
                    <p>rafael_machado.dev // 2026</p>
                </div>
            </div>

        </footer>
    )
}
