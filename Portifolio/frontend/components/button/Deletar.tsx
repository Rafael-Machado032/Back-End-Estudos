import { Trash2 } from "lucide-react"
import { DeletarFormacaoAction } from "@/api/FormacaoAPI"
import { DeletarProjetoAction } from "@/api/ProjetoAPI"
import { useFormacao } from "@/context/FormacaoContext"
import { useProjeto } from "@/context/ProjetoContext"

export default function Deletar({ id, tipo }: { id: string, tipo?: string }) {

    const { formacaoDados, setFormacaoDados } = useFormacao();
    const { projetoDados, setProjetoDados } = useProjeto();

    const DeletarDados = async() => {
        let confirmMessage = null;
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
    }

    return (
        <button onClick={DeletarDados} title="Deletar"
            className="flex items-center justify-center p-2 rounded-xl cursor-pointer bg-black/50 hover:bg-red-500/50 border border-white/20 hover:border-red-500/80 hover:text-black transition-all duration-300 group"
        >
            <Trash2 size={16} />
        </button>
    )
}
