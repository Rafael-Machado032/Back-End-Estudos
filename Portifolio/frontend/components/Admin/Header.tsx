import { LogOut } from "lucide-react"

export default function Header() {
  return (
    <header className='flex justify-between w-full max-w-7xl p-4 fixed z-10'>
          <div className="w-full max-w-7xl py-10">
              <h1 className="text-3xl font-bold">Meu Painel de Controle</h1>
          </div>
          <button>
              <LogOut size={40} />
          </button>
    </header>
  )
}
