import { Button as MuiButton } from '@mui/material';

const Button = ({
  onClick,
  children,
  type = 'button',
  startIcon,
  endIcon,
  variant = 'contained',
  color = 'primary',
  sx = {},
  ...props
}) => {
  return (
    <MuiButton
      type={type}
      variant={variant}
      color={color}
      onClick={onClick}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        borderRadius: 3,
        textTransform: 'none',
        boxShadow: 3,
        ...sx, // Permite sobreescribir estilos desde fuera
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
