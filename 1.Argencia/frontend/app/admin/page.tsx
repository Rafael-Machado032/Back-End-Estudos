"use client"
import { useNavegacao } from "@/contexts/Navegacao";


import Home from '@/components/admin/site/Home'
import Depoimentos from '@/components/admin/site/Depoimentos'
import Mensagem from '@/components/admin/site/Mensagem'



export default function Page() {
    const { abaAtiva } = useNavegacao(); // A mesma variável que o Aside alterou!
  return (
    <main className='mt-28 h-128 w-full py-6 pr-6'>
        {abaAtiva === 'home' && <Home/>}
        {abaAtiva === 'depoimento' && <Depoimentos/>}
        {abaAtiva === 'mensagem' && <Mensagem/>}
      
    </main>
  )
}
