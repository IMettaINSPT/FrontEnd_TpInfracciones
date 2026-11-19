import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AddIcon from '@mui/icons-material/Add';
import PaymentsIcon from '@mui/icons-material/Payments';
import PeopleIcon from '@mui/icons-material/People';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../hooks/useAuth';

const DRAWER_WIDTH = 240;

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  permiso: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Panel de Control', to: '/panel', icon: <DashboardIcon />, permiso: 'panel:ver' },
  { label: 'Reportes', to: '/reportes', icon: <AssessmentIcon />, permiso: 'deuda:consultar' },
  { label: 'Infracciones', to: '/infracciones', icon: <ReceiptLongIcon />, permiso: 'infraccion:ver' },
  { label: 'Labrar Acta', to: '/infracciones/nueva', icon: <AddIcon />, permiso: 'infraccion:crear' },
  { label: 'Pagos / Caja', to: '/pagos', icon: <PaymentsIcon />, permiso: 'pago:ver' },
  { label: 'Titulares y Vehículos', to: '/titulares', icon: <PeopleIcon />, permiso: 'titular:ver' },
  { label: 'Usuarios', to: '/usuarios', icon: <ManageAccountsIcon />, permiso: 'usuarios:gestionar' },
  { label: 'Perfiles y Permisos', to: '/perfiles', icon: <AdminPanelSettingsIcon />, permiso: 'perfiles:gestionar' },
];

export default function Layout() {
  const { user, logout, hasPermission } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const visibleItems = NAV_ITEMS.filter((item) => hasPermission(item.permiso));

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${DRAWER_WIDTH}px)`, ml: `${DRAWER_WIDTH}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Gestión de Infracciones
          </Typography>

          <Typography variant="body2" sx={{ mr: 2 }}>
            {user?.nombre}
          </Typography>

          <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
            Salir
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
        }}
        open
      >
        <Toolbar>
          <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold' }}>
            Tránsito Municipal
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {visibleItems.map((item) => (
            <ListItem key={item.to} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.to}
                sx={{
                  '&.active': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': { color: 'primary.contrastText' },
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}