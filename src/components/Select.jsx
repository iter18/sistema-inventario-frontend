// Un componente de Select genérico y reutilizable

const Select = ({ value, onChange, children, ...props }) => {
  // 'children' aquí serán las etiquetas <option> que le pasemos
  return (
    <select
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 bg-white"
      value={value}
      onChange={onChange}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
