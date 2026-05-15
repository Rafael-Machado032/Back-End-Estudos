

export default function Publicar({desabilitar}:{desabilitar: boolean}) {
   
    return (
        <button className="w-full cursor-pointer bg-linear-to-r from-blue-500 to-purple-500 text-white mt-8 py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-600" disabled={desabilitar}>
            Publicar no Portfólio
        </button>
    )
}
