// Un componente de Select genérico y reutilizable
import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MuiSelect from '@mui/material/Select'; // 1. Renombramos el import para evitar colisión
import FormHelperText from '@mui/material/FormHelperText';

const Select = ({
  label,
  value,
  onChange,
  onBlur,
  name,
  id,
  children,
  disabled,
  isError,
  helperText,
  obligatorio=false,
  ...props
}) => {
  const labelId = `${id}-label`;
  // 2. Usamos FormControl para agrupar el Label y el Select, una práctica estándar en MUI.
  return (
    <FormControl fullWidth variant="filled" error={isError} disabled={disabled}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <MuiSelect
        required={obligatorio}
        labelId={labelId}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label} // La prop label es importante para que el InputLabel flote correctamente

        {...props}
        sx={{
          backgroundColor: 'transparent',
          '&:before': {
            borderBottomColor: 'rgba(0,0,0,0.42)', // línea inferior antes de focus
          },
          '&:hover:before': {
            borderBottomColor: 'rgba(0,0,0,0.87)', // línea inferior al pasar el mouse
          },
          '&:after': {
            borderBottomColor: 'blue', // línea inferior al enfocar
          }
        }}
      >
        {children}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
