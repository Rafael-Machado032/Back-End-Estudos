import React from 'react'

export default function LimparCancelar({onClick, editar}: {onClick: () => void, editar?: boolean}) {
  return (
      <button className="cursor-pointer bg-linear-to-r from-blue-500 to-purple-500 text-white mt-4 py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600" onClick={onClick} disabled={editar}>
      {editar ? 'Cancelar' : 'Limpar'}
    </button>
  )
}
