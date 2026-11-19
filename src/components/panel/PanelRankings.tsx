import {
  Grid,Paper,Table,TableBody,TableCell,TableHead,TableRow,Typography
} from '@mui/material';
import type { ITopFalta, IZonaCritica } from '../../types';
import { formatearMoneda } from '../../utils/formatters';

interface PanelRankingsProps {
  topFaltas: ITopFalta[];
  zonasCriticas: IZonaCritica[];
}

export function PanelRankings({ topFaltas, zonasCriticas }: PanelRankingsProps) {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Infracciones Más Frecuentes
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Tipo de Falta</TableCell>
                <TableCell align="right">Actas</TableCell>
                <TableCell align="right">Monto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topFaltas.length > 0 ? (
                topFaltas.map((falta) => (
                  <TableRow key={falta._id}>
                    <TableCell>{falta._id}</TableCell>
                    <TableCell align="right">{falta.cantidad}</TableCell>
                    <TableCell align="right">{formatearMoneda(falta.montoTotal)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    Sin datos disponibles.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Paper sx={{ p: 3, height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Zonas / Puntos Críticos
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Ubicación / Calle</TableCell>
                <TableCell align="right">Cantidad de Actas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {zonasCriticas.length > 0 ? (
                zonasCriticas.map((zona) => (
                  <TableRow key={zona._id}>
                    <TableCell>{zona._id}</TableCell>
                    <TableCell align="right">{zona.cantidad}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    Sin datos disponibles.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}