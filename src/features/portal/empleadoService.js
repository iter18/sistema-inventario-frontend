import axiosClientPrivate from "../../services/apiConnect/axiosClientPrivate";  

export const registraUsuario = async (empleado) => {

    try {
        const body = JSON.stringify({
            nombre: empleado.nombre,
            numeroEmpleado: empleado.noEmpleado,
            correo: empleado.email,
            fechaIngreso:empleado.fechaIngreso,
            departamentoId:empleado.departamento
        });
        const response = await axiosClientPrivate.post('/empleados/crear', 
            body
        );

        return response.data;
    } catch (error) {
        console.error('Error en el registro de usuario:', error);
        throw error;
    }


};

export const loadEmpleados = async (pagina) => {
    try {
        const response = await axiosClientPrivate.get('/empleados/lista',{
            params: {
                page: pagina,
                per_page: 3
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al cargar empleados:', error);
        throw error;
    }
};

export function getPaginatedData(data, currentPage, itemsPerPage) {
  const start = (currentPage - 1) * itemsPerPage;
  return data.slice(start, start + itemsPerPage);
}

export const modificarEmpleado = async (empleado) => {
    try {
        const body = JSON.stringify({
            nombre: empleado.nombre,
            numeroEmpleado: empleado.noEmpleado,
            correo: empleado.email,
            fechaIngreso:empleado.fechaIngreso,
            departamentoId:empleado.departamento
        });
        const response = await axiosClientPrivate.put(`/empleados/actualizar/${empleado.id}`, 
            body
            );
        response.data;
        return response.data;
    }  catch (error) {
        console.error('Error en la actualización de usuario:', error);
        throw error;
    }
    
};

export const deleteEmpleado = async (empleado) => {
    try {
        const response = await axiosClientPrivate.delete(`/empleados/eliminar/${empleado}`);
        return response.status;
    } catch (error) {
        console.error('Error al eliminar empleado:', error);
        throw error;
    }

};