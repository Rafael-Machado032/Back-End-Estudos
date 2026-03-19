"use client";
import { useEffect, useState } from "react"

const depoimentos = [
    { id: 1, foto: "DEPOIMENTO1.png", nome: "Miriam Souza", texto: "O trabalho da Agência Bold foi fundamental para o nosso posicionamento e nossas estratégias de 2021. Juntos tivemos excelentes resultados e nossos clientes ficaram surpresos com a qualidade. Foi um trabalho incrível feito a muitas mãos pela Uber e pelo time da Agência Bold." },
    { id: 2, foto: "DEPOIMENTO1.png", nome: "Bruno Souza", texto: "O trabalho da Agência Bold foi fundamental para o nosso posicionamento e nossas estratégias de 2021. Juntos tivemos excelentes resultados e nossos clientes ficaram surpresos com a qualidade. Foi um trabalho incrível feito a muitas mãos pela Uber e pelo time da Agência Bold." },
    { id: 3, foto: "DEPOIMENTO1.png", nome: "Carla Lima", texto: "O trabalho da Agência Bold foi fundamental para o nosso posicionamento e nossas estratégias de 2021. Juntos tivemos excelentes resultados e nossos clientes ficaram surpresos com a qualidade. Foi um trabalho incrível feito a muitas mãos pela Uber e pelo time da Agência Bold." },
    { id: 4, foto: "DEPOIMENTO1.png", nome: "Ana Silva", texto: "O trabalho da Agência Bold foi fundamental para o nosso posicionamento e nossas estratégias de 2021. Juntos tivemos excelentes resultados e nossos clientes ficaram surpresos com a qualidade. Foi um trabalho incrível feito a muitas mãos pela Uber e pelo time da Agência Bold." },
    { id: 5, foto: "DEPOIMENTO1.png", nome: "Bruno Souza", texto: "O trabalho da Agência Bold foi fundamental para o nosso posicionamento e nossas estratégias de 2021. Juntos tivemos excelentes resultados e nossos clientes ficaram surpresos com a qualidade. Foi um trabalho incrível feito a muitas mãos pela Uber e pelo time da Agência Bold." },
    { id: 6, foto: "DEPOIMENTO1.png", nome: "Carla Lima", texto: "O trabalho da Agência Bold foi fundamental para o nosso posicionamento e nossas estratégias de 2021. Juntos tivemos excelentes resultados e nossos clientes ficaram surpresos com a qualidade. Foi um trabalho incrível feito a muitas mãos pela Uber e pelo time da Agência Bold." },
]

export default function Depoimentos() {
    const [pagina, setPagina] = useState(1)
    const [comTransicao, setComTransicao] = useState(true);
    const [largura, setLargura] = useState(0);
    const [depopagina,setDepoPagina] = useState(3)


    const depoPagina = largura < 768 ? 1 : depopagina;
    const nPaginas = depoimentos.length / depoPagina;
    const nPaginasComClones = nPaginas + 2;


    const proximo = () => {
        setPagina((paginaAtual) => (paginaAtual + 1))
    }

    useEffect(() => {
        // LÓGICA DO TELETRANSPORTE INVISÍVEL
        if (pagina === nPaginas + 1) { // Chegou no clone do final
            setTimeout(() => {
                setComTransicao(false); // Desliga a animação
                setPagina(1);           // Pula para a página 1 real
            }, 700); // Mesmo tempo da duration-700
        }

        if (pagina === 0) { // Chegou no clone do início
            setTimeout(() => {
                setComTransicao(false);
                setPagina(nPaginas); // Pula para a última real
            }, 700);
        }

        // Religa a transição para o próximo clique
        if (!comTransicao) {
            setTimeout(() => setComTransicao(true), 50);
        }

        const verificarTamanho = () => {
            setLargura(window.innerWidth);
        };

        // 2. Executa assim que carrega
        verificarTamanho();

        // 3. "Ouve" toda vez que o usuário esticar ou encolher a tela
        window.addEventListener('resize', verificarTamanho);

        const contador = setInterval(proximo, 5000);
        return () => {
            clearInterval(contador);
            window.removeEventListener('resize', verificarTamanho)
        } 
    }, [pagina, comTransicao]);



    return (
        <section className='flex flex-col gap-9 w-full max-w-6xl mx-auto text-center p-4'>
            <h2 className="font-bold text-5xl">Depoimentos</h2>
            {/* "Moldura" Onde vai limitar a visão do transbordo */}
            {/* Segredo: overflow-hidden Limita a visão  */}
            <div className=' overflow-hidden'>{/* Moldura */}
                {/* "Fita" Onde vai ficar todas as paginas um do la do outro */}
                {/* Segredo: shrink-0 Não deixa a pagina quebrar a proxima linha */}
                <div className={`flex shrink-0 ${comTransicao ? 'transition-transform duration-700 ease-in-out' : 'transition-none'}`} style={{ transform: `translateX(-${pagina * 100}%)` }}>{/* Fita */}
                    {/* "Pagina" posso colocar quantos conteudo quizer dentro da pagina */}
                    {/* Segredo: min-w-full Garante a pagina oculpa a moldura e posibilidade de expansão*/}
                    {Array.from({ length: nPaginasComClones }).map((_, i_pagina) => {
                        // Mudar o conteudo
                        let paginaConteudo;
                        if (i_pagina === 0) paginaConteudo = nPaginas - 1; // Se for a primeira pagina "0" o conteudo é do ultimo
                        else if (i_pagina === nPaginas + 1) paginaConteudo = 0; // Se for a ultima pagina o conteudo é do primeiro
                        else paginaConteudo = i_pagina - 1; // Páginas normais

                        return <div key={i_pagina} className='flex w-full gap-8 min-w-full justify-center items-center'>{/* Pagina */}
                            {/* Conteudo */}
                            {/* É criada a pagina mais cada pagina tem um conteudo diferente é feito cortes no array para selecionar o conteudo de cada pagina*/}
                            {depoimentos.slice(paginaConteudo * depoPagina, (paginaConteudo + 1) * depoPagina).map((item) => (
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
                    })}
                </div>
            </div>
            <div className="flex gap-4 justify-center items-center">
                {Array.from({ length: nPaginas }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPagina(i + 1)} // O "link" acontece aqui!
                        className={`h-3 rounded-full transition-all duration-300 
                            ${(pagina === i + 1 || (pagina === 0 && i === nPaginas - 1) || (pagina === nPaginas + 1 && i === 0)) ? "w-8 bg-blue-600" : "w-3 bg-gray-300"}`} />
                ))}
            </div>
        </section>
    )
}
