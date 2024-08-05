import { createBrowserRouter } from 'react-router-dom' 
import Layout from './layouts/Layout' 
import AuthLayout from './layouts/AuthLayout'
import Login from './views/Login'
import Inicio from './views/Inicio'
import Register from './views/Register'
import AdminLayout from './layouts/AdminLayout'
import Ordenes from './views/Ordenes'
import Productos from './views/Productos'
import TotalVenta from './views/TotalVenta'

 const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Inicio/>,
                errorElement: <div>Error al cargar los datos</div>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            {                
                path: '/auth/login',
                element: <Login/>
            },
            {
                path: '/auth/register',
                element: <Register/>
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout/>,
        children: [
            {
                index: true,
                element: <Ordenes/>
            },
            {
                path: '/admin/productos',
                element: <Productos/>
            },
            {
                path: '/admin/total-venta',
                element: <TotalVenta/>
            }
        ]
    }
 ])

 export default router