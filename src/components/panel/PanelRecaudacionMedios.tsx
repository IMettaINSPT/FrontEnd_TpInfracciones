import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import { formatearMoneda } from '../../utils/formatters';

interface PanelRecaudacionMediosProps {
  recaudadoTarjeta: number;
  recaudadoBilletera: number;
  totalRecaudado: number;
}

export function PanelRecaudacionMedios({
  recaudadoTarjeta,recaudadoBilletera,totalRecaudado,
}: PanelRecaudacionMediosProps) {
  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Recaudación por Medio de Pago
      </Typography>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <Box>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Tarjeta (Débito / Crédito)</Typography>
            <Typography variant="body2" fontWeight="bold">
              {formatearMoneda(recaudadoTarjeta)}
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <Box>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">Billetera Virtual (Mercado Pago)</Typography>
            <Typography variant="body2" fontWeight="bold">
              {formatearMoneda(recaudadoBilletera)}
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <Box>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle2">Total Cobrado</Typography>
            <Typography variant="subtitle2" fontWeight="bold" color="success.main">
              {formatearMoneda(totalRecaudado)}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}