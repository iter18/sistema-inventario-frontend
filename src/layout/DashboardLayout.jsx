import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import logo from '../assets/kuka_back.avif';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      {/* Hacemos que el `main` sea un contenedor de posicionamiento relativo */}
      <main className="relative flex-1 p-6 overflow-y-auto">
        {/* Div para la imagen de fondo. Se posiciona de forma absoluta para llenar el `main`. */}
        <div
          className="absolute inset-0 bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${logo})`, backgroundSize: 'contain' }}
        />
        {/* Contenido principal: con z-index para que esté por encima de la imagen de fondo */}
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
