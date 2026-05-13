'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react'; // Instale com: npm install lucide-react
import { useActiveSection } from '@/hooks/useActiveSection'; // Importado hook para monitorar a seção ativa

export default function Header() {
    useActiveSection(['inicio', 'trajetoria', 'projetos', 'formacao', 'contato']);// Chama o hook para monitorar as seções
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => { // Função de Clique e Rolagem Suave
        e.preventDefault();
        const element = document.getElementById(id);

        if (element) {
            // Rola suavemente
            element.scrollIntoView({ behavior: 'smooth' });

            // Atualiza a URL sem o # (ou apenas com o último ID)
            window.history.pushState(null, '', `#${id}`);
        }
        setMobileMenu(false)
    };

    // Monitora o scroll para mostrar/esconder o fundo da navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
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
                    {links.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                onClick={(e) => handleScroll(e, link.href.slice(1))}
                                className="text-sm font-medium text-[#a8a8b3] hover:text-[#00f2fe] transition-colors"
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
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
