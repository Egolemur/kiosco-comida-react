import useSWR from 'swr'
import clienteAxios from '../config/axios'
import Producto from '../Components/Producto';

export default function Productos() {

  const token = localStorage.getItem('AUTH_TOKEN');
  const fetcher = () => clienteAxios('api/productos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(data => data.data)

  const {data, error, isLoading} = useSWR('/api/productos', fetcher, {refreshInterval: 5000})

  if(isLoading) return 'Cargando...'

  const productos = data.data
  console.log(data.data)

  return (
    <div>
        <h1 className='text-4xl font-black'>
            Productos
        </h1>
        <p className='text-2xl my-10'>
            Gestiona los productos de tu kiosco
        </p>
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-screen-lg mx-auto'>
        {productos          
          .map(producto => (
          <Producto
            key={producto.id}
            producto={producto}
            botonDisponible={true}
          />
        ))}
      </div>
    </div>
  )
}
