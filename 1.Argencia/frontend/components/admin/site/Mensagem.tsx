"use client";
import { useMensagem } from "@/contexts/MensagemContext";
import { DeletarMensagemNoServidor } from "@/app/lib/MensagemAcoes";

export default function MensagemPage() {
    const { mensagemDados, setMensagemDados, mensagemAberta, setMensagemAberta } = useMensagem();

    // FUNÇÃO DELETAR
    const handleDeletar = async (id: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Evita abrir a mensagem ao clicar no lixo
        if (confirm("Deseja excluir esta mensagem permanentemente?")) {
            const sucesso = await DeletarMensagemNoServidor(id);
            if (sucesso) {
                // Remove da lista local (Contexto)
                setMensagemDados(mensagemDados.filter(m => m.id !== id));
                // Se a mensagem aberta for a que deletei, limpo a visualização
                if (mensagemAberta?.id === id) setMensagemAberta(null);
            } else {
                alert("Erro ao excluir do servidor.");
            }
        }
    };

    return (
        <section className='flex flex-col sm:flex-row h-full gap-4'>
            {/* LADO ESQUERDO: VISUALIZAÇÃO */}
            <div className='sm:w-1/2'>
                <h2 className='text-center text-xl font-bold mb-6'>Mensagem</h2>
                <div className='flex flex-col gap-2 h-full max-h-107 p-2 border bg-gray-200'>
                    {mensagemAberta ? (
                        <>
                            <div className='p-4 flex flex-col border rounded-lg bg-white shadow-sm'>
                                <h1 className="font-bold">Nome: <span className="font-normal">{mensagemAberta.nome}</span></h1>
                                <h1 className="font-bold">Email: <span className="font-normal text-blue-600">{mensagemAberta.email}</span></h1>
                            </div>
                            <div className='p-4 flex h-82 flex-col border rounded-lg bg-white overflow-y-auto shadow-sm'>
                                <p className="text-gray-700 whitespace-pre-wrap">{mensagemAberta.mensagem}</p>
                            </div>
                        </>
                    ) : (
                        <div className="bg-white h-full flex items-center justify-center text-gray-400 italic rounded-lg">
                            Selecione uma mensagem para ler
                        </div>
                    )}
                </div>
            </div>

            {/* LADO DIREITO: CAIXA DE ENTRADA */}
            <div className='sm:w-1/2'>
                <h2 className='text-center text-xl font-bold mb-6'>Caixa de Entrada</h2>
                <div className='h-full max-h-107 p-2 border overflow-y-auto bg-gray-200 flex flex-col gap-2'>
                    {mensagemDados.length > 0 ? (
                        mensagemDados.map((msg) => (
                            <div
                                key={msg.id}
                                onClick={() => setMensagemAberta(msg)}
                                className={`p-4 flex justify-between items-center border rounded-lg cursor-pointer transition-all 
                                    ${mensagemAberta?.id === msg.id ? 'bg-blue-100 border-blue-500 shadow-md scale-[1.02]' : 'bg-white hover:bg-gray-50'}`}
                            >
                                <div className="flex-1 min-w-0 pr-4">
                                    <h2 className={`font-bold ${msg.lida ? 'text-gray-500' : 'text-black'}`}>
                                        {msg.nome}
                                    </h2>
                                    <p className="text-sm text-gray-500 truncate italic">&quot;{msg.mensagem}&quot;</p>
                                </div>

                                {/* BOTÃO EXCLUIR */}
                                <button
                                    onClick={(e) => handleDeletar(msg.id, e)}
                                    className="text-red-500 hover:bg-red-100 p-2 rounded-full transition-colors"
                                >
                                    <svg xmlns="http://w3.org" height="24" width="24" viewBox="0 0 640 640">
                                        <path fill="currentColor" d="M128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280z" />
                                    </svg>
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 mt-10">Caixa de entrada vazia.</p>
                    )}
                </div>
            </div>
        </section>
    );
}
