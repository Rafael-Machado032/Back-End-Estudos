'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react'; // Instale com: npm install lucide-react
import { useActiveSection } from '@/hooks/useActiveSection'; // Importado hook para monitorar a seção ativa

export default function Header() {
    const activeSection = useActiveSection(['inicio', 'trajetoria', 'projetos', 'formacao', 'contato']);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => { // Função de Clique e Rolagem Suave
        e.preventDefault();// 1. Bloqueia o pulo brusco padrão do HTML
        const element = document.getElementById(id); // 2. Procura a seção na página pelo ID

        if (element) {
            // Rola suavemente
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileMenu(false)
    };

    // Monitora o scroll para mostrar/esconder o fundo da navbar
    useEffect(() => {
        const handleScroll = () => {  // Esta função interna roda toda vez que o usuário mexe no scroll do mouse
            // Se a rolagem vertical (window.scrollY) for maior que 50 pixels, 
            // define 'scrolled' como true. Se voltar para o topo, vira false.
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll); // Adiciona o "ouvinte" de rolagem no navegador global
        // Função de limpeza: Quando o componente some da tela, removemos o ouvinte 
        // para evitar que o site gaste memória do computador do usuário à toa (Memory Leak).
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Início', href: '#inicio' },
        { name: 'Trajetória', href: '#trajetoria' },
        { name: 'Formação', href: '#formacao' },
        { name: 'Projetos', href: '#projetos' },
        { name: 'Contato', href: '#contato' },
    ];

    return (
        <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-[#0b0f1acc] backdrop-blur-md border-b border-[#ffffff1a]' : 'py-6 bg-transparent'}`}>
            <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xl font-black font-montserrat tracking-tighter"
                >
                    R<span className="text-[#00f2fe]">.</span>M
                </motion.div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8">
                    {links.map((link) => {
                        // 2. Verifica se este link específico é o que está ativo na tela
                        const isActive = activeSection === link.href.slice(1); // remove o '#' para comparar puro ex: 'inicio'
                        return (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    onClick={(e) => handleScroll(e, link.href.slice(1))}
                                    className={`text-sm font-medium transition-colors duration-300 ${isActive ? 'text-[#00f2fe]' : 'text-[#a8a8b3] hover:text-[#00f2fe]'}`}
                                >
                                    {link.name}
                                </a>
                            </li>
                        )
                    }
                    )}
                </ul>

                {/* Botão Mobile */}
                <button
                    className="md:hidden text-[#e1e1e6]"
                    onClick={() => setMobileMenu(!mobileMenu)}
                >
                    {mobileMenu ? <X /> : <Menu />}
                </button>
            </nav>
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-[#0b0f1a] border-b border-[#ffffff1a] p-6 md:hidden"
                    >
                        <ul className="flex flex-col gap-4">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleScroll(e, link.href.slice(1))}
                                        className="text-lg text-[#a8a8b3]"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
