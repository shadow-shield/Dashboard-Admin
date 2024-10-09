// GraficoAdmitidosPorDepartamento.js
import { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { Card, CardContent,Box } from '@mui/material';
import { datosEstudiantes } from '../data/datosEstudiantes';

const datosAdmitidos = datosEstudiantes;

const GraficoAdmitidosPorDepartamento = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const admitidosPorDepartamento = datosAdmitidos.reduce((acc, item) => {
      const departamento = item['ASPI_DPTORESIDENCIA_1'];
      if (acc[departamento]) {
        acc[departamento] += 1; 
      } else {
        acc[departamento] = 1; 
      }
      return acc;
    }, {});

    const data = Object.entries(admitidosPorDepartamento).map(([key, value]) => ({
      id: key,
      label: key,
      value: value,
    }));

    setChartData(data);
  }, []);

  const customColors = [
    '#ff6b6b', 
    '#4ecdc4', 
    '#1a535c', 
    '#ffe66d',
    '#ff9f1c', 
  ];

  return (
    <Card elevation={3} sx={{ margin: 2, borderRadius: 4 }}>
      <CardContent>
      <Box sx={{ width: '100%', textAlign: 'center', mt: 5 }}>
        <div
          style={{
            height: "400px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <ResponsivePie
            data={chartData}
            margin={{ top: 50, right: 20, bottom: 100, left: 100 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={1}
            activeOuterRadiusOffset={8}
            colors={customColors} 
            borderWidth={2}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            arcLinkLabel={(d) => `${d.id}: ${d.value}`} 
            arcLinkLabelsSkipAngle={5}
            arcLinkLabelsTextColor="#333333"
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            legends={[
              {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 10,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000',
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GraficoAdmitidosPorDepartamento;
