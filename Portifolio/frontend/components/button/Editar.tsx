import { SquarePen } from "lucide-react"
import { useItem } from "@/context/IdEditar";


export default function Editar({ id, tipo }: { id: string, tipo?: string }) {
    const { setItemDados } = useItem();

    const EditarDados = () => {
        if (tipo === "formacao") {
            setItemDados({ id: id, editar: true, tipo: "formacao" });
            
        } else {
            setItemDados({ id: id, editar: true, tipo: "projeto" });
        }
    }
    
    return (
        <button onClick={EditarDados} title="Editar"
            className="flex items-center justify-center p-2 rounded-xl cursor-pointer bg-black/50 hover:bg-yellow-500/50 border border-white/20 hover:border-yellow-500/80 hover:text-black transition-all duration-300 group"
        >
            <SquarePen size={16} />
        </button>
    )
}

