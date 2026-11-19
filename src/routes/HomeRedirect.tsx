import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Redirige al usuario a su primera pantalla permitida apenas ingresa a "/"
export default function HomeRedirect() {
  const { hasPermission } = useAuth();

  if (hasPermission('panel:ver')) return <Navigate to="/panel" replace />;
  if (hasPermission('infraccion:crear'))
    return <Navigate to="/infracciones/nueva" replace />;
  if (hasPermission('infraccion:ver'))
    return <Navigate to="/infracciones" replace />;

  return <Navigate to="/sin-acceso" replace />;
}
