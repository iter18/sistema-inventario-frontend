import axios from 'axios';

// 1. Creamos una instancia de Axios con configuración base.
const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api', // Tu URL base del backend
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// 2. (Próximamente) Interceptor para añadir el token a cada petición.
// axiosClient.interceptors.request.use((config) => {
//   const token = sessionStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// 3. (Próximamente) Interceptor para manejar errores globales.
// axiosClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Aquí manejaremos errores 401, 500, etc. de forma global.
//   }
// );

export default axiosClient;

