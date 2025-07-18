import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    // Proporcionamos el contexto de autenticación a los componentes hijos
    // creamos un estado para almacenar la información de autenticación en forma de objeto
  const [auth, setAuth] = useState({
    token: null,
    user: null
    /*roles: [],
    idUsuario: null,
    idOrganizacion: null,*/
  });
  
  // Cargamos el objeto de autenticación desde sessionStorage al iniciar el componente es decir, cuando se recarga la página
    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
        const decodedToken = jwtDecode(storedToken);
        setAuth({
            token: storedToken,
            user: decodedToken.name
            /*roles: decodedToken.roles,
            idUsuario: decodedToken.idUsuario,
            idOrganizacion: decodedToken.idOrganizacion*/
        });
        }
    }, []);

        // Cuando se loguea el usuario, actualizamos el estado de autenticación
    const login = (token) => {
        const decodedToken = jwtDecode(token);
        setAuth({
            token,
            user: decodedToken.name
            /*roles: decodedToken.roles,
            idUsuario: decodedToken.idUsuario,
            idOrganizacion: decodedToken.idOrganizacion*/
        });
        sessionStorage.setItem('token', token);
    }
// Cuando se cierra sesión, actualizamos el estado de autenticación y redirigimos al usuario a la página de inicio
    const logout = () => {
        setAuth({
            token: null,
            user: null
        });
        sessionStorage.clear();
        window.location.href = '/';
    }   
    
    //inyectamos el contexto de autenticación y las funciones de login y logout
    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}