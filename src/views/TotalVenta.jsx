import { useState, useEffect } from 'react'
import clienteAxios from '../config/axios'
import { formatearDinero, formatearFecha } from '../helpers';
import { DayPicker } from 'react-day-picker';
import "react-day-picker/style.css";

export default function TotalVenta() {
    const token = localStorage.getItem('AUTH_TOKEN');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [todayOrders, setTodayOrders] = useState([]);    
    const [totalVenta, setTotalVenta] = useState(0);

    useEffect(() => {
        const total = todayOrders.reduce((acumulador, pedido) => acumulador + pedido.total, 0);     
        setTotalVenta(total);
        console.log(total);
    }, [todayOrders]);
    
    
    const fetchData = async () => {
        try {
            const response = await clienteAxios('/api/pedidos', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            // Aqui se formatea la fecha para poder hacer el filtrado.
            const filterDate = formatearFecha(selectedDate);
            
            // Aqui se filtra los pedidos por fecha.
            const filteredOrders = await response.data.data.filter(order => order.created_at.split('T')[0] === filterDate && order.estado === 1);
            
            // Aqui se actualiza el estado de filteredOrderstodayOrders con los pedidos filtrados.
            await setTodayOrders(filteredOrders);
        }  catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }
    useEffect(() => {
        fetchData();
    }, [selectedDate]);
    
    console.log(todayOrders);

    return (
        <>
            <div>
                <h1 className='text-4xl font-black'>
                    Total de venta
                </h1>
                <p className='text-2xl my-10'>
                    Revisa tus totales de ventas diarias.
                </p>
            </div>

            <div className='md:flex md:gap-10'>
                <div className='md:w-1/2'>
                    <label htmlFor="daypicker">Selecciona una fecha:</label>
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        footer={
                          selectedDate ? `Día seleccionado: ${selectedDate.toLocaleDateString()}` : "Selecciona un día."
                        }
                    />
                </div>
                
                <div className='md:w-1/2 flex flex-col gap-5 max-h-96 overflow-y-auto bg-slate-400 m-4 p-5 border-2 border-slate-500 rounded-md'>
                    {todayOrders.length == 0 ? 'No hay ordenes en este día' : todayOrders.map(order => (
                        <div key={order.id} className='bg-white shadow p-5'>
                            <p className='text-sm'>Fecha: {order.created_at.split('T')[0]}</p>
                            <p className='text-xl text-amber-500 font-bold'>Total: {formatearDinero(order.total)}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-10'>
                <p className='text-2xl font-black'>Total de venta del día: <span className='text-amber-500'>{formatearDinero(totalVenta)}</span> </p>
            </div>
        </>

    )
}
