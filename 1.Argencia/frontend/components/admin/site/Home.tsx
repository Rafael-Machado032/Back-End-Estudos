"use client"
import { useState } from 'react'

export default function Home() {

    return (
        <section className='w-full h-full flex flex-col sm:flex-row'>
            <div className='w-full sm:w-1/2 flex flex-col justify-center'>
                <h2 className='font-bold text-2xl text-center'>Usuario Cadastrado</h2>
                <form action="" className='flex flex-col items-center justify-center gap-4'>
                    <div className='flex flex-col justify-center items-center'>
                        <div><svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 640 640"><path fill="#31475e" d="M463 448.2C440.9 409.8 399.4 384 352 384L288 384C240.6 384 199.1 409.8 177 448.2C212.2 487.4 263.2 512 320 512C376.8 512 427.8 487.3 463 448.2zM64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM320 336C359.8 336 392 303.8 392 264C392 224.2 359.8 192 320 192C280.2 192 248 224.2 248 264C248 303.8 280.2 336 320 336z" /></svg></div>
                        <input type="file" name="foto-usuario" id="foto-usuario" className='hidden' />
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
                    <input type="file" name="foto-pc" id="foto-usuario" className='hidden' />
                    <div className='flex flex-col sm:flex-row justify-center max-sm:items-center gap-6 text-center'>
                        <label htmlFor="foto-pc" className='bg-blue-700 hover:bg-blue-900 cursor-pointer text-white py-3.5 px-8 rounded-md'>Enviar Foto</label>
                        <button className='bg-blue-700 hover:bg-blue-900 cursor-pointer text-white py-3 px-8 rounded-md'>Salvar</button>
                    </div>

                </div>
            </div>

        </section>
    )
}
