import { useState } from 'react';
import { login } from './authService'; // Importamos nuestra lógica de API
import Input from '../../components/Input'; // Importamos nuestro componente reutilizable
import Button from '../../components/Button'; // Importamos nuestro componente reutilizable
import Select from '../../components/Select'; // Importamos el nuevo componente Select
import logo from '../../assets/KUKA-logo.svg'; // Importamos nuestro logo
import { useCompanies } from '../../hooks/useCompanies'; 

const LoginForm = () => {
  // Hook para obtener los datos de las empresas


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
      const userData = await login(email, password,selectedCompany);
      console.log('Login exitoso:', userData);
      // Aquí, en un futuro, guardaríamos el token y redirigiríamos al usuario
    } catch (err) {
      setError(err.response.data.error); // Si el login falla, guardamos el mensaje de error
    } finally {
      setIsLoading(false); // Pase lo que pase, dejamos de cargar
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
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
          <Select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)} disabled={companiesLoading}>
            <option value="">{companiesLoading ? 'Cargando empresas...' : 'Seleccione una empresa'}</option>
            {Array.isArray(companies) && companies.map(comp => <option key={comp.id} value={comp.id}>{comp.organizacion}</option>)}
          </Select>
        </div>
        {error && <p className="text-sm text-center text-red-600">{error}</p>}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Ingresar'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
