import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Guardián de sesión: si no hay token/usuario logueado, redirige al login
export function RequireAuth() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

//  valida el permiso de la ruta o redirige a pantalla 403
export function RequirePermission({ permiso }: { permiso: string }) {
  const { hasPermission } = useAuth();
  return hasPermission(permiso) ? (
    <Outlet />
  ) : (
    <Navigate to="/sin-acceso" replace />
  );
}
