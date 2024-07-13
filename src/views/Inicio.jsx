import useSWR from 'swr';
import Producto from '../Components/Producto'
import useQuiosco from '../hooks/useQiosco'
import clienteAxios from '../config/axios';

export default function Inicio() {
  
  const {categoriaActual} = useQuiosco(); /* Este es el contexto del quiosco */

  // Consulta SWR
  const fetcher = () => clienteAxios('/api/productos').then(res => res.data);
  const {data, error, isLoading} = useSWR('/api/productos', fetcher, {
    refreshInterval: 1000,
  });
  
  if (isLoading) return <div>Cargando...</div>;

  const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id) // Aquí estamos filtrando los productos seleccionados con la categoria del menu izquierdo

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
          />
        ))}
      </div>
    </>
  )
}
