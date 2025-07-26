import React, { useState, useEffect, useCallback } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import Pane from '../../components/Pane';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import { useDepartamentos } from '../../hooks/useDepartaments'; // Importamos nuestro componente reutilizable
//import { registraUsuario,loadEmpleados } from './empleadoService';
//import AlertService  from '../../utils/AlertService';
import Pagination from '../../components/Pagination';
import EmpleadoList from '../../components/EmpleadoList';
import MenuItem from '@mui/material/MenuItem';
import { useEmpleadoForm } from '../../hooks/useEmpleados';

const EmpleadoForm = () => {
    // Aquí iría la lógica del formulario de empleado

  const {
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
  } = useEmpleadoForm();
   
  const {departamentos,isLoading: departamentosLoading} = useDepartamentos();

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
                                        placeholder="Juan Perez"
                                        label="Nombre completo" 
                                        obligatorio={true}
                                        isError = {formik.touched.nombre && Boolean(formik.errors.nombre)}

                                         />
                                  {formik.touched.nombre && formik.errors.nombre && (
                                    <p className="text-red-500 text-sm">{formik.errors.nombre}</p>
                                  )}
                            </label>
                            <label className="block">
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
                                        label="Email" 
                                        obligatorio={true}
                                        isError = {formik.touched.email && Boolean(formik.errors.email)}
                                         />
                                        {formik.touched.email && formik.errors.email && (
                                          <p className="text-red-500 text-sm">{formik.errors.email}</p>
                                        )}
                            </label>
                            <label className="block">
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
                                        label="No. empleado"
                                        obligatorio={true}
                                        placeholder="2064"
                                        isError = {formik.touched.noEmpleado && Boolean(formik.errors.noEmpleado)}
                                         />
                                         {formik.touched.noEmpleado && formik.errors.noEmpleado && (
                                          <p className="text-red-500 text-sm">{formik.errors.noEmpleado}</p>
                                        )}
                            </label>
                            <label className="block">
                                <Select id="departamento" 
                                        name="departamento" 
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.departamento || ''}
                                        className="mt-2 block w-full border-none bg-transparent px-0.5
                                            shadow-[inset_0_-2px_0_0_theme(colors.gray.200)]
                                            focus:shadow-[inset_0_-2px_0_0_theme(colors.black)]
                                            focus:outline-none focus:ring-0"
                                         disabled={departamentosLoading}
                                         label={departamentosLoading ? "Cargando departamentos..." : "Seleccione un departamento"}
                                         isError = {formik.touched.departamento && Boolean(formik.errors.departamento)}
                                         obligatorio={true}
                                        >
                                        {/*<option value="">{departamentosLoading ? 'Cargando departamentos...' : 'Seleccione un departamento'}</option>*/}

                                        {Array.isArray(departamentos) && departamentos.map(dep => (
                                          //<option key={dep.id} value={dep.id}>{dep.departamento}</option>
                                          <MenuItem key={dep.id} value={dep.id}>{dep.departamento}</MenuItem>
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
                                        obligatorio={true}
                                        isError = {formik.touched.fechaIngreso && Boolean(formik.errors.fechaIngreso)}
                                         />
                                         {formik.touched.fechaIngreso && formik.errors.fechaIngreso && (
                                          <p className="text-red-500 text-sm">{formik.errors.fechaIngreso}</p>
                                        )}
                            </label>
                            {/*error && <p className="text-sm text-center text-red-600">{error}</p>*/}
                            <Button type="submit" className="py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading} >
                              {formik.isSubmitting ? 'Guardando...' : (isUpdateReg ? 'Actualizar Empleado' : 'Registrar Empleado')}
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
                 
                {listaEmpleados.length > 0 && ( cargandoEmpleados ? (
                  <p className="text-center mt-4">Cargando empleados...</p>
                ) : (
                  <>
                    <EmpleadoList empleados={listaEmpleados} onEdit={onEditarEmpleado} onDelete={eliminarEmpleado} />
                    <Pagination
                      currentPage={paginaActual}
                      totalPages={totalPaginas}
                      onPageChange={(page) => setPaginaActual(page)}
                    />
                  </>
                ))}

        </Pane>
    
        {/* Aquí podrías añadir más componentes o lógica según sea necesario */}
        </div>
    );
    }
    
export default EmpleadoForm;