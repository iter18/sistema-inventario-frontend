import {Navigate} from "react-router-dom";

const ProtectedRoute = ({children}) => {

    const isAuthenticated = sessionStorage.getItem("token") !== null;

    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    
    // Si está autenticado, renderiza los hijos (páginas protegidas)
    return children;
    };
    
    export default ProtectedRoute;