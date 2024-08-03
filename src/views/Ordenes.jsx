import useSWR from 'swr'
import clienteAxios from '../config/axios'
import { formatearDinero } from '../helpers';
import useQuiosco from '../hooks/useQiosco';

export default function Ordenes() {
  const token = localStorage.getItem('AUTH_TOKEN');
  const fetcher = () => clienteAxios('api/pedidos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  // Este fetcher se refresca cada 5 segundos
  const {data, error, isLoading} = useSWR('/api/pedidos', fetcher, {refreshInterval: 5000}) 
  const {handleClickCompletarPedido} = useQuiosco();
  
  if(isLoading) return 'Cargando...'

  console.log(data)

  return (
    <div>
      <h1 className='text-4xl font-black'>
        Ordenes
      </h1>
      <p className='text-2xl my-10'>
        Revisa tus ordenes
      </p>

      <div className='grid grid-cols-2 gap-5'>
        {data.data.data.map(orden => (
          <div key={orden.id} className='border border-gray-200 p-4 mb-4 bg-white'>
            <p className='text-2xl font-bold text-slate-600'>
              Contenido del pedido:
            </p>
            {orden.productos.map(producto => (
              <div key={producto.id} className='flex items-center justify-between'>
                <p>{producto.pivot.cantidad} x {producto.nombre}</p>
              </div>
            ))}  
             <p className='text-lg font-bold text-slate-600'>
              Cliente: {' '}
              <span className='font-normal'>
                {orden.user.name}
              </span>
            </p>          

             <p className='text-lg font-bold text-amber-500'>
              Total a pagar: {' '}
              <span className='font-normal text-slate-600'>
                {formatearDinero(orden.total)}
              </span>
            </p> 
            <button
                type="submit" 
                className= 'bg-indigo-600 hover:bg-indigo-800 text-white text-center w-full py-2 px-5 uppercase font-bold cursor-pointer'
                onClick={() => handleClickCompletarPedido(orden.id)}
            > Completar Orden </button>
          </div>          
        ))}        
      </div>
    </div>
  )
}
