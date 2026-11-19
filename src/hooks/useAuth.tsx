import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import api from '../services/api';
import { getToken, getStoredUser, saveSession, clearSession } from '../services/auth';
import type { AuthUser, IPermiso, LoginResponse, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());
  const [catalogoPermisos, setCatalogoPermisos] = useState<IPermiso[]>([]);

  const cargarCatalogoPermisos = useCallback(async () => {
    if (!getToken()) return;
    try {
      const res = await api.get<IPermiso[]>('/perfiles/permisos');
      setCatalogoPermisos(res.data);
    } catch {
      // Silencioso si el usuario no tiene acceso al catálogo
    }
  }, []);

  useEffect(() => {
    cargarCatalogoPermisos();
  }, [cargarCatalogoPermisos]);

  const login = async (email: string, password: string) => {
    const res = await api.post<LoginResponse>('/auth/login', { email, password });
    const { token, user: userData } = res.data;
    saveSession(token, userData);
    setUser(userData);
    await cargarCatalogoPermisos();
  };

  const logout = () => {
    clearSession();
    setUser(null);
    setCatalogoPermisos([]);
  };

  const hasPermission = useCallback(
    (codigoPermiso: string): boolean => {
      if (!user?.permisos) return false;
      if (user.permisos.includes(codigoPermiso)) return true;
      const permisoObj = catalogoPermisos.find((p) => p.codigo === codigoPermiso);
      return permisoObj ? user.permisos.includes(permisoObj._id) : false;
    },
    [user, catalogoPermisos]
  );

  // Traduce un ObjectId (o código) al nombre legible del permiso para usar en Chips
  const getPermisoNombre = useCallback(
    (idOrCodigo: string): string => {
      const encontrado = catalogoPermisos.find(
        (p) => p._id === idOrCodigo || p.codigo === idOrCodigo
      );
      return encontrado ? encontrado.nombre : idOrCodigo;
    },
    [catalogoPermisos]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(getToken() && user),
        catalogoPermisos,
        login,
        logout,
        hasPermission,
        getPermisoNombre,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}