import { SquarePen } from "lucide-react"
import { useItem } from "@/context/IdEditar";


export default function Editar({ id, tipo }: { id: string, tipo?: string }) {
    const { setItemDados } = useItem();

    const EditarDados = () => {
        if (tipo === "formacao") {
            setItemDados({ id: id, editar: true, tipo: "formacao" });
            
        } else {
            setItemDados({ id: id, editar: true, tipo: "projeto" });
            alert("Editar projeto")
        }
    }
    
    return (
        <button onClick={EditarDados} title="Sair"
            className="flex items-center justify-center p-2 rounded-xl cursor-pointer bg-white/10 hover:bg-yellow-500/20 border border-white/20 hover:border-yellow-500/50 transition-all duration-300 group"
        >
            <SquarePen size={16} />
        </button>
    )
}

