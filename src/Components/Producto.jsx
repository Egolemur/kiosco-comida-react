import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQiosco";

export default function Producto({producto, botonAgregar = false, botonDisponible = false}) {
  const {handleClickModal, handleSetProducto, handleClickProductoAgotado} = useQuiosco();
  const {nombre, precio, imagen, } = producto;

  
  return (
    <div className="border p-3 shadow bg-white max-w-80">
        <img 
            className="w-full"
            src={`/img/${imagen}.jpg`} 
            alt={`iamgen ${nombre}`} 
        />

        <div className="p-5">
            <h3 className="text-2xl font-bold">
                {nombre}
            </h3>
            <p className="mt-5 font-black text-4xl text-amber-500">
                {formatearDinero(precio)}
            </p>
            {botonAgregar && (                
                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                    onClick={() => {
                        handleClickModal();
                        handleSetProducto(producto);
                    }}
                >
                    Agregar
                </button>
            )}
            
            {botonDisponible && (                
                <button
                    type="button"
                    className={`${producto.disponible === 1 ? 'bg-indigo-600 hover:bg-indigo-800' : 'bg-red-600 hover:bg-red-800'} text-white w-full mt-5 p-3 uppercase font-bold`}
                    onClick={() => {
                        handleClickProductoAgotado(producto.id);
                    }}
                >
                    {/* Si el producto esta agotado, presione aquí para marcarlo como agotado. Si el producto no esta agotado, presione el boton de agregar. */}
                    {producto.disponible === 1 ? 'Mostrar como agotado' : 'Mostrar como disponible'}
                </button>
            )}
        </div>
    </div>
  )
}
