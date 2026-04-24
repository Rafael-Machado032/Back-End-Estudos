'use client';
import { motion, Variants } from "motion/react";
import Typewriter from "typewriter-effect";
import BaixarCV from "../button/BaixarCV";
import WhatsApp from "../button/WhatsApp";

export default function Hero() {
    // Configuração do efeito de Desfoque + Escala + Opacidade
    const blurIn: Variants = {
        hidden: {
            opacity: 0,
            filter: "blur(10px)", // Começa bem embaçado
            scale: 0.9,           // Começa um pouco menor
            y: 20
        },
        visible: {
            opacity: 1,
            filter: "blur(0px)",  // Fica nítido
            scale: 1,             // Tamanho real
            y: 0,
            transition: { duration: 1, ease: "easeOut" }
        }
    };

    return (
        <section id="inicio" className='flex flex-col justify-center items-center gap-3 h-screen text-center px-4 bg-radial bg-[radial-gradient(circle_at_center,rgba(113,89,193,0.1)_0%,transparent_70%)]'>

            {/* 1. Terminal Text */}
            <motion.div
                initial="hidden" animate="visible" variants={blurIn}
                className="font-fira text-[#00f2fe] mb-3.75 text-[1.1rem]"
            >
                <Typewriter
                    options={{
                        strings: [
                            'console.log("Olá, Mundo!");',
                            'echo "Olá, Mundo!";',
                            'print("Olá, Mundo!")',
                            '<\u200Bh1>Olá, Mundo!</\u200Bh1>',
                        ],
                        autoStart: true, loop: true, delay: 100,
                    }}
                />
            </motion.div>

            {/* 2. Nome Principal (Desfocado) */}
            <motion.h1
                initial="hidden"
                animate="visible"
                variants={blurIn}
                transition={{ delay: 0.2 }}
                className='font-montserrat text-7xl font-black mb-2.5'
            >
                Rafael <span className='bg-linear-to-r from-[#7159c1] via-[#00f2fe] to-[#7159c1] bg-clip-text text-transparent animate-shimmer'>Machado</span>
            </motion.h1>

            {/* 3. Descrição (Desfocada) */}
            <motion.p
                initial="hidden"
                animate="visible"
                variants={blurIn}
                transition={{ delay: 0.4 }}
                className="text-[19px] text-[#a8a8b3] max-w-175 mb-7.5"
            >
                Desenvolvedor Fullstack focado em soluções robustas com <b>Next.js</b> e <b>Laravel</b>.
                Transformando problemas complexos em interfaces limpas e eficientes.
            </motion.p>

            {/* 4. Botões (Entrada suave) */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={blurIn}
                transition={{ delay: 0.6 }}
                className="flex gap-4"
            >
                <BaixarCV />
                <WhatsApp />
            </motion.div>

        </section>
    )
}
