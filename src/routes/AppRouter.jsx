import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import AuthLayout from '../layout/AuthLayout';
import DashboardLayout from '../layout/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta principal: redirige a /dashboard si el usuario está autenticado */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Rutas que usan el layout de autenticación (centrado, fondo simple) 
         Rutas publicas como login, registro, etc.
        */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          {/* Aquí podríamos añadir /register, /forgot-password, etc. */}
        </Route>
        {/* Rutas que usan el layout del dashboard (barra lateral, contenido principal) 
          Estas rutas están protegidas y requieren autenticación
        */}
        <Route path="/dashboard" element={   
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>}>
          <Route index element={<Dashboard />} /> {/* Página principal del dashboard */}
         {/* <Route path="products" element={<ProductsPage />} /> Página de productos */}
  
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

