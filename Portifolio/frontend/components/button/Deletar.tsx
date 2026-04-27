import { Trash2 } from "lucide-react"
import { DeletarFormacaoAction } from "@/api/FormacaoAPI"
import { DeletarProjetoAction } from "@/api/ProjetoAPI"

export default function Deletar({ id, tipo }: { id: string, tipo?: string }) {

    const DeletarDados = async() => {
        let confirmMessage = null;
        if (tipo === "formacao") {
            if (confirm("Tem certeza que deseja deletar esta formação?")) {
                confirmMessage = await DeletarFormacaoAction(id)
                if (confirmMessage.success) {
                    alert("Formação deletada com sucesso!")
                } else {
                    alert("Ocorreu um erro ao deletar a formação.")
                }
            }
        } else {
            if (confirm("Tem certeza que deseja deletar este projeto?")) {
                confirmMessage = await DeletarProjetoAction(id)
                if (confirmMessage.success) {
                    alert("Projeto deletado com sucesso!")
                } else {
                    alert("Ocorreu um erro ao deletar o projeto.")
                }
            }
        }
    }

    return (
        <button onClick={DeletarDados} title="Sair"
            className="flex items-center justify-center p-2 rounded-xl cursor-pointer bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-500/50 transition-all duration-300 group"
        >
            <Trash2 size={16} />
        </button>
    )
}
