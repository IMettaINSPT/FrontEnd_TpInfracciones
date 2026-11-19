// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';
import { theme } from './configs/theme';
import { AuthProvider } from './hooks/useAuth';
import { RequireAuth, RequirePermission } from './components/RequireAuth';
import Layout from './components/Layout';
import Login from './routes/Login';
import HomeRedirect from './routes/HomeRedirect';
import Panel from './routes/Panel';
import Reporte from './routes/Reportes';

const Placeholder = ({ title }: { title: string }) => (
  <Box>
    <Typography variant="h4" gutterBottom>
      {title}
    </Typography>
    <Typography color="text.secondary">Pantalla pendiente de implementar</Typography>
  </Box>
);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Pública */}
            <Route path="/login" element={<Login />} />

            {/* Privadas */}
            <Route element={<RequireAuth />}>
              <Route element={<Layout />}>
                <Route path="/" element={<HomeRedirect />} />

                {/* 1, 2 y 3. Panel de Control y consultas de deuda */}
                <Route element={<RequirePermission permiso="panel:ver" />}>
                  <Route path="/panel" element={<Panel />} />
                </Route>
                <Route element={<RequirePermission permiso="deuda:consultar" />}>
                  <Route path="/reportes" element={<Reporte />} />
                </Route>
                {/* 4 y 5. Listado y Detalle de Infracciones */}
                <Route element={<RequirePermission permiso="infraccion:ver" />}>
                  <Route path="/infracciones" element={<Placeholder title="Listado de Infracciones" />} />
                </Route>

                {/* 6. Labrar Acta */}
                <Route element={<RequirePermission permiso="infraccion:crear" />}>
                  <Route path="/infracciones/nueva" element={<Placeholder title="Labrar Nueva Infracción" />} />
                </Route>

                {/* 7 y 8. Pagos / Caja */}
                <Route element={<RequirePermission permiso="pago:ver" />}>
                  <Route path="/pagos" element={<Placeholder title="Pagos / Caja" />} />
                </Route>

                {/* 9. Padrón de Titulares y Vehículos */}
                <Route element={<RequirePermission permiso="titular:ver" />}>
                  <Route path="/titulares" element={<Placeholder title="Titulares y Vehículos" />} />
                </Route>

                {/* 10 y 11. Usuarios y Perfiles */}
                <Route element={<RequirePermission permiso="usuarios:gestionar" />}>
                  <Route path="/usuarios" element={<Placeholder title="Usuarios" />} />
                </Route>

                <Route element={<RequirePermission permiso="perfiles:gestionar" />}>
                  <Route path="/perfiles" element={<Placeholder title="Perfiles y Permisos" />} />
                </Route>

                {/* Sin acceso y 404 */}
                <Route path="/sin-acceso" element={<Placeholder title="403 - Sin permisos" />} />
                <Route path="*" element={<Placeholder title="404 - Página no encontrada" />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}