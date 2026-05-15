import { Trash2 } from "lucide-react"
import { DeletarFormacaoAction } from "@/api/FormacaoAPI"
import { DeletarProjetoAction } from "@/api/ProjetoAPI"
import { useFormacao } from "@/context/FormacaoContext"
import { useProjeto } from "@/context/ProjetoContext"
import { flushSync } from "react-dom"; // Ignora a regra do async
import { useItem } from "@/context/IdEditar"; //Estado de item

export default function Deletar({ id, tipo }: { id: string, tipo?: string }) {
    const { setItemDados } = useItem();
    const { formacaoDados, setFormacaoDados } = useFormacao();
    const { projetoDados, setProjetoDados } = useProjeto();

    const DeletarDados = async () => {
        flushSync(() => { // Solução para poder usar o carregamento
            setItemDados({ carregando: true })
        });
        let confirmMessage = null;
        try {
            if (tipo === "formacao") {
                if (confirm("Tem certeza que deseja deletar esta formação?")) {
                    confirmMessage = await DeletarFormacaoAction(id)
                    if (confirmMessage.success) {
                        alert("Formação deletada com sucesso!")
                        const listaEditada = formacaoDados.filter(p => p.id !== id);
                        setFormacaoDados(listaEditada)
                    } else {
                        alert("Ocorreu um erro ao deletar a formação.")
                    }
                }
            } else {
                if (confirm("Tem certeza que deseja deletar este projeto?")) {
                    confirmMessage = await DeletarProjetoAction(id)
                    if (confirmMessage.success) {
                        alert("Projeto deletado com sucesso!")
                        const listaEditada = projetoDados.filter(p => p.id !== id);
                        setProjetoDados(listaEditada)
                    } else {
                        alert("Ocorreu um erro ao deletar o projeto.")
                    }
                }
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Ocorreu um erro inesperado.");
        } finally {
            // 2. Desativa o loading ao terminar (sucesso ou erro)
            setItemDados({ carregando: false })
            // console.log("Ultimo tipo: ", itemDados.tipo);
        }
    }

    return (
        <button onClick={DeletarDados} title="Deletar"
            className="flex items-center justify-center p-2 rounded-xl cursor-pointer bg-black/50 hover:bg-red-500/50 border border-white/20 hover:border-red-500/80 hover:text-black transition-all duration-300 group"
        >
            <Trash2 size={16} />
        </button>
    )
}
