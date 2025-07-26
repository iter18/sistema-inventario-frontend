// src/modules/empleado/hooks/useEmpleadoForm.js
import { useState, useCallback } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AlertService from "../utils/AlertService";
import { registraUsuario, loadEmpleados } from "../features/portal/empleadoService";

export const useEmpleadoForm = () => {
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
  });

  //función para llenar campos de formulario
  const onFilledForm = (empleado) => {
    setFormValues({
      nombre: empleado?.nombre || "",
      email: empleado?.correo || "",
      noEmpleado: empleado?.noEmpleado || "",
      departamento: empleado?.departamento ? String(empleado.departamento) : "",
      fechaIngreso: empleado?.fechaIngreso || "",
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
    onSubmit: async (valores) => {
      try {
        setIsLoading(true);
        let response;

        if (isUpdateReg) {
          // lógica de actualización si la tuvieras
          console.log("Se actualizará el usuario");
          formik.resetForm();// se resetea el formulario a los valores inciales con los que lleno
          onFilledForm({});//Se pasa vacio el objeto para que limpie los campos del formulario,
          setIsUpdateReg(false);
          return;
        } else {
            //logica para registrar usuario
          response = await registraUsuario(valores);
          AlertService.success("¡Éxito!", response.message);
          formik.resetForm();
          onFilledForm({});
        }

        // Recarga de empleados
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
          AlertService.error("Error de red", "No se pudo conectar con el servidor.");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

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
    setIsUpdateReg(true);
  };

  const eliminarEmpleado = (empleado) => {
    console.log("Eliminar:", empleado);
    // Aquí iría tu lógica de eliminación
  };

  return {
    formik,
    isLoading,
    isUpdateReg,
    listaEmpleados,
    totalPaginas,
    paginaActual,
    cargandoEmpleados,
    setPaginaActual,
    cargarEmpleados,
    onEditarEmpleado,
    eliminarEmpleado,
  };
};
