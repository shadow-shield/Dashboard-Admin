import { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { datosEstudiantes } from '../data/datosEstudiantes';
import { Card, CardContent, Box } from '@mui/material';

const GraficoEstudiantesPorMunicipio = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const estudiantesPorMunicipio = datosEstudiantes.reduce((acc, item) => {
      let municipioOriginal = item['ASPI_MPIORESIDENCIA_1'];

      const municipio = municipioOriginal.length > 8 ? `${municipioOriginal.substring(0, 8)}...` : municipioOriginal;

      if (acc[municipio]) {
        acc[municipio] += 1;
      } else {
        acc[municipio] = 1;
      }
      return acc;
    }, {});

    const totalEstudiantes = datosEstudiantes.length;

    const data = Object.entries(estudiantesPorMunicipio).map(([key, value]) => ({
      municipio: key,
      porcentaje: ((value / totalEstudiantes) * 100).toFixed(2),
    }));

    setChartData(data);
  }, []);

  return (
    <Card elevation={3} sx={{ margin: 2, borderRadius: 4 }}>
      <CardContent>
        <Box sx={{ width: '100%', textAlign: 'center', mt: 5 }}>
          <div
            style={{
              height: '600px',
              background: 'white',
              padding: '20px',
              borderRadius: '10px',
            }}
          >
            <div style={{ height: '500px' }}>
              <ResponsiveBar
                data={chartData}
                keys={['porcentaje']}
                indexBy="municipio"
                layout="vertical"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={['#FFA500']} 
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Porcentaje de Estudiantes (%)',
                  legendPosition: 'middle',
                  legendOffset: -40,
                }}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Municipios',
                  legendPosition: 'middle',
                  legendOffset: 40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                enableLabel={true}
                label={({ value }) => `${value}%`}
              />
            </div>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GraficoEstudiantesPorMunicipio;
