import { Box } from '@mui/material'; 

import GraficaSexo from '../components/GraficaSexo';
import GraficaAdmitidos from '../components/GraficaAdmitidosPorTipo';
import GraficoAdmitidosPorDepartamento from '../components/GraficoAdminidoPorDepartamentoDeResidencia';

import AdmitidosEstadoCivil from './AdmitidosEstadoCivil';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5, padding: 3, backgroundColor: '#f5f5f5', minHeight: '182vh',borderRadius:'50px' }}>
      
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
        <Box sx={{ flex: 1, height: '150px', backgroundColor: '#dcdcdc', borderRadius: 2 }} />
        <Box sx={{ flex: 1, height: '150px', backgroundColor: '#dcdcdc', borderRadius: 2 }} />
        <Box sx={{ flex: 1, height: '150px', backgroundColor: '#dcdcdc', borderRadius: 2 }} />
        <Box sx={{ flex: 1, height: '150px', backgroundColor: '#dcdcdc', borderRadius: 2 }} />
      </Box>

      {/* Gráficas */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'center' }}>
        <Box sx={{ width: { xs: '100%', sm: '45%' }, height: '800px' }}>
         <AdmitidosEstadoCivil />
        </Box>
        <Box sx={{ width: { xs: '100%', sm: '45%' }, height: '500px' }}>
          <GraficoAdmitidosPorDepartamento />
        </Box>
        <Box sx={{ width: { xs: '100%', sm: '45%' }, height: '700px' }}>
          <GraficaSexo /> 
        </Box>
        <Box sx={{ width: { xs: '100%', sm: '45%' }, height: '400px' }}>
          <GraficaAdmitidos /> 
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
