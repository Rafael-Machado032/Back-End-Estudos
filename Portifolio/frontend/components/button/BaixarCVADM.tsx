import { Download } from "lucide-react";

export default function BaixarCVADM() {
    return (
        <a href="/cv.pdf" download className="flex gap-2 py-1 px-4 rounded-lg text-white font-bold bg-[#22c55e] ">
            <Download size={20} />
            Baixar CV
        </a>
    )
}
