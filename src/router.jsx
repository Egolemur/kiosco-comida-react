import { createBrowserRouter } from 'react-router-dom' 
import Layout from './layouts/Layout' 
import AuthLayout from './layouts/AuthLayout'
import Login from './views/Login'
import Inicio from './views/Inicio'
import Register from './views/Register'

 const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Inicio/>
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
    }
 ])

 export default router