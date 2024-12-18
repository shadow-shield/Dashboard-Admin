/*  import { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import { datosEstudiantes } from '../data/datosEstudiantes'; // Asegúrate de que este archivo exporte correctamente los datos
import { motion } from 'framer-motion';
motion
const GraficaInst = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const instituciones = datosEstudiantes.reduce((acc, item) => {
      const institucion = item['INST_NOMBREINSTITUCION'];
      if (acc[institucion]) {
        acc[institucion] += 1;
      } else {
        acc[institucion] = 1;
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

  const customColors = [
    '#e63946',
    '#f1faee',
    '#a8dadc',
    '#457b9d',
    '#1d3557',
  ];

  return (
    <motion.div
      style={{ height: "700px", background: "#f9f9f9", padding: "20px", borderRadius: "10px" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
    <div style={{ height: '600px', width: '100%' }}>
      <ResponsivePie
        data={chartData}
        margin={{ top: 50, right: 20, bottom: 50, left: 250 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={1}
        activeOuterRadiusOffset={8}
        colors={customColors}
        borderWidth={2}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        arcLinkLabel={d => `${d.id}: ${d.value}`}
        arcLinkLabelsSkipAngle={15}
        arcLinkLabelsTextColor="#333333"
        arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
        legends={[
          {
            anchor: 'top-right',
            direction: 'column',
            justify: false,
            translateX: 0,
            translateY: -10,
            itemsSpacing: 0,
            itemWidth: 1500,
            itemHeight: 18,
            itemTextColor: '#999',
            itemDirection: 'left-to-right',
            itemOpacity: 0.90,
            symbolSize: 18,
            symbolShape: 'diamond',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: 'red',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
    </motion.div>
  );
};

export default GraficaInst; 
  */