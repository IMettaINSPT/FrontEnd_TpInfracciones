import { useState, FormEvent } from 'react';
import {  Alert, Box,  Button, Chip,  Paper,  Table,  TableBody,  TableCell,  TableHead,  TableRow,  TextField,  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import api from '../../services/api';
import type { IDeudaPatenteResponse } from '../../types';
import { formatearMoneda } from '../../utils/formatters';

    //deudas por patente
export function ReporteDeudaPatente() {
  const [patente, setPatente] = useState('');
  const [resultado, setResultado] = useState<IDeudaPatenteResponse | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBuscar = async (e: FormEvent) => {
    e.preventDefault();
    if (!patente.trim()) return;

    setLoading(true);
    setError('');
    setResultado(null);

    // get al repo de deuda patente
    try {
      const res = await api.get<IDeudaPatenteResponse>(
        //patente encapsulado por usestate
        `/panel/deuda/patente/${encodeURIComponent(patente.trim().toUpperCase())}`
      );
      // seteo resultado
      setResultado(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Vehículo no encontrado con esa patente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Deuda por Patente de Vehículo
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Consultá el total exigible de actas impagas asociadas a un dominio.
      </Typography>

      <Box component="form" onSubmit={handleBuscar} sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          size="small"
          fullWidth
          label="Dominio (ej. AB123CD)"
          value={patente}
          onChange={(e) => setPatente(e.target.value)}
        />
        <Button type="submit" variant="contained" startIcon={<SearchIcon />} disabled={loading}>
          {loading ? 'Buscando...' : 'Consultar'}
        </Button>
      </Box>

      {error && <Alert severity="warning">{error}</Alert>}
      
// solo si hay un resultado
      {resultado && (
        <Box>
          <Alert severity={resultado.cantidadActasImpagas > 0 ? 'error' : 'success'} sx={{ mb: 2 }}>
            <Typography variant="subtitle2">
              {resultado.vehiculo.patente} — {resultado.vehiculo.marca} {resultado.vehiculo.modelo}
            </Typography>
            <Typography variant="body2">
              Deuda exigible: <strong>{formatearMoneda(resultado.deudaTotal)}</strong> (
              {resultado.cantidadActasImpagas} actas impagas)
            </Typography>
          </Alert>

          {resultado.actasDetalle && resultado.actasDetalle.length > 0 && (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>N° Acta</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align="right">Monto</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resultado.actasDetalle.map((acta) => (
                  <TableRow key={acta.id}>
                    <TableCell>{acta.numeroActa}</TableCell>
                    <TableCell>
                      <Chip label={acta.estado.toUpperCase()} size="small" color="warning" />
                    </TableCell>
                    <TableCell align="right">{formatearMoneda(acta.monto)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      )}
    </Paper>
  );
}