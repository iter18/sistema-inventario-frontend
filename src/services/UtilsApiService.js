import axiosClientPrivate from "./apiConnect/axiosClientPrivate";

//funcion para obtener lista de departamentos
export const getDepartamentosRequest = () => {
  return axiosClientPrivate.get('departamentos/listaPorOrganizacion');
}