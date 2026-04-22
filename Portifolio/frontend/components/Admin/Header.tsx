'use client'
import { LogOut } from "lucide-react"
import { ActionLogout } from "@/api/LoginLogout"

export default function Header() {

  const logout = async () => {
    await ActionLogout();
  }

  return (
    <header className='flex justify-between items-center w-full max-w-7xl px-4 py-10 fixed z-10 bg-[#0b0f1a]'>
      <div className="w-full max-w-7xl">
        <h1 className="text-3xl font-bold">Meu Painel de Controle</h1>
      </div>
      <button onClick={logout} title="Sair"
        className="flex items-center justify-center p-2 rounded-xl cursor-pointer bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-500/50 transition-all duration-300 group"
      >
        <LogOut />
      </button>

    </header>
  )
}
