import { MessageCircle } from "lucide-react";

export default function WhatsApp() {
  return (
    <a href="#contato" className=" flex gap-2 px-8 py-4 rounded-lg font-bold border-2 hover:border-[#00f2fe] hover:shadow-[0_0_20px_rgba(0,242,242,0.6)] hover:scale-105 hover:text-[#00f2fe] transition-all duration-300">
      <MessageCircle size={20} />
      WhatsApp
    </a>
  )
}
