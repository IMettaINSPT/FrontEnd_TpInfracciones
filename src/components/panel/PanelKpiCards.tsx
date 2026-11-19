import { Box, Card, CardContent, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { formatearMoneda } from '../../utils/formatters';

interface PanelKpiCardsProps {
  totalRecaudado: number;
  montoExigible: number;
  cantidadExigibles: number;
  totalActas: number;
  tasaRecupero: number;
}

export function PanelKpiCards({totalRecaudado, montoExigible, cantidadExigibles, totalActas, tasaRecupero}
    : PanelKpiCardsProps) {
  return (
    <Grid container spacing={2.5} sx={{ mb: 3 }}>
      {/* metrica 1: Recaudación efectiva */}
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <Card elevation={2} sx={{ height: '100%' }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="overline" color="text.secondary">
                  Recaudación Efectiva
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="success.main">
                  {formatearMoneda(totalRecaudado)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Total cobrado acumulado
                </Typography>
              </Box>
              <AttachMoneyIcon color="success" fontSize="large" />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* metrica 2: Deuda exigible en calle */}
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <Card elevation={2} sx={{ height: '100%' }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="overline" color="text.secondary">
                  Deuda Exigible
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="warning.main">
                  {formatearMoneda(montoExigible)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {cantidadExigibles} actas pendientes de cobro
                </Typography>
              </Box>
              <PendingActionsIcon color="warning" fontSize="large" />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* metrica 3: Volumen total de actas */}
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <Card elevation={2} sx={{ height: '100%' }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="overline" color="text.secondary">
                  Actas Labradas
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="primary.main">
                  {totalActas}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Total registrado en el sistema
                </Typography>
              </Box>
              <ReceiptLongIcon color="primary" fontSize="large" />
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* metrica 4: Porcentaje de recupero */}
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <Card elevation={2} sx={{ height: '100%' }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box sx={{ width: '100%', pr: 1 }}>
                <Typography variant="overline" color="text.secondary">
                  Tasa de Recupero
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="info.main">
                  {tasaRecupero}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(tasaRecupero, 100)}
                  sx={{ mt: 1, height: 6, borderRadius: 3 }}
                />
              </Box>
              <TrendingUpIcon color="info" fontSize="large" />
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}