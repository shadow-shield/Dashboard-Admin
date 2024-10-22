import { useState, useEffect } from 'react';
import { datosEstudiantes } from '../data/datosEstudiantes';
import { ResponsiveBar } from "@nivo/bar";
import { Box, Card, CardContent} from "@mui/material";

const GraficaEstadoCivil = () => {

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const estadosCiviles = datosEstudiantes.reduce((acc, item) => {
      const estadoCivil = item['ESTADO_CIVIL'];
      if (acc[estadoCivil]) {
        acc[estadoCivil] += 1;
      } else {
        acc[estadoCivil] = 1;
      }
      return acc;
    }, {});

    const data = Object.entries(estadosCiviles).map(([key, value]) => ({
      estadoCivil: key,
      admitidos: value,
    }));

    setChartData(data);
  }, []);

  const customColors = [
    '#228B22',
  ];

  return (
    <Card elevation={3} sx={{ margin: 2, borderRadius: 4 }}>
      <CardContent>
       
        <Box sx={{ width: '100%', textAlign: 'center', mt: 5 }}>

          <div style={{ height: '600px' }}>
            <ResponsiveBar
              data={chartData}
              keys={['admitidos']}
              indexBy="estadoCivil"
              margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
              padding={0.8}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              maxValue={160}
              colors={customColors}
              borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Estado Civil',
                legendPosition: 'middle',
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Cantidad de Admitidos',
                legendPosition: 'middle',
                legendOffset: -40,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
              legends={[
                {
                  dataFrom: 'keys',
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: 'left-to-right',
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              role="application"
              ariaLabel="Grafica de barras de admitidos por estado civil"
              barAriaLabel={function (e) {
                return `${e.id}: ${e.value} admitidos en estado civil: ${e.indexValue}`;
              }}
            />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GraficaEstadoCivil;
