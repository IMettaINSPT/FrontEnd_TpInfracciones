import { Box, Grid, Typography } from '@mui/material';
import { ReporteDeudaPatente } from '../components/reportes/ReporteDeudaPatente';
import { ReporteDeudaTitular } from '../components/reportes/ReporteDeudaTitular';

export default function Reportes() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Reportes y Consultas
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Consultas específicas de cuenta corriente, deuda exigible por patente y consolidado por titular.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ReporteDeudaPatente />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ReporteDeudaTitular />
        </Grid>
      </Grid>
    </Box>
  );
}