import { useState,useContext } from 'react';
import { NavLink } from 'react-router-dom';
import kukaLogo from '../assets/KUKA-logo.svg';
import { AuthContext } from '../store/AuthContext';

// --- Iconos de ejemplo (SVG) ---
const HomeIcon = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const InventoryIcon = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap=""  d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"  /></svg>;
const UsersIcon = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 0112 13a5.995 5.995 0 014 1.803M15 21a6 6 0 00-9-5.197" /></svg>;
const MenuIcon = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>;
const LogOutIcon = () => <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" /></svg>;


const Sidebar = () => {
  //importamos logout de contexto de autenticación
  const { logout } = useContext(AuthContext);
  // Estado para controlar si la barra lateral está abierta o cerrada
  const [isOpen, setIsOpen] = useState(true);

  return (
    // Contenedor principal de la barra lateral
    // - h-screen: Ocupa toda la altura de la pantalla
    // - bg-gray-800: Fondo gris oscuro
    // - text-white: Texto blanco
    // - Ancho condicional: 'w-64' (ancho) si está abierto, 'w-20' si está cerrado
    // - transition-all duration-300: Anima todos los cambios (el ancho) durante 300ms
    <div className={`h-screen bg-zinc-900 text-white flex flex-col ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 shadow-lg shadow-orange-600`}>
      {/* --- Cabecera de la Barra Lateral --- */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {/* Logo: se oculta si la barra está cerrada */}
        <img src={kukaLogo} alt="Logo" className={`h-8 ${!isOpen && 'hidden'}`} />
        {/* Botón de Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-gray-700">
          <MenuIcon />
        </button>
      </div>

      {/* --- Navegación --- */}
      <nav className="flex-grow pt-4">
        <ul>
          <li>
            {/* Usamos NavLink para que el link activo se pueda estilizar */}
            <NavLink 
              to="/dashboard" 
              className={({ isActive }) => `flex items-center p-4 text-sm hover:bg-gray-700 ${isActive ? 'bg-gray-900' : ''}`}
            >
              <HomeIcon />
              {/* El texto del link se oculta si la barra está cerrada */}
              <span className={`ml-4 whitespace-nowrap ${!isOpen && 'hidden'}`}>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/products"
              className={({ isActive }) => `flex items-center p-4 text-sm hover:bg-gray-700 ${isActive ? 'bg-gray-900' : ''}`}
            >
              <InventoryIcon />
              <span className={`ml-4 whitespace-nowrap ${!isOpen && 'hidden'}`}>Inventario</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/portal/empleados"
              className={({ isActive }) => `flex items-center p-4 text-sm hover:bg-gray-700 ${isActive ? 'bg-gray-900' : ''}`}
            >
              <UsersIcon />
              <span className={`ml-4 whitespace-nowrap ${!isOpen && 'hidden'}`}>Empleados</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="flex items-center w-full p-4 text-sm rounded-md hover:bg-gray-700">
    
        <button className="flex p-2 rounded-md hover:bg-gray-700" onClick={logout}>
          <LogOutIcon />
          <span className={`ml-4 whitespace-nowrap ${!isOpen && 'hidden'}`}>Cerrar Sesión</span>
          {/* Al hacer clic, llamamos a la función de logout del contexto */}

        </button>
      </div>
    </div>
  );
};

export default Sidebar;

