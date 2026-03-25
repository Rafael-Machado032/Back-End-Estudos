import React from 'react'

export default async function TesteConexão() {
    const dados = await fetch('http://localhost:8000/api/teste').then(res => res.json());
console.log(dados.mensagem);
  return (
    <div>Mensagem de teste: {dados.mensagem}</div>
  )
}
