'use client'
import Publicar from "../button/Publicar"
import { useState } from "react"
import { useCurriculo } from "@/context/CurriculoContext"
import { useFormacao } from "@/context/FormacaoContext";
import { useProjeto } from "@/context/ProjetoContext";

export default function Aside() {

    const [tipo, setTipo] = useState("Projeto");

    const { setCurriculoDados, } = useCurriculo();
    const { setFormacaoDados } = useFormacao();
    const { setProjetoDados } = useProjeto();


    const Selecionar = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTipo(e.target.value);
    }

    const publicar = (formData: FormData) =>{
        const titulo = formData.get("titulo_form") as string;
        const tecnologias = formData.get("tecnologias_form") as string;
        const descricao = formData.get("descricao_form") as string;
        const demostracao = formData.get("demostracao_form") as string;
        const github = formData.get("github_form") as string;
        const layout = formData.get("layout_form") as File;
        const certificado = formData.get("certificado_form") as File;
        const curriculo = formData.get("curriculo_form") as File;

        if(tipo === "Projeto"){
            if(!titulo || !tecnologias || !descricao || !demostracao || !github || !layout) return alert("Preencha todos os campos do projeto.");
            // Aqui você chamaria a função para enviar os dados do projeto para o servidor
            // Exemplo: await SalvarProjetoNoServidor({ titulo, tecnologias, descricao, demostracao, github, layout });
            // E depois atualizar o estado global de projetos
            // setProjetoDados(prev => [...prev, novoProjeto]);
        } else if(tipo === "Diploma"){
            if(!titulo || !tecnologias || !descricao || !certificado) return alert("Preencha todos os campos do diploma.");
            // Similar ao projeto, mas para diploma
        } else {
            if(!curriculo) return alert("Selecione um arquivo de currículo.");
            // Similar ao projeto, mas para currículo
        }

        
    }

    return (
        <aside className="flex flex-col w-full md:w-1/3 h-min sticky top-0 mt-34">
            
            <form action={publicar} className='flex flex-col gap-4 w-full max-w-100 bg-[#1e293b] p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]'>
                <h2 className='text-[#6366f1] text-lg font-bold border-b border-[#334155] pb-1 mb-2'>Gerenciar Conteúdo</h2>
                <div className='flex flex-col gap-1'>
                    <label className='text-[#94a3b8] text-sm font-bold'>Tipo de Item</label>
                    <select onChange={Selecionar} className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4'>
                        <option value="Projeto">🚀 Projeto</option>
                        <option value="Diploma">🎓 Diploma / Certificado</option>
                        <option value="Curriculo"> 📄 Currículo</option>
                    </select>
                </div>

                {tipo === "Projeto" ? (
                    <div className="flex flex-col gap-4">
                        <div className='flex flex-col gap-1'>
                            <label className='text-[#94a3b8] text-sm font-bold'>Título</label>
                            <input className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4' name="titulo_form" type="text" placeholder="Ex: App Web Incrível" />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-[#94a3b8] text-sm font-bold'>Tecnologias (Separadas por vírgula)</label>
                            <input className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4' name="tecnologias_form" type="text" placeholder="Ex: React, Firebase, Tailwind" />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-[#94a3b8] text-sm font-bold'>Descrição Curta</label>
                            <textarea className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4 resize-none' name="descricao_form" rows={3} placeholder="Ex: Um app web incrível feito com React e Firebase"></textarea>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-[#94a3b8] text-sm font-bold'>URL do projeto</label>
                            <input className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4' name="demostracao_form" type="text" placeholder="https://imagem.com" />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-[#94a3b8] text-sm font-bold'>URL do Github</label>
                            <input className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4' name="github_form" type="text" placeholder="https://github.com/usuario/repo" />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-[#94a3b8] text-sm font-bold'>Print do projeto</label>
                            <input type="file" accept=".pdf" name="layout_form"
                                className="border border-[#374151] bg-[#0f172a] rounded-lg text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-[#374151] file:text-white hover:file:bg-[#4b5563] file:cursor-pointer" />
                        </div>
                    </div>
                ) : tipo === "Diploma" ? (
                    <div className="flex flex-col gap-4">
                        <div className='flex flex-col gap-1'>
                            <label className='text-[#94a3b8] text-sm font-bold'>Título</label>
                                <input className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4' name="titulo_form" type="text" placeholder="Ex: Curso Web" />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-[#94a3b8] text-sm font-bold'>Tecnologias (Separadas por vírgula)</label>
                            <input className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4' name="tecnologias_form" type="text" placeholder="Ex: React, Firebase, Tailwind" />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-[#94a3b8] text-sm font-bold'>Descrição Curta</label>
                            <textarea className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4 resize-none' name="descricao_form" rows={3} placeholder="Ex: Um curso web voltado para React e Firebase"></textarea>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-[#94a3b8] text-sm font-bold'>Certificado</label>
                            <input type="file" accept=".pdf" name="certificado_form"
                                className="border border-[#374151] bg-[#0f172a] rounded-lg text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-[#374151] file:text-white hover:file:bg-[#4b5563] file:cursor-pointer" />
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-1'>
                        <label className='text-[#94a3b8] text-sm font-bold'>Atualizar Currículo (PDF/Word)</label>
                        <input type="file" accept=".pdf,.doc,.docx" name="curriculo_form"
                            className="border border-[#374151] bg-[#0f172a] rounded-lg text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-[#374151] file:text-white hover:file:bg-[#4b5563] file:cursor-pointer" />
                    </div>
                )}
                <Publicar />
            </form>
        </aside>
    )
}
