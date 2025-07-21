import axios from 'axios';
import AlertService from '../../utils/AlertService';
import { logout } from '../../features/auth/authService';

// 1. Creamos una instancia de Axios con configuración base.
const axiosClientPrivate = axios.create({
  baseURL: 'http://localhost:8000/api', // Tu URL base del backend
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/// Interceptor para agregar el token automáticamente a todas las peticiones privadas
axiosClientPrivate.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token'); // Leemos el token desde sessionStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agregamos el token a los headers
  }
  return config; // Retornamos la configuración modificada
});

//  Interceptor para manejar errores globales.
axiosClientPrivate.interceptors.response.use(
   (response) => response,
     (error) => {
    // Aquí manejaremos errores 401, 500, etc. de forma global.
    if (error.response && error.response.status === 401) {
      // Aquí podrías redirigir al usuario a la página de login o mostrar un mensaje de error.
      console.error('Token inválido o expirado');
      AlertService.error('Error','Sesión inválida, por favor inicia sesión nuevamente.')
      .then(() => logout());
         // Llamamos a la función de logout para limpiar el estado de autenticación
    }
    return Promise.reject(error);
  }
);


export default axiosClientPrivate;