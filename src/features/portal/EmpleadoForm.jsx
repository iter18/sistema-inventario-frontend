import Pane from '../../components/Pane';


const EmpleadoForm = () => {
    // Aquí iría la lógica del formulario de empleado
    return (
        <div>
        {/* Aquí irían los campos del formulario */}
        <Pane title="Formulario de Empleado"
              descrpcion = "En esta sección podrás gestionar empleados. Añadir, editar o eliminar según sea necesario.">
                <div className="px-4 sm:px-9 lg:px-8">
                    <hr className="border-gray-400"></hr>
                    <div className="mt-8 max-w-3xl">
                        <form className="space-y-4 ">
                            <label className="block">
                                <span className="text-gray-700">Nombre completo</span>
                                <input
                                type="text"
                                className="mt-0 block w-full border-none bg-transparent px-0.5
                                            shadow-[inset_0_-2px_0_0_theme(colors.gray.200)]
                                            focus:shadow-[inset_0_-2px_0_0_theme(colors.black)]
                                            focus:outline-none focus:ring-0"
                                placeholder="Juan Pérez"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Email</span>
                                <input
                                type="email"
                                className="mt-0 block w-full border-0 border-b-2 border-gray-200 px-0.5 focus:border-black focus:ring-0"
                                placeholder="john@example.com"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">No. empleado</span>
                                <input
                                type="text"
                                className="mt-0 block w-full border-0 border-b-2 border-gray-200 px-0.5 focus:border-black focus:ring-0"
                                placeholder="24060"
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Fecha de ingreso</span>
                                <select
                                className="mt-0 block w-full border-0 border-b-2 border-gray-200 pl-0.5 pr-10 focus:border-black focus:ring-0"
                                >
                                    <option>DD/MM/YYYY</option>
                                    <option>Wedding</option>
                                    <option>Birthday</option>
                                <option>Other</option>
                                </select>
                            </label>
                            {/*<label className="block">
                                <span className="text-gray-700">Additional details</span>
                                <textarea
                                className="mt-0 block w-full border-0 border-b-2 border-gray-200 px-0.5 focus:border-black focus:ring-0"
                                rows="2"
                                ></textarea>
                            </label> */}
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
                            </div>
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