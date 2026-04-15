import { MessageCircle } from "lucide-react";

export default function WhatsApp() {
    return (
        <a href="https://wa.me/5551980432207" target="_blank" rel="noopener noreferrer" className="flex gap-2 px-8 py-4 rounded-lg text-black font-bold bg-[#00f2fe] hover:shadow-[0_0_20px_rgba(0,242,242,0.6)] hover:scale-105 transition-all duration-300">
            <MessageCircle size={20} />
            WhatsApp
        </a>
    )
}
