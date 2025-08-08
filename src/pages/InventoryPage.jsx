import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pane from '../components/Pane';
import Select from '../components/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '../components/Button';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const InventoryPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [vistaActual, setVistaActual] = useState('lista');
    const [tipoEquipo, setTipoEquipo] = useState('');
    const [filtrosBusqueda, setFiltrosBusqueda] = useState({});

    
    // Función para volver a la lista
    const handleVolverALista = () => {
        setVistaActual('lista');
        setSearchParams({});
    };

    // Leer parámetros de URL al cargar el componente
    useEffect(() => {
        const action = searchParams.get('action');
        const empleadoId = true;

        if (action === 'new') {
            setVistaActual('formulario');
        
        } else if (action === 'edit' && empleadoId) {
            // Buscar el empleado por ID y cargarlo para edición
            //const empleado = listaEmpleados.find(emp => emp.id === parseInt(empleadoId));
            if (empleadoSeleccionado) {
            setVistaActual('formulario');
            }
        } else {
            setVistaActual('lista');
        }
    }, [searchParams, /*listaEmpleados*/]);

    const tipoEquipoList = [
        { id: 1, tipo: 'Computo' },
        { id: 2, tipo: 'Móvil' },
        { id: 3, tipo: 'Especializado' }
    ]

    // Función para el alta de nuevo equipo
    const handleNuevoEquipo = () => {
        setVistaActual('formulario');
        setSearchParams({ action: 'new' });
    };
    // Función para manejar la búsqueda con filtros
    const handleBuscar = () => {
        const nuevosFiltros = {};
        if (tipoEquipo) nuevosFiltros.tipoEquipo = tipoEquipo;
        setFiltrosBusqueda(nuevosFiltros);
    };
    // Función para limpiar los filtros de búsqueda
    const handleLimpiarFiltros = () => {
        setTipoEquipo('');
        setFiltrosBusqueda({});
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
            </Pane>
            );
        
        case 'lista':
      default:
        return (
          <Pane 
            title="Gestión de Equipo"
            descrpcion="Aquí podrás dar de alta equipo, editar y eliminar."
          >
            {/* Componente para busqueda */}
            <hr className="border-gray-400 mb-4"></hr>
            <div className="mb-4 flex flex-wrap gap-6 items-center justify-center ">
              <div className="flex flex-col w-90">
                <Select id="tipoEquipo" 
                        name="tipoEquipo" 
                        value={tipoEquipo}
                        onChange={(e) => setTipoEquipo(e.target.value)}
                        className="mt-2 block w-full border-none bg-transparent px-0.5
                            shadow-[inset_0_-2px_0_0_theme(colors.gray.200)]
                            focus:shadow-[inset_0_-2px_0_0_theme(colors.black)]
                            focus:outline-none focus:ring-0"
                          label="Busqueda por tipo de equipo"
                        >
                        {Array.isArray(tipoEquipoList) && tipoEquipoList.map(tipo => (
                          <MenuItem key={tipo.id} value={tipo.id}>{tipo.tipo}</MenuItem>
                        ))}
                </Select>
                {/* Botones de acción */}
                <div className="mb-4 mt-4 flex flex-wrap gap-3">
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<AddIcon />}
                    onClick={handleNuevoEquipo}
                    sx={{
                      borderRadius: 3,
                      textTransform: 'none',
                      boxShadow: 3,
                    }}
                  >
                    Nuevo Equipo
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
          </Pane>
        );
    }
  };

    return (
        <div className="space-y-6">
        {renderizarContenido()}
    </div>
    );
 
};

export default InventoryPage;

