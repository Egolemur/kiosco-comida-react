import useQuiosco from "../hooks/useQiosco"
import Pedido from "./Pedido";

export default function Summary() {
  const {pedido} = useQuiosco();

  return (
    <aside className="h-screen overflow-y-scroll p-5">
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
      </p>

      <form className="w-full">
        <div className="mt-5">
          <input 
            type="submit" 
            className="bg-indigo-600 hover:bg-indigo-800 text-white text-center w-full py-2 px-5 uppercase font-bold cursor-pointer"
            value="Confirmar pedido"
          />
        </div>
      </form>

    </aside>
  )
}
