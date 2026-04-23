"use client"; // Necessário para usar useState e onClick
import { useState } from "react";
import { BuscarItemPorFiltroAction } from "@/api/ItemCrudAPI";

export default function BuscarFiltro() {
    // 1. Estado para guardar o objeto que vem do Laravel
    const [info, setInfo] = useState<{ data: { id: string | number; coluna_nome: string }[]; current_page: number; last_page: number } | null>(null);
    const [carregando, setCarregando] = useState(true);

    // 2. Função que lida com a busca
    async function carregarDados(termo: string, pagina: number) {
        setCarregando(true);
        const res = await BuscarItemPorFiltroAction(termo, pagina);

        if (res && res.dadosContexto) {
            setInfo(res.dadosContexto);
        }
        setCarregando(false);
    }


    // Se ainda não carregou os dados, não tenta renderizar o botão
    if (!info) return <p>Carregando...</p>;

    // Lógica para os botões
    const temProxima = info.current_page < info.last_page;
    const temAnterior = info.current_page > 1;

    return (
        <div className="flex flex-col gap-4 p-4">
            {/* Lista os nomes dos itens */}
            <ul>
                {info.data.map((item: { id: string | number; coluna_nome: string }) => (
                    <li key={item.id}>{item.coluna_nome}</li>
                ))}
            </ul>

            <div className="flex gap-2">
                {/* Botão Anterior */}
                <button
                    className="border p-2 disabled:opacity-50"
                    disabled={!temAnterior || carregando}
                    onClick={() => carregarDados('joão', info.current_page - 1)}
                >
                    Anterior
                </button>

                <span className="p-2">
                    Página {info.current_page} de {info.last_page}
                </span>

                {/* Botão Próxima */}
                <button
                    className="border p-2 disabled:opacity-50"
                    disabled={!temProxima || carregando}
                    onClick={() => carregarDados('joão', info.current_page + 1)}
                >
                    {carregando ? '...' : 'Próxima'}
                </button>
            </div>
        </div>
    );
}
