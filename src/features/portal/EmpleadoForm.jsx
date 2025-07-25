import React, { useState, useEffect, useCallback } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import Pane from '../../components/Pane';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import { useDepartamentos } from '../../hooks/useDepartaments'; // Importamos nuestro componente reutilizable
import { registraUsuario,loadEmpleados,getPaginatedData } from './empleadoService';
import AlertService  from '../../utils/AlertService';
import Pagination from '../../components/Pagination';
import EmpleadoList from '../../components/EmpleadoList';


const EmpleadoForm = () => {
    // Aquí iría la lógica del formulario de empleado
   
  const {departamentos,isLoading: departamentosLoading} = useDepartamentos();
  const [isLoading, setIsLoading] = useState(false);
  const [listaEmpleados, setListaEmpleados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargandoEmpleados, setCargandoEmpleados] = useState(false);

     // Validación con Yup
      const validacion = Yup.object({
        nombre: Yup.string().required("El nombre es obligatorio"),
        email: Yup.string().email("Formato inválido").required("El email es obligatorio"),
        noEmpleado: Yup.string().required("El número de empleado es obligatorio"),
        departamento: Yup.string().required("El departamento es obligatorio"),
        fechaIngreso: Yup.date().required("La fecha de ingreso es obligatoria"),
  
      });

        // Configuración de Formik
      const formik = useFormik({
        initialValues: {
          nombre: "",
          email: "",
          noEmpleado: "",
          departamento: "",
          fechaIngreso: ""
        },
        validationSchema: validacion,
        onSubmit: async (valores) => {
          setIsLoading(true);
          try {
            const response = await registraUsuario(valores);
            AlertService.success("Exito!",response.message);
            formik.resetForm();
            // Forzamos la recarga de la lista de empleados.
            // Una buena UX es volver a la página 1 para ver el nuevo registro.
            if (paginaActual !== 1) {
              setPaginaActual(1);
            } else {
              // Si ya estamos en la página 1, el useEffect no se disparará,
              // así que llamamos a la función de carga manualmente.
              cargarEmpleados(1);
            }
      
          } catch (err) {
             if (err.response) {
              const status = err.response.status;
              const message = err.response.data?.message || err.response.data?.error || 'Ocurrió un error.';
              //setError(message); // Opcional: para mostrar error en el form
              AlertService.error("Error", message);
            } else {
              // Error de red o algo más impidió la petición
              //setError('Error de conexión. Inténtalo de nuevo.');
              AlertService.error('Error de red', 'No se pudo conectar con el servidor.');
            }
          } finally {
            setIsLoading(false);
          }
        },
      });

      // Función para cargar los empleados envuelta en useCallback para optimización
      const cargarEmpleados = useCallback(async (pagina) => {
        console.log("Cargando empleados...");
        setCargandoEmpleados(true);
        try {
          const response = await loadEmpleados(pagina);
          setListaEmpleados(response.data);
          setTotalPaginas(response.meta.last_page);
        } catch (error) {
          console.error('Error al cargar empleados:', error);
          AlertService.error('Error', 'No se pudo cargar la lista de empleados.');
        } finally {     
          setCargandoEmpleados(false);
        }
      }, []); // No hay dependencias ya que loadEmpleados y AlertService son estables.

      //Carga inicial de empleados
      useEffect(() => {
        cargarEmpleados(paginaActual);
      }, [paginaActual, cargarEmpleados]);

    return (
        <div>
        {/* Aquí irían los campos del formulario */}
        <Pane title="Formulario de Empleado"
              descrpcion = "En esta sección podrás gestionar empleados. Añadir, editar o eliminar según sea necesario.">
                <div className="px-4 sm:px-9 lg:px-8">
                    <hr className="border-gray-400"></hr>
                    <div className="mt-8 max-w-3xl">
                        <form onSubmit={formik.handleSubmit} className="space-y-4 ">
                            {/*<form className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">*/}
                            <label className="block">
                                <span className="text-gray-700">Nombre completo</span>
                                 <Input type="text" 
                                        className="mt-1 block w-full border-none bg-transparent px-0.5
                                            shadow-[inset_0_-2px_0_0_theme(colors.gray.200)]
                                            focus:shadow-[inset_0_-2px_0_0_theme(colors.black)]
                                            focus:outline-none focus:ring-0" 
                                        id="nombre" 
                                        name="nombre" 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.nombre}
                                        placeholder="Juan Pérez" 
                                         />
                                  {formik.touched.nombre && formik.errors.nombre && (
                                    <p className="text-red-500 text-sm">{formik.errors.nombre}</p>
                                  )}
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Email</span>
                                <Input type="email" 
                                        className="mt-1 block w-full border-none bg-transparent px-0.5
                                            shadow-[inset_0_-2px_0_0_theme(colors.gray.200)]
                                            focus:shadow-[inset_0_-2px_0_0_theme(colors.black)]
                                            focus:outline-none focus:ring-0" 
                                        id="email" 
                                        name="email" 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        placeholder="usuario@kuka.com" 
                                         />
                                        {formik.touched.email && formik.errors.email && (
                                          <p className="text-red-500 text-sm">{formik.errors.email}</p>
                                        )}
                            </label>
                            <label className="block">
                                <span className="text-gray-700">No. empleado</span>
                                <Input type="text" 
                                        className="mt-1 block w-full border-none bg-transparent px-0.5
                                            shadow-[inset_0_-2px_0_0_theme(colors.gray.200)]
                                            focus:shadow-[inset_0_-2px_0_0_theme(colors.black)]
                                            focus:outline-none focus:ring-0" 
                                        id="noEmpleado" 
                                        name="noEmpleado" 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.noEmpleado}
                                        placeholder="24060" 
                                         />
                                         {formik.touched.noEmpleado && formik.errors.noEmpleado && (
                                          <p className="text-red-500 text-sm">{formik.errors.noEmpleado}</p>
                                        )}
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Departamento</span>
                                <Select id="departamento" 
                                        name="departamento" 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.departamento}
                                        placeholder="Seleccione un departamento"
                                        className="mt-2 block w-full border-none bg-transparent px-0.5
                                            shadow-[inset_0_-2px_0_0_theme(colors.gray.200)]
                                            focus:shadow-[inset_0_-2px_0_0_theme(colors.black)]
                                            focus:outline-none focus:ring-0"
                                         disabled={departamentosLoading}
                                        >
                                        <option value="">{departamentosLoading ? 'Cargando departamentos...' : 'Seleccione un departamento'}</option>
                                        {Array.isArray(departamentos) && departamentos.map(dep => (
                                          <option key={dep.id} value={dep.id}>{dep.departamento}</option>
                                        ))}
                                </Select>
                                {formik.touched.departamento && formik.errors.departamento && (
                                          <p className="text-red-500 text-sm">{formik.errors.departamento}</p>
                                        )}
                            </label>
                             <label className="block">
                              <span className="text-gray-700">Fecha de ingreso</span>
                              <Input type="date" 
                                        className="mt-1 block w-full border-none bg-transparent px-0.5
                                            shadow-[inset_0_-2px_0_0_theme(colors.gray.200)]
                                            focus:shadow-[inset_0_-2px_0_0_theme(colors.black)]
                                            focus:outline-none focus:ring-0" 
                                        id="fechaIngreso" 
                                        name="fechaIngreso" 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.fechaIngreso}
                                         />
                                         {formik.touched.fechaIngreso && formik.errors.fechaIngreso && (
                                          <p className="text-red-500 text-sm">{formik.errors.fechaIngreso}</p>
                                        )}
                            </label>
                            {/*error && <p className="text-sm text-center text-red-600">{error}</p>*/}
                            <Button type="submit" className="py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading} >
                              {isLoading ? 'Cargando...' : 'Registrar Empleado'}
                            </Button>
                            {/*<label className="block">
                                <span className="text-gray-700">Additional details</span>
                                <textarea
                                className="mt-0 block w-full border-0 border-b-2 border-gray-200 px-0.5 focus:border-black focus:ring-0"
                                rows="2"
                                ></textarea>
                            </label> 
                            <div className="block">
                                <div className="mt-2">
                                <div>
                                    <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        className="border-2 border-gray-300 text-black focus:border-gray-300 focus:ring-black"
                                    />
                                    <span className="ml-2">Email me news and special offers</span>
                                    </label>
                                </div>
                                </div>
                            </div>*/}
                        </form>
                    </div>
                </div> 
                <hr className="my-6 border-gray-300" /> 
                {cargandoEmpleados ? (
                  <p className="text-center mt-4">Cargando empleados...</p>
                ) : (
                  <>
                    <EmpleadoList empleados={listaEmpleados} />
                    <Pagination
                      currentPage={paginaActual}
                      totalPages={totalPaginas}
                      onPageChange={(page) => setPaginaActual(page)}
                    />
                  </>
                )}

        </Pane>
    
        {/* Aquí podrías añadir más componentes o lógica según sea necesario */}
        </div>
    );
    }
    
export default EmpleadoForm;