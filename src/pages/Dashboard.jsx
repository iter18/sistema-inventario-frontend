import logo from '../assets/kuka_back.avif';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../store/AuthContext';


const Dashboard = () => {
    // Obtenemos el nombre de usuario del sessionStorage al cargar el componente
    // Esto es para mostrar el nombre de usuario en el dashboard
    const { auth } = useContext(AuthContext);


    const [username, setUsername] = useState('');
    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);
  return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <div className="max-w-md p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Bienvenido, {auth.user}</h1>
            <p className="text-center text-gray-600 mb-6">Aquí podrás gestionar tus datos y acceder a las funcionalidades del sistema.</p>
        </div>  
            <img src={logo} alt="Logo de KUKA" className="h-64 opacity-25" />
        </div>
  );
};

export default Dashboard;