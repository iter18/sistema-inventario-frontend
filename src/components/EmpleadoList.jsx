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
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Componente para encapsular la lógica del menú de cada fila
const RowMenu = ({ empleadoId, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(empleadoId);
    handleClose();
  };

  const handleDelete = () => {
    onDelete(empleadoId);
    handleClose();
  };

  return (
    <>
      <IconButton aria-label="acciones" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          Eliminar
        </MenuItem>
      </Menu>
    </>
  );
};

const EmpleadoList = ({ empleados, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
      <Table stickyHeader aria-label="tabla de empleados">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>No. empleado</TableCell>
            <TableCell>Correo</TableCell>
            <TableCell align="center">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {empleados.map((emp) => (
            <TableRow hover key={emp.id}>
              <TableCell component="th" scope="row">{emp.nombre}</TableCell>
              <TableCell>{emp.noEmpleado}</TableCell>
              <TableCell>{emp.correo}</TableCell>
              <TableCell align="center">
                <RowMenu empleadoId={emp.id} onEdit={onEdit} onDelete={onDelete} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmpleadoList;
