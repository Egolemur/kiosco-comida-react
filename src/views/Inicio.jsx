import {productos as data} from '../data/productos'
import Producto from '../Components/Producto'
import useQuiosco from '../hooks/useQiosco'

export default function Inicio() {
  
  const {categoriaActual} = useQuiosco(); /* Este es el contexto del quiosco */

  const productos = data.filter(producto => producto.categoria_id === categoriaActual.id) // Aquí estamos filtrando los productos seleccionados con la categoria del menu izquierdo

  return (
    <>
      <h1 className='text-4xl font-black'>
        {categoriaActual.nombre}
      </h1>
      <p className='text-2xl my-10'>
        Elige y personaliza tu pedido a continuación.
      </p>
      
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
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
