'use client';
import Link from "next/link";

export default function Footer() {
    const anoAtual = new Date().getFullYear();

    return (
        <footer className="w-full bg-[#0b0f1a] text-[#a8a8b3] py-8 px-6 border-t border-[#ffffff0d]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

                {/* Lado Esquerdo: Marca */}
                <div className="flex flex-col items-center md:items-start gap-2">
                    <div className="text-xl font-black font-montserrat tracking-tighter text-[#e1e1e6]">
                        R<span className="text-[#00f2fe]">.</span>M
                    </div>
                    <p className="text-sm">Construindo o futuro com Next.js & Laravel.</p>
                </div>

                {/* Centro: Links Rápidos */}
                <nav className="flex gap-6 text-sm font-medium">
                    <Link href="#inicio" className="hover:text-[#00f2fe] transition-colors">Início</Link>
                    <Link href="#projetos" className="hover:text-[#00f2fe] transition-colors">Projetos</Link>
                    <Link href="#trajetoria" className="hover:text-[#00f2fe] transition-colors">Sobre</Link>
                    <Link href="#contato" className="hover:text-[#00f2fe] transition-colors">Contato</Link>
                </nav>

                {/* Lado Direito: Copyright e Status */}
                <div className="flex flex-col items-center md:items-end gap-2 text-xs">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
                        </span>
                        <span>Disponível para novos projetos</span>
                    </div>
                    <p>© {anoAtual} — Desenvolvido por Rafael Machado</p>
                </div>
            </div>

            {/* Linha Decorativa com Shimmer opcional no fundo */}
            <div className="mt-8 text-center text-[10px] tracking-[0.2em] uppercase opacity-20">
                Feito com Paixão & Café
            </div>
        </footer>
    );
}
