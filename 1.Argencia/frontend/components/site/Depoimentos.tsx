"use client";
import { useEffect, useState } from "react"

const depoimentos = [
    { id: 1, foto: "DEPOIMENTO1.png", nome: "Miriam Souza", texto: "O trabalho da Agência Bold foi fundamental para o nosso posicionamento e nossas estratégias de 2021. Juntos tivemos excelentes resultados e nossos clientes ficaram surpresos com a qualidade. Foi um trabalho incrível feito a muitas mãos pela Uber e pelo time da Agência Bold." },
    { id: 2, foto: "DEPOIMENTO1.png", nome: "Bruno Souza", texto: "O trabalho da Agência Bold foi fundamental para o nosso posicionamento e nossas estratégias de 2021. Juntos tivemos excelentes resultados e nossos clientes ficaram surpresos com a qualidade. Foi um trabalho incrível feito a muitas mãos pela Uber e pelo time da Agência Bold." },
    { id: 3, foto: "DEPOIMENTO1.png", nome: "Carla Lima", texto: "O trabalho da Agência Bold foi fundamental para o nosso posicionamento e nossas estratégias de 2021. Juntos tivemos excelentes resultados e nossos clientes ficaram surpresos com a qualidade. Foi um trabalho incrível feito a muitas mãos pela Uber e pelo time da Agência Bold." },
    { id: 1, foto: "DEPOIMENTO1.png", nome: "Ana Silva", texto: "O trabalho da Agência Bold foi fundamental para o nosso posicionamento e nossas estratégias de 2021. Juntos tivemos excelentes resultados e nossos clientes ficaram surpresos com a qualidade. Foi um trabalho incrível feito a muitas mãos pela Uber e pelo time da Agência Bold." },
    { id: 2, foto: "DEPOIMENTO1.png", nome: "Bruno Souza", texto: "O trabalho da Agência Bold foi fundamental para o nosso posicionamento e nossas estratégias de 2021. Juntos tivemos excelentes resultados e nossos clientes ficaram surpresos com a qualidade. Foi um trabalho incrível feito a muitas mãos pela Uber e pelo time da Agência Bold." },
    { id: 3, foto: "DEPOIMENTO1.png", nome: "Carla Lima", texto: "O trabalho da Agência Bold foi fundamental para o nosso posicionamento e nossas estratégias de 2021. Juntos tivemos excelentes resultados e nossos clientes ficaram surpresos com a qualidade. Foi um trabalho incrível feito a muitas mãos pela Uber e pelo time da Agência Bold." },
]

export default function Depoimentos() {
    const [pagina, setPagina] = useState(1)
    const depoPagina = 3
    const nPaginas = depoimentos.length / depoPagina;


    const proximo = () => {
        setPagina((paginaAtual) => (paginaAtual === nPaginas - 1 ? 0 : paginaAtual + 1))
    }

    useEffect(() => {
        const contador = setInterval(proximo, 5000);
        //Usa a função proximo a cada 5 segundos
        return () => {
            clearInterval(contador)
        }
    }, [pagina])//Se mudar a variavel morre e começa tudo de novo



    return (
        <section className='flex flex-col gap-9 w-full max-w-6xl mx-auto text-center p-4'>
            <h2 className="font-bold text-5xl">Depoimentos</h2>
            {/* "Moldura" Onde vai limitar a visão do transbordo */}
            {/* Segredo: overflow-hidden Limita a visão  */}
            <div className=' overflow-hidden'>{/* Moldura */}
                {/* "Fita" Onde vai ficar todas as paginas um do la do outro */}
                {/* Segredo: shrink-0 Não deixa a pagina quebrar a proxima linha */}
                <div className='flex shrink-0 transition-transform duration-700 ease-in-out' style={{ transform: `translateX(-${pagina * 100}%)` }}>{/* Fita */}
                    {/* "Pagina" posso colocar quantos conteudo quizer dentro da pagina */}
                    {/* Segredo: min-w-full Garante a pagina oculpa a moldura e posibilidade de expansão*/}
                    {Array.from({ length: nPaginas }).map((_, i_pagina) => (
                        <div key={i_pagina} className='flex w-full gap-8 min-w-full justify-center items-center'>{/* Pagina */}
                            {/* Conteudo */}
                            {/* É criada a pagina mais cada pagina tem um conteudo diferente é feito cortes no array para selecionar o conteudo de cada pagina*/}
                            {depoimentos.slice(i_pagina * depoPagina, (i_pagina + 1) * depoPagina).map((item) => (
                                <figure key={item.id} className='flex flex-col justify-center items-center gap-4'>
                                    <figcaption className='flex flex-col justify-center items-center'>
                                        <img src={`/images/${item.foto}`} alt="" />
                                        <cite className='text-2xl font-bold'>{item.nome}</cite>
                                    </figcaption>
                                    <blockquote className="text-[#7E92AC]">{item.texto}</blockquote>
                                    <img src="/images/RATE.svg" alt="rate.svg" />
                                </figure>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-4 justify-center items-center">
                {Array.from({ length: nPaginas }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPagina(i)} // O "link" acontece aqui!
                        className={`h-3 rounded-full transition-all duration-300 ${pagina === i ? "w-8 bg-blue-600" : "w-3 bg-gray-300"}`}
                    />
                ))}
            </div>
        </section>
    )
}
