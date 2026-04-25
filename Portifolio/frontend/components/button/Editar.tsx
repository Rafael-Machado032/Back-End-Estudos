import { SquarePen } from "lucide-react"

export default function Editar() {

    const Editar = () => {
        alert("Editar formação")
    }
    
    return (
        <button onClick={Editar} title="Sair"
            className="flex items-center justify-center p-2 rounded-xl cursor-pointer bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-500/50 transition-all duration-300 group"
        >
            <SquarePen />
        </button>
    )
}

