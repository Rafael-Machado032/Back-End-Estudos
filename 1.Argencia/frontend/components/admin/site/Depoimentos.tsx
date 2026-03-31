"use client"
import { SalvarDepoimentoNoServidor } from "@/app/lib/SalvarDepoimentoNoServidor"
import { useDepoimento } from "@/contexts/DepoimentoContext"
import { useState } from "react"


export default function Depoimentos() {
    const { setDepoimentoDados } = useDepoimento();
    const [nome, setNome] = useState("");
    const [mensagem, setMensagem] = useState("");

    const salvarDepoimento = async (FormData: FormData) => {
        const nomeInput = FormData.get("nome") as string;
        const mensagemInput = FormData.get("depoimento") as string;

        // No console do navegador (F12)
        console.table(Object.fromEntries(FormData));

        if (nomeInput || mensagemInput) {
            const resultado = await SalvarDepoimentoNoServidor(FormData);
            if (resultado?.success) {
                alert("Depoimento cadastrado com Sucesso!");
                setDepoimentoDados({
                    nome: resultado.depoimento.nome,
                    mensagem: resultado.depoimento.mensagem
                });
            } else {
                alert("Erro ao salvar o depoimento no servidor.");
            }
        }
    };

    return (
        <section className='flex flex-col sm:flex-row'>
            <div className='sm:w-1/2 pr-6'>
                <h2 className='text-xl font-bold text-center'>Cadastro de Depoimento</h2>
                <form action="" className='flex flex-col justify-center items-center gap-4 '>
                    <div className='flex flex-col justify-center items-center '>
                        <div><svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 640 640"><path fill="#31475e" d="M463 448.2C440.9 409.8 399.4 384 352 384L288 384C240.6 384 199.1 409.8 177 448.2C212.2 487.4 263.2 512 320 512C376.8 512 427.8 487.3 463 448.2zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM320 336C359.8 336 392 303.8 392 264C392 224.2 359.8 192 320 192C280.2 192 248 224.2 248 264C248 303.8 280.2 336 320 336z" /></svg></div>
                        <input type="file" name="foto-usuario" id="foto-usuario" className='hidden' />
                        <label htmlFor="foto-usuario" className='bg-blue-700 hover:bg-blue-900 cursor-pointer text-white py-3 px-8 rounded-md'>Enviar Foto</label>
                    </div>
                    <div className='w-full flex flex-col gap-4'>
                        <div className='flex flex-col'>
                            <label htmlFor="">Nome:</label>
                            <input type="text" className='p-2 border border-[#ccc] rounded-sm' name="nome" id="nome" placeholder='Nome do depoente' required />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="">Depoimento:</label>
                            <textarea className='h-30 p-2 resize-none border border-[#ccc] rounded-sm' name="depoimento" id="depoimento" placeholder='Depoimento' ></textarea>
                        </div>
                    </div>
                    <button className='bg-blue-700 hover:bg-blue-900 cursor-pointer text-white py-3 px-8 rounded-md'>Enviar</button>
                </form>
            </div>
            <div className='sm:w-1/2 pr-6'>
                <h2 className='text-center text-xl font-bold mb-6'>Depoimentos cadastrados</h2>
                <div className='h-full max-h-107 p-2 border overflow-hidden bg-gray-200'>
                    <div className='p-4 flex justify-between border rounded-lg bg-white'>
                        <div>
                            <h2>&quot;Miriam Souza&quot;</h2>
                            <p>&quot;O trabalho da Agência Bold foi fundamental para o nosso pos...&quot;</p>
                        </div>
                        <div className='flex justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 640 640"><path fill="#31475e" d="M505 122.9L517.1 135C526.5 144.4 526.5 159.6 517.1 168.9L488 198.1L441.9 152L471 122.9C480.4 113.5 495.6 113.5 504.9 122.9zM273.8 320.2L408 185.9L454.1 232L319.8 366.2C316.9 369.1 313.3 371.2 309.4 372.3L250.9 389L267.6 330.5C268.7 326.6 270.8 323 273.7 320.1zM437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89zM152 128C103.4 128 64 167.4 64 216L64 488C64 536.6 103.4 576 152 576L424 576C472.6 576 512 536.6 512 488L512 376C512 362.7 501.3 352 488 352C474.7 352 464 362.7 464 376L464 488C464 510.1 446.1 528 424 528L152 528C129.9 528 112 510.1 112 488L112 216C112 193.9 129.9 176 152 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L152 128z" /></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 640 640"><path fill="#31475e" d="M262.2 48C248.9 48 236.9 56.3 232.2 68.8L216 112L120 112C106.7 112 96 122.7 96 136C96 149.3 106.7 160 120 160L520 160C533.3 160 544 149.3 544 136C544 122.7 533.3 112 520 112L424 112L407.8 68.8C403.1 56.3 391.2 48 377.8 48L262.2 48zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L464 208L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280zM400 280C400 266.7 389.3 256 376 256C362.7 256 352 266.7 352 280L352 456C352 469.3 362.7 480 376 480C389.3 480 400 469.3 400 456L400 280z" /></svg>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
