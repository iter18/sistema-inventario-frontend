import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import AuthLayout from '../layout/AuthLayout';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas que usan el layout de autenticación (centrado, fondo simple) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          {/* Aquí podríamos añadir /register, /forgot-password, etc. */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

