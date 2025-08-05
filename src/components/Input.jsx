// Un componente de Input genérico y reutilizable

import * as React from 'react';
import TextField from '@mui/material/TextField';

const Input = ({ type = 'text', value, onChange, placeholder,obligatorio = false, isError = false, ...props}) => {
  // Desestructuramos las props para obtener las que nos interesan.
  // 'type = 'text'' es un valor por defecto. Si no nos pasan 'type', será 'text'.
  // '...props' recoge cualquier otra prop que nos pasen (como 'required', 'autoComplete', etc.)
  const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200";
  return (
    //<input
      //className={`${baseClasses} ${props.className || ''}`} // Podríamos añadir estilos genéricos para todos los inputs
      //type={type}
      //value={value}
      //id={props.id} // Si nos pasan un id, lo usamos; si no, no se añade
      //name={props.name} // Similar al id, para el atributo name
      //onChange={onChange}
      //placeholder={placeholder}
       //onBlur={props.onBlur} // Si nos pasan una función para manejar el evento onBlur, la usamos
      //{...props} // Pasamos el resto de las props directamente al elemento <input>
    ///>

       <TextField
      required={obligatorio}
      error={isError}
      id={props.id}
      label={props.label}
      name={props.name}
      type={type}
      value={value}
      onChange={onChange}
      variant="filled"
      onBlur={props.onBlur}
      placeholder={placeholder}
      fullWidth
      sx={{
            '& .MuiFilledInput-root': {
            backgroundColor: 'transparent',
            focus: {
              backgroundColor: 'transparent',
            },
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '&.Mui-focused': {
              backgroundColor: 'transparent',
            },
      }
  }}
    />

   

  );
};

export default Input;
