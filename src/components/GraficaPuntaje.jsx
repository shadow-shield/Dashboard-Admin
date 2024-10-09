import { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { datosEstudiantes } from '../data/datosEstudiantes'; // Asegúrate de usar export default en datosEstudiantes.js

const GraficaPuntaje = () => {
  const [chartData, setChartData] = useState([]);


  useEffect(() => {
    setChartData(datosEstudiantes.map(item => ({
      Nombre: item['NOMBRE Y APELLIDO'].replace(' ', ' '),
      Puntaje: item['PRXF_PUNTAJEOBTENIDO']
    })));
  }, []);


  const getColor = (nombre) => {
    const colors = {
      'Juan Pérez': '#ff6384',
      'Ana Gómez': '#36a2eb',

    };
    return colors[nombre] || '#4caf50';
  };

  return (
    <div style={{ height: '500px' }}>
      <ResponsiveBar
        data={chartData}
        keys={['Puntaje']}
        indexBy="Nombre"
        margin={{ top: 60, right: 130, bottom: 100, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={(bar) => getColor(bar.id)}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: 'Estudiante',
          legendPosition: 'middle',
          legendOffset: 70
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Puntaje Obtenido',
          legendPosition: 'middle',
          legendOffset: -40
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
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default GraficaPuntaje;
