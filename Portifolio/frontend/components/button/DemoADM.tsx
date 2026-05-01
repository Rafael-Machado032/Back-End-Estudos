import { ExternalLink } from "lucide-react";

export default function DemoADM({ href }: { href: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-2 text-sm bg-[#00f2fe] text-black rounded-lg font-bold transition-all duration-300 hover:bg-[#00d8e4] hover:shadow-[0_0_20px_rgba(0,242,242,0.5)] hover:-translate-y-1"
        >
            <ExternalLink size={18} />
            Visualizar
        </a>
    );
}
