// src/components/Pane.jsx

// Este componente Pane es un contenedor reutilizable que puede ser utilizado para mostrar contenido con un título y un estilo consistente.
const Pane = ({children, ...props}) => {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 mt-16 bg-white bg-white/70 border rounded-2xl shadow">
      <h2 className="text-2xl font-bold text-center uppercase mb-4">{}{props.title}</h2>
      <p className=" mt-5 mx-8 text-left text-gray-600 mb-6">{props.descrpcion}</p>
      {children}
    </div>
  );
};

export default Pane;

//