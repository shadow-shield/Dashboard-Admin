import { Box } from '@mui/material'; 
import GraficaEstadoCivil from '../components/GraficaEstadoCivil';

import GraficaSexo from '../components/GraficaSexo';
import GraficaAdmitidos from '../components/GraficaAdmitidosPorTipo';
import GraficoAdmitidosPorDepartamento from '../components/GraficoAdminidoPorDepartamentoDeResidencia';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center' }}>
      <Box sx={{ width: '45%', height: '700px' }}>
        <GraficaEstadoCivil /> 
      </Box>
      <Box sx={{ width: '45%', height: '500px' }}>
        <GraficoAdmitidosPorDepartamento/>
      </Box>
      <Box sx={{ width: '45%', height: '700px' }}>
        <GraficaSexo /> 
      </Box>
      <Box sx={{ width: '45%', height: '400px' }}>
        <GraficaAdmitidos /> 
      </Box>
    </Box>
  );
};

export default Dashboard;
