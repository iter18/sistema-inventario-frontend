import axiosClient from './apiConnect/axiosClient';

/**
 * Llama al endpoint público para obtener la lista de empresas.
 * @returns {Promise<import('axios').AxiosResponse>} La respuesta completa de Axios.
 */
export const getCompaniesRequest = () => {
  // Este endpoint es público, por lo que no necesita token.
  // Usamos el cliente base que ya tiene la baseURL configurada.
  return axiosClient.get('organizaciones/lista'); 
};


