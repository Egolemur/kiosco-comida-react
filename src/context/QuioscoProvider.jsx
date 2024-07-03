import { createContext, useState } from 'react'
import { categorias as categoriasDB } from "../data/categorias"

const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState(categoriasDB);       
    const [ categoriaActual, setCategoriaActual ] = useState(categorias[0]);
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]);
    
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

    const handleAddPedido = ({categoria_id, imagen, ...producto}) => {
        setPedido([...pedido, {...producto}]);
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
        } else {
            setPedido([...pedido, productoActualizado]);
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
                handleActualizarPedido
            }} 
        > {children} </QuioscoContext.Provider>
    );
}

export { QuioscoProvider }

export default QuioscoContext