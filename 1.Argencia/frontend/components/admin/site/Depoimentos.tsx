"use client"
import { SalvarDepoimentoNoServidor } from "@/app/lib/SalvarDepoimentoNoServidor"
import { useDepoimento } from "@/contexts/DepoimentoContext"
import { useRef, useState } from "react"
import NextImage from "next/image"



export default function Depoimentos() {
    const formRef = useRef<HTMLFormElement>(null); // Cria a referência para o formulário
    const { depoimentoDados, setDepoimentoDados } = useDepoimento();
    const [previewDepoimento, setPreviewDepoimento] = useState("");

    const pegarCaminhoFotoDepoimento = (e: React.ChangeEvent<HTMLInputElement>) => {
        const arquivo = e.target.files?.[0]; // Pega o primeiro arquivo
        if (arquivo) {
            // Cria uma URL temporária para o preview
            const urlTemporaria = URL.createObjectURL(arquivo);
            setPreviewDepoimento(urlTemporaria);
        }
    };

    const salvarDepoimento = async (FormData: FormData) => {
        const fotoinput = FormData.get("foto-usuario") as File
        const nomeInput = FormData.get("nome") as string;
        const mensagemInput = FormData.get("depoimento") as string;

        // No console do navegador (F12)
        console.table(Object.fromEntries(FormData));

        if (nomeInput && mensagemInput && fotoinput && fotoinput.size > 0) {
            const resultado = await SalvarDepoimentoNoServidor(FormData);
            if (resultado?.success) {
                alert("Depoimento cadastrado com Sucesso!");
                setDepoimentoDados([...depoimentoDados, {
                    id: resultado.depoimento.id, // Supondo que o Laravel retorne o ID do depoimento criado
                    foto_url: resultado.depoimento.foto_url,
                    nome: resultado.depoimento.nome,
                    mensagem: resultado.depoimento.mensagem
                }]);
                setPreviewDepoimento("");
                // O jeito "React" de resetar o formulário:
                formRef.current?.reset();
            } else {
                alert("Erro ao salvar o depoimento no servidor.");
            }
        } else {
            alert("Por favor, preencha todos os campos e envie uma foto.");
        }
    };

    return (
        <section className='flex flex-col sm:flex-row'>
            <div className='sm:w-1/2 pr-6'>
                <h2 className='text-xl font-bold text-center'>Cadastro de Depoimento</h2>
                <form action={salvarDepoimento} ref={formRef} className='flex flex-col justify-center items-center gap-4 '>
                    <div className='flex flex-col justify-center items-center '>
                        {previewDepoimento ?
                            <div className="relative w-20 h-20 mb-4 overflow-hidden rounded-full border">
                                <NextImage src={previewDepoimento} alt="Foto do Perfil" className='object-cover' unoptimized fill />
                            </div> :
                            <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 640 640"><path fill="#31475e" d="M463 448.2C440.9 409.8 399.4 384 352 384L288 384C240.6 384 199.1 409.8 177 448.2C212.2 487.4 263.2 512 320 512C376.8 512 427.8 487.3 463 448.2zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM320 336C359.8 336 392 303.8 392 264C392 224.2 359.8 192 320 192C280.2 192 248 224.2 248 264C248 303.8 280.2 336 320 336z" /></svg>
                        }
                        <input type="file" name="foto-usuario" id="foto-usuario" className='hidden' onChange={pegarCaminhoFotoDepoimento} />
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
                <div className='h-full max-h-107 p-2 border overflow-y-auto bg-gray-200 flex flex-col gap-2'>
                    {depoimentoDados.length > 0 ? (
                        depoimentoDados.map((item) => (
                            <div key={item.id} className='p-4 flex justify-between items-center border rounded-lg bg-white shadow-sm'>
                                <div className="relative w-16 h-16 mr-4 shrink-0 overflow-hidden rounded-full border">
                                    <NextImage
                                        src={item.foto_url || "/images/avatar-default.png"}
                                        alt={item.nome}
                                        className='object-cover'
                                        unoptimized
                                        fill
                                    />
                                </div>
                                <div className="flex-1 pr-4">
                                    <h2 className="font-bold text-sm">{item.nome}</h2>
                                    <p className="text-xs text-gray-600 line-clamp-2 italic">&quot;{item.mensagem}&quot;</p>
                                </div>
                                <div className='flex gap-2 justify-center items-center'>
                                    {/* Botão Editar (Apenas visual por enquanto) */}
                                    <button className="hover:scale-110 transition-transform">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 640 640"><path fill="#31475e" d="M437.1 89L239.8 286.2C231.1 294.9 224.8 305.6 221.5 317.3L192.9 417.3C190.5 425.7 192.8 434.7 199 440.9C205.2 447.1 214.2 449.4 222.6 447L322.6 418.4C334.4 415 345.1 408.7 353.7 400.1L551 202.9C579.1 174.8 579.1 129.2 551 101.1L538.9 89C510.8 60.9 465.2 60.9 437.1 89z" /></svg>
                                    </button>
                                    {/* Botão Deletar (Apenas visual por enquanto) */}
                                    <button className="hover:scale-110 transition-transform text-red-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 640 640"><path fill="currentColor" d="M128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280z" /></svg>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 mt-10">Nenhum depoimento encontrado.</p>
                    )}
                </div>

            </div>
        </section>
    )
}
