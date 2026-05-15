'use client'
import Logout from "../button/Logout"

export default function Header() {

    return (
        <header className='flex justify-between items-center w-full max-w-7xl px-4 py-10 fixed z-20 bg-[#0b0f1a]'>
            <div className="w-full max-w-7xl">
                <h1 className="text-3xl font-bold">Meu Painel de Controle</h1>
            </div>
            <Logout />
        </header>
    )
}
