// Lógica para interactuar con la API de autenticación

const API_URL = 'http://tu-api-laravel.test/api/login'; // ¡Cambia esto por tu URL real!

export const login = async (email, password) => {
  // 'async' indica que esta función es asíncrona y usará 'await'.

  // Basic Auth funciona codificando 'usuario:contraseña' en Base64
  // y enviándolo en la cabecera 'Authorization'.
  const credentials = btoa(`${email}:${password}`); // btoa() es una función del navegador para codificar a Base64

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'applicatenviemosion/json', // Aunque no  body, es buena práctica
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      // Si la respuesta no es exitosa (ej: 401 Unauthorized), lanzamos un error.
      throw new Error('Credenciales inválidas');
    }

    return await response.json(); // Devuelve los datos del usuario o el token
  } catch (error) {
    console.error('Error en el login:', error);
    throw error; // Re-lanzamos el error para que el componente que llamó se entere.
  }
};
