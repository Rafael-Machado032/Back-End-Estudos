"use client"

import { useState } from "react"

export default function Mensagem() {
    const [first, setfirst] = useState()
    return (
        <section className='flex flex-col sm:flex-row h-full'>
            <div className='sm:w-1/2 pr-6'>
                <h2 className='text-center text-xl font-bold mb-6'>Mensagem</h2>
                <div className='flex flex-col gap-2 h-full max-h-107 p-2 border overflow-hidden bg-gray-200'>
                    <div className='p-4 flex flex-col border rounded-lg bg-white'>
                        <h1>Nome: <span>Miriam Souza</span></h1>
                        <h1>Email: <span>fulano@bababa.com.br</span></h1>
                    </div>
                    <div className='p-4 flex h-82 flex-col border rounded-lg bg-white'>
                        <p className=''>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo magnam eveniet tenetur atque, nostrum saepe ex dolore quae quo sunt expedita minima ducimus deleniti earum, maiores optio error laborum aut?
                        </p>
                    </div>
                </div>
            </div>

            <div className='sm:w-1/2 pr-6'>
                <h2 className='text-center text-xl font-bold mb-6'>Caixa de Entrada</h2>
                <div className='h-full max-h-107 p-2 border overflow-hidden bg-gray-200'>
                    <div className='p-4 flex justify-between border rounded-lg bg-white'>
                        <div>
                            <h2>"Miriam Souza"</h2>
                            <p>"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo magnam..."</p>
                        </div>
                        <div className='flex justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 640 640"><path fill="#31475e" d="M262.2 48C248.9 48 236.9 56.3 232.2 68.8L216 112L120 112C106.7 112 96 122.7 96 136C96 149.3 106.7 160 120 160L520 160C533.3 160 544 149.3 544 136C544 122.7 533.3 112 520 112L424 112L407.8 68.8C403.1 56.3 391.2 48 377.8 48L262.2 48zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L464 208L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280zM400 280C400 266.7 389.3 256 376 256C362.7 256 352 266.7 352 280L352 456C352 469.3 362.7 480 376 480C389.3 480 400 469.3 400 456L400 280z" /></svg>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
