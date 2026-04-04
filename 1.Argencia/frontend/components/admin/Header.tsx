"use client"
import { useUsuario } from '@/contexts/UsuarioContext';
// Mudamos o nome para NextImage para evitar o conflito que deu o erro
import NextImage from 'next/image';

export function Header() {
    const { usuarioDados } = useUsuario()

    return (
        <header className="absolute -z-10 w-full bg-blue-200 p-5.5">
            <div className='flex justify-end w-full '>
                <div className='flex items-center gap-4 group cursor-pointer'>
                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-800 leading-none capitalize">
                            {usuarioDados.nome}
                        </p>
                        <span className="text-xs text-green-500 font-medium">Online</span>
                    </div>

                    <div className="relative w-16 h-16 ring-2 ring-blue-50 ring-offset-2 rounded-full overflow-hidden transition-transform group-hover:scale-105 shadow-inner bg-gray-100">
                        {usuarioDados.foto_url ? (
                            <NextImage
                                src={usuarioDados.foto_url}
                                alt="Foto do Perfil"
                                fill
                                unoptimized
                                className='object-cover'
                                priority
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 font-bold">
                                {usuarioDados.nome.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
