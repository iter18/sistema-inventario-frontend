// Un componente de Input genérico y reutilizable

const Input = ({ type = 'text', value, onChange, placeholder, ...props }) => {
  // Desestructuramos las props para obtener las que nos interesan.
  // 'type = 'text'' es un valor por defecto. Si no nos pasan 'type', será 'text'.
  // '...props' recoge cualquier otra prop que nos pasen (como 'required', 'autoComplete', etc.)
  const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200";
  return (
    <input
      className={`${baseClasses} ${props.className || ''}`} // Podríamos añadir estilos genéricos para todos los inputs
      type={type}
      value={value}
      id={props.id} // Si nos pasan un id, lo usamos; si no, no se añade
      name={props.name} // Similar al id, para el atributo name
      onChange={onChange}
      placeholder={placeholder}
       onBlur={props.onBlur} // Si nos pasan una función para manejar el evento onBlur, la usamos
      {...props} // Pasamos el resto de las props directamente al elemento <input>
    />
  );
};

export default Input;
