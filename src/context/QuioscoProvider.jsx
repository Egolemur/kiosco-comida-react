import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import clienteAxios from '../config/axios';

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([]);       
    const [ categoriaActual, setCategoriaActual ] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const totalPedido = pedido.reduce((acumulador, pedido) => acumulador + (pedido.precio * pedido.cantidad), 0);
        setTotal(totalPedido);
    }, [pedido]);

    // Obtener las categorias de la base de datos por medio de una API utilizando Axios.
    const obtenerCategorias = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {                        
            const {data} = await clienteAxios('/api/categorias', {
                headers: {
                    'authorization': `Bearer ${token}` 
                }                    
            });
            setCategorias(data.data);
            setCategoriaActual(data.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtenerCategorias();
    }, []);
    
    // filtra los productos por categorias.
    const handleClickCategoria = (id) => {        
        const categoria = categorias.filter(categoria => categoria.id === id)[0];
        setCategoriaActual(categoria);
    }
    // Mostrar y oculta ventana modal.
    const handleClickModal = () => {
        setModal(!modal);
    }

    // Función para pasar los datos de cada producto a la ventana modal
    const handleSetProducto = (producto) => {        
        setProducto(producto)
    }

    // ESTE CODIGO SIRVE PARA AGREGAR PRODUCTOS AL PEDIDO.
    const handleAddPedido = ({categoria_id, ...producto}) => {
        setPedido([...pedido, {...producto}]);
        toast.success('Producto agregado al pedido');
    };
        
    // ESTE CODIGO SIRVE OPARA ACTUALIZAR EL PEDIDO.
    const handleActualizarPedido = (producto) => {
        const productoActualizado = { ...producto };

        if (pedido.some(pedido => pedido.id === productoActualizado.id)) {
            const pedidoActualizado = pedido.map(pedidoState =>
                pedidoState.id === productoActualizado.id ? productoActualizado : pedidoState
            );
            setPedido(pedidoActualizado);
            console.log(pedidoActualizado);
            toast.success('Producto actualizado en el pedido');
        } else {
            setPedido([...pedido, productoActualizado]);
        }
    }

    // Este Código servirá para eliminar un producto del pedido.
    const handleEliminarPedido = (id) => {
        const pedidoActualizado = pedido.filter(pedidoState => pedidoState.id!== id);
        setPedido(pedidoActualizado);
        toast.success('Producto eliminado del pedido');
    }

    const handleSubmitNuevaOrden = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')        
        try {
            const {data} = await clienteAxios.post('/api/pedidos', 
                {
                    total,
                    productos: pedido.map(producto => {
                        return {
                            id: producto.id,
                            cantidad: producto.cantidad, 
                            // Esto envía a la API solo la info necesaria del pedido                            
                        }
                    }),
                    
                }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
            await console.log(pedido);
            toast.success(data.message);
            setTimeout(() => {
                setPedido([]);
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickCompletarPedido = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleClickProductoAgotado = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/productos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <QuioscoContext.Provider 
            value={{ 
                categorias, 
                setCategorias, 
                categoriaActual, 
                setCategoriaActual, 
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAddPedido,
                handleActualizarPedido,
                handleEliminarPedido,
                handleSubmitNuevaOrden,
                total, 
                setTotal,
                handleClickCompletarPedido,
                handleClickProductoAgotado
            }} 
        > {children} </QuioscoContext.Provider>
    );
}

export { QuioscoProvider }

export default QuioscoContext