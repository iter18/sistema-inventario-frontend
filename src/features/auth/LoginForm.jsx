import { useState, useContext } from 'react';
import {  login as loginAPI } from './authService'; // Importamos nuestra lógica de API
import Input from '../../components/Input'; // Importamos nuestro componente reutilizable
import Button from '../../components/Button'; // Importamos nuestro componente reutilizable
import Select from '../../components/Select'; // Importamos el nuevo componente Select
import logo from '../../assets/KUKA-logo.svg'; // Importamos nuestro logo
import { useCompanies } from '../../hooks/useCompanies'; 
import {useNavigate} from "react-router-dom";
import { AuthContext } from '../../store/AuthContext';
import MenuItem from '@mui/material/MenuItem';

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  // Hook para obtener los datos de las empresas
  const navigate = useNavigate();
  // Creamos estados para guardar lo que el usuario escribe
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   // Poblamos datos de empesa.
  const { companies, isLoading: companiesLoading, error: companiesError } = useCompanies();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene que el navegador recargue la página al enviar el form
    setIsLoading(true);
    setError(null);

    try {
          const response = await loginAPI(email, password,selectedCompany);
          login(response.access_token); // Llamamos a la función de login del contexto para actualizar el estado global
          navigate('/dashboard'); // Redirigimos al dashboard si el login es exitoso
    } catch (err) {
      setError(err.response.data.error); // Si el login falla, guardamos el mensaje de error
    } finally {
      setIsLoading(false); // Pase lo que pase, dejamos de cargar
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md shadow-lg shadow-orange-600">
      <div className="flex justify-center">
        <img src={logo} alt="Logo de la Empresa" className="h-20 text-blue-600" />
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Usamos un div para agrupar la etiqueta y el input si quisiéramos añadirla */}
        <div>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Correo electrónico" required />
        </div>
        <div>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
        </div>
        <div>
          <Select 
          value={selectedCompany} 
          onChange={(e) => setSelectedCompany(e.target.value)} 
          label={companiesLoading ? "Cargando orgnaizaciones..." : "Selecciona la organización"}
          disabled={companiesLoading}>
            {Array.isArray(companies) && companies.map(comp => 
          
            <MenuItem key={comp.id} value={comp.id}>{comp.organizacion}</MenuItem>
            )}
            
          </Select>
        </div>
        {error && <p className="text-sm text-center text-red-600">{error}</p>}
        <Button type="submit" className="w-full py-2 px-4 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading} >
          {isLoading ? 'Cargando...' : 'Ingresar'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
