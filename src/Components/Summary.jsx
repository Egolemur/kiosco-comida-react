import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQiosco"
import Pedido from "./Pedido";

export default function Summary() {
  const {pedido} = useQuiosco();
  const total = pedido.reduce((acumulador, pedido) => acumulador + pedido.precio, 0);
  const comprobarPedido = () => pedido.length === 0;

  return (
    <aside className="h-screen overflow-y-scroll p-5 md:w-1/3 lg:w-auto">
      <h1 className="text-4xl font-black">Mi pedido</h1>
      <p className="text-lg my-5">
        A continuación verás el resumen de tu pedido.
      </p>

      <div className='py-10'>
        {pedido.length === 0 ? (
          <p className="text-center text-2xl">No hay elementos en tu pedido</p>
        ):(          
          <ul>
            {pedido.map(pedido => {              
              return(
                <Pedido
                  key={pedido.id}
                  pedido={pedido}                  
                />
              );              
            })}
          </ul>
        )}
      </div>

      <p className="font-bold text-xl mt-10">
        Total: {''}
        {formatearDinero(total)}
      </p>

      <form className="w-full">
        <div className="mt-5">
          {/* Aqui se mostrará el botón de confirmar pedido solo si hay productos en el pedido. En caso contrario se desabilitará el botón. */}          
          <input 
            type="submit" 
            className={`${ comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:bg-indigo-800'} text-white text-center w-full py-2 px-5 uppercase font-bold cursor-pointer`}
            value="Confirmar pedido"
            disabled={comprobarPedido()}
          />                    
        </div>
      </form>

    </aside>
  )
}
