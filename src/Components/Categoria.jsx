import useQuiosco from '../hooks/useQiosco'

export default function Categoria({categoria}) {
    const {icono, nombre, id} = categoria;    
    const { handleClickCategoria, categoriaActual, setCategoriaActual} = useQuiosco(); /* Este es el contexto del quiosco */
    const resaltarCategoria = () => categoriaActual.id === id ? "bg-amber-400" : ""; // Esta función resalta en amarillo la categoria seleccionada

    return (
        <button            
        type='button'
        onClick={() => handleClickCategoria(id)} // Toma el ID de cada categoria individual 
        // onClick={() => setCategoriaActual(categoria)}
        className={`${resaltarCategoria()} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}>
            <img 
                src={`/img/icono_${icono}.svg`} 
                alt="Imagen Icono" 
                className="w-12" />
            <div 
                className="text-lg font-bold cursor-pointer truncate"
            >
                {nombre}
            </div>            
        </button>
    )
}
