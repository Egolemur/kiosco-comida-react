import {Link} from 'react-router-dom'
import { createRef, useState } from 'react'
import clienteAxios from '../config/axios'
import Alerta from '../Components/Alerta'

export default function Login() {

    const emailRef = createRef()
    const passwordRef = createRef()
    
    const [errores, setErrores] = useState([])

    const handleSubmit = async e => {
        e.preventDefault();
        const datos = {            
            email: emailRef.current.value,
            password: passwordRef.current.value            
        }
        try {
            const {data} = await clienteAxios.post('/api/login', datos)
            // const data = await res.json()
            console.log(data.token)            
            setErrores([])
        } catch (error) {
            setErrores(Object.values(error.response.data.errors));
        }
    } 

  return (
    <>
        <h1 className="text-4xl font-black">Iniciar sesión</h1>
        <p>Inicia sesión para comenzar a ordernar</p>

        <div className="background-white shadow-md rounded-md mt-10 px-5 py-10">
            <form 
                action=""
                onSubmit={handleSubmit}
                noValidate
            >
            
                {errores ? errores.map((error, index) => (
                    <Alerta key={index}>
                        {error}
                    </Alerta>
                )) : null}  
                
                <div className="mb-4">
                    <label 
                    htmlFor="email"
                    className="text-slate-800">  
                        Email                      
                    </label>
                    <input 
                        type="email"
                        id="email"
                        className="mt-2 w-full p-3 bg-gray-50"
                        name="email"
                        placeholder="Tu email"
                        ref={emailRef}
                    />
                </div>

                <div className="mb-4">
                    <label 
                    htmlFor="Password"
                    className="text-slate-800">  
                        Password                      
                    </label>
                    <input 
                        type="password"
                        id="password"
                        className="mt-2 w-full p-3 bg-gray-50"
                        name="password"
                        placeholder="Tu password"
                        ref={passwordRef}
                    />
                </div>

                <input 
                    type="submit" 
                    value="Iniciar Sesión"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                />
            </form>
        </div>

        <nav className="mt-5">
            <Link to="/auth/register">
                ¿no tienes cuenta? ¡Crea una!
            </Link>
        </nav>
    </>
  )
}
