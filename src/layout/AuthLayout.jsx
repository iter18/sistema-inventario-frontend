import { Outlet } from 'react-router-dom';

// Este componente actúa como la "cáscara" de nuestra aplicación.
// Define el layout principal (fondo, centrado, etc.).
const AuthLayout = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-800">
      <Outlet /> {/* Aquí es donde React Router renderizará la página actual (ej. LoginPage) */}
    </main>
  );
};

export default AuthLayout;