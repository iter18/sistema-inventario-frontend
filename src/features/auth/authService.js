// Lógica para interactuar con la API de autenticación
import axiosClient from '../../services/apiConnect/axiosClient';


export const login = async (email, password,selectedCompany) => {
  // 'async' indica que esta función es asíncrona y usará 'await'.

  // Basic Auth funciona codificando 'usuario:contraseña' en Base64
  // y enviándolo en la cabecera 'Authorization'.
  const credentials = btoa(`${email}:${password}`); // btoa() es una función del navegador para codificar a Base64

  try {
    const response = await axiosClient.post('auth/login', 
      {},//body vacío porque usamos Basic Auth
      // Enviamos las credenciales en la cabecera de la solicitud 
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          'X-organizacionId': selectedCompany, // Enviamos la empresa seleccionada
        },
      });
        

    // axios ya convierte la respuesta en JSON automáticamente
    return response.data;
  } catch (error) {
    console.error('Error en el login:', error);
    throw error; // Re-lanzamos el error para que el componente que llamó se entere.
  }
};

export const logout = () => {
  // Aquí podrías hacer una llamada a la API para cerrar sesión si es necesario.
  // Por ahora, simplemente eliminamos el token del sessionStorage.
  sessionStorage.clear();
  // También podrías redirigir al usuario a la página de inicio o login.
  window.location.href = '/';
} 

