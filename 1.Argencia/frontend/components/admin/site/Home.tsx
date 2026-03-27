"use client"
import { useState } from 'react'
import { useDados } from '@/contexts/Usuario'
import { SalvarNoServidor } from '@/app/lib/SalvarNoServidor'

export default function Home() {

    const { dados, setDados } = useDados() //Usa no contexto
    const [preview, setPreview] = useState<string | null>(null);
    const [fLayout, setFLayout] = useState<string | null>(null)

    const pegarCaminhoFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const arquivo = e.target.files?.[0]; // Pega o primeiro arquivo

        if (arquivo) {
            // Cria uma URL temporária para o preview
            const urlTemporaria = URL.createObjectURL(arquivo);
            setPreview(urlTemporaria);
        }
    };

    const salvar = async (formData: FormData) => {
        const nomeInput = formData.get("nome") as string;
        const fotoInput = formData.get("foto-usuario") as File
        const fotonome = fotoInput.name

        // Criamos o novo objeto começando com o que JÁ TEMOS no contexto
        let novosDados = { ...dados };

        // Se o usuário digitou um nome novo, atualiza o nome
        if (nomeInput && nomeInput.trim() !== "") {
            novosDados.nome = nomeInput;

        }

        // Se o usuário subiu uma foto nova, atualiza a foto
        if (fotoInput && fotoInput.size > 0) {
            novosDados.foto = fotonome;
        }

        // Só chama o setDados se algo realmente mudou
        if (nomeInput || fotoInput) {
            setDados(novosDados);
            const resultado = await SalvarNoServidor(formData);

            if (resultado?.success) {
                alert("Alterado com Sucesso!"); // O alert fica aqui, no lado do cliente!
                setDados(novosDados);
            } else {
                alert("Erro ao salvar no servidor.");
                novosDados.nome=dados.nome
            }
            // Opcional: limpar o preview após salvar a foto
            setPreview(null);
        } else {
            alert("Digite um nome ou escolha uma foto para salvar!");
        }

    };


    return (
        <section className='w-full h-full flex flex-col sm:flex-row'>
            <div className='w-full sm:w-1/2 flex flex-col justify-center'>
                <h2 className='font-bold text-2xl text-center'>Usuario Cadastrado</h2>
                <form action={salvar} className='flex flex-col items-center justify-center gap-4'>
                    <div className='flex flex-col justify-center items-center'>
                        {preview ?
                            <img src={preview} alt="Foto do Perfil" className='w-20 h-20 rounded-full mb-4' /> :
                            <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 640 640"><path fill="#31475e" d="M463 448.2C440.9 409.8 399.4 384 352 384L288 384C240.6 384 199.1 409.8 177 448.2C212.2 487.4 263.2 512 320 512C376.8 512 427.8 487.3 463 448.2zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM320 336C359.8 336 392 303.8 392 264C392 224.2 359.8 192 320 192C280.2 192 248 224.2 248 264C248 303.8 280.2 336 320 336z" /></svg>
                        }
                        <input type="file" name="foto-usuario" id="foto-usuario" className='hidden' onChange={pegarCaminhoFoto} accept="image/*" />
                        <label htmlFor="foto-usuario" className='bg-blue-700 hover:bg-blue-900 cursor-pointer text-white py-3 px-8 rounded-md'>Enviar Foto</label>
                    </div>
                    <input type="text" className='border p-2 rounded-md w-full max-w-md' name="nome" id="nome" placeholder='Seu Nome...' />
                    <button className='bg-blue-700 hover:bg-blue-900 cursor-pointer text-white py-3 px-8 rounded-md'>Salvar</button>
                </form>
            </div>
            <div className='sm:w-1/2 flex flex-col justify-center items-center '>
                <div className='w-full max-w-100 pt-[10%] pb-[12%] px-[10%] lg:px-[5.5%] flex items-center justify-center bg-[url(/images/mockup.svg)] bg-contain bg-no-repeat bg-center'>
                    <div className=' w-full h-full rounded-xl overflow-hidden bg-blue-950'>
                        <img src="/images/projeto2.png" alt="foto-layout" className="w-full h-full " />
                    </div>
                </div>
                <div className='flex flex-col gap-6 p-6'>
                    <h2>Quer Alterar a foto do layout? É so enviar aqui.</h2>

                    <form className='flex flex-col sm:flex-row justify-center max-sm:items-center gap-6 text-center'>
                        <input type="file" name="foto-pc" id="foto-usuario" className='hidden' />
                        <label htmlFor="foto-pc" className='bg-blue-700 hover:bg-blue-900 cursor-pointer text-white py-3.5 px-8 rounded-md'>Enviar Foto</label>
                        <button className='bg-blue-700 hover:bg-blue-900 cursor-pointer text-white py-3 px-8 rounded-md'>Salvar</button>
                    </form>
                </div>
            </div>
        </section>
    )
}
