// Un componente de Input genérico y reutilizable

const Input = ({ type = 'text', value, onChange, placeholder, ...props }) => {
  // Desestructuramos las props para obtener las que nos interesan.
  // 'type = 'text'' es un valor por defecto. Si no nos pasan 'type', será 'text'.
  // '...props' recoge cualquier otra prop que nos pasen (como 'required', 'autoComplete', etc.)

  return (
    <input
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" // Podríamos añadir estilos genéricos para todos los inputs
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props} // Pasamos el resto de las props directamente al elemento <input>
    />
  );
};

export default Input;
