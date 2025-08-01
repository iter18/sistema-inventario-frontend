// src/modules/empleado/hooks/useEmpleadoForm.js
import { useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AlertService from "../utils/AlertService";
import { registraUsuario, loadEmpleados,modificarEmpleado,deleteEmpleado } from "../features/portal/empleadoService";

export const useEmpleadoForm = ({ onGuardado}) => {
  //inicalizan estados para el formulario  
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateReg, setIsUpdateReg] = useState(false);
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargandoEmpleados, setCargandoEmpleados] = useState(false);
  const [formValues, setFormValues] = useState({
    nombre: "",
    email: "",
    noEmpleado: "",
    departamento: "",
    fechaIngreso: "",
    id: "",
  });

  //función para llenar campos de formulario
  const onFilledForm = (empleado) => {
    setFormValues({
      nombre: empleado?.nombre || "",
      email: empleado?.correo || "",
      noEmpleado: empleado?.noEmpleado || "",
      departamento: empleado?.departamento? String(empleado.departamento.id) : "",
      fechaIngreso: empleado?.fechaIngreso || "",
      id: empleado?.id || "",
    });
  };
  //validación de formulario con YUP
  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string().email("Formato inválido").required("El email es obligatorio"),
    noEmpleado: Yup.string().required("El número de empleado es obligatorio"),
    departamento: Yup.string().required("El departamento es obligatorio"),
    fechaIngreso: Yup.date().required("La fecha de ingreso es obligatoria"),
  });

  //función para procesar formulario con formik
  const formik = useFormik({
    initialValues: formValues,
    enableReinitialize: true,//bandera para indicarle a formik que se reutilizara el formualario para editar
    validationSchema,
    onSubmit: async (registro, { resetForm }) => {
      setIsLoading(true);
      try {
        // Se determina si es una actualización o un nuevo registro
        const response = isUpdateReg
          ? await modificarEmpleado(registro)
          : await registraUsuario(registro);

        AlertService.success("¡Éxito!", response.message);

        // Limpieza y reseteo del formulario
        resetForm();
        onFilledForm({});
        if (isUpdateReg) {
          setIsUpdateReg(false);
        }

        // Notificar al componente padre que se guardó exitosamente
        if (onGuardado) {
          onGuardado();
        }

        // Recarga de empleados después de una operación exitosa
        // Si la página actual no es la 1, la cambiamos y el useEffect se encargará de recargar.
        // Si ya estamos en la 1, forzamos la recarga.
        if (paginaActual !== 1) {
          setPaginaActual(1);
        } else {
          await cargarEmpleados(1);
        }

      } catch (err) {
        if (err.response) {
          const message = err.response.data?.message || 'Ocurrió un error.';
          AlertService.error("Error", message);
        } else {
          AlertService.error("Error de Red", "No se pudo conectar con el servidor.");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  const eliminarRegistro = async (empleado) => {
        console.log('Eliminando registro...');
      try {
          await deleteEmpleado(empleado);
          AlertService.success('Éxito', 'Registro eliminado correctamente.');
          // Recargar la lista de empleados después de eliminar
          cargarEmpleados(paginaActual);

      } catch (err) {
         AlertService.error('Error', 'No se pudo eliminar el registro.');
            return;
      } 
    };

  const cargarEmpleados = useCallback(async (pagina = 1) => {
    setCargandoEmpleados(true);
    try {
      const response = await loadEmpleados(pagina);
      setListaEmpleados(response.data);
      setTotalPaginas(response.meta.last_page);
    } catch (error) {
      AlertService.error("Error", "No se pudo cargar la lista de empleados.");
    } finally {
      setCargandoEmpleados(false);
    }
  }, []);

  const onEditarEmpleado = (empleado) => {
    onFilledForm(empleado);
  };

  const eliminarEmpleado = (empleado) => {
    eliminarRegistro(empleado);
    // Aquí iría tu lógica de eliminación
  };

/**
 * @param {boolean} res
 */
  const regUpdate = (res) => {
    setIsUpdateReg(res);
  }


  return {
    formik,
    listaEmpleados,
    totalPaginas,
    paginaActual,
    cargandoEmpleados,
    setPaginaActual,
    cargarEmpleados,
    onEditarEmpleado,
    eliminarEmpleado,
    regUpdate
  };
};
