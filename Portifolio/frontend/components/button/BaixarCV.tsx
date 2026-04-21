import { Download } from "lucide-react";
import { useCurriculo } from "@/context/CurriculoContext";

export default function BaixarCV() {
    const { curriculoDados} = useCurriculo()
    return (
        <a href={curriculoDados?.curriculo_url_servidor} download className="flex gap-2 px-8 py-4 rounded-lg text-black font-bold bg-[#00f2fe] hover:shadow-[0_0_20px_rgba(0,242,242,0.6)] hover:scale-105 transition-all duration-300">
            <Download size={20} />
            Baixe meu currículo
        </a>
    )
}
