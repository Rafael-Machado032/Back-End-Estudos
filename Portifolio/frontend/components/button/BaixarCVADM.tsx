import { Download } from "lucide-react";
import { useCurriculo } from "@/context/CurriculoContext";

export default function BaixarCVADM() {
    const { curriculoDados } = useCurriculo();
    return (
        <a href={curriculoDados?.curriculo_url} download target="_blank" className="flex gap-2 py-1 px-4 rounded-lg text-white font-bold bg-[#22c55e] ">
            <Download size={20} />
            Baixar CV
        </a>
    )
}
