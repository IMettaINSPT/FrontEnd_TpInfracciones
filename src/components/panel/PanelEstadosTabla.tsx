import {
  Chip,Paper,Table,TableBody,TableCell,TableHead,TableRow,Typography
} from '@mui/material';
import type { IEstadoMetrica } from '../../types';
import { formatearMoneda } from '../../utils/formatters';

const ESTADO_COLOR: Record<string, 'success' | 'warning' | 'error' | 'info' | 'secondary' | 'default'> = {
  pagada: 'success',
  pendiente: 'warning',
  notificada: 'info',
  'en descargo': 'secondary',
  anulada: 'error',
};

interface PanelEstadosTablaProps {
  actasPorEstado: IEstadoMetrica[];
}

export function PanelEstadosTabla({ actasPorEstado }: PanelEstadosTablaProps) {
  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Actas por Estado
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Estado</TableCell>
            <TableCell align="right">Cantidad</TableCell>
            <TableCell align="right">Monto Acumulado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {actasPorEstado.length > 0 ? (
            actasPorEstado.map((row) => (
              <TableRow key={row._id}>
                <TableCell>
                  <Chip
                    label={row._id.toUpperCase()}
                    size="small"
                    color={ESTADO_COLOR[row._id] || 'default'}
                  />
                </TableCell>
                <TableCell align="right">{row.cantidad}</TableCell>
                <TableCell align="right">{formatearMoneda(row.totalMonto)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                Sin registros en el sistema.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}