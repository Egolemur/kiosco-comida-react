import useQuiosco from "../hooks/useQiosco"
import Categoria from "./Categoria"
import { useAuth } from "../hooks/useAuth";
import { FallingLines } from 'react-loader-spinner';

export default function Sidebar() {
    
    const {categorias} = useQuiosco();    
    const {user, loading, logout} = useAuth({middleware: 'auth'});

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <FallingLines
                    color="#4fa94d"
                    width="100"
                    visible={true}
                    ariaLabel="falling-circles-loading"
                />
            </div>
        )
    }
    return (
        <aside className="md:w-72">
            <div className="p-4">
                <a href="/">
                    <img 
                    className="w-40"
                    src="img/logo.svg" 
                    alt="" />
                </a>
            </div>

            <p className="my-10 text-xl text-center">Hola: {user?.name}</p>        

            <div className="mt-10">
                {categorias.map(categoria => (
                    <Categoria
                        key={categoria.id}
                        categoria={categoria}                        
                    />
                ))}
            </div>

            <div className="my-5 px-5">
                    <button
                        type="button"
                        className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
                        onClick={logout}
                    >
                        Cerrar Sesión
                    </button>
            </div>

            {user.admin === 1 && (
                <div className="my-5 px-5">
                    <a                        
                        className="text-center bg-green-500 w-full p-3 font-bold text-white truncate"
                        href="/admin"
                    >
                    Panel de administración
                    </a>
                </div>
            )}

        </aside>
    )
}
