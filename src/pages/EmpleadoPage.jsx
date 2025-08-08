import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import EmpleadoForm from '../features/portal/EmpleadoForm';
import EmpleadoList from '../components/EmpleadoList';
//import EmpleadoSearch from '../components/EmpleadoSearch';
import Pane from '../components/Pane';
import { useEmpleadoForm } from '../hooks/useEmpleados';
import Pagination from '../components/Pagination';
import Input from '../components/Input';
import Select from '../components/Select';
import { useDepartamentos } from '../hooks/useDepartaments';
import MenuItem from '@mui/material/MenuItem';
import Button from '../components/Button';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const EmpleadoPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  //Estado para controlar que vista mostrar
  const [vistaActual, setVistaActual] = useState('lista'); // 'lista', 'formulario', 'busqueda'
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [filtrosBusqueda, setFiltrosBusqueda] = useState({});

    // Función para volver a la lista
  const handleVolverALista = () => {
    setVistaActual('lista');
    setEmpleadoSeleccionado(null);
    onEditarEmpleado({});
    regUpdate(false);
    setSearchParams({});
  };

  const {departamentos,isLoading: departamentosLoading} = useDepartamentos();
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

  // Cargar empleados al montar, y cuando cambia la página o los filtros
  useEffect(() => {
    cargarEmpleados(paginaActual, filtrosBusqueda);
  }, [paginaActual, filtrosBusqueda, cargarEmpleados]);

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

    // Función para manejar la búsqueda
  const handleBuscar = () => {
    const nuevosFiltros = {};
    if (terminoBusqueda) nuevosFiltros.nombreEmpleado = terminoBusqueda;
    if (departamento) nuevosFiltros.idDepartamento = departamento;

    setPaginaActual(1);
    setFiltrosBusqueda(nuevosFiltros);
  };

  const handlerEliminarEmpleado = (empleado) => {
    eliminarEmpleado(empleado);
    // Aquí podrías mostrar una confirmación o mensaje de éxito
  }
  // 1. Añade esta función en tu componente
  const handleLimpiarFiltros = () => {
    setTerminoBusqueda('');
    setDepartamento('');
    setFiltrosBusqueda({});
    setPaginaActual(1); // Vuelve a la primera página sin filtros
  };
  


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
            descrpcion="Aquí podrás dar de alta empleados, editarlos y eliminarlos."
          >
            {/* Aquí podrías incluir un componente de búsqueda si lo deseas */}
            {/* <EmpleadoSearch onBuscar={handleBuscar} /> */}
            <hr className="border-gray-400 mb-4"></hr>
            <div className="mb-4 flex flex-wrap gap-6 items-center justify-center ">
              <div className="flex flex-col w-90">
                <Input
                  type="text"
                  placeholder="Juan Peréz..."
                  label="Buscar por nombre empleado"
                  name="nombreEmpleado"
                  id="nombreEmpleado"
                  value={terminoBusqueda}
                  onChange={(e) => setTerminoBusqueda(e.target.value)}
                  className="px-2  border rounded"
                />

                <Select id="departamento" 
                        name="departamento" 
                        value={departamento}
                        onChange={(e) => setDepartamento(e.target.value)}
                        className="mt-2 block w-full border-none bg-transparent px-0.5
                            shadow-[inset_0_-2px_0_0_theme(colors.gray.200)]
                            focus:shadow-[inset_0_-2px_0_0_theme(colors.black)]
                            focus:outline-none focus:ring-0"
                          disabled={departamentosLoading}
                          label={departamentosLoading ? "Cargando departamentos..." : "Buscar por departamento"}
                        >
                        {Array.isArray(departamentos) && departamentos.map(dep => (
                          <MenuItem key={dep.id} value={dep.id}>{dep.departamento}</MenuItem>
                        ))}
                </Select>
                {/* Botones de acción */}
                <div className="mb-4 mt-4 flex flex-wrap gap-3">
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<AddIcon />}
                    onClick={handleNuevoEmpleado}
                    sx={{
                      borderRadius: 3,
                      textTransform: 'none',
                      boxShadow: 3,
                    }}
                  >
                    Nuevo Empleado
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SearchIcon />}
                    onClick={handleBuscar}
                    sx={{
                      borderRadius: 3,
                      textTransform: 'none',
                      boxShadow: 3,
                    }}
                  >
                    Buscar
                  </Button>

                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<ClearIcon />}
                    onClick={handleLimpiarFiltros}
                    sx={{
                      borderRadius: 3,
                      textTransform: 'none',
                      boxShadow: 1,
                      '&:hover': {
                        backgroundColor: '#ffecec',
                      },
                    }}
                  >
                    Limpiar
                  </Button>
                </div>
              </div>
            </div>
            
            {cargandoEmpleados ? (
                <div className="flex justify-center items-center py-10">
                  <CircularProgress color="primary" size={50} />
                </div>
              ) : (
                <>
                  {listaEmpleados.length > 0 ? (
                    <>
                      <EmpleadoList
                        empleados={listaEmpleados}
                        onEdit={handleEditarEmpleado}
                        onDelete={handlerEliminarEmpleado}
                      />
                      <Pagination
                        currentPage={paginaActual}
                        totalPages={totalPaginas}
                        onPageChange={(page) => setPaginaActual(page)}
                      />
                    </>
                  ) : (
                    <Alert
                      severity="warning"
                      variant="outlined"
                      sx={{
                        mt: 4,
                        borderColor: '#f44336',
                        color: '#f44336',
                        backgroundColor: '#fff0f0',
                      }}
                    >
                      No existen registros con los criterios de búsqueda.
                    </Alert>
                  )}
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