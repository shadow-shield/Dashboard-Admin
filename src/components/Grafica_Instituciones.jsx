import { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import {datosEstudiantes} from '../data/datosEstudiantes'; // Asegúrate de que este archivo exporte correctamente los datos

const GraficaInst = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const instituciones = datosEstudiantes.reduce((acc, item) => {
      const institucion = item['INST_NOMBREINSTITUCION']; // Cambia el nombre del campo si es necesario
      if (acc[institucion]) {
        acc[institucion] += 1; // Cuenta cuántos estudiantes pertenecen a esta institución
      } else {
        acc[institucion] = 1; // Inicia el conteo para una nueva institución
      }
      return acc;
    }, {});

    const data = Object.entries(instituciones).map(([key, value]) => ({
      id: key,
      label: key,
      value: value,
    }));

    setChartData(data);
  }, []);

  // Define tus colores personalizados aquí
  const customColors = [
    '#e63946', // Rojo
    '#f1faee', // Blanco
    '#a8dadc', // Aqua
    '#457b9d', // Azul
    '#1d3557', // Azul oscuro
    // Agrega más colores si es necesario
  ];

  return (
    
      <ResponsivePie
        data={chartData}
        margin={{ top: 50, right: 20, bottom: 200, left: 100 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={1}
        activeOuterRadiusOffset={8}
        colors={customColors} // Usa tu arreglo de colores personalizados
        borderWidth={2}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabel={d => `${d.id}: ${d.value}`} // Muestra la institución y la cantidad
        arcLinkLabelsSkipAngle={5}
        arcLinkLabelsTextColor="#333333"
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        /* legends={[
          {
            
            anchor: 'top-left',
            direction: 'column',
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-rght',
            itemOpacity: 0.85,
            symbolSize: 18,
            symbolShape: 'diamond',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: 'green',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]} */
      />
    
  );
};

export default GraficaInst;
