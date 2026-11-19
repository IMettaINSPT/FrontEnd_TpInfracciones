// ==========================================
// 1. Permisos, Perfiles y Autenticación
// ==========================================
export interface IPermiso {
  _id: string;
  codigo: string;
  nombre: string;
  modulo: string;
  descripcion?: string;
}

export interface IPerfil {
  _id: string;
  nombre: string;
  descripcion?: string;
  permisos: string[]; // Array de ObjectIds serializados
  esSistema?: boolean;
}

export type PerfilCompleto = Omit<IPerfil, 'permisos'> & {
  permisos: IPermiso[];
};

export interface AuthUser {
  id: string;
  email: string;
  nombre: string;
  perfilId: string;
  permisos: string[]; // Array de ObjectIds de Permiso
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export interface IUser {
  _id: string;
  email: string;
  nombre: string;
  perfilId: string | IPerfil;
  createdAt?: string;
  updatedAt?: string;
}

// Contrato de datos y funciones que expone el contexto de autenticación

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  catalogoPermisos: IPermiso[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (codigoPermiso: string) => boolean;
  getPermisoNombre: (idOrCodigo: string) => string;
}

// ==========================================
// Panel de Control y Métricas (GET /panel/metricas)
// ==========================================
export interface IEstadoMetrica {
  _id: string; // 'pendiente' | 'notificada' | 'pagada' | 'en descargo' | 'anulada'
  cantidad: number;
  totalMonto: number;
}

export interface ITopFalta {
  _id: string; // tipoFalta
  cantidad: number;
  montoTotal: number;
}

export interface IZonaCritica {
  _id: string; // lugar
  cantidad: number;
}

export interface IPanelMetricasResponse {
  actasPorEstado: IEstadoMetrica[];
  recaudacion: {
    totalRecaudado: number;
    recaudadoTarjeta?: number;
    recaudadoBilletera?: number;
    cantidadTransacciones?: number;
  };
  estadisticas: {
    topFaltas: ITopFalta[];
    zonasCriticas: IZonaCritica[];
  };
}
// ==========================================
// Reportes y Consultas de Deuda
// ==========================================
export interface IDeudaActaDetalle {
  id: string;
  numeroActa: string;
  monto: number;
  estado: string;
  fechaHora: string;
}

export interface IDeudaPatenteResponse {
  vehiculo: {
    _id: string;
    patente: string;
    marca: string;
    modelo: string;
    anio?: number;
  };
  deudaTotal: number;
  cantidadActasImpagas: number;
  actasDetalle?: IDeudaActaDetalle[];
}

export interface IDeudaTitularResponse {
  titularId: string;
  deudaTotal: number;
  cantidadActasImpagas: number;
  vehiculosAsociados?: number;
  actas?: IDeudaActaDetalle[];
}
// ==========================================
// 2. Entidad Titular
// ==========================================
export interface ITitular {
  _id: string;
  esPersonaJuridica: boolean;
  cuit?: string;
  nombre: string;
  apellido?: string;
  dni?: string;
  domicilio: string;
  email: string;
  telefono?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ==========================================
// 3. Entidad Vehículo
// ==========================================
export interface ITitularVinculado {
  titular: string | ITitular;
  porcentajeTitularidad: number;
  fechaAltaRegistro: string;
  fechaBajaRegistro?: string;
}

export interface IVehiculo {
  _id: string;
  patente: string;
  marca: string;
  modelo: string;
  anio: number;
  titulares: ITitularVinculado[];
  createdAt?: string;
  updatedAt?: string;
}

// ==========================================
// 4. Entidad Infracción
// ==========================================
export type InfraccionEstado =
  'pendiente' | 'notificada' | 'pagada' | 'en descargo' | 'anulada';

export interface IInfraccion {
  _id: string;
  numeroActa: string;
  codigoBarras: string;
  vehiculo: string | IVehiculo;
  tipoFalta: string;
  lugar: string;
  fechaHora: string;
  fechaPago?: string;
  monto: number;
  estado: InfraccionEstado;
  inspector: string | IUser;
  motivoDescargo?: string;
  urlPago?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ==========================================
// 5. Entidad Pago
// ==========================================
export type TipoTarjeta = 'credito' | 'debito';
export type EmisorTarjeta = 'visa' | 'mastercard' | 'amex' | 'cabal' | 'otro';
export type PagoEstado = 'completado' | 'anulado';
export type MedioPago = 'tarjeta' | 'billetera_virtual';
export type ProveedorBilletera =
  'mercadopago' | 'modo' | 'uala' | 'cuenta_dni' | 'otro';

export interface IPagador {
  nombreCompleto: string;
  dniCuit: string;
  telefono?: string;
  email?: string;
}

export interface IDatosTarjeta {
  tipoTarjeta: TipoTarjeta;
  emisor: EmisorTarjeta;
  nombreTitular: string;
  ultimos4Digitos: string;
  mesExpiracion: string;
  anioExpiracion: string;
  codigoAutorizacion?: string;
}

export interface IDatosBilletera {
  proveedor: ProveedorBilletera;
  idTransaccionExterna: string;
  estadoTransaccion: string;
  detalleEstado?: string;
  tipoPago?: string;
  montoNetoRecibido?: number;
  comisionPasarela?: number;
  fechaAprobacionExterna?: string;
  emailPagadorPasarela?: string;
}

export interface IPago {
  _id: string;
  numeroComprobante: string;
  infracciones: string[] | IInfraccion[];
  montoTotalAbonado: number;
  medioPago: MedioPago;
  datosTarjeta?: IDatosTarjeta;
  datosBilletera?: IDatosBilletera;
  pagador: IPagador;
  cajero: string | IUser;
  fechaPago: string;
  estado: PagoEstado;
  motivoAnulacion?: string;
  fechaAnulacion?: string;
  anuladoPor?: string | IUser;
  createdAt?: string;
  updatedAt?: string;
}

// ==========================================
// 6. Auditoria y Panel
// ==========================================
export type EntidadAuditable =
  | 'Usuario'
  | 'User'
  | 'Perfil'
  | 'Permiso'
  | 'Titular'
  | 'Vehiculo'
  | 'Infraccion'
  | 'Pago';
export type AccionAuditoria =
  'CREACION' | 'MODIFICACION' | 'ELIMINACION' | 'CAMBIO_ESTADO';

export interface IAuditLog {
  _id: string;
  entidad: EntidadAuditable;
  entidadId: string;
  accion: AccionAuditoria;
  usuarioId: string | IUser;
  datosAnteriores?: Record<string, unknown> | null;
  datosNuevos?: Record<string, unknown> | null;
  motivo?: string;
  ip?: string;
  createdAt: string;
}

export interface IDeudaResumen {
  totalAdeudado: number;
  cantidadActas: number;
  infracciones: IInfraccion[];
}
