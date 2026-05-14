import { LogOut } from "lucide-react"
import { flushSync } from "react-dom"; // Ignora a regra do async
import { useItem } from "@/context/IdEditar"; //Estado de item
import { ActionLogout } from "@/api/LoginLogout"

export default function Logout() {
    const { setItemDados } = useItem();
    const logout = async () => {
        flushSync(() => { // Solução para poder usar o carregamento
            setItemDados({ carregando: true })
        });
        try {
            await ActionLogout();
        } catch (error) {
            // 3. SEGREDO: Se a Action disparar um redirect, o código cai AQUI
            // Nós desligamos o loading IMEDIATAMENTE antes do navegador mudar de página
            setItemDados({ carregando: false });
            // Repassa o erro adiante para o Next.js poder executar o redirecionamento
            throw error;
        }
    }

    return (
        <button onClick={logout} title="Sair"
            className="flex items-center justify-center p-2 rounded-xl cursor-pointer bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-500/50 transition-all duration-300 group"
        >
            <LogOut />
        </button>
    )
}
