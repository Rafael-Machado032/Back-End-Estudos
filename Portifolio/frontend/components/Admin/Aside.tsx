'use client'
import Publicar from "../button/Publicar"
import LimparCancelar from "../button/LimparCancelar"
import { useState, useEffect } from "react";
import { useCurriculo } from "@/context/CurriculoContext"
import { useFormacao } from "@/context/FormacaoContext";
import { useProjeto } from "@/context/ProjetoContext";
import { useItem } from "@/context/IdEditar";
import { CriarProjetoAction, EditarProjetoAction } from "@/api/ProjetoAPI";
import { CriarFormacaoAction, EditarFormacaoAction } from "@/api/FormacaoAPI";
import { CriarCurriculoAction, EditarCurriculoAction } from "@/api/CurriculoAPI";

export default function Aside() {

    // 1. Modifique o useState para buscar do localStorage ao iniciar
    const [tipo, setTipo] = useState<string>("Projeto");

    // ESTADOS PARA OS INPUTS (Para o usuário ver o que está editando)
    const [titulo, setTitulo] = useState("");
    const [tecnologias, setTecnologias] = useState("");
    const [descricao, setDescricao] = useState("");
    const [demo, setDemo] = useState("");
    const [github, setGithub] = useState("");

    const { curriculoDados } = useCurriculo();
    const { formacaoDados } = useFormacao();
    const { projetoDados } = useProjeto();
    const { itemDados, setItemDados } = useItem();

    // 2. Atualize a função Selecionar para salvar a escolha
    const Selecionar = (e: React.ChangeEvent<HTMLSelectElement>) => {
        limparFormulario(); // Limpa os campos ao mudar de tipo
        const valor = e.target.value;
        setTipo(valor);
    };

    // 2. Limpeza dos campos após publicar/sucesso
    const limparFormulario = () => {
        setTitulo("");
        setTecnologias("");
        setDescricao("");
        setDemo("");
        setGithub("");
        setItemDados({ id: "", tipo: "", editar: false });
    };

    const publicar = async (formData: FormData) => {

        const certificado = formData.get("certificado_form") as File;
        const curriculo = formData.get("curriculo_form") as File;

        let resposta = null
        let idItem = null

        if (tipo === "Projeto") {
            if (titulo && tecnologias && descricao && demo && github) {

                if (!itemDados?.editar) {
                    resposta = await CriarProjetoAction(formData);
                } else {
                    idItem = itemDados.id
                    resposta = await EditarProjetoAction(idItem, formData);
                    if (resposta.success) {
                        limparFormulario();
                    }
                }

                if (resposta.success) {

                    alert("Projeto criado com sucesso!");
                } else {
                    alert("Erro ao criar projeto");
                }
            } else {
                alert("Preencha todos os campos do projeto.");
            }
        } else if (tipo === "Diploma") {
            if (titulo && tecnologias && descricao) {
                if (!itemDados?.editar) {
                    if (!certificado || certificado.size === 0) {
                        alert("Selecione um arquivo de certificado.");
                        return;
                    }
                    resposta = await CriarFormacaoAction(formData);
                } else {
                    resposta = await EditarFormacaoAction(itemDados.id, formData);
                    if (resposta.success) {
                        limparFormulario();
                    }
                }
                if (resposta.success) {
                    alert("Formação criada com sucesso!");
                } else {
                    alert("Erro ao criar formação");
                }
            } else {
                alert("Preencha todos os campos do diploma.");
            }
        } else {
            if (curriculo && curriculo.size > 0) {

                if (!curriculoDados?.curriculo_url_servidor) {
                    resposta = await CriarCurriculoAction(formData);
                } else {
                    resposta = await EditarCurriculoAction(1, formData);
                }

                if (resposta.success) {
                    alert("Currículo atualizado com sucesso!");
                } else {
                    alert("Erro ao atualizar currículo");
                }
            } else {
                alert("Selecione um arquivo de currículo.");
            }
        }
    }
    useEffect(() => {
        if (itemDados?.editar) {
            const preencherEditar = () => {
                let dados = null;
                if (itemDados.tipo === "formacao") {
                    // Sincroniza o Select com o valor correto
                    setTipo("Diploma");

                    dados = formacaoDados.find((item) => item.id === itemDados.id);
                    if (dados) {
                        setTitulo(dados.titulo || "");
                        setTecnologias(dados.tecnologia || "");
                        setDescricao(dados.descricao || "");
                    }
                } else if (itemDados.tipo === "projeto") {
                    // Sincroniza o Select com o valor correto
                    setTipo("Projeto");

                    dados = projetoDados.find((item) => item.id === itemDados.id);
                    if (dados) {
                        setTitulo(dados.titulo || "");
                        setTecnologias(dados.tecnologia || "");
                        setDescricao(dados.descricao || "");
                        setDemo(dados.projeto_url_demo || "");
                        setGithub(dados.projeto_url_github || "");
                    }
                }
            };
            // Use setTimeout ou deixe direto se não houver conflito de render
            preencherEditar();
        }
    }, [itemDados, formacaoDados, projetoDados]);

    return (
        <aside className="flex flex-col w-full md:w-1/3 h-min sticky top-0 mt-34">

            <form action={publicar} className='flex flex-col gap-4 w-full max-w-100 bg-[#1e293b] p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]'>
                <h2 className='text-[#6366f1] text-lg font-bold border-b border-[#334155] pb-1 mb-2'>Gerenciar Conteúdo</h2>
                <div className='flex flex-col gap-1'>
                    <label className='text-[#94a3b8] text-sm font-bold'>Tipo de Item</label>
                    <select onChange={Selecionar} value={tipo} className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4'>
                        <option value="Projeto">🚀 Projeto</option>
                        <option value="Diploma">🎓 Diploma / Certificado</option>
                        <option value="Curriculo"> 📄 Currículo</option>
                    </select>
                </div>

                {tipo === "Projeto" ? (
                    <div className="flex flex-col gap-4" key={"bloco-projeto"}>
                        <div className='flex flex-col gap-1'>
                            <label className='text-[#94a3b8] text-sm font-bold'>Título</label>
                            <input className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4' name="titulo_form" type="text" placeholder="Ex: App Web Incrível" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-[#94a3b8] text-sm font-bold'>Tecnologias (Separadas por vírgula)</label>
                            <input className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4' name="tecnologias_form" type="text" placeholder="Ex: React, Firebase, Tailwind" value={tecnologias} onChange={(e) => setTecnologias(e.target.value)} />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-[#94a3b8] text-sm font-bold'>Descrição Curta</label>
                            <textarea className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4 resize-none' name="descricao_form" rows={3} placeholder="Ex: Um app web incrível feito com React e Firebase" value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-[#94a3b8] text-sm font-bold'>URL do projeto</label>
                            <input className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4' name="demostracao_form" type="text" placeholder="https://imagem.com" value={demo} onChange={(e) => setDemo(e.target.value)} />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-[#94a3b8] text-sm font-bold'>URL do Github</label>
                            <input className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4' name="github_form" type="text" placeholder="https://github.com/usuario/repo" value={github} onChange={(e) => setGithub(e.target.value)} />
                        </div>
                    </div>
                ) : tipo === "Diploma" ? (
                    <div className="flex flex-col gap-4" key={"bloco-diploma"}>
                        <div className='flex flex-col gap-1'>
                            <label className='text-[#94a3b8] text-sm font-bold'>Título</label>
                            <input className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4' name="titulo_form" type="text" placeholder="Ex: Curso Web" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-[#94a3b8] text-sm font-bold'>Tecnologias (Separadas por vírgula)</label>
                            <input className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4' name="tecnologias_form" type="text" placeholder="Ex: React, Firebase, Tailwind" value={tecnologias} onChange={(e) => setTecnologias(e.target.value)} />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-[#94a3b8] text-sm font-bold'>Descrição Curta</label>
                            <textarea className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4 resize-none' name="descricao_form" rows={3} placeholder="Ex: Um curso web voltado para React e Firebase" value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
                        </div>

                        {itemDados?.editar ? null :
                            <div className='flex flex-col gap-1'>
                                <label className='text-[#94a3b8] text-sm font-bold'>Certificado</label>
                                <input type="file" accept=".pdf" name="certificado_form"
                                    className="border border-[#374151] bg-[#0f172a] rounded-lg text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-[#374151] file:text-white hover:file:bg-[#4b5563] file:cursor-pointer" />
                            </div>}
                    </div>
                ) : (
                    <div className='flex flex-col gap-1' key={"bloco-curriculo"}>
                        <label className='text-[#94a3b8] text-sm font-bold'>Atualizar Currículo (PDF/Word)</label>
                        <input type="file" accept=".pdf,.doc,.docx" name="curriculo_form"
                            className="border border-[#374151] bg-[#0f172a] rounded-lg text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-[#374151] file:text-white hover:file:bg-[#4b5563] file:cursor-pointer" />
                    </div>
                )}
                <Publicar />
                <LimparCancelar onClick={limparFormulario} editar={itemDados?.editar || false} />
            </form>
        </aside>
    )
}
