import axiosClientPrivate from "../../services/apiConnect/axiosClientPrivate";  
import AlertService  from '../../utils/AlertService';

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