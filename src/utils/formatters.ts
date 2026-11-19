export const formatearMoneda = (valor: number): string =>
  new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(valor || 0);