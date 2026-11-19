import { useState, useEffect, useMemo } from 'react';
import { Alert, Box, CircularProgress, Grid, Typography } from '@mui/material';
import api from '../services/api';
import type { IPanelMetricasResponse } from '../types';
import { PanelKpiCards } from '../components/panel/PanelKpiCards';
import { PanelEstadosTabla } from '../components/panel/PanelEstadosTabla';
import { PanelRecaudacionMedios } from '../components/panel/PanelRecaudacionMedios';
import { PanelRankings } from '../components/panel/PanelRankings';

export default function Panel() {
  const [metricas, setMetricas] = useState<IPanelMetricasResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function cargarTotalesSistema() {
      setLoading(true);
      setError('');
      try {
        const res = await api.get<IPanelMetricasResponse>('/panel/metricas');
        setMetricas(res.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'No se pudieron cargar las métricas del sistema');
      } finally {
        setLoading(false);
      }
    }

    cargarTotalesSistema();
  }, []);

  const kpis = useMemo(() => {
    const actasPorEstado = metricas?.actasPorEstado ?? [];
    const totalActas = actasPorEstado.reduce((acc, item) => acc + item.cantidad, 0);
    const montoTotalEmitido = actasPorEstado
      .filter((item) => item._id !== 'anulada')
      .reduce((acc, item) => acc + item.totalMonto, 0);

    const exigibles = actasPorEstado.filter((item) =>
      ['pendiente', 'notificada', 'en descargo'].includes(item._id)
    );
    const cantidadExigibles = exigibles.reduce((acc, item) => acc + item.cantidad, 0);
    const montoExigible = exigibles.reduce((acc, item) => acc + item.totalMonto, 0);

    const totalRecaudado = metricas?.recaudacion?.totalRecaudado ?? 0;
    const tasaRecupero =
      montoTotalEmitido > 0 ? Math.round((totalRecaudado / montoTotalEmitido) * 100) : 0;

    return { totalRecaudado, montoExigible, cantidadExigibles, totalActas, tasaRecupero };
  }, [metricas]);

  return (
    <Box>
     

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <PanelKpiCards {...kpis} />

          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <PanelEstadosTabla actasPorEstado={metricas?.actasPorEstado ?? []} />
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <PanelRecaudacionMedios
                recaudadoTarjeta={metricas?.recaudacion?.recaudadoTarjeta ?? 0}
                recaudadoBilletera={metricas?.recaudacion?.recaudadoBilletera ?? 0}
                totalRecaudado={kpis.totalRecaudado}
              />
            </Grid>
          </Grid>

          <PanelRankings
            topFaltas={metricas?.estadisticas?.topFaltas ?? []}
            zonasCriticas={metricas?.estadisticas?.zonasCriticas ?? []}
          />
        </>
      )}
    </Box>
  );
}