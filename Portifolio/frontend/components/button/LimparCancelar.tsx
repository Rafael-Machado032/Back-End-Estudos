
export default function LimparCancelar({ onClick, editar, desabilitar }: { onClick: () => void, editar?: boolean, desabilitar: boolean }) {
 
  return (
    <button
      className={`cursor-pointer py-2 px-4 rounded-lg text-white ${editar
          ? "bg-red-500 hover:bg-red-600" // Cor de atenção para Cancelar
          : "bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        }`}
      onClick={onClick}
      disabled={desabilitar}
    >
      {editar ? 'Cancelar' : 'Limpar'}
    </button>

  )
}
