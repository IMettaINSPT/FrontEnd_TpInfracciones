import { useState, FormEvent } from 'react';
import { Alert, Box, Button, MenuItem, Paper, TextField, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import api from '../../services/api';
import type { IDeudaTitularResponse, ITitular } from '../../types';
import { formatearMoneda } from '../../utils/formatters';

export function ReporteDeudaTitular() {
  const [busqueda, setBusqueda] = useState('');
  const [titulares, setTitulares] = useState<ITitular[]>([]);
  const [titularSeleccionadoId, setTitularSeleccionadoId] = useState('');
  const [resultado, setResultado] = useState<IDeudaTitularResponse | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const consultarDeuda = async (id: string) => {
    setLoading(true);
    setError('');
    setResultado(null);
    try {
      const res = await api.get<IDeudaTitularResponse>(
        `/panel/deuda/titular/${encodeURIComponent(id)}`
      );
      setResultado(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'No se pudo consultar la deuda del titular');
    } finally {
      setLoading(false);
    }
  };

  const handleBuscar = async (e: FormEvent) => {
    e.preventDefault();
    if (!busqueda.trim()) return;

    setLoading(true);
    setError('');
    setResultado(null);
    setTitulares([]);
    setTitularSeleccionadoId('');

    try {
      const res = await api.get<ITitular[]>('/titulares', {
        params: { busqueda: busqueda.trim() },
      });

      if (res.data.length === 0) {
        setError('No se encontraron titulares con ese DNI, CUIT o nombre');
        setLoading(false);
        return;
      }

      setTitulares(res.data);
      const primero = res.data[0];
      setTitularSeleccionadoId(primero._id);
      await consultarDeuda(primero._id);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al buscar el titular');
      setLoading(false);
    }
  };

  const handleSeleccionarTitular = async (nuevoId: string) => {
    setTitularSeleccionadoId(nuevoId);
    await consultarDeuda(nuevoId);
  };

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Deuda Consolidada por Titular
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Buscá por DNI, CUIT o apellido para sumar las infracciones impagas de todos sus vehículos.
      </Typography>

      <Box component="form" onSubmit={handleBuscar} sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          size="small"
          fullWidth
          label="DNI, CUIT o Nombre del Titular"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <Button type="submit" variant="contained" startIcon={<SearchIcon />} disabled={loading}>
          {loading ? 'Buscando...' : 'Consultar'}
        </Button>
      </Box>

      {titulares.length > 1 && (
        <TextField
          select
          size="small"
          fullWidth
          label="Seleccionar titular coincidente"
          value={titularSeleccionadoId}
          onChange={(e) => handleSeleccionarTitular(e.target.value)}
          sx={{ mb: 2 }}
        >
          {titulares.map((t) => (
            <MenuItem key={t._id} value={t._id}>
              {t.nombre} {t.apellido ?? ''} — {t.dni ? `DNI ${t.dni}` : `CUIT ${t.cuit}`}
            </MenuItem>
          ))}
        </TextField>
      )}

      {error && <Alert severity="warning">{error}</Alert>}

      {resultado && (
        <Alert severity={resultado.cantidadActasImpagas > 0 ? 'error' : 'success'}>
          <Typography variant="subtitle2">
            Deuda consolidada: <strong>{formatearMoneda(resultado.deudaTotal)}</strong>
          </Typography>
          <Typography variant="body2">
            Actas impagas: {resultado.cantidadActasImpagas}
            {resultado.vehiculosAsociados !== undefined &&
              ` · Vehículos activos: ${resultado.vehiculosAsociados}`}
          </Typography>
        </Alert>
      )}
    </Paper>
  );
}