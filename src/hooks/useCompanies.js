import { useState, useEffect } from 'react';
import { getCompaniesRequest } from '../services/companyApiService';

/**
 * Hook para obtener y gestionar la lista de empresas.
 */
export const useCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getCompaniesRequest();
        setCompanies(response.data.data);
      } catch (err) {
        setError('No se pudieron cargar las empresas.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente.

  return { companies, isLoading, error };
};

