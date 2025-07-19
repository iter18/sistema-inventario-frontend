import React, { useState } from 'react';
import Pane from '../../components/Pane';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button'; // Importamos nuestro componente reutilizable


const EmpleadoForm = () => {
    // Aquí iría la lógica del formulario de empleado
      const [email, setEmail] = useState('');
      const [nombre, setNombre] = useState('');
      const [fechaIngreso, setFechaIngreso] = useState('');
      const [noEmpleado, setNoEmpleado] = useState('');
      const [selectedDepartamento, setSelectedCompany] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState(null);
   
    
      const handleSubmit = async (event) => {
        event.preventDefault(); // Previene que el navegador recargue la página al enviar el form
        setIsLoading(true);
        setError(null);
    
        try {
 
        } catch (err) {
          setError(err.response.data.error); // Si el login falla, guardamos el mensaje de error
        } finally {
          setIsLoading(false); // Pase lo que pase, dejamos de cargar
        }
      };
    
    return (
        <div>
        {/* Aquí irían los campos del formulario */}
        <Pane title="Formulario de Empleado"
              descrpcion = "En esta sección podrás gestionar empleados. Añadir, editar o eliminar según sea necesario.">
                <div className="px-4 sm:px-9 lg:px-8">
                    <hr className="border-gray-400"></hr>
                    <div className="mt-8 max-w-3xl">
                        <form className="space-y-4 ">
                            {/*<form className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">*/}
                            <label className="block">
                                <span className="text-gray-700">Nombre completo</span>
                                 <Input type="text" 
                                        className="mt-1 block w-full border-none bg-transparent px-0.5
                                            shadow-[inset_0_-2px_0_0_theme(colors.gray.200)]
                                            focus:shadow-[inset_0_-2px_0_0_theme(colors.black)]
                                            focus:outline-none focus:ring-0" 
                                        value={nombre} 
                                        onChange={(e) => setNombre(e.target.value)} 
                                        placeholder="Juan Pérez" 
                                        required />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Email</span>
                                <Input type="email" 
                                        className="mt-1 block w-full border-none bg-transparent px-0.5
                                            shadow-[inset_0_-2px_0_0_theme(colors.gray.200)]
                                            focus:shadow-[inset_0_-2px_0_0_theme(colors.black)]
                                            focus:outline-none focus:ring-0" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        placeholder="usuario@kuka.com" 
                                        required />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">No. empleado</span>
                                <Input type="text" 
                                        className="mt-1 block w-full border-none bg-transparent px-0.5
                                            shadow-[inset_0_-2px_0_0_theme(colors.gray.200)]
                                            focus:shadow-[inset_0_-2px_0_0_theme(colors.black)]
                                            focus:outline-none focus:ring-0" 
                                        value={noEmpleado} 
                                        onChange={(e) => setNoEmpleado(e.target.value)} 
                                        placeholder="24060" 
                                        required />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Departamento</span>
                                <Select value={selectedDepartamento} 
                                        onChange={(e) => selectedDepartamento(e.target.value)} 
                                        className="mt-2 block w-full border-none bg-transparent px-0.5
                                            shadow-[inset_0_-2px_0_0_theme(colors.gray.200)]
                                            focus:shadow-[inset_0_-2px_0_0_theme(colors.black)]
                                            focus:outline-none focus:ring-0"
                                        >
                                        <option>0001 - Departamento 1</option>
                                        <option>0002 - Departamento 2</option>
                                        <option>0003 - Departamento 3</option>
                                </Select>
                            </label>
                             <label className="block">
                              <span className="text-gray-700">Fecha de ingreso</span>
                              <Input type="date" 
                                        className="mt-1 block w-full border-none bg-transparent px-0.5
                                            shadow-[inset_0_-2px_0_0_theme(colors.gray.200)]
                                            focus:shadow-[inset_0_-2px_0_0_theme(colors.black)]
                                            focus:outline-none focus:ring-0" 
                                        value={fechaIngreso} 
                                        onChange={(e) => setFechaIngreso(e.target.value)} 
                                        required />
                            </label>
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
                  {/* Tabla de resultados 
  {resultados.length > 0 && (
    <div className="overflow-x-auto rounded-lg border border-gray-300">
      <table className="min-w-full table-auto text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 font-semibold">
          <tr>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {resultados.map((item, index) => (
            <tr key={item.id}>
              <td className="px-4 py-2">{item.nombre}</td>
              <td className="px-4 py-2">{item.email}</td>
              <td className="px-4 py-2">{item.fecha}</td>
              <td className="px-4 py-2 text-center">
                
                <button className="relative group">
                  <svg className="w-5 h-5 text-gray-600 hover:text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM10 8a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM10 13a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
                  </svg>
                  <div className="absolute z-10 hidden group-hover:block right-0 mt-2 bg-white border rounded shadow-lg">
                    <button className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left">Editar</button>
                    <button className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left text-red-600">Eliminar</button>
                  </div>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}  */}
   {/* Tabla de resultados */}
      <div className="mt-10 overflow-x-auto">
        <table className="min-w-full bg-white border rounded shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left text-sm uppercase">
              <th className="px-4 py-3 border-b">ID</th>
              <th className="px-4 py-3 border-b">Nombre</th>
              <th className="px-4 py-3 border-b">Correo</th>
              <th className="px-4 py-3 border-b">Rol</th>
              <th className="px-4 py-3 border-b text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {[
              { id: 1, nombre: 'Juan Pérez', correo: 'juan@mail.com', rol: 'Admin' },
              { id: 2, nombre: 'Ana López', correo: 'ana@mail.com', rol: 'Usuario' },
              { id: 3, nombre: 'Carlos Ruiz', correo: 'carlos@mail.com', rol: 'Editor' }
            ].map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b">{user.id}</td>
                <td className="px-4 py-3 border-b">{user.nombre}</td>
                <td className="px-4 py-3 border-b">{user.correo}</td>
                <td className="px-4 py-3 border-b">{user.rol}</td>
                <td className="px-4 py-3 border-b text-center">
                  <div className="relative group inline-block">
                    <button className="px-2 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700">
                      ⋮
                    </button>
                    <div className="absolute right-0 z-10 hidden group-hover:block bg-white border rounded shadow-md mt-1 w-28">
                      <button className="block w-full px-3 py-2 text-sm text-left hover:bg-gray-100">
                        Editar
                      </button>
                      <button className="block w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-gray-100">
                        Eliminar
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </Pane>
    
        {/* Aquí podrías añadir más componentes o lógica según sea necesario */}
        </div>
    );
    }
    
export default EmpleadoForm;