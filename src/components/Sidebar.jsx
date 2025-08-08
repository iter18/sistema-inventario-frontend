import { useState, useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Typography,
  Divider,
  Avatar,
  Tooltip,
  styled,
  useTheme
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  Menu as MenuIcon,
  Logout as LogoutIcon,
  ExpandLess,
  ExpandMore,
  Computer as ComputerIcon,
  Assignment as AssignmentIcon,
  Assessment as ReportsIcon,
} from '@mui/icons-material';
import kukaLogo from '../assets/KUKA-logo.svg';
import { AuthContext } from '../store/AuthContext';

const DRAWER_WIDTH = 280;
const DRAWER_WIDTH_COLLAPSED = 80;

// Styled components con efectos glow
const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    width: open ? DRAWER_WIDTH : DRAWER_WIDTH_COLLAPSED,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: '#0a0a0a',
    backgroundImage: 'linear-gradient(145deg, #0a0a0a 0%, #111111 50%, #1a1a1a 100%)',
    border: 'none',
    boxShadow: `
      8px 0 32px rgba(255, 164, 89, 0.4),
      4px 0 16px rgba(255, 164, 89, 0.2),
      2px 0 8px rgba(255, 164, 89, 0.1),
      inset -1px 0 0 rgba(255, 164, 89, 0.1)
    `,
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: '1px',
      height: '100%',
      background: 'linear-gradient(180deg, transparent, rgba(255, 164, 89, 0.8), transparent)',
      animation: 'glow 3s ease-in-out infinite alternate',
    },
  },
  '@keyframes glow': {
    '0%': { opacity: 0.4 },
    '100%': { opacity: 1 },
  },
}));


const GlowListItemButton = styled(ListItemButton)(({ theme, active }) => ({
  borderRadius: '12px',
  margin: '4px 12px',
  minHeight: 56,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  
  ...(active && {
    backgroundColor: 'rgba(255, 164, 89, 0.15)',
    boxShadow: `
      0 0 20px rgba(255, 164, 89, 0.4),
      0 0 40px rgba(255, 164, 89, 0.2),
      inset 0 0 20px rgba(255, 164, 89, 0.1)
    `,
    border: '1px solid rgba(255, 164, 89, 0.3)',
    
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, transparent, rgba(255, 164, 89, 0.1), transparent)',
      animation: 'shimmer 2s infinite',
    },
  }),
  
  '&:hover': {
    backgroundColor: active ? 'rgba(255, 164, 89, 0.2)' : 'rgba(255, 164, 89, 0.08)',
    transform: 'translateX(4px)',
    boxShadow: active 
      ? `0 0 25px rgba(255, 164, 89, 0.5), 0 0 50px rgba(255, 164, 89, 0.3)`
      : '0 4px 16px rgba(255, 164, 89, 0.2)',
  },
  
  '@keyframes shimmer': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' }
  },
}));

const GlowIcon = styled(Box)(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: active ? '#ffa459' : '#8892b0',
  filter: active ? 'drop-shadow(0 0 8px rgba(255, 164, 89, 0.6))' : 'none',
  transition: 'all 0.3s ease',
}));

const GlowText = styled(Typography)(({ active }) => ({
  color: active ? '#ffa459' : '#ccd6f6',
  fontWeight: active ? 600 : 400,
  textShadow: active ? '0 0 10px rgba(255, 164, 89, 0.5)' : 'none',
  transition: 'all 0.3s ease',
}));

const SubMenuItem = styled(ListItemButton)(({ theme, active }) => ({
  borderRadius: '8px',
  margin: '2px 20px 2px 40px',
  minHeight: 40,
  backgroundColor: active ? 'rgba(255, 164, 89, 0.1)' : 'transparent',
  border: active ? '1px solid rgba(255, 164, 89, 0.3)' : '1px solid transparent',
  
  '&:hover': {
    backgroundColor: 'rgba(255, 164, 89, 0.05)',
    transform: 'translateX(4px)',
  },
  
  '&::before': active ? {
    content: '""',
    position: 'absolute',
    left: '-20px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '3px',
    height: '20px',
    backgroundColor: '#ffa459',
    borderRadius: '2px',
    boxShadow: '0 0 10px rgba(255, 164, 89, 0.8)',
  } : {},
}));

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(true);
  const [inventoryOpen, setInventoryOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
    { name: 'Empleados', path: '/portal/empleados', icon: PeopleIcon },
  ];

  const inventorySubmenu = [
    { name: 'Equipo Hardware', path: '/portal/inventario', icon: ComputerIcon },
    { name: 'Asignaciones', path: '/inventory/assignments', icon: AssignmentIcon },
    { name: 'Reportes', path: '/inventory/reports', icon: ReportsIcon },
  ];

  const isItemActive = (path) => location.pathname === path;
  const isInventoryActive = inventorySubmenu.some(item => location.pathname === item.path);

  return (
    <StyledDrawer
      variant="permanent"
      open={isOpen}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 164, 89, 0.1)',
          background: 'linear-gradient(135deg, rgba(255, 164, 89, 0.1) 0%, transparent 100%)',
        }}>
          {isOpen && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

              <img src={kukaLogo} alt="Logo" className={`h-8 ${!isOpen && 'hidden'}`} />
            </Box>
          )}
          
          <Tooltip title={isOpen ? 'Colapsar' : 'Expandir'} placement="right">
            <IconButton
              onClick={() => setIsOpen(!isOpen)}
              sx={{
                color: '#ffa459',
                backgroundColor: 'rgba(255, 164, 89, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 164, 89, 0.2)',
                  transform: 'rotate(180deg)',
                  boxShadow: '0 0 15px rgba(255, 164, 89, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Navigation */}
        <Box sx={{ flex: 1, py: 2 }}>
          <List>
            {/* Regular menu items */}
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(item.path);
              
              return (
                <ListItem key={item.name} disablePadding>
                  <GlowListItemButton
                    component={NavLink}
                    to={item.path}
                    active={active}
                  >
                    <ListItemIcon sx={{ minWidth: isOpen ? 56 : 'auto', justifyContent: 'center' }}>
                      <GlowIcon active={active}>
                        <Icon />
                      </GlowIcon>
                    </ListItemIcon>
                    {isOpen && (
                      <ListItemText>
                        <GlowText active={active}>{item.name}</GlowText>
                      </ListItemText>
                    )}
                  </GlowListItemButton>
                </ListItem>
              );
            })}

            {/* Inventory with submenu */}
            <ListItem disablePadding>
              <GlowListItemButton
                active={isInventoryActive}
                onClick={() => setInventoryOpen(!inventoryOpen)}
              >
                <ListItemIcon sx={{ minWidth: isOpen ? 56 : 'auto', justifyContent: 'center' }}>
                  <GlowIcon active={isInventoryActive}>
                    <InventoryIcon />
                  </GlowIcon>
                </ListItemIcon>
                {isOpen && (
                  <>
                    <ListItemText>
                      <GlowText active={isInventoryActive}>Inventario</GlowText>
                    </ListItemText>
                    {inventoryOpen ? (
                      <ExpandLess sx={{ color: '#ffa459' }} />
                    ) : (
                      <ExpandMore sx={{ color: '#8892b0' }} />
                    )}
                  </>
                )}
              </GlowListItemButton>
            </ListItem>

            {/* Submenu */}
            <Collapse in={inventoryOpen && isOpen} timeout="auto" unmountOnExit>
              <List>
                {inventorySubmenu.map((item) => {
                  const Icon = item.icon;
                  const active = isItemActive(item.path);
                  
                  return (
                    <ListItem key={item.name} disablePadding>
                      <SubMenuItem
                        component={NavLink}
                        to={item.path}
                        active={active}
                      >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          <GlowIcon active={active}>
                            <Icon sx={{ fontSize: 20 }} />
                          </GlowIcon>
                        </ListItemIcon>
                        <ListItemText>
                          <GlowText variant="body2" active={active}>
                            {item.name}
                          </GlowText>
                        </ListItemText>
                      </SubMenuItem>
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          </List>
        </Box>

        {/* Logout */}
        <Box sx={{ p: 2, borderTop: '1px solid rgba(255, 164, 89, 0.1)' }}>
          <Tooltip title="Cerrar Sesión" placement="right">
            <GlowListItemButton onClick={logout}>
              <ListItemIcon sx={{ minWidth: isOpen ? 56 : 'auto', justifyContent: 'center' }}>
                <GlowIcon>
                  <LogoutIcon />
                </GlowIcon>
              </ListItemIcon>
              {isOpen && (
                <ListItemText>
                  <GlowText>Cerrar Sesión</GlowText>
                </ListItemText>
              )}
            </GlowListItemButton>
          </Tooltip>
        </Box>
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar;