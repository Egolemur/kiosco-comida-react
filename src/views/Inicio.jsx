import useSWR from 'swr';
import Producto from '../Components/Producto'
import useQuiosco from '../hooks/useQiosco'
import clienteAxios from '../config/axios'
import { FallingLines } from 'react-loader-spinner';
import {useAuth} from '../hooks/useAuth';

export default function Inicio() {
  
  const {categoriaActual} = useQuiosco(); /* Este es el contexto del quiosco */
  const {loading} = useAuth({middleware: 'auth'});

  // Consulta SWR
  const fetcher = () => clienteAxios('/api/productos', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('AUTH_TOKEN')}`
    }
  }).then(res => res.data);
  
  const {data, isLoading} = useSWR('/api/productos', fetcher, {
    refreshInterval: 1000,
  });
  
  // Si no hay productos, mostrar un mensaje de carga 
  if (isLoading) return <div>
    <div className="flex justify-center items-center min-h-screen">
      <FallingLines
          color="#4fa94d"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
          />
      </div> 
  </div>;

  const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id && producto.disponible === 1) // Aquí estamos filtrando los productos seleccionados con la categoria del menu izquierdo y que estan disponibles
 
  return (
    <> 
      <h1 className='text-4xl font-black'>
        {categoriaActual.nombre}
      </h1>
      <p className='text-2xl my-10'>
        Elige y personaliza tu pedido a continuación.
      </p>
      
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-screen-lg mx-auto'>
        {productos          
          .map(producto => (
          <Producto
            key={producto.id}
            producto={producto}
            botonAgregar={true}
          />
        ))}
      </div>
  </>
  )
}
