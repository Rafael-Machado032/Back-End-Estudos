"use client" // 1. Precisa de interatividade no navegador
import { useState, useEffect } from "react"

// Simulando os dados que virão do seu painel no futuro
const depoimentos = [
    { id: 1, nome: "Ana Silva", cargo: "Designer", texto: "O sistema é incrível e muito intuitivo!" },
    { id: 2, nome: "Bruno Souza", cargo: "Desenvolvedor", texto: "A performance superou minhas expectativas." },
    { id: 3, nome: "Carla Lima", cargo: "CEO", texto: "Melhor investimento que fizemos este ano." },
]

export default function Testimonials() {
    // 2. O "ponteiro" que diz qual depoimento estamos vendo (começa no 0)
    const [indice, setIndice] = useState(0)

    // 3. Função para ir para o próximo
    const proximo = () => {
        setIndice((prev) => (prev === depoimentos.length - 1 ? 0 : prev + 1))
    }

    // 4. Função para voltar
    const anterior = () => {
        setIndice((prev) => (prev === 0 ? depoimentos.length - 1 : prev - 1))
    }

    // 5. Lógica de Auto-play (opcional)
    useEffect(() => {
        const timer = setInterval(proximo, 5000) // Muda a cada 5 segundos
        return () => clearInterval(timer) // Limpa o lixo da memória ao sair da página
    }, [indice])

    return (
        <section className="max-w-2xl mx-auto overflow-hidden relative p-8">

            {/* Container da "Fita" de Depoimentos */}
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${indice * 100}%)` }} // A MÁGICA ESTÁ AQUI
            >
                {depoimentos.map((item) => (
                    <div key={item.id} className="min-w-full px-4 text-center">
                        <figure className="bg-zinc-100 p-8 rounded-2xl">
                            <blockquote className="text-xl italic text-gray-700">
                                "{item.texto}"
                            </blockquote>
                            <figcaption className="mt-4">
                                <cite className="font-bold block not-italic">{item.nome}</cite>
                                <span className="text-sm text-gray-500">{item.cargo}</span>
                            </figcaption>
                        </figure>
                    </div>
                ))}
            </div>

            {/* Botões de Navegação */}
            <div className="flex justify-center gap-4 mt-6">
                <button onClick={anterior} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"> ❮ </button>
                <button onClick={proximo} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"> ❯ </button>
            </div>

        </section>
    )
}