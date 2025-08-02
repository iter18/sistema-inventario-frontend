import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import EmpleadoForm from '../features/portal/EmpleadoForm';
import EmpleadoList from '../components/EmpleadoList';
//import EmpleadoSearch from '../components/EmpleadoSearch';
import Pane from '../components/Pane';
import { useEmpleadoForm } from '../hooks/useEmpleados';
import Pagination from '../components/Pagination';


const EmpleadoPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  //Estado para controlar que vista mostrar
  const [vistaActual, setVistaActual] = useState('lista'); // 'lista', 'formulario', 'busqueda'
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

    // Función para volver a la lista
  const handleVolverALista = () => {
    setVistaActual('lista');
    setEmpleadoSeleccionado(null);
    onEditarEmpleado({});
    regUpdate(false);
    setSearchParams({});
  };


  const {
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
  } = useEmpleadoForm({onGuardado:handleVolverALista});

    // Leer parámetros de URL al cargar el componente
  useEffect(() => {
    const action = searchParams.get('action');
    const empleadoId = true;
    
    if (action === 'new') {
      setVistaActual('formulario');
      setEmpleadoSeleccionado(null);
    } else if (action === 'search') {
      setVistaActual('busqueda');
    } else if (action === 'edit' && empleadoId) {
      // Buscar el empleado por ID y cargarlo para edición
      //const empleado = listaEmpleados.find(emp => emp.id === parseInt(empleadoId));
      if (empleadoSeleccionado) {
        setVistaActual('formulario');
      }
    } else {
      setVistaActual('lista');
      setEmpleadoSeleccionado(null);
    }
  }, [searchParams, listaEmpleados]);

  // Cargar empleados al montar el componente
  useEffect(() => {
    cargarEmpleados(paginaActual);
  }, [paginaActual, cargarEmpleados]);


   // Función para manejar la edición
  const handleEditarEmpleado = (empleado) => {
    onEditarEmpleado(empleado);
    setVistaActual('formulario');
    setEmpleadoSeleccionado(empleado);
    regUpdate(true);
    // Actualizar URL para reflejar el estado
    setSearchParams({ action: 'edit'});
  };

    // Función para manejar la creación de nuevo empleado
  const handleNuevoEmpleado = () => {
    setEmpleadoSeleccionado(null);
    setVistaActual('formulario');
    setSearchParams({ action: 'new' });
    regUpdate(false);
  };


  // Función para mostrar búsqueda
  const handleMostrarBusqueda = () => {
    setVistaActual('busqueda');
    setSearchParams({ action: 'search' });
    regUpdate(false);
  };
    // Función para manejar la búsqueda
  const handleBuscar = (termino) => {
    setTerminoBusqueda(termino);
    // Aquí filtrarías los empleados o harías una nueva consulta
    // Por simplicidad, volvemos a la lista
    setVistaActual('lista');
  };

  const handlerEliminarEmpleado = (empleado) => {
    eliminarEmpleado(empleado);
    // Aquí podrías mostrar una confirmación o mensaje de éxito
  }

   // Renderizado condicional basado en la vista actual
  const renderizarContenido = () => {
    switch (vistaActual) {
      case 'formulario':
        return (
          <Pane 
            title={empleadoSeleccionado ? "Editar Empleado" : "Nuevo Empleado"}
            descrpcion={empleadoSeleccionado ? 
              "Modifica los datos del empleado seleccionado." : 
              "Completa el formulario para registrar un nuevo empleado."
            }
          >
            <EmpleadoForm
              formik={formik}
              empleadoInicial={empleadoSeleccionado}
              onCancelar={handleVolverALista}
            />
          </Pane>
        );

      case 'busqueda':
        return (
          <Pane 
            title="Buscar Empleados"
            descrpcion="Utiliza los filtros para encontrar empleados específicos."
          >
            <EmpleadoSearch 
              onBuscar={handleBuscar}
              onCancelar={() => setVistaActual('lista')}
            />
          </Pane>
        );

      case 'lista':
      default:
        return (
          <Pane 
            title="Gestión de Empleados"
            descrpcion="Lista de todos los empleados registrados en el sistema."
          >
            {/* Botones de acción */}
            <div className="mb-4 flex gap-2">
              <button
                onClick={handleNuevoEmpleado}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Nuevo Empleado
              </button>
              <button
                onClick={handleMostrarBusqueda}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Buscar
              </button>
            </div>

            {cargandoEmpleados ? (
              <p className="text-center mt-4">Cargando empleados...</p>
            ) : (
              <>
                <EmpleadoList empleados={listaEmpleados} onEdit={handleEditarEmpleado} onDelete={handlerEliminarEmpleado} />
                <Pagination
                        currentPage={paginaActual}
                        totalPages={totalPaginas}
                        onPageChange={(page) => setPaginaActual(page)}
                      />
              </>
            )}
          </Pane>
        );
    }
  };

  return (
      //<EmpleadoForm />
    <div className="space-y-6">
        {renderizarContenido()}
    </div>
  );
};

export default EmpleadoPage;