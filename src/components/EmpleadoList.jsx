import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';

// Componente para encapsular la lógica del menú de cada fila
const RowMenu = ({ empleado, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null); 
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(empleado);
    handleClose();
  };

  const handleDelete = () => {
    onDelete(empleado.id);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Más opciones">
        <IconButton 
          aria-label="acciones" 
          onClick={handleClick}
          sx={{ 
            '&:hover': { 
              backgroundColor: 'action.hover',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu 
        anchorEl={anchorEl} 
        open={open} 
        onClose={handleClose}
        PaperProps={{
          elevation: 8,
          sx: {
            borderRadius: '12px',
            mt: 1,
            '& .MuiMenuItem-root': {
              borderRadius: '8px',
              mx: 1,
              my: 0.5,
            }
          }
        }}
      >
        <MenuItem onClick={handleEdit} sx={{ gap: 1.5 }}>
          <EditIcon fontSize="small" color="primary" />
          Editar
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main', gap: 1.5 }}>
          <DeleteIcon fontSize="small" />
          Eliminar
        </MenuItem>
      </Menu>
    </>
  );
};

// Función helper para generar color del avatar basado en el nombre
const getAvatarColor = (name) => {
  const colors = ['#1976d2', '#388e3c', '#f57c00', '#7b1fa2', '#d32f2f', '#0288d1'];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

// Función helper para obtener iniciales
const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Función helper para formatear fecha
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  });
};

const EmpleadoList = ({ empleados, onEdit, onDelete }) => {
  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        maxHeight: 500,
        width: '100%',
        overflowX: 'auto',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
      }}
    >
      <Table 
        stickyHeader 
        aria-label="tabla de empleados"
        sx={{ minWidth: 800 }}
      >
        <TableHead sx={{ 
          '& .MuiTableCell-root': {
            backgroundColor: '#ffa459',
            color: '#374151',
          }
        }}>
          <TableRow >
            <TableCell 
              sx={{ 
                minWidth: 200,
                fontWeight: 600,
                color: '#374151',
                borderBottom: '2px solid #e5e7eb',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Empleado
            </TableCell>
            <TableCell 
              sx={{ 
                minWidth: 200,
                fontWeight: 600,
                color: '#374151',
                borderBottom: '2px solid #e5e7eb',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Correo
            </TableCell>
            <TableCell 
              sx={{ 
                minWidth: 150,
                fontWeight: 600,
                color: '#374151',
                borderBottom: '2px solid #e5e7eb',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Departamento
            </TableCell>
            <TableCell 
              sx={{ 
                minWidth: 130,
                whiteSpace: 'nowrap',
                fontWeight: 600,
                color: '#374151',
                borderBottom: '2px solid #e5e7eb',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              F. Ingreso
            </TableCell>
            <TableCell 
              sx={{ 
                minWidth: 100,
                fontWeight: 600,
                color: '#374151',
                borderBottom: '2px solid #e5e7eb',
                fontSize: '0.875rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }} 
              align="center"
            >
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {empleados.map((emp, index) => (
            <TableRow 
              hover 
              key={emp.id}
              sx={{
                '&:hover': {
                  backgroundColor: '#f8fafc',
                  transform: 'scale(1.001)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                },
                '&:nth-of-type(even)': {
                  backgroundColor: '#fafbfc',
                },
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer'
              }}
            >

              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar 
                    sx={{ 
                      width: 40, 
                      height: 40,
                      backgroundColor: getAvatarColor(emp.nombre),
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                    }}
                  >
                    {getInitials(emp.nombre)}
                  </Avatar>
                  <Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: 600,
                        color: '#374151',
                        lineHeight: 1.2
                      }}
                    >
                      {emp.nombre}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: '#6b7280',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        mt: 0.5
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 12 }} />
                      Empleado: #{emp.noEmpleado}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EmailIcon sx={{ fontSize: 16, color: '#6b7280' }} />
                  <Typography 
                    variant="body2"
                    sx={{ 
                      color: '#374151',
                      maxWidth: 180,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {emp.correo}
                  </Typography>
                </Box>
              </TableCell>
              
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Chip 
                  label={emp.departamento.nombre}
                  size="small"
                  sx={{
                    backgroundColor: '#e3f2fd',
                    color: '#1976d2',
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    borderRadius: '12px',
                    '&:hover': {
                      backgroundColor: '#bbdefb',
                    }
                  }}
                />
              </TableCell>
              
              <TableCell 
                sx={{ 
                  whiteSpace: 'nowrap',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: '#374151',
                    fontWeight: 500,
                    backgroundColor: '#f0f9f0',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    display: 'inline-block'
                  }}
                >
                  {formatDate(emp.fechaIngreso)}
                </Typography>
              </TableCell>
              
              <TableCell align="center">
                <RowMenu empleado={emp} onEdit={onEdit} onDelete={onDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmpleadoList;