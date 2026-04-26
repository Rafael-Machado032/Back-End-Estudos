import { SquarePen } from "lucide-react"


export default function Editar({ dados }: { dados?: object }) {


    const Editar = () => {
        alert("Editar formação")
    }
    
    return (
        <button onClick={Editar} title="Sair"
            className="flex items-center justify-center p-2 rounded-xl cursor-pointer bg-white/10 hover:bg-yellow-500/20 border border-white/20 hover:border-yellow-500/50 transition-all duration-300 group"
        >
            <SquarePen size={16} />
        </button>
    )
}

