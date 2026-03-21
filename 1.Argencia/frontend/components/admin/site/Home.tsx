"use client"
import { useState } from 'react'

export default function Home() {

    return (
        <section className=''>
            <div className=''>
                <h2 className='font-bold text-2xl text-center'>Usuario Cadastrado</h2>
                <form action="" className='flex md:flex-row flex-col items-center justify-center gap-4'>
                    <div className='flex flex-col justify-center items-center'>
                        <div><svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 640 640"><path fill="#31475e" d="M463 448.2C440.9 409.8 399.4 384 352 384L288 384C240.6 384 199.1 409.8 177 448.2C212.2 487.4 263.2 512 320 512C376.8 512 427.8 487.3 463 448.2zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM320 336C359.8 336 392 303.8 392 264C392 224.2 359.8 192 320 192C280.2 192 248 224.2 248 264C248 303.8 280.2 336 320 336z" /></svg></div>
                        <input type="file" name="foto-usuario" id="foto-usuario" className='hidden' />
                        <label htmlFor="foto-usuario" className='bg-blue-700 hover:bg-blue-900 cursor-pointer text-white py-3 px-8 rounded-md'>Enviar Foto</label>
                    </div>
                    <input type="text" className='border p-2 rounded-md w-full max-w-md' name="nome" id="nome" placeholder='Seu Nome...' />
                    <button className='bg-blue-700 hover:bg-blue-900 cursor-pointer text-white py-3 px-8 rounded-md'>Salvar</button>
                </form>
            </div>
            <div className=' flex flex-col justify-center items-center mt-20'>
                <div className='w-full max-w-244 h-svh max-h-150 bg-blue-300 flex items-center justify-center bg-[url(/images/mockup.svg)] bg-contain bg-no-repeat pt-[3%] pl-[7.3%] pr-[7%] pb-[18.5%] sm:pb-[5%]'>
                    <div className='w-full h-full rounded-xl bg-[url(/images/projeto2.png)] bg-cover bg-blue-950'></div>
                </div>
                <div className='flex flex-col gap-6 p-6'>
                    <h2>Quer Alterar a foto do layout? É so enviar aqui</h2>
                    <input type="file" name="foto-pc" id="foto-usuario" className='hidden' />
                    <div className='flex justify-center gap-6'>
                        <label htmlFor="foto-pc" className='bg-blue-700 hover:bg-blue-900 cursor-pointer text-white py-3.5 px-8 rounded-md'>Enviar Foto</label>
                        <button className='bg-blue-700 hover:bg-blue-900 cursor-pointer text-white py-3 px-8 rounded-md'>Salvar</button>
                    </div>

                </div>
            </div>

        </section>
    )
}
