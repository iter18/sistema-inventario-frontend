// Un componente de Botón genérico y reutilizable

const Button = ({ onClick, children, type = 'button', ...props }) => {
  // 'children' es una prop especial. Es todo lo que pongas ENTRE las etiquetas del componente.
  // Ejemplo: <Button>Este es el children</Button>

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      {...props}>
      {children}
    </button>
  );
};

export default Button;
