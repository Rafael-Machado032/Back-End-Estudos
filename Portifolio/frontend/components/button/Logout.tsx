import { LogOut } from "lucide-react"
import { ActionLogout } from "@/api/LoginLogout"

export default function Logout() {

    const logout = async () => {
        await ActionLogout();
    }
    
    return (
        <button onClick={logout} title="Sair"
            className="flex items-center justify-center p-2 rounded-xl cursor-pointer bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-500/50 transition-all duration-300 group"
        >
            <LogOut />
        </button>
    )
}
