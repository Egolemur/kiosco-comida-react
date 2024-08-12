export const formatearDinero = cantidad => {
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}

export const formatearFecha = date => {    
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son de 0 a 11
        const day = String(date.getDate()).padStart(2, '0');    

        return `${year}-${month}-${day}`;
}