import {useState, useEffect} from 'react';
import {getDepartamentosRequest} from '../services/UtilsApiService';
import AlertService  from '../utils/AlertService';

export const useDepartamentos = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); 



  useEffect(() => {
    const fetchDepartamentos = async () => {
        console.log('Fetching departamentos...');
      try {
        const response = await getDepartamentosRequest();
        setDepartamentos(response.data.data);

      } catch (err) {
        setError('No se pudieron cargar los departamentos.');
         AlertService.error('No tienes permisos para acceder a los departamentos');
            return;
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartamentos();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente.

  return { departamentos, isLoading, error };
}