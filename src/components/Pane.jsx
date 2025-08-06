// src/components/Pane.jsx
import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const ACCENT = '#ffa459';

const StyledPane = styled(Paper)(() => ({
  position: 'relative',
  width: '100%',
  maxWidth: 1200,
  margin: '0 auto',
  padding: '2rem',
  marginTop: '4rem',
  borderRadius: '1.5rem',
  overflow: 'hidden',
  background: 'rgba(255, 255, 255, 0.1)', // más transparente para notar fondo
  WebkitBackdropFilter: 'blur(12px)', // soporte safari
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.35)', // borde suave claro para destacar
  boxShadow: `
    0 16px 48px rgba(0,0,0,0.08),
    0 0 16px rgba(255, 164, 89, 0.12)
  `,
  color: '#1f2937',
  backgroundClip: 'padding-box', // evitar que el borde opaque el blur
  zIndex: 1,
}));

const Pane = ({ children, ...props }) => {
  return (
    <StyledPane elevation={0}>
      {props.title && (
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: '#1f2937',
            position: 'relative',
            mb: 1,
          }}
        >
          {props.title}
          <Box
            component="span"
            sx={{
              position: 'absolute',
              left: '50%',
              bottom: -6,
              width: 80,
              height: 4,
              bgcolor: ACCENT,
              borderRadius: 2,
              transform: 'translateX(-50%)',
              boxShadow: `0 0 10px ${ACCENT}, 0 0 20px rgba(255,164,89,0.4)`,
            }}
          />
        </Typography>
      )}

      {props.descrpcion && (
        <Typography
          variant="body1"
          sx={{
            mt: 2,
            mb: 2,
            px: 1,
            color: '#374151', // gris medio oscuro
            fontSize: '1rem',
            lineHeight: 1.6,
            fontWeight: 500, // un poco más peso para asegurarse de visibilidad
          }}
        >
          {props.descrpcion}
        </Typography>
      )}

      <Box>{children}</Box>
    </StyledPane>
  );
};

export default Pane;
