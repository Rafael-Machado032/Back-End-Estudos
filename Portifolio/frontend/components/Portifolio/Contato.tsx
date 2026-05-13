'use client'
import WhatsApp2 from "../button/WhatsApp2"
import Linkedin from "../button/LinkedIn"
import Github from "../button/Github"
import { motion } from "motion/react";

export default function Contato() {
    return (
        <section className='flex justify-center px-6 py-30 text-center text-[#e1e1e6] bg-[#111111c5] bg-radial bg-[radial-gradient(circle_at_center,rgba(113,89,193,0.1)_0%,transparent_70%)]' id="contato">
            <div className='flex flex-col gap-4'>
                <motion.h2
                    className='text-4xl font-bold text-center'
                    initial={{ opacity: 0, y: -100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} // Delay de 0.2s para ficar elegante
                >
                    Vamos Conversar?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
                    whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >Estou em busca de oportunidade na área de desenvolvimento para somar com minha experiência técnica.</motion.p>
                <br />
                <div className="flex flex-col gap-4 justify-center items-center">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} // Delay de 0.2s para ficar elegante
                        >
                            <WhatsApp2 href="https://wa.me/5551980432207" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, rotate: 180 }}
                            whileInView={{ opacity: 1, rotate: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} // Delay de 0.2s para ficar elegante
                        >
                            <Linkedin href="https://www.linkedin.com/in/rafael-machado-b0a99078/" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} // Delay de 0.2s para ficar elegante
                        >
                            <Github href="https://github.com/Rafael-Machado032" />
                        </motion.div>

                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} // Delay de 0.2s para ficar elegante
                    >
                        <p>Telefone: (51) 98043-2207</p>
                        <p>rafael_machado.dev // 2026</p>
                    </motion.div>
                </div>
            </div>

        </section>
    )
}
