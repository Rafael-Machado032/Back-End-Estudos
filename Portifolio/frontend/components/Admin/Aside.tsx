import Publicar from "../button/Publicar"

export default function Aside() {
    return (
        <aside className="flex flex-col w-full md:w-1/3 h-min sticky top-0">
            <header className="w-full max-w-7xl py-10">
                <h1 className="text-3xl font-bold">Meu Painel de Controle</h1>
            </header>
            <div className='flex flex-col gap-4 w-full max-w-100 bg-[#1e293b] p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]'>
                <h2 className='text-[#6366f1] text-lg font-bold border-b border-[#334155] pb-1 mb-2'>Gerenciar Conteúdo</h2>
                <div className='flex flex-col gap-1'>
                    <label className='text-[#94a3b8] text-sm font-bold'>Tipo de Item</label>
                    <select className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4'>
                        <option value="Projeto">🚀 Projeto</option>
                        <option value="Diploma">🎓 Diploma / Certificado</option>
                    </select>
                </div>

                <div className='flex flex-col gap-1'>
                    <label className='text-[#94a3b8] text-sm font-bold'>Título</label>
                    <input className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4' type="text" placeholder="Ex: App Web Incrível" />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-[#94a3b8] text-sm font-bold'>Tecnologias (Separadas por vírgula)</label>
                    <input className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4' type="text" placeholder="Ex: React, Firebase, Tailwind" />
                </div>

                <div className='flex flex-col gap-1'>
                    <label className='text-[#94a3b8] text-sm font-bold'>Descrição Curta</label>
                    <textarea className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4 resize-none' rows={3} placeholder="Ex: Um app web incrível feito com React e Firebase"></textarea>
                </div>

                <div className='flex flex-col gap-1'>
                    <label className='text-[#94a3b8] text-sm font-bold'>URL do projeto</label>
                    <input className='border border-[#374151] bg-[#0f172a] rounded-lg py-2 px-4' type="text" placeholder="https://imagem.com" />
                </div>

                <div className='flex flex-col gap-1'>
                    <label className='text-[#94a3b8] text-sm font-bold'>Print do projeto</label>
                    <input type="file" accept=".pdf"
                        className="border border-[#374151] bg-[#0f172a] rounded-lg text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-[#374151] file:text-white hover:file:bg-[#4b5563] file:cursor-pointer" />
                </div>

                <div className='flex flex-col gap-1'>
                    <label className='text-[#94a3b8] text-sm font-bold'>Certificado</label>
                    <input type="file" accept=".pdf"
                        className="border border-[#374151] bg-[#0f172a] rounded-lg text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-[#374151] file:text-white hover:file:bg-[#4b5563] file:cursor-pointer" />
                </div>

                <div className='flex flex-col gap-1'>
                    <label className='text-[#94a3b8] text-sm font-bold'>Atualizar Currículo (PDF/Word)</label>
                    <input type="file" accept=".pdf,.doc,.docx"
                        className="border border-[#374151] bg-[#0f172a] rounded-lg text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:text-sm file:font-semibold file:bg-[#374151] file:text-white hover:file:bg-[#4b5563] file:cursor-pointer"/>
                </div>
                <Publicar />
            </div>
        </aside>
    )
}
