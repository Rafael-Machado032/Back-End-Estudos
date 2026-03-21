"use client"
import { useNavegacao } from "@/contexts/Navegacao";
import { useState } from 'react'

import Home from '@/components/admin/site/Home'
import Depoimentos from '@/components/admin/site/Depoimentos'
import Mensagem from '@/components/admin/site/Mensagem'



export default function page() {
    const { abaAtiva } = useNavegacao(); // A mesma variável que o Aside alterou!
  return (
    <main className='mt-27 w-full h-screen p-6'>
        {abaAtiva === 'home' && <Home/>}
        {abaAtiva === 'depoimento' && <Depoimentos/>}
        {abaAtiva === 'mensagem' && <Mensagem/>}
      
    </main>
  )
}
